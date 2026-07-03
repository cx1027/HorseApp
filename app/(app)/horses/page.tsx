import Link from "next/link";

const horses = [
  { id: "1", name: "Golden Gallop", status: "Active", updated: "2026-07-02" },
  { id: "2", name: "Northern Light", status: "Inactive", updated: "2026-06-28" },
  { id: "3", name: "Summer Breeze", status: "Active", updated: "2026-07-03" },
];

export default function HorsesPage() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold">Horses</h2>
        <Link href="/horses/new" className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
          Add horse
        </Link>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {horses.map((horse) => (
          <Link key={horse.id} href={`/horses/${horse.id}`} className="block rounded-xl border bg-white p-5 shadow-sm hover:shadow-md">
            <p className="text-sm text-gray-500">Updated {horse.updated}</p>
            <p className="mt-2 text-lg font-semibold">{horse.name}</p>
            <span className="mt-3 inline-flex rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700">{horse.status}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
