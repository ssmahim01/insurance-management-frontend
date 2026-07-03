/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { User, Users } from "lucide-react";
import { ISubscription, SubscribeFor } from "@/types/subscription.types";

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
  const isForOther = item.subscribeFor === SubscribeFor.OTHER && !!item.beneficiary;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-10/12 overflow-y-auto">
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
          <div className="flex items-center justify-between">
            <p className="text-[10px] font-bold tracking-widest uppercase text-slate-400">Subscribed For</p>
            <Badge
              variant="outline"
              className={
                isForOther
                  ? "border-violet-200 bg-violet-50 text-violet-700 dark:border-violet-800 dark:bg-violet-900/20 dark:text-violet-400"
                  : "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
              }
            >
              {isForOther ? (
                <span className="inline-flex items-center gap-1">
                  <Users className="w-3 h-3" /> Other
                </span>
              ) : (
                <span className="inline-flex items-center gap-1">
                  <User className="w-3 h-3" /> Self
                </span>
              )}
            </Badge>
          </div>

          {isForOther && (
            <div className="grid grid-cols-2 gap-4 bg-slate-50 dark:bg-slate-800/40 rounded-lg p-3">
              <Field label="Beneficiary Name" value={item.beneficiary?.name} />
              <Field label="Relationship" value={item.beneficiary?.relationship} />
              <Field label="Phone" value={item.beneficiary?.phone} />
              <Field
                label="Date of Birth"
                value={item.beneficiary?.dateOfBirth ? formatDate(item.beneficiary.dateOfBirth) : "—"}
              />
            </div>
          )}
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