// components/subscription/SubscriptionDetailsModal.tsx

"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ISubscription } from "@/types/subscription.types";

const formatDate = (iso?: string | null) => {
  if (!iso) return "—";
  return new Date(iso).toLocaleString("en-GB", {
    day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit",
  });
};

const formatCurrency = (n?: number) => `৳${(n ?? 0).toLocaleString("en-BD")}`;

const getNested = (v: any, field = "name"): string => {
  if (!v) return "—";
  if (typeof v === "string") return v;
  return v[field] ?? "—";
};

function Field({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div>
      <p className="text-[10px] font-bold tracking-widest uppercase text-slate-400">{label}</p>
      <p className="text-sm text-slate-800 dark:text-slate-200 mt-1">{value}</p>
    </div>
  );
}

export function SubscriptionDetailsModal({
  open,
  onOpenChange,
  item,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  item: ISubscription;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader className="text-center">
          <DialogTitle className="uppercase tracking-widest text-sm">
            Subscription Details
          </DialogTitle>
        </DialogHeader>

        <Separator />

        <div className="space-y-4">
          <p className="text-[10px] font-bold tracking-widest uppercase text-slate-400">Customer</p>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Name" value={getNested(item.customer)} />
            <Field label="Phone" value={getNested(item.customer, "phone")} />
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <p className="text-[10px] font-bold tracking-widest uppercase text-slate-400">Package</p>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Package" value={getNested(item.package)} />
            <Field label="Plan Type" value={<Badge variant="outline">{item.planType}</Badge>} />
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <p className="text-[10px] font-bold tracking-widest uppercase text-slate-400">Billing</p>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Price" value={formatCurrency(item.price)} />
            <Field label="Payment Status" value={item.paymentStatus} />
            <Field label="Transaction ID" value={item.transactionId ?? "—"} />
            <Field label="Auto Renew" value={item.autoRenew ? "Yes" : "No"} />
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <p className="text-[10px] font-bold tracking-widest uppercase text-slate-400">Duration</p>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Status" value={item.status} />
            <Field label="Start Date" value={formatDate(item.startDate)} />
            <Field label="End Date" value={item.isLifetime ? "Lifetime" : formatDate(item.endDate)} />
            <Field label="Created By" value={getNested(item.createdBy)} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}