export default function ReportsPage() {
  const reports = [
    { id: "1", title: "Q2 2026 Investor Update", status: "Published", date: "2026-06-30", horses: 3 },
    { id: "2", title: "Q1 2026 Investor Update", status: "Published", date: "2026-03-31", horses: 3 },
    { id: "3", title: "Mid-Year Forecast 2026", status: "Draft", date: "2026-07-01", horses: 3 },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-base font-semibold">Investor Reports</h2>
      <div className="space-y-3">
        {reports.map((report) => (
          <div key={report.id} className="rounded-xl border bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">{report.title}</p>
                <p className="mt-1 text-xs text-gray-500">{report.date} · {report.horses} horses</p>
              </div>
              <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                report.status === "Published"
                  ? "bg-green-50 text-green-700"
                  : "bg-yellow-50 text-yellow-700"
              }`}>
                {report.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
