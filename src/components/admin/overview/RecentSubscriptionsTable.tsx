"use client"

import { History } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IRecentSubscription } from "@/types/dashboard";
import { formatCurrency } from "@/lib/utils/format-subscription";
import { formatDate, getInitials } from "@/utils/format-dashboard";
import { PaymentStatus, SubscriptionStatus } from "@/types/subscription.types";
import { PaymentStatusBadge } from "@/components/shared/subscriptions/PaymentStatusBadge";
import { SubscriptionStatusBadge } from "@/components/shared/subscriptions/SubscriptionStatusBadge";
import { DashboardSectionCard } from "./DashboardSectionCard";
import { SectionEmptyState } from "./SectionEmptyState";

interface RecentSubscriptionsTableProps {
  items: IRecentSubscription[];
}

export function RecentSubscriptionsTable({ items }: RecentSubscriptionsTableProps) {
  return (
    <DashboardSectionCard title="Recent Subscriptions" icon={History}>
      {items.length === 0 ? (
        <SectionEmptyState message="No recent subscriptions." />
      ) : (
        <div className="rounded-lg border border-border overflow-hidden overflow-x-auto">
          <Table className="min-w-175">
            <TableHeader className="bg-muted/40">
              <TableRow className="hover:bg-transparent">
                <TableHead className="font-semibold text-foreground">Customer</TableHead>
                <TableHead className="font-semibold text-foreground">Package</TableHead>
                <TableHead className="font-semibold text-foreground">Amount</TableHead>
                <TableHead className="font-semibold text-foreground">Payment</TableHead>
                <TableHead className="font-semibold text-foreground">Status</TableHead>
                <TableHead className="font-semibold text-foreground">Agent</TableHead>
                <TableHead className="font-semibold text-foreground whitespace-nowrap">Created</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((sub) => (
                <TableRow key={sub._id} className="transition-colors hover:bg-muted/30">
                  <TableCell>
                    <div className="flex items-center gap-2.5">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={sub.customerPicture} alt={sub.customerName} />
                        <AvatarFallback className="text-xs font-semibold">
                          {getInitials(sub.customerName)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-foreground truncate max-w-32">{sub.customerName}</p>
                        <p className="text-xs text-muted-foreground truncate max-w-32">{sub.customerPhone}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground max-w-36 truncate">{sub.packageName}</TableCell>
                  <TableCell className="text-sm font-semibold text-foreground whitespace-nowrap">
                    {formatCurrency(sub.amount)}
                  </TableCell>
                  <TableCell>
                    <PaymentStatusBadge status={sub.paymentStatus as PaymentStatus} />
                  </TableCell>
                  <TableCell>
                    <SubscriptionStatusBadge status={sub.subscriptionStatus as SubscriptionStatus} />
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground whitespace-nowrap">{sub.agentName}</TableCell>
                  <TableCell className="text-sm text-muted-foreground whitespace-nowrap">
                    {formatDate(sub.createdAt)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </DashboardSectionCard>
  );
}