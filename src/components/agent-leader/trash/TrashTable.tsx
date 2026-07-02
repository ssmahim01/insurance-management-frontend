"use client";

import { format } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IUser } from "@/types/user.types";
import { TrashStatusBadge } from "./TrashStatusBadge";
import { TrashActions } from "./TrashActions";

interface TrashTableProps {
  items: IUser[];
  isLoading: boolean;
  onRestore: (id: string) => void;
  onPermanentDelete: (id: string) => void;
}

const COLUMNS = [
  "Profile",
  "Name",
  "Phone",
  "Email",
  "Deleted Date",
  "Created Date",
  "Status",
  "Actions",
] as const;

export function TrashTable({ items, isLoading, onRestore, onPermanentDelete }: TrashTableProps) {
  if (isLoading) {
    return (
      <div className="rounded-lg border border-border overflow-hidden overflow-x-auto">
        <table className="w-full min-w-[720px]">
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
      <Table className="min-w-[720px]">
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
                <Avatar className="h-8 w-8">
                  <AvatarImage src={item.picture} alt={item.name} />
                  <AvatarFallback className="text-xs font-semibold">
                    {item.name?.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell className="text-sm font-medium text-foreground">
                {item.name}
              </TableCell>
              <TableCell className="text-sm text-foreground">{item.phone}</TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {item.email || "—"}
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {/* Proxy via updatedAt — see caveat in TrashStatsCards */}
                {item.updatedAt ? format(new Date(item.updatedAt), "MMM dd, yyyy") : "—"}
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {item.createdAt ? format(new Date(item.createdAt), "MMM dd, yyyy") : "—"}
              </TableCell>
              <TableCell>
                <TrashStatusBadge status={item.isActive ?? undefined} />
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