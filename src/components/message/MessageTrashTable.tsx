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
import { Badge } from "@/components/ui/badge";
import { IMessage, MessageType } from "@/redux/features/message/message.api";
import { TrashActions } from "@/components/shared/trash/TrashActions";

interface MessageTrashTableProps {
  items: IMessage[];
  isLoading: boolean;
  onRestore: (id: string) => void;
  onPermanentDelete: (id: string) => void;
}

const COLUMNS = [
  "Message",
  "Type",
  "Phone",
  "Sent Date",
  "Deleted Date",
  "Actions",
] as const;

const MESSAGE_TYPE_LABELS: Record<MessageType, string> = {
  [MessageType.SUBSCRIPTION]: "Subscription",
  [MessageType.PAYMENT]: "Payment",
  [MessageType.CLAIM]: "Claim",
  [MessageType.PROMOTIONAL]: "Promotional",
  [MessageType.GENERAL]: "General",
  [MessageType.OTP]: "OTP",
};

const MESSAGE_TYPE_COLORS: Record<MessageType, string> = {
  [MessageType.SUBSCRIPTION]:
    "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-900/20 dark:text-blue-400",
  [MessageType.PAYMENT]:
    "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-400",
  [MessageType.CLAIM]:
    "border-purple-200 bg-purple-50 text-purple-700 dark:border-purple-800 dark:bg-purple-900/20 dark:text-purple-400",
  [MessageType.PROMOTIONAL]:
    "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-800 dark:bg-amber-900/20 dark:text-amber-400",
  [MessageType.GENERAL]:
    "border-slate-200 bg-slate-50 text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400",
  [MessageType.OTP]:
    "border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-800 dark:bg-rose-900/20 dark:text-rose-400",
};

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
              <TableCell>
                {item.type ? (
                  <Badge
                    variant="outline"
                    className={`whitespace-nowrap ${MESSAGE_TYPE_COLORS[item.type]}`}
                  >
                    {MESSAGE_TYPE_LABELS[item.type]}
                  </Badge>
                ) : (
                  "—"
                )}
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