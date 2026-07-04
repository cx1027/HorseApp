"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
  activeIcon?: React.ReactNode;
}

interface BottomNavProps {
  items: NavItem[];
}

export default function BottomNav({ items }: BottomNavProps) {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-surface border-t border-border bottom-nav z-50 safe-bottom">
      <div className="flex items-center justify-around px-2 py-2">
        {items.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                flex flex-col items-center justify-center px-4 py-2 rounded-2xl min-w-[64px]
                transition-all duration-200
                ${isActive 
                  ? "text-primary" 
                  : "text-text-muted hover:text-text-secondary"
                }
              `}
            >
              <div className={`p-1.5 rounded-xl transition-colors ${isActive ? "bg-primary-soft" : ""}`}>
                {isActive && item.activeIcon ? item.activeIcon : item.icon}
              </div>
              <span className="text-[11px] font-medium mt-1">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
