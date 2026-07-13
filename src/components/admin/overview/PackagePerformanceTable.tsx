"use client";

import { useMemo, useState } from "react";
import { ArrowUpDown, LayoutGrid } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IDashboardPackageRevenue } from "@/types/dashboard";
import { formatCurrency } from "@/lib/utils/format-subscription";
import { DashboardSectionCard } from "./DashboardSectionCard";
import { SectionEmptyState } from "./SectionEmptyState";

interface PackagePerformanceTableProps {
  items: IDashboardPackageRevenue[];
}

type SortField = "totalRevenue" | "subscriptions" | "averageRevenue";

export function PackagePerformanceTable({ items }: PackagePerformanceTableProps) {
  const [sortField, setSortField] = useState<SortField>("totalRevenue");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  const sorted = useMemo(() => {
    return [...items].sort((a, b) =>
      sortDir === "desc" ? b[sortField] - a[sortField] : a[sortField] - b[sortField],
    );
  }, [items, sortField, sortDir]);

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortDir((d) => (d === "desc" ? "asc" : "desc"));
    } else {
      setSortField(field);
      setSortDir("desc");
    }
  };

  const SortableHead = ({ field, label }: { field: SortField; label: string }) => (
    <TableHead
      className="cursor-pointer select-none text-right font-semibold text-foreground"
      onClick={() => handleSort(field)}
    >
      <span className="inline-flex items-center gap-1 justify-end w-full hover:text-cyan-700 dark:hover:text-cyan-400 transition-colors">
        {label}
        <ArrowUpDown className="h-3 w-3" />
      </span>
    </TableHead>
  );

  return (
    <DashboardSectionCard title="Package Performance" icon={LayoutGrid}>
      {items.length === 0 ? (
        <SectionEmptyState message="No packages to display." />
      ) : (
        <div className="rounded-lg border border-border overflow-hidden overflow-x-auto">
          <Table className="min-w-150">
            <TableHeader className="bg-muted/40">
              <TableRow className="hover:bg-transparent">
                <TableHead className="font-semibold text-foreground">Package Name</TableHead>
                <SortableHead field="totalRevenue" label="Total Revenue" />
                <SortableHead field="subscriptions" label="Subscriptions" />
                <SortableHead field="averageRevenue" label="Avg. Revenue" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {sorted.map((pkg) => (
                <TableRow key={pkg.packageId} className="transition-colors hover:bg-muted/30">
                  <TableCell className="font-medium text-foreground">{pkg.packageName}</TableCell>
                  <TableCell className="text-right font-semibold text-cyan-700 dark:text-cyan-400 tabular-nums">
                    {formatCurrency(pkg.totalRevenue)}
                  </TableCell>
                  <TableCell className="text-right text-muted-foreground tabular-nums">
                    {pkg.subscriptions.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right text-muted-foreground tabular-nums">
                    {formatCurrency(pkg.averageRevenue)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </DashboardSectionCard>
  );
}