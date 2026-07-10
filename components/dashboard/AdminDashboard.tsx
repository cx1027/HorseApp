"use client";

import { useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import {
  CategoryIcon,
  ProgressRing,
  SectionTitle,
  TopBar,
  type CategoryColor,
} from "./shared/Theme";

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
  color: CategoryColor;
}

interface QuickAccess {
  id: string;
  title: string;
  value: string;
  color: CategoryColor;
  icon: ReactNode;
  href: string;
}

const HorsesIcon = (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
  </svg>
);

const UserIcon = (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
  </svg>
);

const ReportIcon = (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
  </svg>
);

const ActivityIcon = (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
  </svg>
);

const PlusIcon = (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
  </svg>
);

const BellIcon = (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
  </svg>
);

const ShieldIcon = (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
  </svg>
);

const TrophyIcon = (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m6 0v-3.75m-6.75-3.75h13.5M9 12.75l-2.25-2.25M15 12.75l2.25-2.25M8.25 7.5l1.5-1.5m4.5 1.5l-1.5-1.5" />
  </svg>
);

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stat>({ horses: 0, users: 0, reports: 0, actionsToday: 0 });
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [quickAccess, setQuickAccess] = useState<QuickAccess[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setStats({
        horses: 12,
        users: 28,
        reports: 5,
        actionsToday: 47,
      });
      setAuditLogs([
        { id: "1", action: "Created horse", entityType: "horses", actor: "Staff User", color: "yellow", createdAt: "2 hours ago" },
        { id: "2", action: "Updated user role", entityType: "user_roles", actor: "Admin", color: "purple", createdAt: "4 hours ago" },
        { id: "3", action: "Published report", entityType: "investor_reports", actor: "Staff User", color: "teal", createdAt: "6 hours ago" },
        { id: "4", action: "Added health record", entityType: "horse_health_records", actor: "Staff User", color: "green", createdAt: "1 day ago" },
        { id: "5", action: "Deleted document", entityType: "uploaded_documents", actor: "Staff User", color: "pink", createdAt: "1 day ago" },
      ]);
      setQuickAccess([
        { id: "1", title: "Horses", value: "12", color: "yellow", href: "/horses", icon: HorsesIcon },
        { id: "2", title: "Users", value: "28", color: "purple", href: "/admin/users", icon: UserIcon },
        { id: "3", title: "Reports", value: "5", color: "teal", href: "/reports", icon: ReportIcon },
        { id: "4", title: "Today", value: "47", color: "pink", href: "/admin/audit", icon: ActivityIcon },
      ]);
      setIsLoading(false);
    }, 500);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background-primary pb-20">
        <TopBar title="Dashboard" />
        <div className="px-5 pt-2 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="p-4 animate-pulse">
                <div className="h-12 w-12 rounded-full bg-background-primary mx-auto mb-3" />
                <div className="h-5 w-16 rounded bg-background-primary mx-auto mb-1" />
                <div className="h-3 w-20 rounded bg-background-primary mx-auto" />
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-primary pb-20">
      <TopBar title="Dashboard" />

      <div className="px-5 pt-2 space-y-6">
        {/* Stats Grid */}
        <SectionTitle title="Overview" />
        <div className="grid grid-cols-2 gap-4">
          {quickAccess.map((item) => (
            <Link key={item.id} href={item.href}>
              <Card className="p-4 transition-all hover:shadow-elevated">
                <CategoryIcon color={item.color} size="md">
                  {item.icon}
                </CategoryIcon>
                <p className="mt-3 text-xl font-bold text-text-primary">{item.value}</p>
                <p className="text-xs text-text-secondary mt-0.5">{item.title}</p>
              </Card>
            </Link>
          ))}
        </div>

        {/* Performance rings */}
        <SectionTitle title="System Health" />
        <Card className="p-5">
          <div className="grid grid-cols-3 gap-2">
            <ProgressRing
              color="green"
              progress={92}
              value="92%"
              unit="uptime"
              label="Server"
              size={88}
            />
            <ProgressRing
              color="purple"
              progress={68}
              value="68%"
              unit="active"
              label="Storage"
              size={88}
            />
            <ProgressRing
              color="teal"
              progress={47}
              value="47"
              unit="actions"
              label="Today"
              size={88}
            />
          </div>
        </Card>

        {/* Quick links row */}
        <SectionTitle title="Quick Links" />
        <div className="grid grid-cols-4 gap-3">
          <Link href="/horses">
            <Card className="p-3 text-center hover:shadow-elevated transition-shadow">
              <CategoryIcon color="yellow" size="md">
                <PlusIcon />
              </CategoryIcon>
              <p className="text-xs font-medium text-text-primary mt-2">Add</p>
            </Card>
          </Link>
          <Link href="/admin/users">
            <Card className="p-3 text-center hover:shadow-elevated transition-shadow">
              <CategoryIcon color="purple" size="md">
                {UserIcon}
              </CategoryIcon>
              <p className="text-xs font-medium text-text-primary mt-2">Users</p>
            </Card>
          </Link>
          <Link href="/admin/audit">
            <Card className="p-3 text-center hover:shadow-elevated transition-shadow">
              <CategoryIcon color="teal" size="md">
                {ActivityIcon}
              </CategoryIcon>
              <p className="text-xs font-medium text-text-primary mt-2">Audit</p>
            </Card>
          </Link>
          <Link href="/admin/settings">
            <Card className="p-3 text-center hover:shadow-elevated transition-shadow">
              <CategoryIcon color="pink" size="md">
                {ShieldIcon}
              </CategoryIcon>
              <p className="text-xs font-medium text-text-primary mt-2">Roles</p>
            </Card>
          </Link>
        </div>

        {/* Goal Callout */}
        <SectionTitle title="System Goals" />
        <Card className="p-5 bg-[#D8F4EE] border-0">
          <div className="flex items-center gap-4">
            <div className="flex-shrink-0 w-20 h-20 rounded-full bg-[#A8E5D8] flex items-center justify-center">
              <div className="w-12 h-12 text-[#1A8870]">
                {TrophyIcon}
              </div>
            </div>
            <div className="flex-1">
              <p className="text-xs uppercase tracking-wide font-semibold text-[#0D5648]">
                All Systems
              </p>
              <p className="mt-1 text-base font-semibold text-[#062F26]">
                Operating normally
              </p>
              <p className="mt-0.5 text-xs text-[#0E6A56]">
                {stats.actionsToday} actions today · 0 incidents
              </p>
            </div>
          </div>
        </Card>

        {/* Recent Activity */}
        <Card className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold text-text-primary">Recent Activity</h3>
            <Link href="/admin/audit" className="text-xs font-medium text-text-secondary hover:text-primary">
              View All
            </Link>
          </div>
          <div className="space-y-4">
            {auditLogs.map((log) => (
              <div key={log.id} className="flex items-center gap-3">
                <CategoryIcon color={log.color} size="sm">
                  <ActivityIcon />
                </CategoryIcon>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-text-primary truncate">
                    {log.action}
                  </p>
                  <p className="text-xs text-text-muted mt-0.5 truncate">
                    {log.entityType} · by {log.actor}
                  </p>
                </div>
                <span className="text-xs text-text-muted flex-shrink-0">{log.createdAt}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
