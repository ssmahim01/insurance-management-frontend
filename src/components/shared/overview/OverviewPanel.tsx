import { IOverviewCard } from "@/types/subscription.types";
import { formatCurrency } from "@/lib/utils/format-subscription";
import { PackageWiseRevenueTable } from "./PackageWiseRevenueTable";

interface OverviewPanelProps {
  label: string;
  data: IOverviewCard;
}

export function OverviewPanel({ label, data }: OverviewPanelProps) {
  return (
    <div className="relative rounded-2xl border border-border bg-background p-6 pt-8 shadow-sm transition-all duration-300 hover:shadow-md">
      <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-linear-to-r from-indigo-600 to-blue-600 px-4 py-1 text-[11px] font-bold uppercase tracking-widest text-white shadow-sm shadow-indigo-500/30">
        {label}
      </span>

      <div className="space-y-1">
        <p className="text-sm text-foreground">
          Subscriptions: <span className="font-semibold text-foreground">{data.subscriptions.toLocaleString()}</span>
        </p>
        <p className="text-sm text-foreground">
          Revenues:{" "}
          <span className="font-semibold text-indigo-600 dark:text-indigo-400">
            {formatCurrency(data.revenue)}
          </span>
        </p>
      </div>

      <div className="mt-4 border-t border-border pt-4">
        <h4 className="text-xs font-semibold uppercase tracking-wide text-rose-500 dark:text-rose-400 mb-3">
          Package Wise Revenue
        </h4>
        <PackageWiseRevenueTable items={data.packageWiseRevenue} />
      </div>
    </div>
  );
}