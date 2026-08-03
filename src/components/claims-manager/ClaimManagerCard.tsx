/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { format } from "date-fns";
import { Calendar, CreditCard, Eye, FileText, Paperclip, Settings2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { IClaim, ClaimStatus, PaymentMethod } from "@/types/claim.types";
import { CLAIM_TITLE_LABELS, PAYMENT_METHOD_LABELS } from "@/lib/utils/claim-labels";

interface ClaimManagerCardProps {
  claim: IClaim;
  onViewDetails: (claim: IClaim) => void;
  onManage: (claim: IClaim) => void;
}

const STATUS_META: Record<ClaimStatus, { label: string; className: string; dot: string }> = {
  [ClaimStatus.PENDING]: {
    label: "Pending",
    className:
      "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-800 dark:bg-amber-900/20 dark:text-amber-400",
    dot: "bg-amber-500",
  },
  [ClaimStatus.APPROVED]: {
    label: "Approved",
    className:
      "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-400",
    dot: "bg-emerald-500",
  },
  [ClaimStatus.REJECTED]: {
    label: "Rejected",
    className:
      "border-red-200 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-900/20 dark:text-red-400",
    dot: "bg-red-500",
  },
  [ClaimStatus.ALL]: {
    label: "All",
    className:
      "border-slate-200 bg-slate-50 text-slate-700 dark:border-slate-800 dark:bg-slate-900/20 dark:text-slate-400",
    dot: "bg-slate-500",
  },
};

const getCustomerName = (claim: IClaim) =>
  typeof claim.customer === "object" ? claim.customer?.name : "—";
const getCustomerPhone = (claim: IClaim) =>
  typeof claim.customer === "object" ? claim.customer?.phone : "—";

function getPackageName(claim: IClaim): string {
  const sub = claim.subscription as any;
  return sub?.package?.name ?? sub?.package?.title ?? "—";
}

function getPaymentSummary(claim: IClaim): string {
  const method = claim.paymentMethod as PaymentMethod | undefined;
  if (!method) return "—";
  if (method === PaymentMethod.BKASH || method === PaymentMethod.NAGAD) {
    return claim.paymentInfo?.mobileNumber ?? PAYMENT_METHOD_LABELS[method];
  }
  if (method === PaymentMethod.BANK) {
    return claim.paymentInfo?.accountNumber
      ? `${claim.paymentInfo.bankName ?? "Bank"} • ${claim.paymentInfo.accountNumber}`
      : PAYMENT_METHOD_LABELS[method];
  }
  return PAYMENT_METHOD_LABELS[method] ?? method;
}

export function ClaimManagerCard({ claim, onViewDetails, onManage }: ClaimManagerCardProps) {
  const meta = STATUS_META[claim.status];
  const claimTitleLabel = CLAIM_TITLE_LABELS[claim.claimTitle] ?? claim.claimTitle;
  const paymentMethodLabel = claim.paymentMethod
    ? PAYMENT_METHOD_LABELS[claim.paymentMethod as PaymentMethod]
    : "—";

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl hover:border-indigo-200 dark:hover:border-indigo-800">
      {/* status accent bar */}
      <div className={`h-1 w-full ${meta.dot}`} />

      <div className="p-5 space-y-4">
        {/* header */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-indigo-500 to-blue-600 shadow-sm">
              <FileText className="h-5 w-5 text-white" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold text-slate-900 dark:text-white truncate">
                {claimTitleLabel}
              </p>
              <p className="text-xs text-slate-400 font-mono">#{String(claim._id).slice(-6)}</p>
            </div>
          </div>
          <Badge variant="outline" className={`shrink-0 ${meta.className}`}>
            <span className={`h-1.5 w-1.5 rounded-full mr-1.5 inline-block ${meta.dot}`} />
            {meta.label}
          </Badge>
        </div>

        {/* body fields */}
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="col-span-2">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">Customer</p>
            <p className="font-medium text-slate-800 dark:text-slate-200 truncate">
              {getCustomerName(claim)}
            </p>
            <p className="text-xs text-slate-400 font-mono">{getCustomerPhone(claim)}</p>
          </div>

          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">Package</p>
            <p className="font-medium text-slate-700 dark:text-slate-300 truncate">
              {getPackageName(claim)}
            </p>
          </div>

          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400 flex items-center gap-1">
              <Calendar className="h-3 w-3" /> Submitted
            </p>
            <p className="font-medium text-slate-700 dark:text-slate-300">
              {claim.createdAt ? format(new Date(claim.createdAt), "MMM dd, yyyy") : "—"}
            </p>
          </div>

          <div className="col-span-2 rounded-lg bg-slate-50 dark:bg-slate-800/50 px-3 py-2">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400 flex items-center gap-1 mb-0.5">
              <CreditCard className="h-3 w-3" /> Payment
            </p>
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs text-slate-600 dark:text-slate-400 truncate">
                {getPaymentSummary(claim)}
              </span>
              <Badge variant="outline" className="shrink-0 text-[10px] font-normal">
                {paymentMethodLabel}
              </Badge>
            </div>
          </div>
        </div>

        {/* footer */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
          <span className="inline-flex items-center gap-1 text-xs text-slate-400">
            <Paperclip className="h-3.5 w-3.5" />
            {claim.attachments?.length ?? 0} file{(claim.attachments?.length ?? 0) !== 1 ? "s" : ""}
          </span>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 transition-all duration-200 hover:shadow-sm hover:-translate-y-0.5 active:scale-95"
              title="View details"
              onClick={() => onViewDetails(claim)}
            >
              <Eye className="h-3.5 w-3.5" />
            </Button>
            <Button
              size="sm"
              className="gap-1.5 bg-linear-to-r from-indigo-600 to-blue-600 text-white hover:from-indigo-700 hover:to-blue-700 transition-all duration-200 ease-out hover:shadow-md hover:-translate-y-0.5 active:scale-95"
              onClick={() => onManage(claim)}
            >
              <Settings2 className="h-3.5 w-3.5" />
              Manage Claim
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}