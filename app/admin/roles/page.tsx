"use client";

import { useState } from "react";
import { PageHeader, Card, Button, Badge } from "@/components/ui";

interface Role {
  id: string;
  name: string;
  slug: string;
  description: string;
  userCount: number;
  permissions: string[];
}

const mockRoles: Role[] = [
  {
    id: "1",
    name: "Administrator",
    slug: "admin",
    description: "Full access to all features and settings",
    userCount: 2,
    permissions: ["read", "write", "delete", "admin"],
  },
  {
    id: "2",
    name: "Owner",
    slug: "owner",
    description: "Can manage horses and view reports",
    userCount: 8,
    permissions: ["read", "write"],
  },
  {
    id: "3",
    name: "Viewer",
    slug: "viewer",
    description: "Read-only access to assigned horses",
    userCount: 5,
    permissions: ["read"],
  },
];

const permissionColors: Record<string, "primary" | "secondary" | "accent" | "default"> = {
  read: "primary",
  write: "secondary",
  delete: "accent",
  admin: "default",
};

export default function AdminRolesPage() {
  const [roles, setRoles] = useState<Role[]>(mockRoles);

  return (
    <div className="min-h-screen bg-background-primary">
      <PageHeader
        title="Role Management"
        subtitle={`${roles.length} roles`}
        action={
          <Button variant="primary" size="sm">
            <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Create Role
          </Button>
        }
      />

      <div className="p-4 space-y-4">
        {/* Roles List */}
        <div className="space-y-3">
          {roles.map((role) => (
            <Card key={role.id}>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-text-primary">{role.name}</h3>
                    <Badge variant="default" size="sm">{role.slug}</Badge>
                  </div>
                  <p className="mt-1 text-sm text-text-secondary">{role.description}</p>
                </div>
                <Button variant="ghost" size="sm">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-text-muted">Permissions:</span>
                  <div className="flex gap-1">
                    {role.permissions.map((perm) => (
                      <Badge key={perm} variant={permissionColors[perm]} size="sm">
                        {perm}
                      </Badge>
                    ))}
                  </div>
                </div>
                <span className="text-sm text-text-muted">{role.userCount} users</span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
