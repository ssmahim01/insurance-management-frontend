// PaymentDetailsModal.tsx
"use client";

import {
  CreditCard,
  Hash,
  Wallet,
  Calendar,
  ShieldCheck,
  FileText,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

import { IPayment } from "@/redux/features/payment/payment.api";

interface PaymentDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item: IPayment;
}

function Row({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value?: string | number | null;
}) {
  return (
    <div className="flex justify-between items-center py-2 border-b border-border last:border-0">
      <span className="text-sm text-muted-foreground flex items-center gap-1.5">
        <Icon className="w-3.5 h-3.5" />
        {label}
      </span>
      <span className="text-sm font-medium text-foreground text-right">
        {value ?? "—"}
      </span>
    </div>
  );
}

const formatDate = (iso?: string) => {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const formatAmount = (amount: number) =>
  new Intl.NumberFormat("en-BD", { style: "currency", currency: "BDT" }).format(amount ?? 0);

const STATUS_STYLES: Record<string, string> = {
  UNPAID:
    "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-800 dark:bg-amber-900/20 dark:text-amber-400",
  PAID:
    "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-400",
  COMPLETED:
    "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-400",
  FAILED:
    "border-red-200 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-900/20 dark:text-red-400",
  CANCELLED:
    "border-slate-200 bg-slate-50 text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400",
  REFUNDED:
    "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-900/20 dark:text-blue-400",
};

const STATUS_DOT: Record<string, string> = {
  UNPAID: "bg-amber-500",
  PAID: "bg-emerald-500",
  COMPLETED: "bg-emerald-500",
  FAILED: "bg-red-500",
  CANCELLED: "bg-slate-400",
  REFUNDED: "bg-blue-500",
};

function StatusBadge({ status }: { status: string }) {
  return (
    <Badge variant="outline" className={STATUS_STYLES[status] ?? STATUS_STYLES.UNPAID}>
      <span className={`h-1.5 w-1.5 rounded-full mr-1.5 inline-block ${STATUS_DOT[status] ?? STATUS_DOT.UNPAID}`} />
      {status}
    </Badge>
  );
}

export function PaymentDetailsModal({
  open,
  onOpenChange,
  item,
}: PaymentDetailsModalProps) {
  const subscription =
    typeof item.subscription === "string" ? undefined : item.subscription;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] scrollbar-none overflow-y-auto p-6">
        <DialogHeader className="flex flex-col items-center gap-2 pb-2">
          <div className="w-12 h-12 rounded-xl from-violet-500 to-purple-600 flex items-center justify-center shadow-md mb-1">
            <CreditCard className="w-6 h-6 text-white" />
          </div>
          <DialogTitle className="text-xl font-bold tracking-widest uppercase text-center">
            Payment Details
          </DialogTitle>
          <DialogDescription className="text-[#96999A] text-sm tracking-wide">
            Transaction and subscription information
          </DialogDescription>
        </DialogHeader>

        <Separator />

        <div>
          <p className="text-xs font-bold tracking-widest uppercase text-slate-400 mb-3">
            Transaction
          </p>
          <Row icon={Hash} label="Transaction ID" value={item.transactionId} />
          <Row icon={Wallet} label="Amount" value={formatAmount(item.amount)} />
          <Row icon={Calendar} label="Date" value={formatDate(item.createdAt)} />
        </div>

        <Separator />

        <div>
          <p className="text-xs font-bold tracking-widest uppercase text-slate-400 mb-3">
            Subscription
          </p>
          <Row icon={FileText} label="Plan" value={subscription?.planType} />
          <Row
            icon={Calendar}
            label="Duration"
            value={
              subscription?.durationInMonths
                ? `${subscription.durationInMonths} month(s)`
                : "Lifetime"
            }
          />
          <Row
            icon={Wallet}
            label="Plan Price"
            value={subscription?.price !== undefined ? formatAmount(subscription.price) : undefined}
          />
          <Row icon={ShieldCheck} label="Subscription Status" value={subscription?.status} />
        </div>

        <Separator />

        <div className="flex justify-between items-center py-2">
          <span className="text-sm text-muted-foreground">Payment Status</span>
          <StatusBadge status={item.status} />
        </div>
      </DialogContent>
    </Dialog>
  );
}