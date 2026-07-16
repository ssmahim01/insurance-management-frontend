"use client"

import { IOverviewCard } from "@/types/subscription.types";
import { formatCurrency } from "@/lib/utils/format-subscription";
import { PackageWiseRevenueTable } from "./PackageWiseRevenueTable";

interface OverviewPanelProps {
  label: string;
  data: IOverviewCard;
}

export function OverviewPanel({ label, data }: OverviewPanelProps) {
  return (
    <div className="relative rounded-2xl bg-gray-100 border border-border dark:bg-slate-950 p-6 pt-8 shadow-sm hover:shadow-xl hover:scale-105 ease-in-out transform transition-transform duration-500">
      <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-linear-to-r from-slate-900 to-cyan-700 px-4 py-1 text-[11px] font-bold uppercase tracking-widest text-white shadow-sm">
        {label}
      </span>

      <div className="space-y-1">
        <p className="text-sm text-foreground">
          Subscriptions: <span className="font-semibold text-foreground">{data.subscriptions.toLocaleString()}</span>
        </p>
        <p className="text-sm text-foreground">
          Revenues:{" "}
          <span className="font-semibold text-cyan-700 dark:text-cyan-400">
            {formatCurrency(data.revenue)}
          </span>
        </p>
      </div>

      <div className="mt-4 border-t border-border pt-4">
        <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-3">
          Package Wise Revenue
        </h4>
        <PackageWiseRevenueTable items={data.packageWiseRevenue} />
      </div>
    </div>
  );
}
