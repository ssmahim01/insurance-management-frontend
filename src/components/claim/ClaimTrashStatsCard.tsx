"use client";

import { useMemo } from "react";
import { isToday, isThisMonth, formatDistanceToNow } from "date-fns";
import { Trash2, CalendarClock, CalendarDays, History } from "lucide-react";
import { IClaim } from "@/types/claim.types";

interface ClaimTrashStatsCardsProps {
  items: IClaim[] | undefined;
  totalCount: number | undefined;
  isLoading: boolean;
}

interface StatCardConfig {
  label: string;
  value: string;
  icon: typeof Trash2;
}

// NOTE: "Deleted Today" / "Deleted This Month" / "Recently Deleted" are derived
// from the currently loaded page only, using `updatedAt` as a stand-in for a
// true `deletedAt` timestamp (no such field exists yet in the schema). Total
// Trash uses the real server-side `meta.total`, so it's always accurate.
// For accurate day/month buckets across all pages, add a dedicated aggregation
// in the backend (mirroring `getClaimStats`) that groups by a real `deletedAt`.
export function ClaimTrashStatsCards({ items, totalCount, isLoading }: ClaimTrashStatsCardsProps) {
  const computed = useMemo(() => {
    const list = items ?? [];
    const deletedToday = list.filter(
      (item) => item.updatedAt && isToday(new Date(item.updatedAt)),
    ).length;
    const deletedThisMonth = list.filter(
      (item) => item.updatedAt && isThisMonth(new Date(item.updatedAt)),
    ).length;
    const mostRecent = [...list].sort((a, b) => {
      const aTime = a.updatedAt ? new Date(a.updatedAt).getTime() : 0;
      const bTime = b.updatedAt ? new Date(b.updatedAt).getTime() : 0;
      return bTime - aTime;
    })[0];

    return { deletedToday, deletedThisMonth, mostRecent };
  }, [items]);

  const cards: StatCardConfig[] = [
    {
      label: "Total Trash",
      value: String(totalCount ?? 0),
      icon: Trash2,
    },
    {
      label: "Deleted Today",
      value: String(computed.deletedToday),
      icon: CalendarClock,
    },
    {
      label: "Deleted This Month",
      value: String(computed.deletedThisMonth),
      icon: CalendarDays,
    },
    {
      label: "Recently Deleted",
      value: computed.mostRecent?.updatedAt
        ? formatDistanceToNow(new Date(computed.mostRecent.updatedAt), {
            addSuffix: true,
          })
        : "—",
      icon: History,
    },
  ];

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="rounded-xl border border-border bg-card p-5 space-y-3"
          >
            <div className="h-4 w-24 bg-muted rounded animate-pulse" />
            <div className="h-7 w-16 bg-muted rounded animate-pulse" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {cards.map(({ label, value, icon: Icon }) => (
        <div
          key={label}
          className="rounded-xl border border-border bg-card p-5 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
        >
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              {label}
            </p>
            <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Icon className="h-4 w-4 text-primary" />
            </div>
          </div>
          <p className="text-2xl font-bold text-foreground">{value}</p>
        </div>
      ))}
    </div>
  );
}