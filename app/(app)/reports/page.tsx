"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { PageHeader, Card, Badge } from "@/components/ui";

interface Report {
  id: string;
  title: string;
  type: string;
  periodStart: string;
  periodEnd: string;
  status: "draft" | "published";
  publishedAt: string;
  horses: number;
  summary: string;
}

const mockReports: Report[] = [
  {
    id: "1",
    title: "Q2 2026 Investment Report",
    type: "Quarterly",
    periodStart: "2026-04-01",
    periodEnd: "2026-06-30",
    status: "published",
    publishedAt: "2026-06-30",
    horses: 3,
    summary: "All horses performed well this quarter. Golden Gallop won 2 races this season.",
  },
  {
    id: "2",
    title: "Q1 2026 Investment Report",
    type: "Quarterly",
    periodStart: "2026-01-01",
    periodEnd: "2026-03-31",
    status: "published",
    publishedAt: "2026-03-31",
    horses: 3,
    summary: "Great start to the year. Pre-season training completed successfully.",
  },
  {
    id: "3",
    title: "2026 Mid-Year Forecast",
    type: "Forecast",
    periodStart: "2026-07-01",
    periodEnd: "2026-12-31",
    status: "draft",
    publishedAt: "",
    horses: 3,
    summary: "Forecast draft including race schedule and expected performance.",
  },
];

export default function ReportsPage() {
  const [reports, setReports] = useState<Report[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "published" | "draft">("all");

  useEffect(() => {
    setTimeout(() => {
      setReports(mockReports);
      setIsLoading(false);
    }, 300);
  }, []);

  const filteredReports = reports.filter((report) => {
    if (filter === "all") return true;
    return report.status === filter;
  });

  return (
    <div className="min-h-screen bg-background-primary">
      <PageHeader
        title="Reports"
        subtitle={`${reports.length} reports`}
      />

      <div className="p-5 space-y-5">
        {/* Filter Tabs */}
        <div className="flex gap-3 overflow-x-auto pb-2">
          {(["all", "published", "draft"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                filter === tab
                  ? "bg-primary text-white shadow-button"
                  : "bg-surface text-text-secondary hover:bg-background-primary"
              }`}
            >
              {tab === "all" ? "All" : tab === "published" ? "Published" : "Draft"}
            </button>
          ))}
        </div>

        {isLoading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <Card key={i} className="animate-pulse">
              <div className="space-y-3">
                <div className="h-5 w-48 rounded bg-background-primary" />
                <div className="h-4 w-32 rounded bg-background-primary" />
              </div>
            </Card>
          ))
        ) : filteredReports.length === 0 ? (
          <Card className="text-center py-16">
            <p className="text-text-secondary">No reports found</p>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredReports.map((report) => (
              <Link key={report.id} href={`/reports/${report.id}`} className="block">
                <Card className="transition-all hover:shadow-elevated">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-3 flex-wrap">
                        <h3 className="font-medium text-text-primary">{report.title}</h3>
                        <Badge variant={report.status === "published" ? "success" : "warning"}>
                          {report.status === "published" ? "Published" : "Draft"}
                        </Badge>
                      </div>
                      <p className="mt-2 text-sm text-text-secondary">
                        {report.periodStart} - {report.periodEnd} · {report.horses} horses
                      </p>
                    </div>
                    <svg className="h-5 w-5 text-text-muted flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                  </div>
                  {report.summary && (
                    <p className="text-sm text-text-secondary leading-relaxed line-clamp-2">{report.summary}</p>
                  )}
                  {report.publishedAt && (
                    <p className="mt-3 text-xs text-text-muted">Published {report.publishedAt}</p>
                  )}
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
