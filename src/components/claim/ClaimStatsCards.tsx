"use client"

import { FileText, Clock, CheckCircle2, XCircle } from "lucide-react";
import { IClaimStats } from "@/types/claim.types";

interface ClaimStatsCardsProps {
  stats: IClaimStats | undefined;
  isLoading: boolean;
}

interface StatConfig {
  label: string;
  value: string;
  icon: typeof FileText;
}

export function ClaimStatsCards({ stats, isLoading }: ClaimStatsCardsProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="rounded-xl border border-border bg-card p-5 space-y-3">
            <div className="h-4 w-20 bg-muted rounded animate-pulse" />
            <div className="h-7 w-16 bg-muted rounded animate-pulse" />
          </div>
        ))}
      </div>
    );
  }

  const cards: StatConfig[] = [
    { label: "Total", value: String(stats?.total ?? 0), icon: FileText },
    { label: "Pending", value: String(stats?.pending ?? 0), icon: Clock },
    { label: "Approved", value: String(stats?.approved ?? 0), icon: CheckCircle2 },
    { label: "Rejected", value: String(stats?.rejected ?? 0), icon: XCircle },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map(({ label, value, icon: Icon }) => (
        <div
          key={label}
          className="rounded-xl border border-border bg-card p-5 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
        >
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{label}</p>
            <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Icon className="h-4 w-4 text-primary" />
            </div>
          </div>
          <p className="text-xl font-bold text-foreground">{value}</p>
        </div>
      ))}
    </div>
  );
}