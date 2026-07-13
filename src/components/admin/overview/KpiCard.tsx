import { LucideIcon } from "lucide-react";

interface KpiCardProps {
  label: string;
  value: string;
  icon: LucideIcon;
  sub?: string;
  accent?: "navy" | "cyan";
}

export function KpiCard({ label, value, icon: Icon, sub, accent = "cyan" }: KpiCardProps) {
  const iconWrap =
    accent === "navy"
      ? "bg-slate-900/5 dark:bg-slate-100/10"
      : "bg-cyan-600/10";
  const iconColor =
    accent === "navy"
      ? "text-slate-700 dark:text-slate-300"
      : "text-cyan-700 dark:text-cyan-400";

  return (
    <div className="group rounded-2xl border border-border bg-background p-5 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 hover:border-cyan-200 dark:hover:border-cyan-900">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{label}</span>
        <div className={`h-8 w-8 rounded-lg ${iconWrap} flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}>
          <Icon className={`h-4 w-4 ${iconColor}`} />
        </div>
      </div>
      <p className="text-2xl font-bold text-foreground tabular-nums">{value}</p>
      {sub && <p className="text-xs text-muted-foreground mt-1">{sub}</p>}
    </div>
  );
}