export default function NotificationsPage() {
  const notifications = [
    { id: "1", title: "New health record added", body: "Vaccination record updated for Golden Gallop", read: false, time: "2h ago" },
    { id: "2", title: "Q2 Report published", body: "Q2 2026 Investor Update is now available", read: true, time: "1d ago" },
    { id: "3", title: "Insurance renewal due", body: "Policy for Northern Light expires in 30 days", read: false, time: "2d ago" },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-base font-semibold">Notifications</h2>
      <div className="space-y-2">
        {notifications.map((n) => (
          <div key={n.id} className={`rounded-xl border p-4 ${n.read ? "bg-white" : "bg-blue-50 border-blue-100"}`}>
            <div className="flex items-start justify-between">
              <div>
                <p className={`text-sm ${n.read ? "font-normal text-gray-700" : "font-semibold text-gray-900"}`}>{n.title}</p>
                <p className="mt-1 text-xs text-gray-500">{n.body}</p>
              </div>
              <span className="text-xs text-gray-400">{n.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
