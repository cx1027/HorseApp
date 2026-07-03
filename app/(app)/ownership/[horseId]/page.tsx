"use client";

import { useParams } from "next/navigation";

export default function OwnershipDetailPage() {
  const params = useParams<{ horseId: string }>();

  return (
    <div className="space-y-4">
      <h2 className="text-base font-semibold">Ownership Summary</h2>
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <p className="text-sm text-gray-500">Horse ID: {params.horseId}</p>
        <p className="mt-2 text-xl font-semibold">Ownership breakdown</p>
        <div className="mt-4 space-y-2 text-sm text-gray-700">
          <div className="flex items-center justify-between rounded-lg border px-3 py-2">
            <span>Investor A</span>
            <span>40%</span>
          </div>
          <div className="flex items-center justify-between rounded-lg border px-3 py-2">
            <span>Investor B</span>
            <span>35%</span>
          </div>
          <div className="flex items-center justify-between rounded-lg border px-3 py-2">
            <span>Investor C</span>
            <span>25%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
