export default function DocumentsPage() {
  return (
    <div className="space-y-4">
      <h2 className="text-base font-semibold">Documents</h2>
      <div className="rounded-xl border border-dashed border-gray-300 bg-white p-10 text-center">
        <p className="text-sm text-gray-500">Drag files here or click to upload</p>
      </div>
      <div className="space-y-2">
        <p className="text-xs text-gray-500">Recent uploads</p>
        <div className="rounded-lg border bg-white p-3">
          <p className="text-sm font-medium">vaccination_certificate.pdf</p>
          <p className="text-xs text-gray-500">Golden Gallop · 2026-06-15</p>
        </div>
      </div>
    </div>
  );
}
