
"use client";

import React from "react";
import {
  Eye, Edit2, Trash2, ShieldCheck, Calendar, RefreshCw, CircleDollarSign, User,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ISubscription,
  PlanType,
  SubscriptionStatus,
  PaymentStatus,
} from "@/types/subscription.types";
import { getNestedName } from "@/lib/utils/format-subscription";

// ─── Helpers ─────────────────────────────────────────────────────────────────

const PLAN_LABELS: Record<PlanType, string> = {
  [PlanType.MONTHLY]: "Monthly",
  [PlanType.QUARTERLY]: "Quarterly",
  [PlanType.HALF_YEARLY]: "Half-Yearly",
  [PlanType.YEARLY]: "Yearly",
  [PlanType.LIFETIME]: "Lifetime",
};

const formatCurrency = (amount?: number) => {
  if (amount === undefined || amount === null) return "—";
  return `৳ ${Number(amount).toLocaleString()}`;
};

const formatDate = (iso?: string | Date | null) => {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "2-digit", month: "short", year: "numeric",
  });
};

// subscribeFor: "SELF" | "OTHER" — show beneficiary name if OTHER, else "Self"
const getSubscribedForLabel = (sub: ISubscription) => {
  if (sub.subscribeFor === "OTHER" && sub.beneficiary?.name) {
    return sub.beneficiary.name;
  }
  return "Self";
};

type BadgeTone = "green" | "amber" | "slate" | "red" | "blue";

const TONE_CLASSES: Record<BadgeTone, string> = {
  green: "bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800",
  amber: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800",
  slate: "bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700",
  red: "bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800",
  blue: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800",
};

const STATUS_TONE: Record<SubscriptionStatus, BadgeTone> = {
  [SubscriptionStatus.ACTIVE]: "green",
  [SubscriptionStatus.PENDING]: "amber",
  [SubscriptionStatus.EXPIRED]: "slate",
  [SubscriptionStatus.CANCELLED]: "red",
  [SubscriptionStatus.REFUNDED]: "blue",
  [SubscriptionStatus.FAILED]: "red",
};

const PAYMENT_TONE: Record<PaymentStatus, BadgeTone> = {
  [PaymentStatus.PAID]: "green",
  [PaymentStatus.COMPLETED]: "green",
  [PaymentStatus.UNPAID]: "amber",
  [PaymentStatus.FAILED]: "red",
  [PaymentStatus.REFUNDED]: "blue",
};

function Pill({ tone, children }: { tone: BadgeTone; children: React.ReactNode }) {
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium border ${TONE_CLASSES[tone]}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${tone === "green" ? "bg-green-500" : tone === "amber" ? "bg-amber-500" : tone === "red" ? "bg-red-500" : tone === "blue" ? "bg-blue-500" : "bg-slate-400"}`} />
      {children}
    </span>
  );
}

// ─── Skeleton ────────────────────────────────────────────────────────────────

function SubscriptionCardSkeleton() {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl ring-1 ring-black/5 dark:ring-white/10 shadow-sm p-4 sm:p-5">
      <div className="flex items-center gap-3 mb-4">
        <Skeleton className="w-11 h-11 rounded-full shrink-0" />
        <div className="min-w-0 flex-1">
          <Skeleton className="h-4 w-32 mb-1.5" />
          <Skeleton className="h-3 w-20" />
        </div>
        <Skeleton className="h-5 w-16 rounded-full" />
      </div>
      <div className="grid grid-cols-2 gap-3 py-3 border-y border-slate-100 dark:border-slate-800">
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-full" />
      </div>
      <div className="flex justify-end gap-1.5 mt-3">
        <Skeleton className="h-8 w-8 rounded-full" />
        <Skeleton className="h-8 w-8 rounded-full" />
      </div>
    </div>
  );
}

// ─── Card ────────────────────────────────────────────────────────────────────

interface SubscriptionCardProps {
  subscription: ISubscription;
  showAgentColumn?: boolean;
  onViewDetails: (sub: ISubscription) => void;
  onUpdate?: (sub: ISubscription) => void;
  onDelete?: (sub: ISubscription) => void;
}

function SubscriptionCard({
  subscription: sub,
  showAgentColumn,
  onViewDetails,
  onUpdate,
  onDelete,
}: SubscriptionCardProps) {
  const packageName = getNestedName(sub.package) || "—";
  const agentName = showAgentColumn ? getNestedName(sub.createdBy) : null;
  const subscribedFor = getSubscribedForLabel(sub);

  return (
    <div className="group bg-white dark:bg-slate-900 rounded-2xl ring-1 ring-black/5 dark:ring-white/10 shadow-sm hover:shadow-md transition-all duration-200 p-4 sm:p-5">
      {/* Header: package + status */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-11 h-11 rounded-full bg-linear-to-br from-green-400 to-green-600 hover:from-green-700 flex items-center justify-center shrink-0 shadow-sm ring-1 ring-black/5">
            <ShieldCheck className="w-5 h-5 text-white" />
          </div>
          <div className="min-w-0">
            <p className="font-semibold text-slate-900 dark:text-white truncate">{packageName}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {PLAN_LABELS[sub.planType] ?? sub.planType}
              {agentName && <span className="text-slate-400"> · {agentName}</span>}
            </p>
          </div>
        </div>
        <Pill tone={STATUS_TONE[sub.status] ?? "slate"}>{sub.status}</Pill>
      </div>

      {/* Subscribed for */}
      <div className="flex items-center gap-1 mb-3 text-xs text-slate-500 dark:text-slate-400">
        <User className="w-3 h-3" />
        <span>Subscription For: <span className="font-medium text-slate-700 dark:text-slate-300">{subscribedFor}</span></span>
      </div>

      {/* Details grid */}
      <div className="grid grid-cols-2 gap-y-3 gap-x-3 py-3 border-y border-slate-100 dark:border-slate-800">
        <div>
          <p className="flex items-center gap-1 text-[11px] uppercase tracking-wide text-slate-400 mb-0.5">
            <CircleDollarSign className="w-3 h-3" /> Price
          </p>
          <p className="text-sm font-semibold text-slate-900 dark:text-white">{formatCurrency(sub.price)}</p>
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-wide text-slate-400 mb-0.5">Payment</p>
          <Pill tone={PAYMENT_TONE[sub.paymentStatus] ?? "slate"}>{sub.paymentStatus}</Pill>
        </div>
        <div>
          <p className="flex items-center gap-1 text-[11px] uppercase tracking-wide text-slate-400 mb-0.5">
            <Calendar className="w-3 h-3" /> Start Date
          </p>
          <p className="text-sm text-slate-700 dark:text-slate-300">{formatDate(sub.startDate)}</p>
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-wide text-slate-400 mb-0.5">
            {sub.isLifetime ? "Duration" : "End Date"}
          </p>
          <p className="text-sm text-slate-700 dark:text-slate-300">
            {sub.isLifetime ? "Lifetime" : formatDate(sub.endDate)}
          </p>
        </div>
      </div>

      {/* Footer: auto-renew + actions */}
      <div className="flex items-center justify-between mt-3">
        {sub.autoRenew ? (
          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-blue-600 dark:text-blue-400">
            <RefreshCw className="w-3 h-3" /> Auto-renew on
          </span>
        ) : <span />}

        <div className="flex items-center gap-1.5">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full text-slate-500 dark:text-slate-400 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-900/20 dark:hover:text-blue-400"
            title="View details"
            onClick={() => onViewDetails(sub)}
          >
            <Eye className="w-3.5 h-3.5" />
          </Button>
          {onUpdate && (
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full text-slate-500 dark:text-slate-400 hover:bg-green-50 hover:text-green-600 dark:hover:bg-green-900/20 dark:hover:text-green-400"
              title="Update subscription"
              onClick={() => onUpdate(sub)}
            >
              <Edit2 className="w-3.5 h-3.5" />
            </Button>
          )}
          {onDelete && (
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full text-slate-500 dark:text-slate-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20 dark:hover:text-red-400"
              title="Move to trash"
              onClick={() => onDelete(sub)}
            >
              <Trash2 className="w-3.5 h-3.5" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Grid ────────────────────────────────────────────────────────────────────

interface SubscriptionCardsProps {
  subscriptions: ISubscription[];
  isLoading: boolean;
  showAgentColumn?: boolean;
  onViewDetails: (sub: ISubscription) => void;
  onUpdate?: (sub: ISubscription) => void;
  onDelete?: (sub: ISubscription) => void;
}

export function SubscriptionCards({
  subscriptions,
  isLoading,
  showAgentColumn,
  onViewDetails,
  onUpdate,
  onDelete,
}: SubscriptionCardsProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <SubscriptionCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {subscriptions.map((sub) => (
        <SubscriptionCard
          key={sub._id}
          subscription={sub}
          showAgentColumn={showAgentColumn}
          onViewDetails={onViewDetails}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}