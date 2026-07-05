"use client";

import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { FileText } from "lucide-react";
import { IClaim, ClaimStatus } from "@/types/claim.types";
import { TrashActions } from "@/components/shared/trash/TrashActions";

interface ClaimTrashTableProps {
  items: IClaim[];
  isLoading: boolean;
  onRestore: (id: string) => void;
  onPermanentDelete: (id: string) => void;
}

const COLUMNS = [
  "Service",
  "Customer",
  "Attachments",
  "Deleted Date",
  "Submitted Date",
  "Status",
  "Actions",
] as const;

const STATUS_STYLES: Record<ClaimStatus, string> = {
  [ClaimStatus.PENDING]: "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-800 dark:bg-amber-900/20 dark:text-amber-400",
  [ClaimStatus.APPROVED]: "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-400",
  [ClaimStatus.REJECTED]: "border-red-200 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-900/20 dark:text-red-400",
  [ClaimStatus.ALL]: "border-slate-200 bg-slate-50 text-slate-700 dark:border-slate-800 dark:bg-slate-900/20 dark:text-slate-400",
};

const getCustomerName = (claim: IClaim) =>
  typeof claim.customer === "object" ? claim.customer.name : "—";

export function ClaimTrashTable({
  items,
  isLoading,
  onRestore,
  onPermanentDelete,
}: ClaimTrashTableProps) {
  if (isLoading) {
    return (
      <div className="rounded-lg border border-border overflow-hidden overflow-x-auto">
        <table className="w-full min-w-180">
          <thead className="bg-muted/50">
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
              <tr key={i} className="border-t border-border">
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
    <div className="rounded-lg border border-border overflow-hidden overflow-x-auto">
      <Table className="min-w-180">
        <TableHeader className="bg-muted/50 sticky top-0">
          <TableRow className="border-b border-border hover:bg-transparent">
            {COLUMNS.map((col) => (
              <TableHead
                key={col}
                className={`font-semibold text-foreground ${col === "Actions" ? "text-right" : ""}`}
              >
                {col}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <TableRow
              key={item._id}
              className="border-b border-border transition-colors hover:bg-muted/30"
            >
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-linear-to-br from-blue-400 to-indigo-600 flex items-center justify-center shrink-0">
                    <FileText className="w-3.5 h-3.5 text-white" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground truncate max-w-44">{item.serviceTitle}</p>
                    <p className="text-xs text-muted-foreground truncate max-w-44">{item.description}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell className="text-sm text-foreground">
                {getCustomerName(item)}
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {item.attachments?.length ?? 0}
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {/* No dedicated deletedAt field — updatedAt proxy,
                    same caveat as other trash tables. */}
                {item.updatedAt ? format(new Date(item.updatedAt), "MMM dd, yyyy") : "—"}
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {item.createdAt ? format(new Date(item.createdAt), "MMM dd, yyyy") : "—"}
              </TableCell>
              <TableCell>
                <Badge variant="outline" className={STATUS_STYLES[item.status]}>
                  {item.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <TrashActions
                  onRestore={() => onRestore(item._id as string)}
                  onPermanentDelete={() => onPermanentDelete(item._id as string)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}