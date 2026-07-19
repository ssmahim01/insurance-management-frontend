import { Building2, CheckCircle2, XCircle, Store } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { IManagerDashboardSummary } from "@/types/dashboard";

interface ManagerSummaryCardsProps {
  summary: IManagerDashboardSummary;
}

interface StatConfig {
  label: string;
  value: number;
  icon: LucideIcon;
  gradient: string;
}

function StatCard({ label, value, icon: Icon, gradient }: StatConfig) {
  return (
    <div
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
  );
}

export function ManagerSummaryCards({ summary }: ManagerSummaryCardsProps) {
  const cards: StatConfig[] = [
    {
      label: "Total Partners",
      value: summary.totalPartners,
      icon: Building2,
      gradient: "from-blue-600 via-blue-700 to-indigo-900",
    },
    {
      label: "Active Partners",
      value: summary.activePartners,
      icon: CheckCircle2,
      gradient: "from-emerald-600 via-emerald-700 to-teal-900",
    },
    {
      label: "Inactive Partners",
      value: summary.inactivePartners,
      icon: XCircle,
      gradient: "from-rose-600 via-red-700 to-red-900",
    },
    {
      label: "Total Branches",
      value: summary.totalBranches,
      icon: Store,
      gradient: "from-indigo-600 via-purple-700 to-indigo-950",
    },
    {
      label: "Active Branches",
      value: summary.activeBranches,
      icon: CheckCircle2,
      gradient: "from-emerald-600 via-teal-700 to-blue-900",
    },
    {
      label: "Inactive Branches",
      value: summary.inactiveBranches,
      icon: XCircle,
      gradient: "from-rose-600 via-red-700 to-red-900",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
      {cards.map((card) => (
        <StatCard key={card.label} {...card} />
      ))}
    </div>
  );
}