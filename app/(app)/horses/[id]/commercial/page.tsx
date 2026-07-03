export default function HorseCommercialPage({ params }: { params: { id: string } }) {
  return (
    <div className="space-y-4">
      <h2 className="text-base font-semibold">Commercial Activity</h2>
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <p className="text-sm text-gray-500">Horse ID: {params.id}</p>
        <p className="mt-4 text-sm text-gray-700">Commercial activity records will load from Supabase in the next step.</p>
      </div>
    </div>
  );
}
