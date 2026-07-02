import { Users, UserCheck, CircleDollarSign, TrendingUp, LucideIcon } from "lucide-react";

interface StatConfig {
  label: string;
  value: string;
  icon: LucideIcon;
}

const STATS: StatConfig[] = [
  { label: "Total Customers", value: "--", icon: Users },
  { label: "Active Customers", value: "--", icon: UserCheck },
  { label: "Monthly Earnings", value: "--", icon: CircleDollarSign },
  { label: "Performance Score", value: "--", icon: TrendingUp },
];

export function DetailStatsCards() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {STATS.map(({ label, value, icon: Icon }) => (
        <div
          key={label}
          className="rounded-xl border border-border bg-card p-4 sm:p-5 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
        >
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              {label}
            </p>
            <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <Icon className="h-4 w-4 text-primary" />
            </div>
          </div>
          <p className="text-xl font-bold text-foreground">{value}</p>
        </div>
      ))}
    </div>
  );
}