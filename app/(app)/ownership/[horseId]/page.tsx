"use client";

import { useEffect, useState } from "react";
import { PageHeader, Card, Badge, Avatar } from "@/components/ui";

const mockOwnershipDetail = {
  id: "1",
  horseId: "1",
  horseName: "Golden Gallop",
  totalShare: 100,
  startDate: "2024-01-15",
  shareClass: "Racing",
  owners: [
    { id: "1", name: "John Smith", share: 25, isCurrentUser: false },
    { id: "2", name: "Jane Doe", share: 25, isCurrentUser: false },
    { id: "3", name: "Robert Johnson", share: 25, isCurrentUser: false },
    { id: "4", name: "You", share: 25, isCurrentUser: true },
  ] as { id: string; name: string; share: number; isCurrentUser: boolean }[],
};

const COLORS = [
  "bg-primary",
  "bg-secondary",
  "bg-green-400",
  "bg-yellow-400",
];

export default function OwnershipDetailPage({ params }: { params: { horseId: string } }) {
  const [data, setData] = useState<typeof mockOwnershipDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setData(mockOwnershipDetail);
      setIsLoading(false);
    }, 300);
  }, [params.horseId]);

  const currentUserOwnership = data?.owners.find((o) => o.isCurrentUser);

  return (
    <div className="min-h-screen bg-background-primary">
      <PageHeader
        title="Ownership Details"
        backHref="/ownership"
      />

      <div className="p-4 space-y-4">
        {/* Horse Info */}
        <Card padding="lg">
          <div className="flex items-center gap-4">
            <Avatar size="xl" fallback={data?.horseName || "?"} className="h-20 w-20 text-2xl" />
            <div>
              <h2 className="text-xl font-bold text-text-primary">{data?.horseName}</h2>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="primary">{data?.shareClass}</Badge>
                <span className="text-sm text-text-secondary">Since {data?.startDate}</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Your Ownership */}
        {currentUserOwnership && (
          <Card padding="lg" className="text-center bg-primary-soft">
            <p className="text-sm text-text-secondary">Your Share</p>
            <p className="mt-2 text-5xl font-bold text-primary">{currentUserOwnership.share}%</p>
          </Card>
        )}

        {/* Ownership Breakdown */}
        <Card>
          <h3 className="font-semibold text-text-primary mb-4">Ownership Breakdown</h3>
          
          {/* Progress Bar */}
          <div className="flex h-3 rounded-full overflow-hidden mb-6">
            {data?.owners.map((owner, index) => (
              <div
                key={owner.id}
                className={`${COLORS[index % COLORS.length]} flex items-center justify-center transition-all`}
                style={{ width: `${owner.share}%` }}
                title={`${owner.name}: ${owner.share}%`}
              >
                {owner.share >= 15 && (
                  <span className="text-[10px] font-medium text-white">{owner.share}%</span>
                )}
              </div>
            ))}
          </div>

          {/* Owner List */}
          <div className="space-y-3">
            {data?.owners.map((owner, index) => (
              <div key={owner.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`h-3 w-3 rounded-full ${COLORS[index % COLORS.length]}`} />
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-text-primary">{owner.name}</span>
                    {owner.isCurrentUser && (
                      <Badge variant="primary" size="sm">You</Badge>
                    )}
                  </div>
                </div>
                <span className="font-semibold text-text-primary">{owner.share}%</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Actions */}
        <Card>
          <button className="w-full py-3 text-center text-primary font-medium">
            Contact Other Owners
          </button>
        </Card>
      </div>
    </div>
  );
}
