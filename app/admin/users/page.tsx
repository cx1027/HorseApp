"use client";

import { useState, useEffect } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { Card, Badge, Avatar, Button, Input, Modal } from "@/components/ui";
import Select from "@/components/ui/Select";

interface User {
  id: string;
  email: string;
  display_name: string | null;
  status: "active" | "invited" | "disabled";
  created_at: string;
  roles?: string[];
}

const roleOptions = [
  { value: "admin", label: "Admin - Full system access" },
  { value: "staff", label: "Staff - Management access" },
  { value: "owner", label: "Owner - Horse ownership access" },
  { value: "investor", label: "Investor - Read access to assigned horses" },
];

const statusOptions = [
  { value: "active", label: "Active" },
  { value: "invited", label: "Invited" },
  { value: "disabled", label: "Disabled" },
];

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState("");

  // Form state
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newDisplayName, setNewDisplayName] = useState("");
  const [newRole, setNewRole] = useState("owner");
  const [newStatus, setNewStatus] = useState("active");

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    setLoading(true);
    try {
      const { data: usersData, error: usersError } = await supabase
        .from("users")
        .select("*")
        .order("created_at", { ascending: false });

      if (usersError) throw usersError;

      // Fetch roles for each user
      const usersWithRoles = await Promise.all(
        (usersData || []).map(async (user) => {
          const { data: rolesData } = await supabase
            .from("user_roles")
            .select("role:roles(slug)")
            .eq("user_id", user.id);

          return {
            ...user,
            roles: rolesData?.map((r: any) => r.role?.slug) || [],
          };
        })
      );

      setUsers(usersWithRoles);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
    setLoading(false);
  }

  async function handleCreateUser(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setIsCreating(true);

    try {
      // Create auth user
      const { data: authData, error: authError } = await supabase.auth.admin.createUser({
        email: newEmail,
        password: newPassword,
        email_confirm: true,
        user_metadata: {
          display_name: newDisplayName,
        },
      });

      if (authError) throw authError;

      const userId = authData.user?.id;
      if (!userId) throw new Error("Failed to create user");

      // Add to users table
      await supabase.from("users").upsert({
        id: userId,
        email: newEmail,
        display_name: newDisplayName,
        status: newStatus,
      });

      // Assign role
      const { data: roleData } = await supabase
        .from("roles")
        .select("id")
        .eq("slug", newRole)
        .single();

      if (roleData) {
        await supabase.from("user_roles").insert({
          user_id: userId,
          role_id: roleData.id,
        });
      }

      // Reset form and close modal
      setNewEmail("");
      setNewPassword("");
      setNewDisplayName("");
      setNewRole("owner");
      setNewStatus("active");
      setShowCreateModal(false);

      // Refresh list
      await fetchUsers();
    } catch (err: any) {
      setError(err.message || "Failed to create user");
    }

    setIsCreating(false);
  }

  async function handleDeleteUser(userId: string) {
    if (!confirm("Are you sure you want to delete this user?")) return;

    try {
      await supabase.auth.admin.deleteUser(userId);
      await fetchUsers();
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  }

  const filteredUsers = users.filter(
    (user) =>
      user.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.display_name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge variant="success">Active</Badge>;
      case "invited":
        return <Badge variant="warning">Invited</Badge>;
      case "disabled":
        return <Badge variant="default">Disabled</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getRoleBadge = (role: string) => {
    const variants: Record<string, "default" | "primary" | "secondary"> = {
      admin: "primary",
      staff: "secondary",
      owner: "default",
      investor: "default",
    };
    return (
      <Badge variant={variants[role] || "default"}>
        {role.charAt(0).toUpperCase() + role.slice(1)}
      </Badge>
    );
  };

  if (loading) {
    return (
      <div className="p-4 flex items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-text-primary">User Management</h1>
        <Button onClick={() => setShowCreateModal(true)}>Create User</Button>
      </div>

      <Input
        placeholder="Search users..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <div className="space-y-2">
        {filteredUsers.map((user) => (
          <Card key={user.id} className="py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar size="md" fallback={user.display_name || user.email} />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-text-primary">
                      {user.display_name || "No name"}
                    </span>
                    {getStatusBadge(user.status)}
                  </div>
                  <p className="text-sm text-text-muted">{user.email}</p>
                  <div className="flex gap-1 mt-1">
                    {user.roles?.map((role) => getRoleBadge(role))}
                  </div>
                </div>
              </div>
              <Button
                variant="danger"
                size="sm"
                onClick={() => handleDeleteUser(user.id)}
              >
                Delete
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {filteredUsers.length === 0 && (
        <div className="text-center py-8 text-text-muted">
          No users found
        </div>
      )}

      {/* Create User Modal */}
      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Create New User"
      >
        <form onSubmit={handleCreateUser} className="space-y-4">
          <Input
            label="Display Name"
            type="text"
            placeholder="User's name"
            value={newDisplayName}
            onChange={(e) => setNewDisplayName(e.target.value)}
            required
          />

          <Input
            label="Email"
            type="email"
            placeholder="user@example.com"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            required
          />

          <Input
            label="Password"
            type="password"
            placeholder="Initial password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            minLength={6}
          />

          <Select
            label="Role"
            value={newRole}
            onChange={(e) => setNewRole(e.target.value)}
            options={roleOptions}
          />

          <Select
            label="Status"
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value)}
            options={statusOptions}
          />

          {error && (
            <p className="text-sm text-primary">{error}</p>
          )}

          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="secondary"
              onClick={() => setShowCreateModal(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              isLoading={isCreating}
              className="flex-1"
            >
              Create User
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
