export default function OwnershipPage() {
  return (
    <div className="space-y-4">
      <h2 className="text-base font-semibold">My Ownership</h2>
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <p className="text-sm text-gray-500">Golden Gallop</p>
        <p className="mt-2 text-lg font-semibold">25% share</p>
        <p className="mt-1 text-sm text-gray-500">Class: Racing · Active since 2024</p>
      </div>
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <p className="text-sm text-gray-500">Summer Breeze</p>
        <p className="mt-2 text-lg font-semibold">10% share</p>
        <p className="mt-1 text-sm text-gray-500">Class: Breeding · Active since 2025</p>
      </div>
    </div>
  );
}
