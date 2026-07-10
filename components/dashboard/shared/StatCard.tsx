import { ReactNode } from "react";
import Card from "@/components/ui/Card";

interface StatCardProps {
  icon: ReactNode;
  value: string | number;
  label: string;
  trend?: {
    value: string;
    positive: boolean;
  };
}

export default function StatCard({ icon, value, label, trend }: StatCardProps) {
  return (
    <Card className="p-5">
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-2xl bg-primary-soft">
          {icon}
        </div>
        <div>
          <p className="text-2xl font-bold text-text-primary">{value}</p>
          <p className="text-sm text-text-secondary">{label}</p>
        </div>
      </div>
      {trend && (
        <div className="mt-3 flex items-center gap-1">
          <span className={`text-xs font-medium ${trend.positive ? "text-green-600" : "text-red-600"}`}>
            {trend.positive ? "+" : ""}{trend.value}
          </span>
          <span className="text-xs text-text-muted">vs last month</span>
        </div>
      )}
    </Card>
  );
}
