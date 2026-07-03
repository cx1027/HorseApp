"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

const navigation = [
  { name: "Horses", href: "/horses" },
  { name: "Ownership", href: "/ownership" },
  { name: "Reports", href: "/reports" },
  { name: "Documents", href: "/documents" },
  { name: "Notifications", href: "/notifications" },
];

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen">
      <aside className="hidden w-60 flex-col border-r bg-white md:flex">
        <div className="px-6 py-6">
          <p className="text-lg font-semibold">HorseApp</p>
          <p className="text-xs text-gray-500">Owner & investor read-first platform</p>
        </div>
        <nav className="flex-1 space-y-1 px-3">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`block rounded-md px-3 py-2 text-sm ${
                pathname === item.href
                  ? "bg-blue-50 font-medium text-blue-700"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
        <div className="space-y-1 px-3 pb-4">
          <Link href="/settings" className="block rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
            Settings
          </Link>
        </div>
      </aside>
      <main className="flex-1">
        <header className="flex items-center justify-between border-b bg-white px-6 py-4">
          <h1 className="text-lg font-semibold text-gray-900">Dashboard</h1>
          <div className="flex items-center gap-3">
            <Link href="/notifications" className="text-sm text-gray-700 hover:text-blue-700">
              Notifications
            </Link>
            <Link href="/settings" className="text-sm text-gray-700 hover:text-blue-700">
              Profile
            </Link>
          </div>
        </header>
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}
