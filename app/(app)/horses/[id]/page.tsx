"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { PageHeader, Card, Badge, Avatar, Button } from "@/components/ui";
import HorseIdPhotoCard from "@/components/HorseIdPhotoCard";

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
  imageUrl?: string;
}

const mockHorses: Record<string, Horse> = {
  "1": {
    id: "1",
    name: "Golden Gallop",
    age: 5,
    sex: "Male",
    breed: "Thoroughbred",
    color: "Bay",
    status: "active",
    microchip: "985141012345678",
    notes: "Excellent racing performance. Won 3 races this season.",
    imageUrl: "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=800&q=80",
  },
  "3": {
    id: "3",
    name: "Midnight Thunder",
    age: 6,
    sex: "Male",
    breed: "Arabian",
    color: "Black",
    status: "active",
    microchip: "985141098765432",
    notes: "Champion endurance racer. 5-time regional winner.",
    imageUrl: "https://images.unsplash.com/photo-1534773728080-33d31da0270c?w=800&q=80",
  },
};

const menuItems = [
  { href: "/horses/[id]/health", label: "Health", icon: "M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z", color: "primary" },
  { href: "/horses/[id]/weight", label: "Weight", icon: "M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.97zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 01-2.031.352 5.989 5.989 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.97z", color: "secondary" },
  { href: "/horses/[id]/feeding", label: "Feeding", icon: "M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z", color: "primary" },
  { href: "/horses/[id]/races", label: "Races", icon: "M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99", color: "secondary" },
  { href: "/horses/[id]/insurance", label: "Insurance", icon: "M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z", color: "primary" },
  { href: "/ownership/[horseId]", label: "Owner", icon: "M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z", color: "secondary" },
];

export default function HorseDetailPage({ params }: { params: { id: string } }) {
  const [horse, setHorse] = useState<Horse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      const foundHorse = mockHorses[params.id] || {
        id: params.id,
        name: `Horse #${params.id}`,
        age: 4,
        sex: "Female",
        breed: "Mixed",
        color: "Brown",
        status: "active",
        microchip: "000000000000",
        notes: "A beautiful horse in the stable.",
        imageUrl: "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=800&q=80",
      };
      setHorse(foundHorse);
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

  if (isLoading || !horse) {
    return (
      <div className="min-h-screen bg-background-primary">
        <div className="h-72 bg-background-secondary animate-pulse" />
        <div className="p-5 space-y-5">
          <div className="h-8 w-48 bg-background-secondary rounded animate-pulse" />
          <div className="h-32 bg-background-secondary rounded-2xl animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-primary">
      {/* Simple Header */}
      <div className="flex items-center justify-between px-4 py-3">
        <Link 
          href="/horses"
          className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-text-primary hover:bg-white/20 transition-colors"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </Link>
        <div className="text-center">
          <h1 className="text-base font-semibold text-text-primary">{horse.name}</h1>
          <p className="text-xs text-text-secondary">{getStatusBadge(horse.status)}</p>
        </div>
        <button className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-text-primary hover:bg-white/20 transition-colors">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
          </svg>
        </button>
      </div>

      {/* Horse ID Photo Card */}
      <div className="flex justify-center pt-6 px-4">
        <HorseIdPhotoCard
          imageSrc={horse.imageUrl}
          title={horse.name}
          subtitle={`${horse.age} years old · ${horse.breed}`}
          className="w-full max-w-xs"
        />
      </div>

      {/* Content */}
      <div className="p-5 space-y-5 relative z-10">
        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-3">
          <Card className="bg-white shadow-elevated">
            <div className="text-center py-3">
              <p className="text-2xl font-bold text-primary">{horse.age}</p>
              <p className="text-xs text-text-secondary mt-1">Years</p>
            </div>
          </Card>
          <Card className="bg-white shadow-elevated">
            <div className="text-center py-3">
              <p className="text-2xl font-bold text-primary capitalize">{horse.sex}</p>
              <p className="text-xs text-text-secondary mt-1">Gender</p>
            </div>
          </Card>
          <Card className="bg-white shadow-elevated">
            <div className="text-center py-3">
              <p className="text-2xl font-bold text-primary truncate">{horse.breed}</p>
              <p className="text-xs text-text-secondary mt-1">Breed</p>
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-4 gap-2">
          <button className="flex flex-col items-center py-3 px-2 rounded-2xl bg-primary-soft hover:bg-primary/20 transition-colors">
            <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            <span className="text-xs font-medium text-primary mt-1">Add</span>
          </button>
          <button className="flex flex-col items-center py-3 px-2 rounded-2xl bg-secondary/10 hover:bg-secondary/20 transition-colors">
            <svg className="h-6 w-6 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 3.75H6A2.25 2.25 0 003.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0120.25 6v1.5m0 9V18A2.25 2.25 0 0118 20.25h-1.5m-9 0H6A2.25 2.25 0 013.75 18v-1.5M12 12h.008v.008H12V12z" />
            </svg>
            <span className="text-xs font-medium text-secondary mt-1">Notes</span>
          </button>
          <button className="flex flex-col items-center py-3 px-2 rounded-2xl bg-primary-soft hover:bg-primary/20 transition-colors">
            <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
            </svg>
            <span className="text-xs font-medium text-primary mt-1">Photo</span>
          </button>
          <button className="flex flex-col items-center py-3 px-2 rounded-2xl bg-secondary/10 hover:bg-secondary/20 transition-colors">
            <svg className="h-6 w-6 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
            </svg>
            <span className="text-xs font-medium text-secondary mt-1">Share</span>
          </button>
        </div>

        {/* Menu Items */}
        <div className="grid grid-cols-2 gap-3">
          {menuItems.map((item) => (
            <Link key={item.href} href={getHref(item.href)}>
              <Card className="h-full transition-all hover:shadow-elevated">
                <div className="flex items-center gap-3 py-2">
                  <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${
                    item.color === "primary" ? "bg-primary-soft" : "bg-secondary/10"
                  }`}>
                    <svg className={`h-5 w-5 ${item.color === "primary" ? "text-primary" : "text-secondary"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-text-primary">{item.label}</span>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {/* Notes */}
        {horse.notes && (
          <Card>
            <h3 className="text-sm font-medium text-text-primary mb-2">Notes</h3>
            <p className="text-sm text-text-secondary leading-relaxed">{horse.notes}</p>
          </Card>
        )}

        {/* Microchip */}
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-text-secondary">Microchip ID</p>
              <p className="text-sm font-mono text-text-primary mt-1">{horse.microchip}</p>
            </div>
            <button className="text-primary hover:text-primary/80">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
              </svg>
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}
