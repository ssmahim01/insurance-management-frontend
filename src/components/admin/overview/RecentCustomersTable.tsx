"use client"

import { Users } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IRecentCustomer } from "@/types/dashboard";
import { formatCurrency } from "@/lib/utils/format-subscription";
import { formatDate, getInitials } from "@/utils/format-dashboard";
import { DashboardSectionCard } from "./DashboardSectionCard";
import { SectionEmptyState } from "./SectionEmptyState";

interface RecentCustomersTableProps {
  items: IRecentCustomer[];
}

export function RecentCustomersTable({ items }: RecentCustomersTableProps) {
  return (
    <DashboardSectionCard title="Recent Customers" icon={Users}>
      {items.length === 0 ? (
        <SectionEmptyState message="No recent customers." />
      ) : (
        <div className="rounded-lg border border-border overflow-hidden overflow-x-auto">
          <Table className="min-w-150">
            <TableHeader className="bg-muted/40">
              <TableRow className="hover:bg-transparent">
                <TableHead className="font-semibold text-foreground">Customer</TableHead>
                <TableHead className="font-semibold text-foreground">Phone</TableHead>
                <TableHead className="font-semibold text-foreground text-right">Subscriptions</TableHead>
                <TableHead className="font-semibold text-foreground text-right">Total Spent</TableHead>
                <TableHead className="font-semibold text-foreground">Created By</TableHead>
                <TableHead className="font-semibold text-foreground whitespace-nowrap">Joined</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((customer) => (
                <TableRow key={customer._id} className="transition-colors hover:bg-muted/30">
                  <TableCell>
                    <div className="flex items-center gap-2.5">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={customer.picture} alt={customer.name} />
                        <AvatarFallback className="text-xs font-semibold">
                          {getInitials(customer.name)}
                        </AvatarFallback>
                      </Avatar>
                      <p className="text-sm font-medium text-foreground truncate max-w-32">{customer.name}</p>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground whitespace-nowrap">{customer.phone}</TableCell>
                  <TableCell className="text-right text-sm text-foreground tabular-nums">
                    {customer.totalSubscriptions.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right text-sm font-semibold text-cyan-700 dark:text-cyan-400 tabular-nums">
                    {formatCurrency(customer.totalSpent)}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{customer.createdBy || "—"}</TableCell>
                  <TableCell className="text-sm text-muted-foreground whitespace-nowrap">
                    {formatDate(customer.createdAt)}
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