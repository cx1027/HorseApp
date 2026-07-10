"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import PageHeader from "@/components/ui/PageHeader";
import StatCard from "./shared/StatCard";
import QuickAction from "./shared/QuickAction";
import ActivityList from "./shared/ActivityList";

interface Stat {
  horses: number;
  users: number;
  reports: number;
  actionsToday: number;
}

interface AuditLog {
  id: string;
  action: string;
  entityType: string;
  actor: string;
  createdAt: string;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stat>({ horses: 0, users: 0, reports: 0, actionsToday: 0 });
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setStats({
        horses: 12,
        users: 28,
        reports: 5,
        actionsToday: 47,
      });
      setAuditLogs([
        { id: "1", action: "Created horse", entityType: "horses", actor: "Staff User", createdAt: "2 hours ago" },
        { id: "2", action: "Updated user role", entityType: "user_roles", actor: "Admin", createdAt: "4 hours ago" },
        { id: "3", action: "Published report", entityType: "investor_reports", actor: "Staff User", createdAt: "6 hours ago" },
        { id: "4", action: "Added health record", entityType: "horse_health_records", actor: "Staff User", createdAt: "1 day ago" },
        { id: "5", action: "Deleted document", entityType: "uploaded_documents", actor: "Staff User", createdAt: "1 day ago" },
      ]);
      setIsLoading(false);
    }, 500);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background-primary">
        <PageHeader title="Dashboard" subtitle="Admin Overview" />
        <div className="p-5 space-y-5">
          <div className="grid grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="animate-pulse">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-background-primary" />
                  <div className="space-y-2">
                    <div className="h-6 w-12 rounded bg-background-primary" />
                    <div className="h-4 w-16 rounded bg-background-primary" />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const HorseIcon = (
    <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 15.803a7.5 7.5 0 0010.607 10.607z" />
    </svg>
  );

  const UserIcon = (
    <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
    </svg>
  );

  const ReportIcon = (
    <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
    </svg>
  );

  const ActivityIcon = (
    <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
    </svg>
  );

  const PlusIcon = <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>;
  const UsersIcon = <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" /></svg>;
  const AuditIcon = <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75l16.5 3.75m-16.5-3.75l16.5-3.75" /></svg>;

  return (
    <div className="min-h-screen bg-background-primary">
      <PageHeader title="Dashboard" subtitle="Admin Overview" />

      <div className="p-5 space-y-5">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <StatCard icon={HorseIcon} value={stats.horses} label="Total Horses" />
          <StatCard icon={UserIcon} value={stats.users} label="Total Users" />
          <StatCard icon={ReportIcon} value={stats.reports} label="Active Reports" />
          <StatCard icon={ActivityIcon} value={stats.actionsToday} label="Actions Today" />
        </div>

        {/* Quick Actions */}
        <Card className="p-5">
          <h3 className="font-medium text-text-primary mb-4">Quick Actions</h3>
          <div className="grid grid-cols-3 gap-3">
            <QuickAction icon={PlusIcon} label="Add Horse" href="/horses/new" />
            <QuickAction icon={UsersIcon} label="Users" href="/admin/users" />
            <QuickAction icon={AuditIcon} label="Audit Log" href="/admin/audit" />
          </div>
        </Card>

        {/* Recent Audit Logs */}
        <Card className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-text-primary">Recent Activity</h3>
            <Link href="/admin/audit" className="text-sm text-primary hover:text-primary-600 font-medium">
              View All
            </Link>
          </div>
          <ActivityList
            activities={auditLogs.map((log) => ({
              id: log.id,
              icon: (
                <svg className="w-4 h-4 text-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ),
              description: `${log.action} (${log.entityType}) by ${log.actor}`,
              time: log.createdAt,
            }))}
          />
        </Card>
      </div>
    </div>
  );
}
