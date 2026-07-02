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
import { formatCurrency, formatDate, getNestedName, getNestedPhone } from "@/lib/utils/format-subscription";
import { SubscriptionStatusBadge } from "./SubscriptionStatusBadge";
import { PaymentStatusBadge } from "./PaymentStatusBadge";
import { SubscriptionActions } from "./SubscriptionActions";
import { SubscriptionSkeleton } from "./SubscriptionSkeleton";

interface SubscriptionTableProps {
  subscriptions: ISubscription[];
  isLoading: boolean;
  onViewDetails: (sub: ISubscription) => void;
  onUpdate: (sub: ISubscription) => void;
  onDelete: (sub: ISubscription) => void;
}

const COLUMNS = [
  "Customer", "Phone", "Package", "Plan", "Price", "Payment", "Status",
  "Agent", "Start Date", "End Date", "Created", "Actions",
] as const;

export function SubscriptionTable({ subscriptions, isLoading, onViewDetails, onUpdate, onDelete }: SubscriptionTableProps) {
  return (
    <div className="rounded-lg border border-border overflow-hidden overflow-x-auto">
      <Table className="min-w-[1100px]">
        <TableHeader className="bg-muted/50 sticky top-0">
          <TableRow className="border-b border-border hover:bg-transparent">
            {COLUMNS.map((col) => (
              <TableHead
                key={col}
                className={`font-semibold text-foreground whitespace-nowrap ${col === "Actions" ? "text-right" : ""}`}
              >
                {col}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <SubscriptionSkeleton />
          ) : (
            subscriptions.map((sub) => {
              const customerName = getNestedName(sub.customer);
              const customerPhone = getNestedPhone(sub.customer);
              return (
                <TableRow
                  key={sub._id}
                  className="border-b border-border transition-colors hover:bg-muted/30"
                >
                  <TableCell className="text-sm font-medium text-foreground">{customerName}</TableCell>
                  <TableCell className="text-sm text-muted-foreground whitespace-nowrap">{customerPhone ?? "—"}</TableCell>
                  <TableCell className="text-sm text-muted-foreground max-w-40 truncate">
                    {getNestedName(sub.package)}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="font-normal">{sub.planType}</Badge>
                  </TableCell>
                  <TableCell className="text-sm font-medium text-foreground whitespace-nowrap">
                    {formatCurrency(sub.price)}
                  </TableCell>
                  <TableCell><PaymentStatusBadge status={sub.paymentStatus} /></TableCell>
                  <TableCell><SubscriptionStatusBadge status={sub.status} /></TableCell>
                  <TableCell>
                    <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <UserCog className="h-3.5 w-3.5 shrink-0" />
                      {getNestedName(sub.createdBy)}
                    </span>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground whitespace-nowrap">
                    {formatDate(sub.startDate)}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground whitespace-nowrap">
                    {sub.isLifetime ? <span className="italic text-xs">Lifetime</span> : formatDate(sub.endDate)}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground whitespace-nowrap">
                    {formatDate(sub.createdAt)}
                  </TableCell>
                  <TableCell className="text-right">
                    <SubscriptionActions
                      onViewDetails={() => onViewDetails(sub)}
                      onUpdate={() => onUpdate(sub)}
                      onDelete={() => onDelete(sub)}
                    />
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </div>
  );
}