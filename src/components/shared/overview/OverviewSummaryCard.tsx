import { LucideIcon, TrendingUp } from "lucide-react";
import { IOverviewCard } from "@/types/subscription.types";
import { formatCurrency } from "@/lib/utils/format-subscription";

interface OverviewSummaryCardProps {
  label: string;
  icon: LucideIcon;
  data: IOverviewCard;
}

export function OverviewSummaryCard({ label, icon: Icon, data }: OverviewSummaryCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-border bg-background p-6 pt-8 transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/10 hover:-translate-y-1 hover:border-violet-200 dark:hover:border-violet-900">
      {/* Decorative linear wash */}
      <div className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-linear-to-br from-violet-500/10 to-purple-500/5 blur-2xl transition-opacity duration-300 group-hover:opacity-80" />

      <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-linear-to-r from-violet-600 to-purple-600 px-4 py-1 text-[11px] font-bold uppercase tracking-widest text-white shadow-sm shadow-violet-500/30">
        {label}
      </span>

      <div className="relative flex items-center justify-between mb-5">
        <div className="h-11 w-11 rounded-xl bg-linear-to-br from-violet-500/15 to-purple-500/10 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
          <Icon className="h-5 w-5 text-violet-600 dark:text-violet-400" />
        </div>
        <TrendingUp className="h-4 w-4 text-muted-foreground/30" />
      </div>

      <div className="relative space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Subscriptions
          </span>
          <span className="text-lg font-bold text-foreground tabular-nums">
            {data.subscriptions.toLocaleString()}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Revenue
          </span>
          <span className="text-xl font-extrabold bg-linear-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent tabular-nums">
            {formatCurrency(data.revenue)}
          </span>
        </div>

        <div className="flex items-center justify-between border-t border-border/70 pt-3">
          <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wide">
            Avg. Revenue
          </span>
          <span className="text-sm font-semibold text-muted-foreground tabular-nums">
            {formatCurrency(data.averageRevenue)}
          </span>
        </div>
      </div>
    </div>
  );
}