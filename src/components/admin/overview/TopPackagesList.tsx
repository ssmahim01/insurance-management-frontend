"use client"

import { Trophy } from "lucide-react";
import { IDashboardPackageRevenue } from "@/types/dashboard";
import { formatCurrency } from "@/lib/utils/format-subscription";
import { DashboardSectionCard } from "./DashboardSectionCard";
import { SectionEmptyState } from "./SectionEmptyState";

interface TopPackagesListProps {
  items: IDashboardPackageRevenue[];
}

export function TopPackagesList({ items }: TopPackagesListProps) {
  const maxRevenue = Math.max(...items.map((i) => i.totalRevenue), 1);

  return (
    <DashboardSectionCard title="Top Packages" icon={Trophy}>
      {items.length === 0 ? (
        <SectionEmptyState message="No package revenue yet." />
      ) : (
        <div className="space-y-4">
          {items.map((pkg, idx) => (
            <div key={pkg.packageId}>
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-900 text-[10px] font-bold text-white dark:bg-slate-100 dark:text-slate-900">
                    {idx + 1}
                  </span>
                  <p className="text-sm font-medium text-foreground truncate">{pkg.packageName}</p>
                </div>
                <p className="text-sm font-bold text-cyan-700 dark:text-cyan-400 shrink-0">
                  {formatCurrency(pkg.totalRevenue)}
                </p>
              </div>
              <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full rounded-full bg-linear-to-r from-slate-900 to-cyan-600 transition-all duration-500"
                  style={{ width: `${(pkg.totalRevenue / maxRevenue) * 100}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {pkg.subscriptions.toLocaleString()} subscriptions · avg {formatCurrency(pkg.averageRevenue)}
              </p>
            </div>
          ))}
        </div>
      )}
    </DashboardSectionCard>
  );
}