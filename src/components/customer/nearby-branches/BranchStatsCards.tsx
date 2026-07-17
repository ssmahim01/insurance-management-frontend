import { MapPin, Building2, Compass, LocateFixed, Radar } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface BranchStatsCardsProps {
  branchCount: number;
  partnerCount: number;
  nearestCity?: string;
  userCoords?: { latitude: number; longitude: number } | null;
}

function StatCard({
  icon: Icon,
  label,
  value,
  gradient,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  gradient: string;
}) {
  return (
    <div
      className={`group relative overflow-hidden rounded-2xl bg-linear-to-br ${gradient} p-4 shadow-sm ring-1 ring-white/10 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-lg`}
    >
      <div className="pointer-events-none absolute -right-6 -top-6 h-20 w-20 rounded-full bg-white/10 blur-xl transition-transform duration-500 group-hover:scale-125" />
      <div className="relative flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/15 backdrop-blur-sm ring-1 ring-white/20">
          <Icon className="h-5 w-5 text-white" />
        </div>
        <div className="min-w-0">
          <p className="text-[11px] font-medium uppercase tracking-wide text-white/70 truncate">{label}</p>
          <p className="text-lg font-bold text-white truncate">{value}</p>
        </div>
      </div>
    </div>
  );
}

export function BranchStatsCards({
  branchCount,
  partnerCount,
  nearestCity,
  userCoords,
}: BranchStatsCardsProps) {
  const coordsLabel = userCoords
    ? `${userCoords.latitude.toFixed(2)}, ${userCoords.longitude.toFixed(2)}`
    : "—";

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
      <StatCard icon={MapPin} label="Branches Found" value={String(branchCount)} gradient="from-emerald-600 to-teal-800" />
      <StatCard icon={Building2} label="Partners Available" value={String(partnerCount)} gradient="from-blue-600 to-indigo-800" />
      <StatCard icon={Compass} label="Nearest City" value={nearestCity ?? "—"} gradient="from-indigo-600 to-purple-800" />
      <StatCard icon={LocateFixed} label="Your Coordinates" value={coordsLabel} gradient="from-purple-600 to-fuchsia-800" />
      <StatCard icon={Radar} label="Search Scope" value="All Nearby" gradient="from-cyan-600 to-blue-800" />
    </div>
  );
}