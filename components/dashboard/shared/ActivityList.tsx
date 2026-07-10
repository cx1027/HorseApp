import { ReactNode } from "react";

interface ActivityItem {
  id: string;
  icon: ReactNode;
  description: string;
  time: string;
}

interface ActivityListProps {
  activities: ActivityItem[];
  emptyMessage?: string;
}

export default function ActivityList({ activities, emptyMessage = "No recent activity" }: ActivityListProps) {
  if (activities.length === 0) {
    return (
      <p className="text-center text-sm text-text-muted py-8">
        {emptyMessage}
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-start gap-3">
          <div className="p-2 rounded-xl bg-background-primary flex-shrink-0">
            {activity.icon}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-text-primary">{activity.description}</p>
            <p className="text-xs text-text-muted mt-0.5">{activity.time}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
