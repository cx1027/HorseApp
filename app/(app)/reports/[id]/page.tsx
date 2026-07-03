"use client";

import { useParams } from "next/navigation";

export default function ReportDetailPage() {
  const params = useParams<{ id: string }>();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <a href="/reports" className="text-sm text-gray-500 hover:text-gray-700">← Reports</a>
        <h2 className="text-lg font-semibold">Report Detail</h2>
      </div>
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <p className="text-sm text-gray-500">Report ID: {params.id}</p>
        <p className="mt-2 text-xl font-semibold">Q2 2026 Investor Update</p>
        <p className="mt-4 text-sm text-gray-700">Forecast notes and report content appear here.</p>
      </div>
    </div>
  );
}
