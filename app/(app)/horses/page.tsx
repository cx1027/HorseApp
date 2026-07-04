"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { PageHeader, Card, Badge, Avatar } from "@/components/ui";
import type { Tables } from "@/lib/supabase/types";

export default function HorsesPage() {
  const [horses, setHorses] = useState<Tables<"horses">[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchHorses() {
      const supabase = createClient();
      
      const { data, error } = await supabase
        .from("horses")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching horses:", error);
        setError(error.message);
        setIsLoading(false);
        return;
      }

      setHorses(data || []);
      setIsLoading(false);
    }

    fetchHorses();
  }, []);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge variant="success">Active</Badge>;
      case "retired":
        return <Badge variant="default">Retired</Badge>;
      case "injured":
        return <Badge variant="warning">Injured</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-background-primary">
      <PageHeader
        title="My Horses"
        subtitle={`${horses.length} horses`}
        action={
          <Link href="/horses/new" className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white shadow-button transition-colors hover:bg-primary-600">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </Link>
        }
      />

      <div className="p-5 space-y-4">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <Card key={i} className="animate-pulse">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-2xl bg-background-primary" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-32 rounded bg-background-primary" />
                  <div className="h-3 w-48 rounded bg-background-primary" />
                </div>
              </div>
            </Card>
          ))
        ) : horses.length === 0 ? (
          <Card className="text-center py-20">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-primary-soft">
              <svg className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 15.803a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-text-primary">No horses yet</h3>
            <p className="mt-2 text-sm text-text-secondary">Add your first horse to get started</p>
            <Link href="/horses/new" className="mt-6 inline-block rounded-full bg-primary px-6 py-3 text-sm font-medium text-white shadow-button">
              Add Horse
            </Link>
          </Card>
        ) : (
          <div className="space-y-4">
            {horses.map((horse) => (
              <Link key={horse.id} href={`/horses/${horse.id}`}>
                <Card className="transition-all hover:shadow-elevated">
                  <div className="flex items-center gap-4">
                    <Avatar size="lg" fallback={horse.name} className="h-16 w-16 text-lg" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-medium text-text-primary truncate">{horse.name}</h3>
                        {getStatusBadge(horse.status)}
                      </div>
                      <p className="mt-2 text-sm text-text-secondary">
                        {horse.age} years · {horse.sex} · {horse.breed}
                      </p>
                      <p className="mt-1 text-xs text-text-muted">Updated {horse.updated_at ? new Date(horse.updated_at).toLocaleDateString() : ""}</p>
                    </div>
                    <svg className="h-5 w-5 text-text-muted flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
