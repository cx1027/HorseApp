"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { PageHeader, Card, Badge, Avatar } from "@/components/ui";

interface OwnershipItem {
  id: string;
  horseId: string;
  horseName: string;
  sharePercent: number;
  shareClass: string;
  startDate: string;
  owners: { id: string; name: string; share: number }[];
}

const mockOwnership: OwnershipItem[] = [
  {
    id: "1",
    horseId: "1",
    horseName: "Golden Gallop",
    sharePercent: 25,
    shareClass: "Racing",
    startDate: "2024-01-15",
    owners: [
      { id: "1", name: "John Smith", share: 25 },
      { id: "2", name: "Jane Doe", share: 25 },
      { id: "3", name: "Robert Johnson", share: 25 },
      { id: "4", name: "You", share: 25 },
    ],
  },
  {
    id: "2",
    horseId: "3",
    horseName: "Summer Breeze",
    sharePercent: 10,
    shareClass: "Breeding",
    startDate: "2025-03-20",
    owners: [
      { id: "1", name: "You", share: 10 },
      { id: "5", name: "Sarah Brown", share: 40 },
    ],
  },
];

export default function OwnershipPage() {
  const [ownership, setOwnership] = useState<OwnershipItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setOwnership(mockOwnership);
      setIsLoading(false);
    }, 300);
  }, []);

  const totalValue = ownership.reduce((acc, item) => acc + item.sharePercent, 0);

  return (
    <div className="min-h-screen bg-background-primary">
      <PageHeader
        title="My Ownership"
        subtitle={`${ownership.length} horses · ${totalValue}% total share`}
      />

      <div className="p-5 space-y-4">
        {/* Summary Card */}
        <Card padding="lg" className="text-center bg-primary-soft">
          <p className="text-sm text-text-secondary">Total Ownership</p>
          <p className="mt-3 text-5xl font-medium text-primary">{totalValue}%</p>
        </Card>

        {isLoading ? (
          Array.from({ length: 2 }).map((_, i) => (
            <Card key={i} className="animate-pulse">
              <div className="space-y-3">
                <div className="h-5 w-32 rounded bg-background-primary" />
                <div className="h-4 w-48 rounded bg-background-primary" />
              </div>
            </Card>
          ))
        ) : ownership.length === 0 ? (
          <Card className="text-center py-20">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-primary-soft">
              <svg className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-text-primary">No ownership yet</h3>
            <p className="mt-2 text-sm text-text-secondary">You don&apos;t have any horse shares yet</p>
          </Card>
        ) : (
          <div className="space-y-4">
            {ownership.map((item) => (
              <Link key={item.id} href={`/ownership/${item.horseId}`}>
                <Card className="transition-all hover:shadow-elevated">
                  <div className="flex items-center gap-4">
                    <Avatar size="lg" fallback={item.horseName} className="h-16 w-16 text-lg" />
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <h3 className="font-medium text-text-primary">{item.horseName}</h3>
                        <Badge variant="primary">{item.shareClass}</Badge>
                      </div>
                      <p className="mt-2 text-sm text-text-secondary">
                        {item.sharePercent}% share · Since {item.startDate}
                      </p>
                      <div className="mt-3 flex items-center gap-3">
                        <span className="text-xs text-text-muted">{item.owners.length} owners</span>
                        <div className="flex -space-x-2">
                          {item.owners.slice(0, 3).map((owner) => (
                            <Avatar key={owner.id} size="sm" fallback={owner.name} className="ring-2 ring-surface" />
                          ))}
                        </div>
                      </div>
                    </div>
                    <svg className="h-5 w-5 text-text-muted flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
