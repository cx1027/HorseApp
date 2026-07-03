"use client";

import { useState } from "react";

export default function DocumentUploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [category, setCategory] = useState("medical");

  async function handleUpload(e: React.FormEvent) {
    e.preventDefault();
    if (!file) return;
    alert("Upload will be connected to Supabase Storage next.");
  }

  return (
    <div className="space-y-4">
      <h2 className="text-base font-semibold">Upload Document</h2>
      <form onSubmit={handleUpload} className="rounded-xl border bg-white p-6 shadow-sm space-y-4">
        <input
          className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
          type="file"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
        />
        <select
          className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="medical">Medical</option>
          <option value="insurance">Insurance</option>
          <option value="report">Report</option>
          <option value="other">Other</option>
        </select>
        <button type="submit" className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
          Upload
        </button>
      </form>
    </div>
  );
}
