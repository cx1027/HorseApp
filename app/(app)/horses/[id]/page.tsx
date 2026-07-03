"use client";

import Link from "next/link";

export default function HorseDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/horses" className="text-sm text-gray-500 hover:text-gray-700">← Horses</Link>
        <h2 className="text-lg font-semibold">Horse Detail</h2>
      </div>
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <p className="text-sm text-gray-500">Horse ID: {params.id}</p>
        <p className="mt-2 text-xl font-semibold">Golden Gallop</p>
        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="rounded-lg bg-gray-50 p-3">
            <p className="text-xs text-gray-500">Age</p>
            <p className="mt-1 font-medium">5 years</p>
          </div>
          <div className="rounded-lg bg-gray-50 p-3">
            <p className="text-xs text-gray-500">Breed</p>
            <p className="mt-1 font-medium">Thoroughbred</p>
          </div>
          <div className="rounded-lg bg-gray-50 p-3">
            <p className="text-xs text-gray-500">Sex</p>
            <p className="mt-1 font-medium">Gelding</p>
          </div>
          <div className="rounded-lg bg-gray-50 p-3">
            <p className="text-xs text-gray-500">Status</p>
            <p className="mt-1 font-medium">Active</p>
          </div>
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-gray-900">Health Records</h3>
          <p className="mt-2 text-sm text-gray-500">Last checkup: 2026-06-15</p>
        </div>
        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-gray-900">Ownership</h3>
          <p className="mt-2 text-sm text-gray-500">4 owners · 25% share each</p>
        </div>
      </div>
    </div>
  );
}
