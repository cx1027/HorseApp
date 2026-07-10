"use client";

import { useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Avatar from "@/components/ui/Avatar";
import {
  CategoryIcon,
  ProgressRing,
  SectionTitle,
  TopBar,
  type CategoryColor,
} from "./shared/Theme";

interface Task {
  id: string;
  type: "feeding" | "health" | "weight" | "document";
  color: CategoryColor;
  horseName: string;
  description: string;
  dueTime: string;
  completed: boolean;
}

interface Horse {
  id: string;
  name: string;
  status: string;
  color: CategoryColor;
  updatedAt: string;
}

const HorsesIcon = (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
  </svg>
);

const ClockIcon = (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const CheckIcon = (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const ReportIcon = (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
  </svg>
);

const BellIcon = (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
  </svg>
);

const WeightIcon = (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75z" />
  </svg>
);

const DocumentIcon = (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 0V5.25A2.25 2.25 0 0010.5 3h6a2.25 2.25 0 002.25 2.25v15a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 18.75V9m0 0h12" />
  </svg>
);

interface QuickAccess {
  id: string;
  title: string;
  value: string;
  color: CategoryColor;
  icon: ReactNode;
  href: string;
}

export default function StaffDashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [horses, setHorses] = useState<Horse[]>([]);
  const [quickAccess, setQuickAccess] = useState<QuickAccess[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setTasks([
        { id: "1", type: "feeding", color: "yellow", horseName: "Golden Gallop", description: "Morning feeding", dueTime: "7:00 AM", completed: false },
        { id: "2", type: "health", color: "pink", horseName: "Northern Light", description: "Weekly health check", dueTime: "10:00 AM", completed: false },
        { id: "3", type: "weight", color: "purple", horseName: "Summer Breeze", description: "Monthly weight log", dueTime: "2:00 PM", completed: true },
        { id: "4", type: "document", color: "teal", horseName: "Thunder Hoof", description: "Insurance renewal", dueTime: "4:00 PM", completed: false },
      ]);
      setHorses([
        { id: "1", name: "Golden Gallop", status: "active", color: "yellow", updatedAt: "2 hours ago" },
        { id: "2", name: "Northern Light", status: "active", color: "pink", updatedAt: "5 hours ago" },
        { id: "3", name: "Summer Breeze", status: "retired", color: "teal", updatedAt: "1 day ago" },
        { id: "4", name: "Thunder Hoof", status: "injured", color: "red", updatedAt: "3 hours ago" },
      ]);
      setQuickAccess([
        { id: "1", title: "Horses", value: "12", color: "yellow", href: "/horses", icon: HorsesIcon },
        { id: "2", title: "Pending", value: "3", color: "purple", href: "/horses", icon: ClockIcon },
        { id: "3", title: "Completed", value: "8", color: "green", href: "/horses", icon: CheckIcon },
        { id: "4", title: "Reports", value: "5", color: "teal", href: "/reports", icon: ReportIcon },
      ]);
      setIsLoading(false);
    }, 500);
  }, []);

  const pendingCount = tasks.filter((t) => !t.completed).length;
  const completedCount = tasks.filter((t) => t.completed).length;
  const totalTasks = tasks.length;

  const getTaskIcon = (type: Task["type"]) => {
    switch (type) {
      case "feeding":
        return ClockIcon;
      case "health":
        return HorsesIcon;
      case "weight":
        return WeightIcon;
      case "document":
        return DocumentIcon;
    }
  };

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
        {/* Quick access grid */}
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
        <SectionTitle title="Today's Progress" />
        <Card className="p-5">
          <div className="grid grid-cols-3 gap-2">
            <ProgressRing
              color="green"
              progress={Math.round((completedCount / Math.max(totalTasks, 1)) * 100)}
              value={`${completedCount}`}
              unit={`of ${totalTasks}`}
              label="Done"
              size={88}
            />
            <ProgressRing
              color="purple"
              progress={Math.round((pendingCount / Math.max(totalTasks, 1)) * 100)}
              value={`${pendingCount}`}
              unit="left"
              label="Pending"
              size={88}
            />
            <ProgressRing
              color="yellow"
              progress={75}
              value="75%"
              unit="score"
              label="Quality"
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
                {HorsesIcon}
              </CategoryIcon>
              <p className="text-xs font-medium text-text-primary mt-2">Horses</p>
            </Card>
          </Link>
          <Link href="/ownership">
            <Card className="p-3 text-center hover:shadow-elevated transition-shadow">
              <CategoryIcon color="purple" size="md">
                {DocumentIcon}
              </CategoryIcon>
              <p className="text-xs font-medium text-text-primary mt-2">Ownership</p>
            </Card>
          </Link>
          <Link href="/reports">
            <Card className="p-3 text-center hover:shadow-elevated transition-shadow">
              <CategoryIcon color="teal" size="md">
                {ReportIcon}
              </CategoryIcon>
              <p className="text-xs font-medium text-text-primary mt-2">Reports</p>
            </Card>
          </Link>
          <Link href="/documents">
            <Card className="p-3 text-center hover:shadow-elevated transition-shadow">
              <CategoryIcon color="green" size="md">
                {DocumentIcon}
              </CategoryIcon>
              <p className="text-xs font-medium text-text-primary mt-2">Documents</p>
            </Card>
          </Link>
        </div>

        {/* Today Target */}
        <SectionTitle title="Daily Goal" />
        <Card className="p-5 bg-[#FFE2E5] border-0">
          <div className="flex items-center gap-4">
            <div className="flex-shrink-0 w-20 h-20 rounded-full bg-[#FFC4CB] flex items-center justify-center">
              <div className="w-12 h-12 text-[#FF4D6D]">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                </svg>
              </div>
            </div>
            <div className="flex-1">
              <p className="text-xs uppercase tracking-wide font-semibold text-[#A32744]">
                Today's Tasks
              </p>
              <p className="mt-1 text-base font-semibold text-[#481320]">
                {pendingCount} tasks remaining
              </p>
              <p className="mt-0.5 text-xs text-[#773246]">
                Keep going — {completedCount} already done
              </p>
            </div>
          </div>
        </Card>

        {/* Today's Tasks */}
        <Card className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold text-text-primary">Today&apos;s Tasks</h3>
            <Badge variant={pendingCount > 0 ? "warning" : "success"}>
              {pendingCount} pending
            </Badge>
          </div>
          <div className="space-y-3">
            {tasks.map((task) => {
              const Icon = getTaskIcon(task.type);
              return (
                <div
                  key={task.id}
                  className={`flex items-center gap-3 p-3 rounded-2xl border ${
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
                  <CategoryIcon color={task.color} size="sm">
                    {Icon}
                  </CategoryIcon>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm ${task.completed ? "line-through text-text-muted" : "text-text-primary"}`}>
                      {task.description}
                    </p>
                    <p className="text-xs text-text-muted">{task.horseName} · {task.dueTime}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* All Horses */}
        <SectionTitle
          title="All Horses"
          action={
            <Link href="/horses" className="text-xs font-medium text-primary">
              View All
            </Link>
          }
        />
        <div className="space-y-3">
          {horses.map((horse) => (
            <Link key={horse.id} href={`/horses/${horse.id}`}>
              <Card className="p-4 transition-all hover:shadow-elevated">
                <div className="flex items-center gap-4">
                  <CategoryIcon color={horse.color} size="md">
                    {HorsesIcon}
                  </CategoryIcon>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-text-primary truncate">{horse.name}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge
                        variant={
                          horse.status === "active"
                            ? "success"
                            : horse.status === "injured"
                            ? "warning"
                            : "default"
                        }
                      >
                        {horse.status.charAt(0).toUpperCase() + horse.status.slice(1)}
                      </Badge>
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
        </div>
      </div>
    </div>
  );
}
