"use client";

import { useEffect, useState } from "react";
import { PageHeader, Card, Badge, Button } from "@/components/ui";

interface Report {
  id: string;
  title: string;
  type: string;
  periodStart: string;
  periodEnd: string;
  status: string;
  publishedAt: string;
  horses: number;
  summary: string;
  sections: { title: string; content: string }[];
}

const mockReport: Report = {
  id: "1",
  title: "Q2 2026 Investment Report",
  type: "Quarterly",
  periodStart: "2026-04-01",
  periodEnd: "2026-06-30",
  status: "published",
  publishedAt: "2026-06-30",
  horses: 3,
  summary: "All horses performed exceptionally well this quarter. Golden Gallop continued its winning streak with 2 race victories. Northern Light completed its 12-week rehabilitation program and returned to training. Summer Breeze focused on breeding preparation this quarter.",
  sections: [
    {
      title: "Performance Highlights",
      content: "• Golden Gallop: 3 starts, 2 wins, £105,000 in prize money\n• Northern Light: Completed 12-week rehab program\n• Summer Breeze: Successful breeding cycle, 2 confirmed pregnancies",
    },
    {
      title: "Financial Summary",
      content: "Total prize earnings: £105,000\nTraining costs: £45,000\nVeterinary expenses: £12,000\nNet return: £48,000\nROI: +8.5%",
    },
    {
      title: "Upcoming Events",
      content: "• Jul 15: Golden Gallop - Summer Sprint Championship\n• Aug 1: Northern Light - Return to racing\n• Aug 20: Confirm stud bookings",
    },
  ],
};

export default function ReportDetailPage({ params }: { params: { id: string } }) {
  const [report, setReport] = useState<Report | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setReport(mockReport);
      setIsLoading(false);
    }, 300);
  }, [params.id]);

  return (
    <div className="min-h-screen bg-background-primary">
      <PageHeader
        title="Report Details"
        backHref="/reports"
      />

      <div className="p-4 space-y-4">
        {isLoading ? (
          <Card className="animate-pulse">
            <div className="space-y-4">
              <div className="h-6 w-48 rounded bg-background-primary" />
              <div className="h-4 w-full rounded bg-background-primary" />
            </div>
          </Card>
        ) : report ? (
          <>
            {/* Report Header */}
            <Card padding="lg">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h1 className="text-xl font-bold text-text-primary">{report.title}</h1>
                    <Badge variant="success">Published</Badge>
                  </div>
                  <p className="mt-2 text-sm text-text-secondary">
                    {report.periodStart} - {report.periodEnd} · {report.horses} horses
                  </p>
                </div>
              </div>
              <p className="text-xs text-text-muted">Published {report.publishedAt}</p>
            </Card>

            {/* Executive Summary */}
            <Card>
              <h2 className="font-semibold text-text-primary mb-3">Executive Summary</h2>
              <p className="text-sm text-text-secondary leading-relaxed">{report.summary}</p>
            </Card>

            {/* Report Sections */}
            {report.sections.map((section, index) => (
              <Card key={index}>
                <h2 className="font-semibold text-text-primary mb-3">{section.title}</h2>
                <div className="space-y-1">
                  {section.content.split("\n").map((line, lineIndex) => (
                    <p key={lineIndex} className="text-sm text-text-secondary whitespace-pre-line">
                      {line}
                    </p>
                  ))}
                </div>
              </Card>
            ))}

            {/* Actions */}
            <div className="flex gap-3">
              <Button variant="primary" className="flex-1">
                <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                </svg>
                Download PDF
              </Button>
              <Button variant="secondary" className="flex-1">
                <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
                </svg>
                Share Report
              </Button>
            </div>
          </>
        ) : (
          <Card className="text-center py-12">
            <p className="text-text-secondary">Report not found</p>
          </Card>
        )}
      </div>
    </div>
  );
}
