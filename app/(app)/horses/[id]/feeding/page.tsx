"use client";

import { useEffect, useState } from "react";
import { PageHeader, Card, Badge } from "@/components/ui";

interface FeedingLog {
  id: string;
  date: string;
  time: string;
  feedType: string;
  amount: number;
  unit: string;
  notes: string;
}

const mockFeedingLogs: FeedingLog[] = [
  { id: "1", date: "2026-07-03", time: "08:00", feedType: "Concentrate", amount: 4, unit: "kg", notes: "Morning" },
  { id: "2", date: "2026-07-03", time: "18:00", feedType: "Concentrate", amount: 4, unit: "kg", notes: "Evening" },
  { id: "3", date: "2026-07-02", time: "08:00", feedType: "Concentrate", amount: 4, unit: "kg", notes: "" },
  { id: "4", date: "2026-07-02", time: "18:00", feedType: "Concentrate", amount: 4, unit: "kg", notes: "" },
];

export default function HorseFeedingPage({ params }: { params: { id: string } }) {
  const [logs, setLogs] = useState<FeedingLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLogs(mockFeedingLogs);
      setIsLoading(false);
    }, 300);
  }, [params.id]);

  const groupedLogs = logs.reduce((acc, log) => {
    if (!acc[log.date]) acc[log.date] = [];
    acc[log.date].push(log);
    return acc;
  }, {} as Record<string, FeedingLog[]>);

  return (
    <div className="min-h-screen bg-background-primary">
      <PageHeader
        title="Feeding Records"
        backHref={`/horses/${params.id}`}
      />

      <div className="p-4 space-y-4">
        {isLoading ? (
          Array.from({ length: 2 }).map((_, i) => (
            <Card key={i} className="animate-pulse">
              <div className="space-y-2">
                <div className="h-4 w-24 rounded bg-background-primary" />
                <div className="h-3 w-full rounded bg-background-primary" />
              </div>
            </Card>
          ))
        ) : (
          Object.entries(groupedLogs).map(([date, dateLogs]) => (
            <div key={date} className="space-y-4">
              <h3 className="text-sm font-semibold text-text-primary">
                {date === "2026-07-03" ? "Today" : date === "2026-07-02" ? "Yesterday" : date}
              </h3>
              <div className="space-y-3">
              {dateLogs.map((log) => (
                <Card key={log.id}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary-soft flex items-center justify-center">
                        <span className="text-xs font-medium text-primary">{log.time}</span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-text-primary">{log.feedType}</span>
                          <Badge variant="primary" size="sm">{log.notes || "No notes"}</Badge>
                        </div>
                        <p className="text-xs text-text-muted">{log.measuredBy || ""}</p>
                      </div>
                    </div>
                    <p className="text-lg font-bold text-text-primary">{log.amount} <span className="text-sm font-normal text-text-muted">{log.unit}</span></p>
                  </div>
                </Card>
              ))}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
