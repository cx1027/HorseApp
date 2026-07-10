import { ReactNode } from "react";
import Card from "@/components/ui/Card";
import Link from "next/link";

interface QuickActionProps {
  icon: ReactNode;
  label: string;
  onClick?: () => void;
  href?: string;
  badge?: number;
}

export default function QuickAction({ icon, label, onClick, href, badge }: QuickActionProps) {
  const content = (
    <Card className="p-3 text-center hover:shadow-elevated transition-shadow">
      <div className="inline-flex p-2 rounded-xl bg-primary-soft mb-2 relative">
        <div className="inline-flex p-2 rounded-lg bg-primary">
          <span className="text-white">
            {icon}
          </span>
        </div>
        {badge !== undefined && badge > 0 && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-accent text-white text-xs rounded-full flex items-center justify-center">
            {badge > 9 ? "9+" : badge}
          </span>
        )}
      </div>
      <p className="text-xs font-medium text-text-primary">{label}</p>
    </Card>
  );

  if (href) {
    return (
      <Link href={href} className="block">
        {content}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className="w-full">
      {content}
    </button>
  );
}
