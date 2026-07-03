"use client";

import { UserCog } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ISubscription } from "@/types/subscription.types";
import {
  formatCurrency,
  formatDate,
  getNestedName,
  getNestedPhone,
} from "@/lib/utils/format-subscription";
import { SubscriptionStatusBadge } from "@/components/agent-leader/customer-subscriptions/SubscriptionStatusBadge";
import { PaymentStatusBadge } from "@/components/agent-leader/customer-subscriptions/PaymentStatusBadge";
import { TrashActions } from "@/components/shared/trash/TrashActions";

interface SubscriptionTrashTableProps {
  items: ISubscription[];
  isLoading: boolean;
  onRestore: (id: string) => void;
  onPermanentDelete: (id: string) => void;
}

const COLUMNS = [
  "Customer",
  "Phone",
  "Package",
  "Plan",
  "Price",
  "Payment",
  "Status",
  "Created By",
  "Deleted Date",
  "Actions",
] as const;

export function SubscriptionTrashTable({
  items,
  isLoading,
  onRestore,
  onPermanentDelete,
}: SubscriptionTrashTableProps) {
  if (isLoading) {
    return (
      <div className="bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden overflow-x-auto">
        <table className="w-full min-w-240">
          <thead className="bg-slate-50 dark:bg-slate-800/50">
            <tr>
              {COLUMNS.map((col) => (
                <th
                  key={col}
                  className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[...Array(5)].map((_, i) => (
              <tr key={i} className="border-t border-border bg-slate-50 dark:bg-slate-800/50">
                {COLUMNS.map((col) => (
                  <td key={col} className="px-6 py-4">
                    <div className="h-3 w-20 bg-muted rounded animate-pulse" />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden overflow-x-auto">
      <Table className="min-w-240">
        <TableHeader className="sticky top-0 bg-slate-50 dark:bg-slate-800/50">
          <TableRow className="border-b border-border hover:bg-transparent">
            {COLUMNS.map((col) => (
              <TableHead
                key={col}
                className={`font-semibold text-foreground whitespace-nowrap ${
                  col === "Actions" ? "text-right" : ""
                }`}
              >
                {col}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => {
            const customerName = getNestedName(item.customer);
            const customerPhone = getNestedPhone(item.customer);
            return (
              <TableRow
                key={item._id}
                className="border-b border-border transition-colors hover:bg-muted/30"
              >
                <TableCell className="text-sm font-medium text-foreground">
                  {customerName}
                </TableCell>
                <TableCell className="text-sm text-muted-foreground whitespace-nowrap">
                  {customerPhone ?? "—"}
                </TableCell>
                <TableCell className="text-sm text-muted-foreground max-w-40 truncate">
                  {getNestedName(item.package)}
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="font-normal">
                    {item.planType}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm font-medium text-foreground whitespace-nowrap">
                  {formatCurrency(item.price)}
                </TableCell>
                <TableCell>
                  <PaymentStatusBadge status={item.paymentStatus} />
                </TableCell>
                <TableCell>
                  <SubscriptionStatusBadge status={item.status} />
                </TableCell>
                <TableCell>
                  <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <UserCog className="h-3.5 w-3.5 shrink-0" />
                    {getNestedName(item.createdBy)}
                  </span>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground whitespace-nowrap">
                  {/* No dedicated deletedAt field on Subscription — same
                      updatedAt proxy caveat as the Agent Leader trash table. */}
                  {formatDate(item.updatedAt)}
                </TableCell>
                <TableCell className="text-right">
                  <TrashActions
                    onRestore={() => onRestore(item._id)}
                    onPermanentDelete={() => onPermanentDelete(item._id)}
                  />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}