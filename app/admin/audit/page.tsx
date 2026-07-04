"use client";

import { useState } from "react";
import { PageHeader, Card, Badge, Avatar } from "@/components/ui";

interface AuditLog {
  id: string;
  actor: string;
  action: string;
  entityType: string;
  entityName: string;
  timestamp: string;
  ipAddress: string;
}

const mockLogs: AuditLog[] = [
  { id: "1", actor: "John Smith", action: "Created", entityType: "Horse", entityName: "Golden Gallop", timestamp: "2026-07-03 14:32:15", ipAddress: "192.168.1.1" },
  { id: "2", actor: "Jane Doe", action: "Updated", entityType: "Health Record", entityName: "Vaccination - Golden Gallop", timestamp: "2026-07-03 12:15:42", ipAddress: "192.168.1.2" },
  { id: "3", actor: "System", action: "Published", entityType: "Report", entityName: "Q2 2026 Update", timestamp: "2026-07-02 09:00:00", ipAddress: "System" },
  { id: "4", actor: "Robert Johnson", action: "Deleted", entityType: "Document", entityName: "old_contract.pdf", timestamp: "2026-07-01 16:45:30", ipAddress: "192.168.1.3" },
  { id: "5", actor: "Emily Wilson", action: "Invited", entityType: "User", entityName: "New User", timestamp: "2026-06-30 11:20:00", ipAddress: "192.168.1.4" },
];

const actionColors: Record<string, "success" | "warning" | "accent" | "primary" | "secondary" | "default"> = {
  Created: "success",
  Updated: "primary",
  Deleted: "accent",
  Published: "secondary",
  Invited: "warning",
};

export default function AdminAuditPage() {
  const [logs] = useState<AuditLog[]>(mockLogs);
  const [filter, setFilter] = useState("all");

  const filteredLogs = logs.filter((log) => {
    if (filter === "all") return true;
    return log.action === filter;
  });

  const actions = [...new Set(logs.map((log) => log.action))];

  return (
    <div className="min-h-screen bg-background-primary">
      <PageHeader title="Audit Logs" subtitle="System activity history" />

      <div className="p-4 space-y-4">
        {/* Filter */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          <button
            onClick={() => setFilter("all")}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
              filter === "all"
                ? "bg-primary text-background-secondary"
                : "bg-background-card text-text-secondary hover:bg-background-elevated"
            }`}
          >
            All ({logs.length})
          </button>
          {actions.map((action) => {
            const count = logs.filter((l) => l.action === action).length;
            return (
              <button
                key={action}
                onClick={() => setFilter(action)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                  filter === action
                    ? "bg-primary text-background-secondary"
                    : "bg-background-card text-text-secondary hover:bg-background-elevated"
                }`}
              >
                {action} ({count})
              </button>
            );
          })}
        </div>

        {/* Logs List */}
        <div className="space-y-2">
          {filteredLogs.map((log) => (
            <Card key={log.id} className="py-3">
              <div className="flex items-start gap-3">
                <Avatar size="sm" fallback={log.actor} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-medium text-text-primary">{log.actor}</span>
                    <Badge variant={actionColors[log.action] || "default"} size="sm">
                      {log.action}
                    </Badge>
                    <Badge variant="secondary" size="sm">
                      {log.entityType}
                    </Badge>
                  </div>
                  <p className="mt-1 text-sm text-text-secondary truncate">{log.entityName}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-text-muted">{log.timestamp}</span>
                    <span className="text-xs text-text-muted">·</span>
                    <span className="text-xs text-text-muted">{log.ipAddress}</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredLogs.length === 0 && (
          <Card className="text-center py-12">
            <p className="text-text-secondary">No audit logs found</p>
          </Card>
        )}
      </div>
    </div>
  );
}
