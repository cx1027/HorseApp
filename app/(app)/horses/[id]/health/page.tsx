"use client";

import { useEffect, useState } from "react";
import { PageHeader, Card, Badge } from "@/components/ui";

interface HealthRecord {
  id: string;
  type: string;
  date: string;
  vet: string;
  findings: string;
  notes: string;
}

const mockHealthRecords: HealthRecord[] = [
  { id: "1", type: "checkup", date: "2026-06-15", vet: "Dr. Sarah Smith", findings: "All vitals normal", notes: "Pre-race checkup completed" },
  { id: "2", type: "vaccination", date: "2026-04-20", vet: "Dr. Sarah Smith", findings: "Vaccinations up to date", notes: "Annual vaccination completed" },
  { id: "3", type: "dental", date: "2026-03-10", vet: "Dr. James Wilson", findings: "Teeth floated", notes: "Routine dental maintenance" },
];

const typeLabels: Record<string, string> = {
  vet_checkup: "Vet Checkup",
  vaccination: "Vaccination",
  dental: "Dental",
  injury: "Injury",
  illness: "Illness",
  checkup: "Checkup",
  other: "Other",
};

export default function HorseHealthPage({ params }: { params: { id: string } }) {
  const [records, setRecords] = useState<HealthRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setRecords(mockHealthRecords);
      setIsLoading(false);
    }, 300);
  }, [params.id]);

  return (
    <div className="min-h-screen bg-background-primary">
      <PageHeader
        title="Health Records"
        backHref={`/horses/${params.id}`}
      />

      <div className="p-5 space-y-4">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <Card key={i} className="animate-pulse">
              <div className="space-y-3">
                <div className="h-4 w-24 rounded bg-background-primary" />
                <div className="h-3 w-full rounded bg-background-primary" />
              </div>
            </Card>
          ))
        ) : records.length === 0 ? (
          <Card className="text-center py-20">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-primary-soft">
              <svg className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-text-primary">No health records</h3>
            <p className="mt-2 text-sm text-text-secondary">Add your first health record</p>
          </Card>
        ) : (
          records.map((record) => (
            <Card key={record.id}>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <Badge variant="primary" size="md">
                    {typeLabels[record.type] || record.type}
                  </Badge>
                  <p className="mt-2 text-sm text-text-secondary">{record.date}</p>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-text-muted">Veterinarian</p>
                  <p className="text-sm text-text-primary">{record.vet}</p>
                </div>
                <div>
                  <p className="text-xs text-text-muted">Findings</p>
                  <p className="text-sm text-text-primary">{record.findings}</p>
                </div>
                {record.notes && (
                  <div>
                    <p className="text-xs text-text-muted">Notes</p>
                    <p className="text-sm text-text-secondary">{record.notes}</p>
                  </div>
                )}
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
