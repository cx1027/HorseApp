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

interface Report {
  id: string;
  title: string;
  period: string;
  status: "published" | "draft";
  color: CategoryColor;
  publishedAt: string;
  horses: number;
}

interface PortfolioSummary {
  totalHorses: number;
  totalInvestment: string;
  avgReturn: string;
  monthlyGrowth: string;
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

const DollarIcon = (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const TrendIcon = (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
  </svg>
);

const ReportIcon = (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
  </svg>
);

const DocumentIcon = (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 0V5.25A2.25 2.25 0 0010.5 3h6a2.25 2.25 0 002.25 2.25v15a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 18.75V9m0 0h12" />
  </svg>
);

const BellIcon = (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
  </svg>
);

const TrophyIcon = (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m6 0v-3.75m-6.75-3.75h13.5M9 12.75l-2.25-2.25M15 12.75l2.25-2.25M8.25 7.5l1.5-1.5m4.5 1.5l-1.5-1.5" />
  </svg>
);

export default function InvestorDashboard() {
  const [portfolio, setPortfolio] = useState<PortfolioSummary>({
    totalHorses: 0,
    totalInvestment: "$0",
    avgReturn: "0%",
    monthlyGrowth: "0%",
  });
  const [reports, setReports] = useState<Report[]>([]);
  const [quickAccess, setQuickAccess] = useState<QuickAccess[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setPortfolio({
        totalHorses: 3,
        totalInvestment: "$150k",
        avgReturn: "+12.5%",
        monthlyGrowth: "+2.3%",
      });
      setReports([
        { id: "1", title: "Q2 2026 Investment Report", period: "Apr - Jun 2026", status: "published", color: "yellow", publishedAt: "Jun 30, 2026", horses: 3 },
        { id: "2", title: "Q1 2026 Investment Report", period: "Jan - Mar 2026", status: "published", color: "teal", publishedAt: "Mar 31, 2026", horses: 3 },
        { id: "3", title: "2026 Mid-Year Forecast", period: "Jul - Dec 2026", status: "draft", color: "pink", publishedAt: "", horses: 3 },
      ]);
      setQuickAccess([
        { id: "1", title: "Portfolio", value: "3 horses", color: "yellow", href: "/horses", icon: HorsesIcon },
        { id: "2", title: "Invested", value: "$150k", color: "green", href: "/horses", icon: DollarIcon },
        { id: "3", title: "Avg Return", value: "+12.5%", color: "purple", href: "/horses", icon: TrendIcon },
        { id: "4", title: "Reports", value: "5", color: "teal", href: "/reports", icon: ReportIcon },
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
        {/* Quick Access Grid */}
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
              progress={12}
              value="+12%"
              unit="YoY"
              label="Returns"
              size={88}
            />
            <ProgressRing
              color="purple"
              progress={75}
              value="75%"
              unit="of goal"
              label="Growth"
              size={88}
            />
            <ProgressRing
              color="teal"
              progress={92}
              value="92%"
              unit="paid up"
              label="Capital"
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
              <CategoryIcon color="purple" size="md">
                {DocumentIcon}
              </CategoryIcon>
              <p className="text-xs font-medium text-text-primary mt-2">Documents</p>
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

        {/* Goal Callout */}
        <SectionTitle title="You're On Track" />
        <Card className="p-5 bg-[#EDE4FF] border-0">
          <div className="flex items-center gap-4">
            <div className="flex-shrink-0 w-20 h-20 rounded-full bg-[#D4C2FF] flex items-center justify-center">
              <div className="w-12 h-12 text-[#8A3FFC]">
                {TrophyIcon}
              </div>
            </div>
            <div className="flex-1">
              <p className="text-xs uppercase tracking-wide font-semibold text-[#4E1FAA]">
                Annual Target
              </p>
              <p className="mt-1 text-base font-semibold text-[#2C0F5C]">
                75% of goal reached
              </p>
              <p className="mt-0.5 text-xs text-[#5C2EBE]">
                {portfolio.monthlyGrowth} growth this month
              </p>
            </div>
          </div>
        </Card>

        {/* Latest Reports */}
        <SectionTitle
          title="Latest Reports"
          action={
            <Link href="/reports" className="text-xs font-medium text-primary">
              View All
            </Link>
          }
        />
        <div className="space-y-3">
          {reports.map((report) => (
            <Link key={report.id} href={`/reports/${report.id}`}>
              <Card className="p-4 transition-all hover:shadow-elevated">
                <div className="flex items-center gap-3">
                  <CategoryIcon color={report.color} size="md">
                    {ReportIcon}
                  </CategoryIcon>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-text-primary truncate">{report.title}</p>
                    <p className="text-xs text-text-muted mt-0.5">
                      {report.period} · {report.horses} horses
                    </p>
                  </div>
                  <Badge variant={report.status === "published" ? "success" : "default"}>
                    {report.status === "published" ? "Published" : "Draft"}
                  </Badge>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
