import { PackagePlus } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IPackageWiseRevenue } from "@/types/subscription.types";
import { formatCurrency } from "@/lib/utils/format-subscription";

interface PackageWiseRevenueTableProps {
  items: IPackageWiseRevenue[];
}

export function PackageWiseRevenueTable({ items }: PackageWiseRevenueTableProps) {
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-center">
        <div className="h-12 w-12 rounded-full bg-linear-to-br from-indigo-500/10 to-blue-500/5 flex items-center justify-center mb-3">
          <PackagePlus className="h-5 w-5 text-indigo-500/60" />
        </div>
        <p className="text-sm font-medium text-foreground mb-1">No revenue yet for this period</p>
        <p className="text-xs text-muted-foreground max-w-xs">
          Package-wise revenue will appear here once subscriptions come in.
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Desktop table */}
      <div className="hidden md:block rounded-lg border border-border overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/40">
            <TableRow className="hover:bg-transparent border-b border-border">
              <TableHead className="text-xs font-semibold text-foreground py-3">
                Package Name
              </TableHead>
              <TableHead className="text-xs font-semibold text-foreground py-3">
                Total Revenue
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item, idx) => (
              <TableRow
                key={item.packageId ?? `unknown-${idx}`}
                className={`border-b border-border/60 last:border-0 transition-colors duration-200 hover:bg-indigo-50/70 dark:hover:bg-indigo-950/20 ${
                  idx % 2 === 1 ? "bg-muted/20" : ""
                }`}
              >
                <TableCell className="py-3 text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                  {item.packageName ?? "Unknown Package"}
                </TableCell>
                <TableCell className="py-3 text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                  {formatCurrency(item.totalRevenue)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden space-y-2">
        {items.map((item, idx) => (
          <div
            key={item.packageId ?? `unknown-${idx}`}
            className="flex items-center justify-between rounded-lg border border-border bg-card px-3.5 py-3 transition-all duration-200 hover:shadow-sm"
          >
            <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 truncate pr-3">
              {item.packageName ?? "Unknown Package"}
            </p>
            <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 shrink-0">
              {formatCurrency(item.totalRevenue)}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}