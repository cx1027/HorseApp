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

interface Horse {
  id: string;
  name: string;
  status: string;
  sharePercent: number;
  color: CategoryColor;
  updatedAt: string;
}

interface RecentUpdate {
  id: string;
  type: "report" | "health" | "feeding" | "weight";
  color: CategoryColor;
  horseName: string;
  description: string;
  time: string;
}

const HorsesIcon = (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
    />
  </svg>
);

const ShieldIcon = (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
    />
  </svg>
);

const DollarIcon = (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const TrophyIcon = (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m6 0v-3.75m-6.75-3.75h13.5M9 12.75l-2.25-2.25M15 12.75l2.25-2.25M8.25 7.5l1.5-1.5m4.5 1.5l-1.5-1.5"
    />
  </svg>
);

const ChartIcon = (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
    />
  </svg>
);

const BellIcon = (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
    />
  </svg>
);

const ReportIcon = (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
    />
  </svg>
);

const RunIcon = (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 5.25a8.983 8.983 0 013.361-6.087L19.5 9M9 12l2 2 4-4m-6.75 6.75l3-3 1.5 1.5"
    />
  </svg>
);

interface QuickAccess {
  id: string;
  title: string;
  value: string;
  color: CategoryColor;
  href: string;
  icon: ReactNode;
}

export default function OwnerDashboard() {
  const [horses, setHorses] = useState<Horse[]>([]);
  const [updates, setUpdates] = useState<RecentUpdate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [quickAccess, setQuickAccess] = useState<QuickAccess[]>([]);

  useEffect(() => {
    setTimeout(() => {
      setHorses([
        { id: "1", name: "Golden Gallop", status: "active", sharePercent: 25, color: "yellow", updatedAt: "2 hours ago" },
        { id: "2", name: "Northern Light", status: "active", sharePercent: 15, color: "purple", updatedAt: "5 hours ago" },
        { id: "3", name: "Summer Breeze", status: "retired", sharePercent: 10, color: "teal", updatedAt: "1 day ago" },
        { id: "4", name: "Thunder Hoof", status: "active", sharePercent: 30, color: "pink", updatedAt: "2 days ago" },
      ]);
      setUpdates([
        { id: "1", type: "report", color: "yellow", horseName: "Golden Gallop", description: "Q2 2026 Report published", time: "2 hours ago" },
        { id: "2", type: "health", color: "pink", horseName: "Northern Light", description: "Health check completed", time: "5 hours ago" },
        { id: "3", type: "feeding", color: "green", horseName: "Summer Breeze", description: "Feeding schedule updated", time: "1 day ago" },
      ]);
      setQuickAccess([
        { id: "1", title: "My Horses", value: "4", color: "yellow", href: "/horses", icon: HorsesIcon },
        { id: "2", title: "Ownership", value: "80%", color: "purple", href: "/ownership", icon: ShieldIcon },
        { id: "3", title: "Reports", value: "3", color: "teal", href: "/reports", icon: ReportIcon },
        { id: "4", title: "Earnings", value: "$4.2k", color: "green", href: "/reports", icon: DollarIcon },
      ]);
      setIsLoading(false);
    }, 500);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background-primary pb-20">
        <TopBar title="Dashboard" />
        <div className="p-5 space-y-5">
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
        <SectionTitle title="Quick Access" />
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

        {/* Progress rings */}
        <SectionTitle title="Performance" />
        <Card className="p-5">
          <div className="grid grid-cols-3 gap-2">
            <ProgressRing
              color="green"
              progress={72}
              value="72%"
              unit="Health"
              label="Health Score"
              size={88}
            />
            <ProgressRing
              color="purple"
              progress={85}
              value="85%"
              unit="Engagement"
              label="Activity"
              size={88}
            />
            <ProgressRing
              color="pink"
              progress={60}
              value="60%"
              unit="Goals"
              label="Races"
              size={88}
            />
          </div>
        </Card>

        {/* Quick links (icons row) */}
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
          <Link href="/reports">
            <Card className="p-3 text-center hover:shadow-elevated transition-shadow">
              <CategoryIcon color="teal" size="md">
                {ReportIcon}
              </CategoryIcon>
              <p className="text-xs font-medium text-text-primary mt-2">Reports</p>
            </Card>
          </Link>
          <Link href="/ownership">
            <Card className="p-3 text-center hover:shadow-elevated transition-shadow">
              <CategoryIcon color="purple" size="md">
                {ShieldIcon}
              </CategoryIcon>
              <p className="text-xs font-medium text-text-primary mt-2">Ownership</p>
            </Card>
          </Link>
          <Link href="/notifications">
            <Card className="p-3 text-center hover:shadow-elevated transition-shadow">
              <div className="relative inline-block">
                <CategoryIcon color="pink" size="md">
                  {BellIcon}
                </CategoryIcon>
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-white text-xs rounded-full flex items-center justify-center">
                  2
                </span>
              </div>
              <p className="text-xs font-medium text-text-primary mt-2">Alerts</p>
            </Card>
          </Link>
        </div>

        {/* Today Target / Upcoming race callout */}
        <SectionTitle title="Up Next" />
        <Card className="p-5 bg-[#FFF4D6] border-0">
          <div className="flex items-center gap-4">
            <div className="flex-shrink-0 w-20 h-20 rounded-full bg-[#FFE0AC] flex items-center justify-center">
              <div className="w-12 h-12 text-[#C7870A]">{TrophyIcon}</div>
            </div>
            <div className="flex-1">
              <p className="text-xs uppercase tracking-wide font-semibold text-[#9A6708]">
                Next Race
              </p>
              <p className="mt-1 text-base font-semibold text-[#3B2708]">
                Aotearoa Cup
              </p>
              <p className="mt-0.5 text-xs text-[#6F4A06]">
                Mar 28 · 4 horses entered
              </p>
              <Link href="/horses/1">
                <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-[#8B5A07] hover:text-[#6B4506]">
                  Track now
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                </span>
              </Link>
            </div>
          </div>
        </Card>

        {/* Recent Updates */}
        <Card className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold text-text-primary">Recent Updates</h3>
            <Link href="/reports" className="text-xs font-medium text-text-secondary hover:text-primary">
              View All
            </Link>
          </div>
          <div className="space-y-4">
            {updates.map((update) => (
              <div key={update.id} className="flex items-center gap-3">
                <CategoryIcon color={update.color} size="sm">
                  {update.type === "report" && ReportIcon}
                  {update.type === "health" && HorsesIcon}
                  {update.type === "feeding" && ChartIcon}
                  {update.type === "weight" && DollarIcon}
                </CategoryIcon>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-text-primary truncate">
                    {update.description}
                  </p>
                  <p className="text-xs text-text-muted mt-0.5">{update.horseName}</p>
                </div>
                <span className="text-xs text-text-muted flex-shrink-0">{update.time}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Horse List */}
        <SectionTitle
          title="My Horses"
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
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium text-text-primary truncate">{horse.name}</h4>
                      <Badge variant="success">Active</Badge>
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
        </div>
      </div>
    </div>
  );
}
