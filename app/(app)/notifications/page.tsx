"use client";

import { useEffect, useState } from "react";
import { PageHeader, Card, Badge } from "@/components/ui";

interface Notification {
  id: string;
  type: string;
  title: string;
  body: string;
  horseName?: string;
  read: boolean;
  timeAgo: string;
}

const mockNotifications: Notification[] = [
  { id: "1", type: "update", title: "Health record added", body: "Vaccination record updated for Golden Gallop", horseName: "Golden Gallop", read: false, timeAgo: "2 hours ago" },
  { id: "2", type: "report", title: "Q2 report published", body: "2026 Q2 Investment Report is now available", read: false, timeAgo: "1 day ago" },
  { id: "3", type: "reminder", title: "Insurance renewal reminder", body: "Northern Light's insurance expires in 30 days", horseName: "Northern Light", read: true, timeAgo: "2 days ago" },
  { id: "4", type: "system", title: "Profile updated", body: "Your profile information has been updated", read: true, timeAgo: "5 days ago" },
];

const typeColors: Record<string, "primary" | "secondary" | "warning" | "default"> = {
  update: "primary",
  report: "secondary",
  reminder: "warning",
  system: "default",
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "unread">("all");

  useEffect(() => {
    setTimeout(() => {
      setNotifications(mockNotifications);
      setIsLoading(false);
    }, 300);
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const filteredNotifications = notifications.filter((n) => {
    if (filter === "unread") return !n.read;
    return true;
  });

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  return (
    <div className="min-h-screen bg-background-primary">
      <PageHeader
        title="Notifications"
        subtitle={unreadCount > 0 ? `${unreadCount} unread` : "All read"}
      />

      <div className="p-5 space-y-4">
        {/* Filter Tabs */}
        <div className="flex gap-3">
          <button
            onClick={() => setFilter("all")}
            className={`px-5 py-2.5 rounded-full text-sm font-medium transition-colors ${
              filter === "all"
                ? "bg-primary text-white shadow-button"
                : "bg-surface text-text-secondary hover:bg-background-primary"
            }`}
          >
            All ({notifications.length})
          </button>
          <button
            onClick={() => setFilter("unread")}
            className={`px-5 py-2.5 rounded-full text-sm font-medium transition-colors ${
              filter === "unread"
                ? "bg-primary text-white shadow-button"
                : "bg-surface text-text-secondary hover:bg-background-primary"
            }`}
          >
            Unread ({unreadCount})
          </button>
        </div>

        {/* Notifications List */}
        {isLoading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <Card key={i} className="animate-pulse">
              <div className="space-y-2">
                <div className="h-4 w-48 rounded bg-background-primary" />
                <div className="h-3 w-full rounded bg-background-primary" />
              </div>
            </Card>
          ))
        ) : filteredNotifications.length === 0 ? (
          <Card className="text-center py-20">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-primary-soft">
              <svg className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-text-primary">
              {filter === "unread" ? "All caught up!" : "No notifications"}
            </h3>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredNotifications.map((notification) => (
              <Card
                key={notification.id}
                className={`cursor-pointer transition-all ${!notification.read ? "bg-primary-soft" : ""}`}
                onClick={() => markAsRead(notification.id)}
              >
                <div className="flex items-start gap-4">
                  <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                    typeColors[notification.type] === "primary" ? "bg-primary-soft" :
                    typeColors[notification.type] === "secondary" ? "bg-secondary/10" :
                    typeColors[notification.type] === "warning" ? "bg-yellow-100" :
                    "bg-background-primary"
                  }`}>
                    <svg className={`h-5 w-5 ${
                      typeColors[notification.type] === "primary" ? "text-primary" :
                      typeColors[notification.type] === "secondary" ? "text-secondary" :
                      typeColors[notification.type] === "warning" ? "text-yellow-600" :
                      "text-text-secondary"
                    }`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className={`text-sm ${!notification.read ? "font-medium text-text-primary" : "font-medium text-text-primary"}`}>
                        {notification.title}
                      </p>
                      {!notification.read && (
                        <div className="h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                      )}
                    </div>
                    <p className="mt-2 text-sm text-text-secondary">{notification.body}</p>
                    <div className="flex items-center gap-3 mt-3">
                      {notification.horseName && (
                        <Badge variant="primary" size="sm">{notification.horseName}</Badge>
                      )}
                      <span className="text-xs text-text-muted">{notification.timeAgo}</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
