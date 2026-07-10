"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import ActivityList from "./shared/ActivityList";

interface Report {
  id: string;
  title: string;
  period: string;
  status: "published" | "draft";
  publishedAt: string;
  horses: number;
}

interface PortfolioSummary {
  totalHorses: number;
  totalInvestment: string;
  avgReturn: string;
}

interface RecentUpdate {
  id: string;
  type: "report" | "investment" | "alert";
  horseName: string;
  description: string;
  time: string;
}

export default function InvestorDashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [portfolio, setPortfolio] = useState<PortfolioSummary>({
    totalHorses: 0,
    totalInvestment: "$0",
    avgReturn: "0%",
  });
  const [reports, setReports] = useState<Report[]>([]);
  const [updates, setUpdates] = useState<RecentUpdate[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setPortfolio({
        totalHorses: 3,
        totalInvestment: "$150,000",
        avgReturn: "+12.5%",
      });
      setReports([
        { id: "1", title: "Q2 2026 Investment Report", period: "Apr - Jun 2026", status: "published", publishedAt: "Jun 30, 2026", horses: 3 },
        { id: "2", title: "Q1 2026 Investment Report", period: "Jan - Mar 2026", status: "published", publishedAt: "Mar 31, 2026", horses: 3 },
        { id: "3", title: "2026 Mid-Year Forecast", period: "Jul - Dec 2026", status: "draft", publishedAt: "", horses: 3 },
      ]);
      setUpdates([
        { id: "1", type: "report", horseName: "Golden Gallop", description: "Q2 Report published", time: "2 hours ago" },
        { id: "2", type: "investment", horseName: "Portfolio", description: "Investment updated", time: "1 day ago" },
        { id: "3", type: "alert", horseName: "Northern Light", description: "New notification received", time: "3 days ago" },
      ]);
      setIsLoading(false);
    }, 500);
  }, []);

  const filteredReports = reports.filter((report) =>
    report.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const HorseIcon = (
    <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 15.803a7.5 7.5 0 0010.607 10.607z" />
    </svg>
  );

  const DollarIcon = (
    <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );

  const ReturnIcon = (
    <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
    </svg>
  );

  const getUpdateIcon = (type: string) => {
    switch (type) {
      case "report":
        return (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
          </svg>
        );
      case "investment":
        return (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case "alert":
        return (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
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
              placeholder="Search reports..."
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
              {HorseIcon}
            </div>
            <p className="text-xl font-bold text-text-primary">{portfolio.totalHorses}</p>
            <p className="text-xs text-text-secondary">Horses</p>
          </Card>
          <Card className="p-4 text-center">
            <div className="inline-flex p-2 rounded-xl bg-primary-soft mb-2">
              {DollarIcon}
            </div>
            <p className="text-lg font-bold text-text-primary truncate">{portfolio.totalInvestment}</p>
            <p className="text-xs text-text-secondary">Invested</p>
          </Card>
          <Card className="p-4 text-center">
            <div className="inline-flex p-2 rounded-xl bg-green-100 mb-2">
              {ReturnIcon}
            </div>
            <p className="text-lg font-bold text-green-600">{portfolio.avgReturn}</p>
            <p className="text-xs text-text-secondary">Avg Return</p>
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
              <p className="text-xs font-medium text-text-primary">Portfolio</p>
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
            <Link href="/notifications" className="text-sm text-primary hover:text-primary-600 font-medium">
              View All
            </Link>
          </div>
          <ActivityList
            activities={updates.map((update) => ({
              id: update.id,
              icon: getUpdateIcon(update.type),
              description: `${update.description}`,
              time: update.time,
            }))}
            emptyMessage="No recent updates"
          />
        </Card>

        {/* Latest Reports */}
        <Card className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-text-primary">Latest Reports</h3>
            <Link href="/reports" className="text-sm text-primary hover:text-primary-600 font-medium">
              View All
            </Link>
          </div>
          <div className="space-y-3">
            {filteredReports.map((report) => (
              <Link key={report.id} href={`/reports/${report.id}`}>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-background-primary hover:bg-surface transition-colors">
                  <div className="p-2 rounded-lg bg-surface">
                    <svg className="w-5 h-5 text-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-text-primary truncate">{report.title}</p>
                    <p className="text-xs text-text-muted">{report.period} · {report.horses} horses</p>
                  </div>
                  <Badge variant={report.status === "published" ? "success" : "default"}>
                    {report.status === "published" ? "Published" : "Draft"}
                  </Badge>
                </div>
              </Link>
            ))}
            {filteredReports.length === 0 && (
              <div className="text-center py-4 text-text-muted">
                <p>No reports found matching "{searchQuery}"</p>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
