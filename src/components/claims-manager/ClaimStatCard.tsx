"use client";

import { LucideIcon } from "lucide-react";

type StatColor = "blue" | "emerald" | "amber" | "red";

const STAT_COLOR_MAP: Record<StatColor, { gradient: string; iconWrap: string; shadow: string }> = {
  blue: {
    gradient: "from-blue-700 via-cyan-700 to-blue-600",
    iconWrap: "bg-white/15",
    shadow: "shadow-blue-900/25",
  },
  emerald: {
    gradient: "from-emerald-600 via-green-600 to-emerald-700",
    iconWrap: "bg-white/15",
    shadow: "shadow-emerald-900/25",
  },
  amber: {
    gradient: "from-amber-600 via-yellow-600 to-amber-700",
    iconWrap: "bg-white/15",
    shadow: "shadow-amber-900/25",
  },
  red: {
    gradient: "from-red-600 via-rose-600 to-red-700",
    iconWrap: "bg-white/15",
    shadow: "shadow-red-900/25",
  },
};

export function ClaimStatCard({
  label,
  value,
  sub,
  icon: Icon,
  color,
}: {
  label: string;
  value: string | number;
  sub?: string;
  icon: LucideIcon;
  color: StatColor;
}) {
  const c = STAT_COLOR_MAP[color];
  return (
    <div
      className={`group relative overflow-hidden rounded-xl bg-linear-to-br ${c.gradient} p-5 shadow-lg ${c.shadow} transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5`}
    >
      <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/10 blur-xl transition-opacity duration-300 group-hover:opacity-80" />
      <div className="relative flex items-center justify-between mb-3">
        <p className="text-sm font-medium text-white/80">{label}</p>
        <div className={`p-2 rounded-lg ${c.iconWrap} backdrop-blur-sm transition-transform duration-300 group-hover:scale-110`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
      </div>
      <p className="relative text-2xl font-bold text-white tabular-nums">{value}</p>
      {sub && <p className="relative text-xs mt-1 text-white/70">{sub}</p>}
    </div>
  );
}