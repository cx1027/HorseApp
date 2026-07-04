"use client";

import { useEffect, useState } from "react";
import { PageHeader, Card, Badge } from "@/components/ui";

interface RaceRecord {
  id: string;
  raceDate: string;
  raceName: string;
  venue: string;
  position: number;
  prize: number;
  currency: string;
  notes: string;
}

const mockRaces: RaceRecord[] = [
  { id: "1", raceDate: "2026-06-28", raceName: "Summer Sprint Championship", venue: "Ascot Racecourse", position: 1, prize: 50000, currency: "GBP", notes: "Excellent performance, won by 2 lengths" },
  { id: "2", raceDate: "2026-06-14", raceName: "Royal Cup", venue: "Newmarket", position: 2, prize: 20000, currency: "GBP", notes: "Narrow defeat at the finish" },
  { id: "3", raceDate: "2026-05-30", raceName: "Spring Derby Qualifier", venue: "Epsom", position: 1, prize: 35000, currency: "GBP", notes: "Led throughout, clear winner" },
];

export default function HorseRacesPage({ params }: { params: { id: string } }) {
  const [races, setRaces] = useState<RaceRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setRaces(mockRaces);
      setIsLoading(false);
    }, 300);
  }, [params.id]);

  const stats = {
    totalRaces: races.length,
    wins: races.filter((r) => r.position === 1).length,
    totalPrize: races.reduce((sum, r) => sum + r.prize, 0),
  };

  const getPositionBadge = (position: number) => {
    if (position === 1) return <Badge variant="success" size="md">1st</Badge>;
    if (position === 2) return <Badge variant="default" size="md">2nd</Badge>;
    if (position === 3) return <Badge variant="warning" size="md">3rd</Badge>;
    return <Badge size="md">{position}th</Badge>;
  };

  return (
    <div className="min-h-screen bg-background-primary">
      <PageHeader
        title="Race Records"
        backHref={`/horses/${params.id}`}
      />

      <div className="p-5 space-y-5">
        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-4">
          <Card padding="md" className="text-center">
            <p className="text-xs text-text-muted">Races</p>
            <p className="mt-2 text-2xl font-medium text-text-primary">{stats.totalRaces}</p>
          </Card>
          <Card padding="md" className="text-center">
            <p className="text-xs text-text-muted">Wins</p>
            <p className="mt-2 text-2xl font-medium text-green-500">{stats.wins}</p>
          </Card>
          <Card padding="md" className="text-center">
            <p className="text-xs text-text-muted">Prize</p>
            <p className="mt-2 text-2xl font-medium text-primary">{stats.totalPrize.toLocaleString()}</p>
          </Card>
        </div>

        {/* Race List */}
        <div className="space-y-4">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <Card key={i} className="animate-pulse">
                <div className="space-y-2">
                  <div className="h-4 w-32 rounded bg-background-primary" />
                  <div className="h-3 w-full rounded bg-background-primary" />
                </div>
              </Card>
            ))
          ) : (
            races.map((race) => (
              <Card key={race.id}>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="font-medium text-text-primary">{race.raceName}</h4>
                    <p className="mt-1 text-sm text-text-secondary">{race.venue}</p>
                    <p className="text-xs text-text-muted">{race.raceDate}</p>
                  </div>
                  {getPositionBadge(race.position)}
                </div>
                {race.notes && (
                  <p className="text-sm text-text-secondary">{race.notes}</p>
                )}
                <div className="mt-4 pt-4 border-t border-border">
                  <p className="text-lg font-medium text-primary">+{race.prize.toLocaleString()} {race.currency}</p>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
