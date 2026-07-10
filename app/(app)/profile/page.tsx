"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useUserRole } from "@/hooks/useUserRole";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Avatar from "@/components/ui/Avatar";
import ActivityList from "@/components/dashboard/shared/ActivityList";

interface Horse {
  id: string;
  name: string;
  sharePercent: number;
  status: string;
  nextRace?: string;
  updatedAt: string;
}

interface RecentActivity {
  id: string;
  type: "report" | "health" | "feeding" | "weight" | "race" | "document";
  title: string;
  horseName: string;
  time: string;
}

export default function ProfilePage() {
  const { role, isLoading: roleLoading } = useUserRole();
  const [horses, setHorses] = useState<Horse[]>([]);
  const [activities, setActivities] = useState<RecentActivity[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setHorses([
        { id: "1", name: "Golden Gallop", sharePercent: 25, status: "active", nextRace: "Mar 28 - Aotearoa Cup", updatedAt: "2 hours ago" },
        { id: "3", name: "Summer Breeze", sharePercent: 10, status: "retired", updatedAt: "1 day ago" },
        { id: "5", name: "Midnight Star", sharePercent: 15, status: "active", nextRace: "Apr 5 - Breeding Stakes", updatedAt: "3 days ago" },
      ]);
      setActivities([
        { id: "1", type: "report", title: "Q2 2026 Report published", horseName: "Golden Gallop", time: "2 hours ago" },
        { id: "2", type: "health", title: "Health check completed", horseName: "Summer Breeze", time: "1 day ago" },
        { id: "3", type: "document", title: "Insurance certificate uploaded", horseName: "Midnight Star", time: "3 days ago" },
      ]);
      setIsLoading(false);
    }, 400);
  }, []);

  const totalShares = horses.reduce((sum, h) => sum + h.sharePercent, 0);
  const monthlyEarnings = 4250;
  const totalEarnings = 85550;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge variant="success">Active</Badge>;
      case "retired":
        return <Badge variant="default">Retired</Badge>;
      case "injured":
        return <Badge variant="warning">Injured</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "report":
        return (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
          </svg>
        );
      case "health":
        return (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
          </svg>
        );
      case "feeding":
        return (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case "weight":
        return (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75z" />
          </svg>
        );
      case "race":
        return (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
          </svg>
        );
      case "document":
        return (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m6.75 18H5.625c-.621 0-1.125-.504-1.125-1.125V5.625c0-.621.504-1.125 1.125-1.125h12.75c.621 0 1.125.504 1.125 1.125v12.75c0 .621-.504 1.125-1.125 1.125z" />
          </svg>
        );
      default:
        return null;
    }
  };

  if (roleLoading || isLoading) {
    return (
      <div className="min-h-screen bg-background-primary pb-20">
        <div className="p-5 space-y-5">
          {/* Profile header skeleton */}
          <Card className="p-5 animate-pulse">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-full bg-background-primary" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-32 rounded bg-background-primary" />
                <div className="h-3 w-48 rounded bg-background-primary" />
                <div className="h-5 w-16 rounded bg-background-primary" />
              </div>
            </div>
          </Card>
          {/* Stats skeleton */}
          <div className="grid grid-cols-3 gap-3">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="p-4 animate-pulse">
                <div className="h-10 w-10 rounded-xl bg-background-primary mx-auto mb-2" />
                <div className="h-6 w-12 bg-background-primary rounded mx-auto" />
                <div className="h-3 w-16 bg-background-primary rounded mx-auto mt-1" />
              </Card>
            ))}
          </div>
          {/* Quick actions skeleton */}
          <div className="grid grid-cols-4 gap-3">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="p-3 animate-pulse text-center">
                <div className="h-10 w-10 rounded-xl bg-background-primary mx-auto mb-2" />
                <div className="h-3 w-12 bg-background-primary rounded mx-auto" />
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-primary pb-20">
      <div className="p-5 space-y-5">
        {/* Profile header */}
        <Card className="p-5">
          <div className="flex items-center gap-4">
            <Avatar size="lg" fallback="JS" className="h-16 w-16 text-xl" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-semibold text-text-primary truncate">John Smith</h2>
                <Badge variant="success">Verified</Badge>
              </div>
              <p className="mt-1 text-sm text-text-secondary truncate">john.smith@email.com</p>
              <div className="mt-2 flex items-center gap-2">
                <Badge variant="primary">Owner</Badge>
                <span className="text-xs text-text-muted">· Member since 2024</span>
              </div>
            </div>
            <Link
              href="/settings"
              className="p-2 hover:bg-background-secondary rounded-xl transition-colors"
              aria-label="Edit profile"
            >
              <svg className="w-5 h-5 text-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
              </svg>
            </Link>
          </div>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-3">
          <Card className="p-4 text-center">
            <div className="inline-flex p-2 rounded-xl bg-primary-soft mb-2">
              <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 15.803a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </div>
            <p className="text-xl font-bold text-text-primary">{horses.length}</p>
            <p className="text-xs text-text-secondary">Horses</p>
          </Card>
          <Card className="p-4 text-center">
            <div className="inline-flex p-2 rounded-xl bg-primary-soft mb-2">
              <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
            </div>
            <p className="text-xl font-bold text-text-primary">{totalShares}%</p>
            <p className="text-xs text-text-secondary">Total Shares</p>
          </Card>
          <Card className="p-4 text-center">
            <div className="inline-flex p-2 rounded-xl bg-primary-soft mb-2">
              <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-xl font-bold text-text-primary">${(monthlyEarnings / 1000).toFixed(1)}k</p>
            <p className="text-xs text-text-secondary">This Month</p>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-4 gap-3">
          <Link href="/horses">
            <Card className="p-3 text-center hover:shadow-elevated transition-shadow">
              <div className="inline-flex p-2 rounded-xl bg-primary-soft mb-2">
                <div className="inline-flex p-1.5 rounded-lg bg-primary">
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 15.803a7.5 7.5 0 0010.607 10.607z" />
                  </svg>
                </div>
              </div>
              <p className="text-xs font-medium text-text-primary">My Horses</p>
            </Card>
          </Link>
          <Link href="/reports">
            <Card className="p-3 text-center hover:shadow-elevated transition-shadow">
              <div className="inline-flex p-2 rounded-xl bg-primary-soft mb-2">
                <div className="inline-flex p-1.5 rounded-lg bg-primary">
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                  </svg>
                </div>
              </div>
              <p className="text-xs font-medium text-text-primary">Reports</p>
            </Card>
          </Link>
          <Link href="/documents">
            <Card className="p-3 text-center hover:shadow-elevated transition-shadow">
              <div className="inline-flex p-2 rounded-xl bg-primary-soft mb-2">
                <div className="inline-flex p-1.5 rounded-lg bg-primary">
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                  </svg>
                </div>
              </div>
              <p className="text-xs font-medium text-text-primary">Documents</p>
            </Card>
          </Link>
          <Link href="/notifications">
            <Card className="p-3 text-center hover:shadow-elevated transition-shadow">
              <div className="inline-flex p-2 rounded-xl bg-primary-soft mb-2 relative">
                <div className="inline-flex p-1.5 rounded-lg bg-primary">
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                  </svg>
                </div>
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-accent text-white text-xs rounded-full flex items-center justify-center">3</span>
              </div>
              <p className="text-xs font-medium text-text-primary">Alerts</p>
            </Card>
          </Link>
        </div>

        {/* Recent Activity */}
        <Card className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-text-primary">Recent Activity</h3>
            <Link href="/reports" className="text-sm text-primary hover:text-primary-600 font-medium">
              View All
            </Link>
          </div>
          <ActivityList
            activities={activities.map((a) => ({
              id: a.id,
              icon: getActivityIcon(a.type),
              description: `${a.title} (${a.horseName})`,
              time: a.time,
            }))}
            emptyMessage="No recent activity"
          />
        </Card>

        {/* My Horses */}
        <div className="space-y-3">
          <h3 className="font-medium text-text-primary px-1">My Horses</h3>
          {horses.map((horse) => (
            <Link key={horse.id} href={`/horses/${horse.id}`}>
              <Card className="p-4 transition-all hover:shadow-elevated">
                <div className="flex items-center gap-4">
                  <Avatar size="lg" fallback={horse.name} className="h-12 w-12 text-base" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium text-text-primary truncate">{horse.name}</h4>
                      {getStatusBadge(horse.status)}
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="primary">{horse.sharePercent}%</Badge>
                      <span className="text-xs text-text-muted truncate">
                        {horse.nextRace ? `Next: ${horse.nextRace}` : `Updated ${horse.updatedAt}`}
                      </span>
                    </div>
                  </div>
                  <svg className="w-5 h-5 text-text-muted flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {/* Sign out */}
        <Link href="/auth/login">
          <Card className="p-4 text-center hover:bg-background-secondary transition-colors cursor-pointer">
            <span className="text-sm font-medium text-red-600">Sign Out</span>
          </Card>
        </Link>
      </div>
    </div>
  );
}
