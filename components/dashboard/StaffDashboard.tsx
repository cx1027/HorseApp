"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Avatar from "@/components/ui/Avatar";
import ActivityList from "./shared/ActivityList";

interface Task {
  id: string;
  type: "feeding" | "health" | "weight" | "document";
  horseName: string;
  description: string;
  dueTime: string;
  completed: boolean;
}

interface Horse {
  id: string;
  name: string;
  status: string;
  updatedAt: string;
}

interface RecentUpdate {
  id: string;
  type: "feeding" | "health" | "weight" | "document";
  horseName: string;
  description: string;
  time: string;
}

export default function StaffDashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [horses, setHorses] = useState<Horse[]>([]);
  const [updates, setUpdates] = useState<RecentUpdate[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setTasks([
        { id: "1", type: "feeding", horseName: "Golden Gallop", description: "Morning feeding", dueTime: "7:00 AM", completed: false },
        { id: "2", type: "health", horseName: "Northern Light", description: "Weekly health check", dueTime: "10:00 AM", completed: false },
        { id: "3", type: "weight", horseName: "Summer Breeze", description: "Monthly weight log", dueTime: "2:00 PM", completed: true },
        { id: "4", type: "document", horseName: "Thunder Hoof", description: "Insurance renewal", dueTime: "4:00 PM", completed: false },
      ]);
      setHorses([
        { id: "1", name: "Golden Gallop", status: "active", updatedAt: "2 hours ago" },
        { id: "2", name: "Northern Light", status: "active", updatedAt: "5 hours ago" },
        { id: "3", name: "Summer Breeze", status: "retired", updatedAt: "1 day ago" },
        { id: "4", name: "Thunder Hoof", status: "injured", updatedAt: "3 hours ago" },
      ]);
      setUpdates([
        { id: "1", type: "health", horseName: "Golden Gallop", description: "Health check completed", time: "2 hours ago" },
        { id: "2", type: "feeding", horseName: "Northern Light", description: "Feeding schedule updated", time: "5 hours ago" },
        { id: "3", type: "weight", horseName: "Thunder Hoof", description: "Weight recorded", time: "3 hours ago" },
      ]);
      setIsLoading(false);
    }, 500);
  }, []);

  const filteredHorses = horses.filter((horse) =>
    horse.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const pendingCount = tasks.filter((t) => !t.completed).length;
  const completedCount = tasks.filter((t) => t.completed).length;

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
      case "feeding":
        return (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case "health":
        return (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 15.803a7.5 7.5 0 0010.607 10.607z" />
          </svg>
        );
      case "weight":
        return (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75z" />
          </svg>
        );
      case "document":
        return (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
          </svg>
        );
      default:
        return null;
    }
  };

  const getTaskIcon = (type: string) => {
    switch (type) {
      case "feeding":
        return (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case "health":
        return (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 15.803a7.5 7.5 0 0010.607 10.607z" />
          </svg>
        );
      case "weight":
        return (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75z" />
          </svg>
        );
      case "document":
        return (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
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
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
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
            <div className="inline-flex p-2 rounded-xl bg-yellow-100 mb-2">
              <svg className="w-5 h-5 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-xl font-bold text-text-primary">{pendingCount}</p>
            <p className="text-xs text-text-secondary">Pending</p>
          </Card>
          <Card className="p-4 text-center">
            <div className="inline-flex p-2 rounded-xl bg-green-100 mb-2">
              <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-xl font-bold text-text-primary">{completedCount}</p>
            <p className="text-xs text-text-secondary">Completed</p>
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
              <p className="text-xs font-medium text-text-primary">Horses</p>
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
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 0V5.25A2.25 2.25 0 0010.5 3h6a2.25 2.25 0 002.25 2.25v15a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 18.75V9m0 0h12" />
                  </svg>
                </div>
              </div>
              <p className="text-xs font-medium text-text-primary">Documents</p>
            </Card>
          </Link>
        </div>

        {/* Today's Tasks */}
        <Card className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-text-primary">Today&apos;s Tasks</h3>
            <Badge variant={pendingCount > 0 ? "warning" : "success"}>
              {pendingCount} pending
            </Badge>
          </div>
          <div className="space-y-3">
            {tasks.map((task) => (
              <div
                key={task.id}
                className={`flex items-center gap-3 p-3 rounded-xl border ${
                  task.completed
                    ? "bg-background-primary border-transparent opacity-60"
                    : "bg-surface border-border"
                }`}
              >
                <button
                  onClick={() => {
                    setTasks(tasks.map((t) =>
                      t.id === task.id ? { ...t, completed: !t.completed } : t
                    ));
                  }}
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                    task.completed
                      ? "bg-primary border-primary"
                      : "border-border hover:border-primary"
                  }`}
                >
                  {task.completed && (
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>
                <div className="p-2 rounded-lg bg-background-primary">
                  {getTaskIcon(task.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm ${task.completed ? "line-through text-text-muted" : "text-text-primary"}`}>
                    {task.description}
                  </p>
                  <p className="text-xs text-text-muted">{task.horseName} · {task.dueTime}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Updates */}
        <Card className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-text-primary">Recent Updates</h3>
            <Link href="/horses" className="text-sm text-primary hover:text-primary-600 font-medium">
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
          <h3 className="font-medium text-text-primary px-1">All Horses</h3>
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
                    <p className="text-xs text-text-muted mt-1">Updated {horse.updatedAt}</p>
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
