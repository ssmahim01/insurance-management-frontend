"use client";

import { format } from "date-fns";
import { CreditCard } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IPayment } from "@/redux/features/payment/payment.api";
import { TrashActions } from "@/components/shared/trash/TrashActions";

interface PaymentTrashTableProps {
  items: IPayment[];
  isLoading: boolean;
  onRestore: (id: string) => void;
  onPermanentDelete: (id: string) => void;
}

const COLUMNS = [
  "Transaction",
  "Customer",
  "Plan",
  "Amount",
  "Deleted Date",
  "Created Date",
  "Status",
  "Actions",
] as const;

const STATUS_STYLES: Record<string, string> = {
  UNPAID: "bg-amber-100 text-amber-700",
  PAID: "bg-emerald-100 text-emerald-700",
  COMPLETED: "bg-emerald-100 text-emerald-700",
  FAILED: "bg-red-100 text-red-700",
  CANCELLED: "bg-slate-100 text-slate-600",
  REFUNDED: "bg-blue-100 text-blue-700",
};

function PaymentStatusBadge({ status }: { status?: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
        STATUS_STYLES[status ?? ""] ?? "bg-slate-100 text-slate-600"
      }`}
    >
      {status ?? "—"}
    </span>
  );
}

const formatAmount = (amount?: number) =>
  new Intl.NumberFormat("en-BD", { style: "currency", currency: "BDT" }).format(
    amount ?? 0,
  );

const getCustomerInfo = (payment: IPayment): { name: string; phone: string } => {
  const sub = payment.subscription;
  if (!sub || typeof sub === "string") return { name: "—", phone: "—" };

  const customer = (sub as any).customer;
  if (!customer || typeof customer === "string") return { name: "—", phone: "—" };

  return {
    name: customer.name ?? "—",
    phone: customer.phone ?? "—",
  };
};

export function PaymentTrashTable({
  items,
  isLoading,
  onRestore,
  onPermanentDelete,
}: PaymentTrashTableProps) {
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

  if (items.length === 0) return null;

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
            const planType =
              typeof item.subscription === "string"
                ? undefined
                : item.subscription?.planType;

            const { name: customerName, phone: customerPhone } = getCustomerInfo(item);

            return (
              <TableRow
                key={item._id}
                className="border-b border-border transition-colors hover:bg-muted/30"
              >
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-md bg-linear-to-br from-violet-400 to-purple-600 flex items-center justify-center text-white shrink-0">
                      <CreditCard className="w-3.5 h-3.5" />
                    </div>
                    <p className="text-sm font-medium text-foreground font-mono truncate max-w-36">
                      {item.transactionId}
                    </p>
                  </div>
                </TableCell>

                <TableCell>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground truncate max-w-32">
                      {customerName}
                    </p>
                    <p className="text-xs text-muted-foreground font-mono truncate max-w-32">
                      {customerPhone}
                    </p>
                  </div>
                </TableCell>

                <TableCell className="text-sm text-muted-foreground">
                  {planType ?? "—"}
                </TableCell>

                <TableCell className="text-sm font-medium text-foreground">
                  {formatAmount(item.amount)}
                </TableCell>

                <TableCell className="text-sm text-muted-foreground">
                  {item.updatedAt ? format(new Date(item.updatedAt), "MMM dd, yyyy") : "—"}
                </TableCell>

                <TableCell className="text-sm text-muted-foreground">
                  {item.createdAt ? format(new Date(item.createdAt), "MMM dd, yyyy") : "—"}
                </TableCell>

                <TableCell>
                  <PaymentStatusBadge status={item.status} />
                </TableCell>

                <TableCell className="text-right">
                  <TrashActions
                    onRestore={() => onRestore(item._id as string)}
                    onPermanentDelete={() => onPermanentDelete(item._id as string)}
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