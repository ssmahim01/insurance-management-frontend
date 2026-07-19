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

import { IContact } from "@/types/contact.type";
import { TrashActions } from "@/components/shared/trash/TrashActions";

interface ContactTrashTableProps {
  items: IContact[];
  isLoading: boolean;
  onRestore: (id: string) => void;
  onPermanentDelete: (id: string) => void;
}

const COLUMNS = [
  "Contact",
  "Phone",
  "Subject",
  "Sent Date",
  "Deleted Date",
  "Status",
  "Actions",
] as const;

function ContactStatusBadge({
  isRead,
}: {
  isRead?: boolean;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
        isRead
          ? "bg-green-100 text-green-700"
          : "bg-slate-100 text-slate-700"
      }`}
    >
      {isRead ? "Read" : "Unread"}
    </span>
  );
}

export function ContactTrashTable({
  items,
  isLoading,
  onRestore,
  onPermanentDelete,
}: ContactTrashTableProps) {
  // -----------------------------
  // Loading Skeleton
  // -----------------------------
  if (isLoading) {
    return (
      <div className="overflow-hidden overflow-x-auto rounded-lg border border-border">
        <table className="w-full min-w-180">
          <thead className="bg-muted/50">
            <tr>
              {COLUMNS.map((column) => (
                <th
                  key={column}
                  className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground"
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {Array.from({ length: 5 }).map((_, index) => (
              <tr
                key={index}
                className="border-t border-border"
              >
                {COLUMNS.map((column) => (
                  <td
                    key={column}
                    className="px-6 py-4"
                  >
                    <div className="h-3 w-20 animate-pulse rounded bg-muted" />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  // -----------------------------
  // Table
  // -----------------------------
  return (
    <div className="overflow-hidden overflow-x-auto rounded-lg border border-border">
      <Table className="min-w-180">
        <TableHeader className="bg-muted/50">
          <TableRow className="border-b border-border hover:bg-transparent">
            {COLUMNS.map((column) => (
              <TableHead
                key={column}
                className={`font-semibold text-foreground ${
                  column === "Actions"
                    ? "text-right"
                    : ""
                }`}
              >
                {column}
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
              {/* Contact */}
              <TableCell className="max-w-52.5">
                <p className="truncate text-sm font-medium text-foreground">
                  {item.name || "—"}
                </p>

                <p className="truncate text-xs text-muted-foreground">
                  {item.email || "—"}
                </p>
              </TableCell>

              {/* Phone */}
              <TableCell className="font-mono text-sm text-foreground">
                {item.phone || "—"}
              </TableCell>

              {/* Subject */}
              <TableCell className="max-w-47.5 truncate text-sm text-muted-foreground">
                {item.subject || "—"}
              </TableCell>

              {/* Sent Date */}
              <TableCell className="text-sm text-muted-foreground">
                {item.createdAt
                  ? format(
                      new Date(item.createdAt),
                      "MMM dd, yyyy",
                    )
                  : "—"}
              </TableCell>

              {/* Deleted Date */}
              <TableCell className="text-sm text-muted-foreground">
                {item.updatedAt
                  ? format(
                      new Date(item.updatedAt),
                      "MMM dd, yyyy",
                    )
                  : "—"}
              </TableCell>

              {/* Status */}
              <TableCell>
                <ContactStatusBadge
                  isRead={item.isRead}
                />
              </TableCell>

              {/* Actions */}
              <TableCell className="text-right">
                <TrashActions
                  onRestore={() =>
                    onRestore(item._id)
                  }
                  onPermanentDelete={() =>
                    onPermanentDelete(item._id)
                  }
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}