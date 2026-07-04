"use client";

import { useState } from "react";
import { Card, Badge, Avatar, Button, Input } from "@/components/ui";

interface User {
  id: string;
  name: string;
  email: string;
  status: "active" | "invited" | "disabled";
  role: string;
  createdAt: string;
}

const mockUsers: User[] = [
  { id: "1", name: "John Smith", email: "john@horseapp.com", status: "active", role: "Owner", createdAt: "2024-01-15" },
  { id: "2", name: "Jane Doe", email: "jane@horseapp.com", status: "active", role: "Owner", createdAt: "2024-01-15" },
  { id: "3", name: "Robert Johnson", email: "robert@horseapp.com", status: "active", role: "Viewer", createdAt: "2024-03-20" },
];

export default function AdminUsersPage() {
  const [users] = useState<User[]>(mockUsers);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
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

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-text-primary">User Management</h1>
        <Button variant="primary" size="sm">Invite User</Button>
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
                <Avatar size="md" fallback={user.name} />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-text-primary">{user.name}</span>
                    {getStatusBadge(user.status)}
                  </div>
                  <p className="text-sm text-text-muted">{user.email}</p>
                </div>
              </div>
              <Badge variant="default">{user.role}</Badge>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
