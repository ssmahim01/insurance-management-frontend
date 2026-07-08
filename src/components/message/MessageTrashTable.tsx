// MessageTrashTable.tsx
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
import { IMessage } from "@/redux/features/message/message.api";
import { TrashActions } from "@/components/shared/trash/TrashActions";

interface MessageTrashTableProps {
  items: IMessage[];
  isLoading: boolean;
  onRestore: (id: string) => void;
  onPermanentDelete: (id: string) => void;
}

const COLUMNS = [
  "Message",
  "Phone",
  "Sent Date",
  "Deleted Date",
  "Actions",
] as const;

export function MessageTrashTable({
  items,
  isLoading,
  onRestore,
  onPermanentDelete,
}: MessageTrashTableProps) {
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
              <TableCell className="text-sm font-medium text-foreground truncate max-w-72">
                {item.message}
              </TableCell>
              <TableCell className="text-sm text-foreground font-mono">
                {item.phone ?? "—"}
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {item.createdAt ? format(new Date(item.createdAt), "MMM dd, yyyy") : "—"}
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {item.updatedAt ? format(new Date(item.updatedAt), "MMM dd, yyyy") : "—"}
              </TableCell>
              <TableCell className="text-right">
                <TrashActions
                  onRestore={() => onRestore(item._id)}
                  onPermanentDelete={() => onPermanentDelete(item._id)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}