// BranchTrashTable.tsx
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
import { IPartnerBranch } from "@/types/branch.types";
import { TrashActions } from "@/components/shared/trash/TrashActions";

interface BranchTrashTableProps {
  items: IPartnerBranch[];
  isLoading: boolean;
  onRestore: (id: string) => void;
  onPermanentDelete: (id: string) => void;
}

const COLUMNS = [
  "Branch",
  "Partner",
  "Phone",
  "Email",
  "Address",
  "Deleted Date",
  "Status",
  "Actions",
] as const;

function BranchStatusBadge({ isActive }: { isActive?: boolean }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
        isActive
          ? "bg-green-100 text-green-700"
          : "bg-red-100 text-red-700"
      }`}
    >
      {isActive ? "Active" : "Inactive"}
    </span>
  );
}

export function BranchTrashTable({
  items,
  isLoading,
  onRestore,
  onPermanentDelete,
}: BranchTrashTableProps) {
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
          {items.map((item) => {
            const partnerName =
              typeof item.partner === "string" ? item.partner : (item.partner as any)?.name;

            return (
              <TableRow
                key={String(item._id)}
                className="border-b border-border transition-colors hover:bg-muted/30"
              >
                <TableCell className="text-sm font-medium text-foreground">
                  {item.branchName}
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {partnerName ?? "—"}
                </TableCell>
                <TableCell className="text-sm text-foreground">
                  {item.phone ?? "—"}
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {item.email ?? "—"}
                </TableCell>
                <TableCell className="text-sm text-muted-foreground truncate max-w-40">
                  {item.address ?? "—"}
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {item.updatedAt ? format(new Date(item.updatedAt), "MMM dd, yyyy") : "—"}
                </TableCell>
                <TableCell>
                  <BranchStatusBadge isActive={item.isActive} />
                </TableCell>
                <TableCell className="text-right">
                  <TrashActions
                    onRestore={() => onRestore(String(item._id))}
                    onPermanentDelete={() => onPermanentDelete(String(item._id))}
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