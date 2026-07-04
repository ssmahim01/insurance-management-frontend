import { Badge } from "@/components/ui/badge";
import { SubscriptionStatus } from "@/types/subscription.types";

interface SubscriptionStatusBadgeProps {
  status: SubscriptionStatus | undefined;
}

const LABELS: Record<SubscriptionStatus, string> = {
  [SubscriptionStatus.PENDING]: "Pending",
  [SubscriptionStatus.ACTIVE]: "Active",
  [SubscriptionStatus.EXPIRED]: "Expired",
  [SubscriptionStatus.CANCELLED]: "Cancelled",
  [SubscriptionStatus.FAILED]: "Failed",
};

const STYLES: Record<SubscriptionStatus, string> = {
  [SubscriptionStatus.PENDING]:
    "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-800 dark:bg-amber-900/20 dark:text-amber-400",
  [SubscriptionStatus.ACTIVE]:
    "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-400",
  [SubscriptionStatus.EXPIRED]:
    "border-slate-200 bg-slate-50 text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400",
  [SubscriptionStatus.CANCELLED]:
    "border-red-200 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-900/20 dark:text-red-400",
  [SubscriptionStatus.FAILED]:
    "border-red-200 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-900/20 dark:text-red-400",
};

const DOT: Record<SubscriptionStatus, string> = {
  [SubscriptionStatus.PENDING]: "bg-amber-500",
  [SubscriptionStatus.ACTIVE]: "bg-emerald-500",
  [SubscriptionStatus.EXPIRED]: "bg-slate-400",
  [SubscriptionStatus.CANCELLED]: "bg-red-500",
  [SubscriptionStatus.FAILED]: "bg-red-500",
};

export function SubscriptionStatusBadge({ status }: SubscriptionStatusBadgeProps) {
  const resolved = status ?? SubscriptionStatus.PENDING;
  return (
    <Badge variant="outline" className={STYLES[resolved]}>
      <span className={`mr-1.5 inline-block h-1.5 w-1.5 rounded-full ${DOT[resolved]}`} />
      {LABELS[resolved] ?? "Unknown"}
    </Badge>
  );
}