"use client";

import { useEffect, useState } from "react";
import { PageHeader, Card } from "@/components/ui";

interface WeightLog {
  id: string;
  date: string;
  weightKg: number;
  measuredBy: string;
  notes: string;
}

const mockWeightLogs: WeightLog[] = [
  { id: "1", date: "2026-07-01", weightKg: 520, measuredBy: "Stable Manager", notes: "Post-training weight" },
  { id: "2", date: "2026-06-15", weightKg: 515, measuredBy: "Stable Manager", notes: "" },
  { id: "3", date: "2026-06-01", weightKg: 518, measuredBy: "Stable Manager", notes: "Pre-race weight" },
  { id: "4", date: "2026-05-15", weightKg: 522, measuredBy: "Stable Manager", notes: "" },
];

export default function HorseWeightPage({ params }: { params: { id: string } }) {
  const [logs, setLogs] = useState<WeightLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLogs(mockWeightLogs);
      setIsLoading(false);
    }, 300);
  }, [params.id]);

  const latestWeight = logs[0]?.weightKg || 0;
  const previousWeight = logs[1]?.weightKg || 0;
  const weightChange = latestWeight - previousWeight;

  return (
    <div className="min-h-screen bg-background-primary">
      <PageHeader
        title="Weight Data"
        backHref={`/horses/${params.id}`}
      />

      <div className="p-5 space-y-5">
        {/* Current Weight Card */}
        <Card padding="lg" className="text-center">
          <p className="text-sm text-text-secondary">Current Weight</p>
          <p className="mt-3 text-5xl font-medium text-text-primary">{latestWeight}</p>
          <p className="text-sm text-text-muted">kg</p>
          {weightChange !== 0 && (
            <p className={`mt-3 text-sm ${weightChange < 0 ? "text-green-500" : "text-primary"}`}>
              {weightChange > 0 ? "+" : ""}{weightChange} kg vs last
            </p>
          )}
        </Card>

        {/* Weight History */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-text-primary">History</h3>
          {isLoading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <Card key={i} className="animate-pulse">
                <div className="space-y-2">
                  <div className="h-4 w-24 rounded bg-background-primary" />
                  <div className="h-3 w-32 rounded bg-background-primary" />
                </div>
              </Card>
            ))
          ) : (
            logs.map((log) => (
              <Card key={log.id}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-text-primary">{log.date}</p>
                    <p className="text-xs text-text-muted">By: {log.measuredBy}</p>
                    {log.notes && <p className="mt-1 text-xs text-text-secondary">{log.notes}</p>}
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-medium text-text-primary">{log.weightKg} <span className="text-sm font-normal text-text-muted">kg</span></p>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
