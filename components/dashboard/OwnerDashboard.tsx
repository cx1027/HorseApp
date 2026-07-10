"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Avatar from "@/components/ui/Avatar";
import ActivityList from "./shared/ActivityList";

interface Horse {
  id: string;
  name: string;
  status: string;
  sharePercent: number;
  updatedAt: string;
  image?: string;
}

interface RecentUpdate {
  id: string;
  type: "report" | "health" | "feeding" | "weight";
  horseName: string;
  description: string;
  time: string;
}

export default function OwnerDashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [horses, setHorses] = useState<Horse[]>([]);
  const [updates, setUpdates] = useState<RecentUpdate[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setHorses([
        { id: "1", name: "Golden Gallop", status: "active", sharePercent: 25, updatedAt: "2 hours ago" },
        { id: "2", name: "Northern Light", status: "active", sharePercent: 15, updatedAt: "5 hours ago" },
        { id: "3", name: "Summer Breeze", status: "retired", sharePercent: 10, updatedAt: "1 day ago" },
        { id: "4", name: "Thunder Hoof", status: "active", sharePercent: 30, updatedAt: "2 days ago" },
      ]);
      setUpdates([
        { id: "1", type: "report", horseName: "Golden Gallop", description: "Q2 2026 Report published", time: "2 hours ago" },
        { id: "2", type: "health", horseName: "Northern Light", description: "Health check completed", time: "5 hours ago" },
        { id: "3", type: "feeding", horseName: "Summer Breeze", description: "Feeding schedule updated", time: "1 day ago" },
      ]);
      setIsLoading(false);
    }, 500);
  }, []);

  const filteredHorses = horses.filter((horse) =>
    horse.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalShares = horses.reduce((sum, h) => sum + h.sharePercent, 0);

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

  const getUpdateIcon = (type: string) => {
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
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 15.803a7.5 7.5 0 0010.607 10.607z" />
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
      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background-primary pb-20">
        <div className="p-5 space-y-5">
          {/* Search bar skeleton */}
          <div className="h-12 bg-surface rounded-2xl animate-pulse" />
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
        {/* Search Bar */}
        <div className="flex items-center gap-3">
          <div className="flex-1 relative">
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 15.803a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            <input
              type="text"
              placeholder="Search horses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-surface border border-border rounded-2xl pl-12 pr-4 py-3 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary"
            />
          </div>
          <button className="p-3 bg-surface border border-border rounded-2xl hover:bg-background-secondary transition-colors">
            <svg className="w-5 h-5 text-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A18.683 18.683 0 0112 3z" />
            </svg>
          </button>
        </div>

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
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
            </div>
            <p className="text-xl font-bold text-text-primary">3</p>
            <p className="text-xs text-text-secondary">Reports</p>
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
          <Link href="/ownership">
            <Card className="p-3 text-center hover:shadow-elevated transition-shadow">
              <div className="inline-flex p-2 rounded-xl bg-primary-soft mb-2">
                <div className="inline-flex p-1.5 rounded-lg bg-primary">
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                  </svg>
                </div>
              </div>
              <p className="text-xs font-medium text-text-primary">Ownership</p>
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
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-accent text-white text-xs rounded-full flex items-center justify-center">2</span>
              </div>
              <p className="text-xs font-medium text-text-primary">Alerts</p>
            </Card>
          </Link>
        </div>

        {/* Recent Updates */}
        <Card className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-text-primary">Recent Updates</h3>
            <Link href="/reports" className="text-sm text-primary hover:text-primary-600 font-medium">
              View All
            </Link>
          </div>
          <ActivityList
            activities={updates.map((update) => ({
              id: update.id,
              icon: getUpdateIcon(update.type),
              description: `${update.description} (${update.horseName})`,
              time: update.time,
            }))}
            emptyMessage="No recent updates"
          />
        </Card>

        {/* Horse List */}
        <div className="space-y-3">
          <h3 className="font-medium text-text-primary px-1">My Horses</h3>
          {filteredHorses.map((horse) => (
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
                      <span className="text-xs text-text-muted">Updated {horse.updatedAt}</span>
                    </div>
                  </div>
                  <svg className="w-5 h-5 text-text-muted flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                </div>
              </Card>
            </Link>
          ))}
          {filteredHorses.length === 0 && (
            <div className="text-center py-8 text-text-muted">
              <p>No horses found matching "{searchQuery}"</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
