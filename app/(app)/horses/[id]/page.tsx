"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { PageHeader, Card, Badge, Avatar, Button } from "@/components/ui";

interface Horse {
  id: string;
  name: string;
  age: number;
  sex: string;
  breed: string;
  color: string;
  status: string;
  microchip: string;
  notes: string;
}

const mockHorse: Horse = {
  id: "1",
  name: "Golden Gallop",
  age: 5,
  sex: "Male",
  breed: "Thoroughbred",
  color: "Bay",
  status: "active",
  microchip: "985141012345678",
  notes: "Excellent racing performance. Won 3 races this season.",
};

const menuItems = [
  { href: "/horses/[id]/health", label: "Health Records", icon: "M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z", color: "primary" },
  { href: "/horses/[id]/weight", label: "Weight Data", icon: "M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605", color: "secondary" },
  { href: "/horses/[id]/feeding", label: "Feeding Records", icon: "M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z", color: "primary" },
  { href: "/horses/[id]/races", label: "Race Records", icon: "M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99", color: "secondary" },
  { href: "/horses/[id]/insurance", label: "Insurance", icon: "M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z", color: "primary" },
  { href: "/ownership/[horseId]", label: "Ownership", icon: "M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z", color: "secondary" },
];

export default function HorseDetailPage({ params }: { params: { id: string } }) {
  const [horse, setHorse] = useState<Horse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setHorse(mockHorse);
      setIsLoading(false);
    }, 300);
  }, [params.id]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge variant="success">Active</Badge>;
      case "retired":
        return <Badge variant="default">Retired</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getHref = (href: string) => {
    if (href.includes("[id]")) return href.replace("[id]", params.id);
    if (href.includes("[horseId]")) return href.replace("[horseId]", params.id);
    return href;
  };

  return (
    <div className="min-h-screen bg-background-primary">
      <PageHeader
        title={horse?.name || "Loading..."}
        backHref="/horses"
        action={
          <Button variant="ghost" size="sm" className="rounded-full">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
            </svg>
          </Button>
        }
      />

      <div className="p-5 space-y-5">
        <Card padding="lg">
          {isLoading ? (
            <div className="animate-pulse space-y-4">
              <div className="flex items-center gap-4">
                <div className="h-20 w-20 rounded-2xl bg-background-primary" />
                <div className="flex-1 space-y-2">
                  <div className="h-5 w-32 rounded bg-background-primary" />
                  <div className="h-4 w-48 rounded bg-background-primary" />
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="flex items-start gap-5">
                <Avatar size="xl" fallback={horse?.name || "?"} className="h-20 w-20 text-2xl" />
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h2 className="text-xl font-medium text-text-primary">{horse?.name}</h2>
                    {horse && getStatusBadge(horse.status)}
                  </div>
                  <p className="mt-2 text-sm text-text-secondary">
                    {horse?.breed} · {horse?.color}
                  </p>
                </div>
              </div>

              <div className="mt-8 grid grid-cols-3 gap-4">
                <div className="rounded-2xl bg-background-primary p-5 text-center">
                  <p className="text-xs text-text-secondary">Age</p>
                  <p className="mt-2 text-xl font-medium text-text-primary">{horse?.age} yrs</p>
                </div>
                <div className="rounded-2xl bg-background-primary p-5 text-center">
                  <p className="text-xs text-text-secondary">Sex</p>
                  <p className="mt-2 text-xl font-medium text-text-primary">{horse?.sex}</p>
                </div>
                <div className="rounded-2xl bg-background-primary p-5 text-center">
                  <p className="text-xs text-text-secondary">Breed</p>
                  <p className="mt-2 text-xl font-medium text-text-primary truncate">{horse?.breed}</p>
                </div>
              </div>
            </>
          )}
        </Card>

        <div className="grid grid-cols-2 gap-4">
          {menuItems.map((item) => (
            <Link key={item.href} href={getHref(item.href)}>
              <Card className="h-full transition-all hover:shadow-elevated">
                <div className="flex flex-col items-center text-center py-4">
                  <div className={`h-12 w-12 rounded-2xl flex items-center justify-center ${
                    item.color === "primary" ? "bg-primary-soft" : "bg-secondary/10"
                  }`}>
                    <svg className={`h-6 w-6 ${item.color === "primary" ? "text-primary" : "text-secondary"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                    </svg>
                  </div>
                  <span className="mt-4 text-sm font-medium text-text-primary">{item.label}</span>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {horse?.notes && (
          <Card>
            <h3 className="text-sm font-medium text-text-primary mb-2">Notes</h3>
            <p className="text-sm text-text-secondary leading-relaxed">{horse.notes}</p>
          </Card>
        )}
      </div>
    </div>
  );
}
