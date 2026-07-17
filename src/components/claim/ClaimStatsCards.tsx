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
  gradient: string;
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
    {
      label: "Total",
      value: String(stats?.total ?? 0),
      icon: FileText,
      gradient: "from-blue-600 via-blue-700 to-indigo-900",
    },
    {
      label: "Pending",
      value: String(stats?.pending ?? 0),
      icon: Clock,
      gradient: "from-amber-500 via-amber-600 to-orange-800",
    },
    {
      label: "Approved",
      value: String(stats?.approved ?? 0),
      icon: CheckCircle2,
      gradient: "from-emerald-600 via-emerald-700 to-teal-900",
    },
    {
      label: "Rejected",
      value: String(stats?.rejected ?? 0),
      icon: XCircle,
      gradient: "from-rose-600 via-red-700 to-red-900",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map(({ label, value, icon: Icon, gradient }) => (
        <div
          key={label}
          className={`group relative overflow-hidden rounded-xl bg-linear-to-br ${gradient} p-5 shadow-sm ring-1 ring-white/10 transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-[1.02] hover:shadow-xl hover:shadow-black/20 hover:ring-white/25`}
        >
          <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-white/10 blur-2xl transition-transform duration-500 group-hover:scale-125" />

          <div className="relative flex items-center justify-between mb-2">
            <p className="text-xs font-medium text-white/75 uppercase tracking-wide">{label}</p>
            <div className="h-8 w-8 rounded-lg bg-white/15 backdrop-blur-sm ring-1 ring-white/20 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
              <Icon className="h-4 w-4 text-white" />
            </div>
          </div>
          <p className="relative text-xl font-bold text-white tracking-tight">{value}</p>
        </div>
      ))}
    </div>
  );
}