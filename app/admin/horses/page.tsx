"use client";

import { useState } from "react";
import { Card, Badge, Avatar, Button } from "@/components/ui";

interface Horse {
  id: string;
  name: string;
  status: string;
  owners: number;
  updatedAt: string;
}

const mockHorses: Horse[] = [
  { id: "1", name: "Golden Gallop", status: "active", owners: 4, updatedAt: "2026-07-03" },
  { id: "2", name: "Northern Light", status: "active", owners: 3, updatedAt: "2026-06-28" },
  { id: "3", name: "Summer Breeze", status: "retired", owners: 6, updatedAt: "2026-07-01" },
];

export default function AdminHorsesPage() {
  const [horses] = useState<Horse[]>(mockHorses);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge variant="success">Active</Badge>;
      case "retired":
        return <Badge variant="default">Retired</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-text-primary">Horse Management</h1>
        <Button variant="primary" size="sm">Add Horse</Button>
      </div>

      <div className="space-y-3">
        {horses.map((horse) => (
          <Card key={horse.id} className="py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Avatar size="lg" fallback={horse.name} />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-text-primary">{horse.name}</span>
                    {getStatusBadge(horse.status)}
                  </div>
                  <p className="mt-1 text-sm text-text-muted">{horse.owners} owners · Updated {horse.updatedAt}</p>
                </div>
              </div>
              <Button variant="ghost" size="sm">Edit</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
