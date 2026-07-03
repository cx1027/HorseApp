"use client";

import { useParams } from "next/navigation";

export default function NotificationDetailPage() {
  const params = useParams<{ id: string }>();

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <a href="/notifications" className="text-sm text-gray-500 hover:text-gray-700">← Notifications</a>
        <h2 className="text-lg font-semibold">Notification</h2>
      </div>
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <p className="text-sm text-gray-500">Notification ID: {params.id}</p>
        <p className="mt-4 text-sm text-gray-700">Notification detail content will load from Supabase next.</p>
      </div>
    </div>
  );
}
