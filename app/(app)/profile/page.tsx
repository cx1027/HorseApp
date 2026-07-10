"use client";

import { useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import { useUserRole } from "@/hooks/useUserRole";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Avatar from "@/components/ui/Avatar";
import {
  CategoryIcon,
  ProgressRing,
  SectionTitle,
  TopBar,
  type CategoryColor,
} from "@/components/dashboard/shared/Theme";

interface Horse {
  id: string;
  name: string;
  sharePercent: number;
  status: string;
  color: CategoryColor;
  nextRace?: string;
  updatedAt: string;
}

const HorsesIcon = (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
  </svg>
);

const EditIcon = (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
  </svg>
);

const ReportIcon = (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
  </svg>
);

const DocumentIcon = (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
  </svg>
);

const BellIcon = (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
  </svg>
);

const SettingsIcon = (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const DollarIcon = (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

interface QuickAccessItem {
  id: string;
  title: string;
  value: string;
  color: CategoryColor;
  icon: ReactNode;
  href: string;
}

export default function ProfilePage() {
  const { role, isLoading: roleLoading } = useUserRole();
  const [horses, setHorses] = useState<Horse[]>([]);
  const [stats, setStats] = useState({
    horsesOwned: 0,
    totalShare: 0,
    monthlyEarnings: 0,
  });
  const [quickAccess, setQuickAccess] = useState<QuickAccessItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      const mockHorses: Horse[] = [
        { id: "1", name: "Golden Gallop", sharePercent: 25, status: "active", color: "yellow", nextRace: "Mar 28 - Aotearoa Cup", updatedAt: "2 hours ago" },
        { id: "3", name: "Summer Breeze", sharePercent: 10, status: "retired", color: "teal", updatedAt: "1 day ago" },
        { id: "5", name: "Midnight Star", sharePercent: 15, status: "active", color: "purple", nextRace: "Apr 5 - Breeding Stakes", updatedAt: "3 days ago" },
      ];
      setHorses(mockHorses);
      setStats({
        horsesOwned: mockHorses.length,
        totalShare: mockHorses.reduce((acc, h) => acc + h.sharePercent, 0),
        monthlyEarnings: 4250,
      });
      setQuickAccess([
        { id: "1", title: "Horses", value: "3", color: "yellow", icon: <HorsesIcon />, href: "/horses" },
        { id: "2", title: "Share", value: "50%", color: "purple", icon: <ReportIcon />, href: "/ownership" },
        { id: "3", title: "This Month", value: "$4.2k", color: "green", icon: <DollarIcon />, href: "/reports" },
        { id: "4", title: "Reports", value: "5", color: "teal", icon: <ReportIcon />, href: "/reports" },
      ]);
      setIsLoading(false);
    }, 400);
  }, []);

  if (roleLoading || isLoading) {
    return (
      <div className="min-h-screen bg-background-primary pb-20">
        <TopBar title="Profile" />
        <div className="px-5 pt-2 space-y-6">
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
      <TopBar title="Profile" />

      <div className="px-5 pt-2 space-y-6">
        {/* Profile header */}
        <Card className="p-5">
          <div className="flex items-center gap-4">
            <Avatar size="lg" fallback="JS" className="h-16 w-16 text-xl" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h2 className="text-base font-semibold text-text-primary truncate">
                  John Smith
                </h2>
                <Badge variant="success">Verified</Badge>
              </div>
              <p className="mt-1 text-sm text-text-secondary truncate">
                john.smith@email.com
              </p>
              <div className="mt-2 flex items-center gap-2">
                <Badge variant="primary">Owner</Badge>
                <span className="text-xs text-text-muted">· Member since 2024</span>
              </div>
            </div>
            <Link
              href="/settings"
              className="w-10 h-10 rounded-full bg-background-primary border border-border flex items-center justify-center hover:bg-background-secondary transition-colors flex-shrink-0"
              aria-label="Edit profile"
            >
              <div className="w-5 h-5 text-text-secondary">{EditIcon}</div>
            </Link>
          </div>
        </Card>

        {/* Stats grid */}
        <SectionTitle title="Portfolio" />
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
        <SectionTitle title="Performance" />
        <Card className="p-5">
          <div className="grid grid-cols-3 gap-2">
            <ProgressRing
              color="green"
              progress={72}
              value="72%"
              unit="Health"
              label="Avg"
              size={88}
            />
            <ProgressRing
              color="purple"
              progress={85}
              value="85%"
              unit="Races"
              label="Win"
              size={88}
            />
            <ProgressRing
              color="yellow"
              progress={60}
              value="60%"
              unit="Goals"
              label="Met"
              size={88}
            />
          </div>
        </Card>

        {/* Quick links */}
        <SectionTitle title="Quick Links" />
        <div className="grid grid-cols-4 gap-3">
          <Link href="/horses">
            <Card className="p-3 text-center hover:shadow-elevated transition-shadow">
              <CategoryIcon color="yellow" size="md">
                <HorsesIcon />
              </CategoryIcon>
              <p className="text-xs font-medium text-text-primary mt-2">Horses</p>
            </Card>
          </Link>
          <Link href="/reports">
            <Card className="p-3 text-center hover:shadow-elevated transition-shadow">
              <CategoryIcon color="teal" size="md">
                <ReportIcon />
              </CategoryIcon>
              <p className="text-xs font-medium text-text-primary mt-2">Reports</p>
            </Card>
          </Link>
          <Link href="/documents">
            <Card className="p-3 text-center hover:shadow-elevated transition-shadow">
              <CategoryIcon color="purple" size="md">
                <DocumentIcon />
              </CategoryIcon>
              <p className="text-xs font-medium text-text-primary mt-2">Documents</p>
            </Card>
          </Link>
          <Link href="/notifications">
            <Card className="p-3 text-center hover:shadow-elevated transition-shadow">
              <div className="relative inline-block">
                <CategoryIcon color="pink" size="md">
                  <BellIcon />
                </CategoryIcon>
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-white text-xs rounded-full flex items-center justify-center">
                  3
                </span>
              </div>
              <p className="text-xs font-medium text-text-primary mt-2">Alerts</p>
            </Card>
          </Link>
        </div>

        {/* Achievement callout */}
        <SectionTitle title="Achievement" />
        <Card className="p-5 bg-[#DDF2D6] border-0">
          <div className="flex items-center gap-4">
            <div className="flex-shrink-0 w-20 h-20 rounded-full bg-[#A8DC95] flex items-center justify-center">
              <div className="w-12 h-12 text-[#2C8A38]">
                {DollarIcon}
              </div>
            </div>
            <div className="flex-1">
              <p className="text-xs uppercase tracking-wide font-semibold text-[#1A6423]">
                This Month's Earnings
              </p>
              <p className="mt-1 text-base font-semibold text-[#0A3411]">
                $4,250 earned
              </p>
              <p className="mt-0.5 text-xs text-[#26702E]">
                Up 12% from last month
              </p>
            </div>
          </div>
        </Card>

        {/* My Horses */}
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
                    <HorsesIcon />
                  </CategoryIcon>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium text-text-primary truncate">{horse.name}</h4>
                      <Badge variant="success">Active</Badge>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="primary">{horse.sharePercent}%</Badge>
                      <span className="text-xs text-text-muted truncate">
                        {horse.nextRace || `Updated ${horse.updatedAt}`}
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
