"use client";

import { useEffect, useState } from "react";
import { PageHeader, Card, Badge } from "@/components/ui";

interface InsurancePolicy {
  id: string;
  provider: string;
  policyNumber: string;
  coverageType: string;
  startDate: string;
  endDate: string;
  premium: number;
  currency: string;
  status: string;
  notes: string;
}

const mockPolicies: InsurancePolicy[] = [
  {
    id: "1",
    provider: "Equine Insurance Co.",
    policyNumber: "POL-2026-001234",
    coverageType: "Full Coverage + Theft",
    startDate: "2026-01-01",
    endDate: "2027-01-01",
    premium: 8500,
    currency: "GBP",
    status: "active",
    notes: "Includes mortality, theft and transit coverage, up to £500,000",
  },
];

export default function HorseInsurancePage({ params }: { params: { id: string } }) {
  const [policies, setPolicies] = useState<InsurancePolicy[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setPolicies(mockPolicies);
      setIsLoading(false);
    }, 300);
  }, [params.id]);

  const activePolicy = policies.find((p) => p.status === "active");

  const getDaysRemaining = (endDate: string) => {
    const end = new Date(endDate);
    const today = new Date();
    return Math.ceil((end.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="min-h-screen bg-background-primary">
      <PageHeader
        title="Insurance"
        backHref={`/horses/${params.id}`}
      />

      <div className="p-5 space-y-5">
        {/* Active Policy Summary */}
        {activePolicy && (
          <Card padding="lg" className="bg-primary-soft">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-medium text-text-primary">{activePolicy.provider}</h3>
              <Badge variant="success">Active</Badge>
            </div>
            <p className="text-sm text-text-secondary mb-5">{activePolicy.coverageType}</p>
            <div className="grid grid-cols-2 gap-5">
              <div>
                <p className="text-xs text-text-muted">Policy No.</p>
                <p className="text-sm font-medium text-text-primary">{activePolicy.policyNumber}</p>
              </div>
              <div>
                <p className="text-xs text-text-muted">Annual Premium</p>
                <p className="text-sm font-medium text-primary">{activePolicy.premium.toLocaleString()} {activePolicy.currency}</p>
              </div>
              <div>
                <p className="text-xs text-text-muted">Expiry</p>
                <p className="text-sm font-medium text-text-primary">{activePolicy.endDate}</p>
              </div>
              <div>
                <p className="text-xs text-text-muted">Days Left</p>
                <p className="text-sm font-medium text-primary">{getDaysRemaining(activePolicy.endDate)} days</p>
              </div>
            </div>
          </Card>
        )}

        {/* Policy Details */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-text-primary">Policy Details</h3>
          {isLoading ? (
            <Card className="animate-pulse">
              <div className="space-y-2">
                <div className="h-4 w-32 rounded bg-background-primary" />
                <div className="h-3 w-full rounded bg-background-primary" />
              </div>
            </Card>
          ) : policies.length === 0 ? (
            <Card className="text-center py-12">
              <p className="text-text-secondary">No insurance information</p>
            </Card>
          ) : (
            policies.map((policy) => (
              <Card key={policy.id}>
                <div className="mb-4">
                  <h4 className="font-medium text-text-primary">{policy.provider}</h4>
                  <p className="mt-1 text-sm text-text-secondary">{policy.coverageType}</p>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-text-muted">Policy No.</span>
                    <span className="text-text-primary">{policy.policyNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-muted">Period</span>
                    <span className="text-text-primary">{policy.startDate} - {policy.endDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-muted">Annual Premium</span>
                    <span className="font-medium text-primary">{policy.premium.toLocaleString()} {policy.currency}</span>
                  </div>
                </div>
                {policy.notes && (
                  <p className="mt-4 pt-4 border-t border-border text-sm text-text-secondary">{policy.notes}</p>
                )}
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
