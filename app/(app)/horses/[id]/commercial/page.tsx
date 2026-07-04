"use client";

import { useEffect, useState } from "react";
import { PageHeader, Card, Badge } from "@/components/ui";

interface CommercialActivity {
  id: string;
  activityDate: string;
  type: string;
  counterparty: string;
  amount: number;
  currency: string;
  status: string;
  notes: string;
}

const mockActivities: CommercialActivity[] = [
  { id: "1", activityDate: "2026-06-15", type: "Sale", counterparty: "ABC Stables", amount: 250000, currency: "GBP", status: "completed", notes: "Partial share transfer - 10%" },
  { id: "2", activityDate: "2026-04-01", type: "Purchase", counterparty: "Elite Bloodstock", amount: -180000, currency: "GBP", status: "completed", notes: "Initial purchase 25% share" },
  { id: "3", activityDate: "2026-03-20", type: "Stud Fee", counterparty: "Morning Star Farm", amount: 15000, currency: "GBP", status: "pending", notes: "2026 breeding season booking" },
];

const typeLabels: Record<string, string> = {
  Sale: "Sale",
  Purchase: "Purchase",
  "Stud Fee": "Stud Fee",
  Sponsorship: "Sponsorship",
  "Prize Winnings": "Prize Winnings",
};

const typeColors: Record<string, "success" | "warning" | "primary" | "default"> = {
  Sale: "success",
  Purchase: "warning",
  "Stud Fee": "primary",
  Sponsorship: "primary",
  "Prize Winnings": "success",
};

export default function HorseCommercialPage({ params }: { params: { id: string } }) {
  const [activities, setActivities] = useState<CommercialActivity[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setActivities(mockActivities);
      setIsLoading(false);
    }, 300);
  }, [params.id]);

  const stats = {
    totalIncome: activities.filter((a) => a.amount > 0).reduce((sum, a) => sum + a.amount, 0),
    totalExpenses: Math.abs(activities.filter((a) => a.amount < 0).reduce((sum, a) => sum + a.amount, 0)),
    netValue: activities.reduce((sum, a) => sum + a.amount, 0),
  };

  return (
    <div className="min-h-screen bg-background-primary">
      <PageHeader
        title="Commercial Activities"
        backHref={`/horses/${params.id}`}
      />

      <div className="p-4 space-y-4">
        {/* Summary */}
        <div className="grid grid-cols-3 gap-3">
          <Card padding="sm" className="text-center">
            <p className="text-xs text-text-muted">Income</p>
            <p className="mt-1 text-lg font-bold text-green-500">+{stats.totalIncome.toLocaleString()}</p>
          </Card>
          <Card padding="sm" className="text-center">
            <p className="text-xs text-text-muted">Expenses</p>
            <p className="mt-1 text-lg font-bold text-primary">-{stats.totalExpenses.toLocaleString()}</p>
          </Card>
          <Card padding="sm" className="text-center">
            <p className="text-xs text-text-muted">Net</p>
            <p className={`mt-1 text-lg font-bold ${stats.netValue >= 0 ? "text-green-500" : "text-primary"}`}>
              {stats.netValue >= 0 ? "+" : ""}{stats.netValue.toLocaleString()}
            </p>
          </Card>
        </div>

        {/* Activity List */}
        <div className="space-y-3">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <Card key={i} className="animate-pulse">
                <div className="space-y-2">
                  <div className="h-4 w-32 rounded bg-background-primary" />
                  <div className="h-3 w-full rounded bg-background-primary" />
                </div>
              </Card>
            ))
          ) : (
            activities.map((activity) => (
              <Card key={activity.id}>
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <Badge variant={typeColors[activity.type] || "default"} size="md">
                      {typeLabels[activity.type] || activity.type}
                    </Badge>
                    <p className="mt-2 font-medium text-text-primary">{activity.counterparty}</p>
                    <p className="text-xs text-text-muted">{activity.activityDate}</p>
                  </div>
                  <p className={`text-lg font-bold ${activity.amount >= 0 ? "text-green-500" : "text-primary"}`}>
                    {activity.amount >= 0 ? "+" : ""}{activity.amount.toLocaleString()}
                  </p>
                </div>
                {activity.notes && (
                  <p className="text-sm text-text-secondary">{activity.notes}</p>
                )}
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
