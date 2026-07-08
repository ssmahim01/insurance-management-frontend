// NotificationTrashTable.tsx
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
import { INotification } from "@/redux/features/notification/notification.api";
import { TrashActions } from "@/components/shared/trash/TrashActions";

interface NotificationTrashTableProps {
  items: INotification[];
  isLoading: boolean;
  onRestore: (id: string) => void;
  onPermanentDelete: (id: string) => void;
}

const COLUMNS = [
  "Notification",
  "User",
  "Phone",
  "Sent Date",
  "Deleted Date",
  "Status",
  "Actions",
] as const;

const getUserName = (user: INotification["user"]) =>
  typeof user === "string" ? user : user?.name;

const getUserPhone = (user: INotification["user"]) =>
  typeof user === "string" ? undefined : user?.phone;

function NotificationStatusBadge({ isRead }: { isRead?: boolean }) {
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

export function NotificationTrashTable({
  items,
  isLoading,
  onRestore,
  onPermanentDelete,
}: NotificationTrashTableProps) {
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
              <TableCell className="max-w-52">
                <p className="text-sm font-medium text-foreground truncate">{item.title}</p>
                <p className="text-xs text-muted-foreground truncate">{item.message}</p>
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {getUserName(item.user) ?? "—"}
              </TableCell>
              <TableCell className="text-sm text-foreground font-mono">
                {getUserPhone(item.user) ?? "—"}
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {item.createdAt ? format(new Date(item.createdAt), "MMM dd, yyyy") : "—"}
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {item.updatedAt ? format(new Date(item.updatedAt), "MMM dd, yyyy") : "—"}
              </TableCell>
              <TableCell>
                <NotificationStatusBadge isRead={item.isRead} />
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