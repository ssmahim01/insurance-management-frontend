import { Badge } from "@/components/ui/badge";
import { ClaimStatus } from "@/types/claim.types";

interface ClaimStatusBadgeProps {
  status: ClaimStatus | undefined;
}

const LABELS: Record<ClaimStatus, string> = {
  [ClaimStatus.PENDING]: "Pending",
  [ClaimStatus.APPROVED]: "Approved",
  [ClaimStatus.REJECTED]: "Rejected",
  [ClaimStatus.ALL]: "All",
};

const STYLES: Record<ClaimStatus, string> = {
  [ClaimStatus.PENDING]:
    "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-800 dark:bg-amber-900/20 dark:text-amber-400",
  [ClaimStatus.APPROVED]:
    "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-400",
  [ClaimStatus.REJECTED]:
    "border-red-200 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-900/20 dark:text-red-400",
  [ClaimStatus.ALL]:
    "border-slate-200 bg-slate-50 text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400",
};

const DOT: Record<ClaimStatus, string> = {
  [ClaimStatus.PENDING]: "bg-amber-500",
  [ClaimStatus.APPROVED]: "bg-emerald-500",
  [ClaimStatus.REJECTED]: "bg-red-500",
  [ClaimStatus.ALL]: "bg-slate-400",
};

export function ClaimStatusBadge({ status }: ClaimStatusBadgeProps) {
  const resolved = status ?? ClaimStatus.PENDING;
  return (
    <Badge variant="outline" className={STYLES[resolved]}>
      <span className={`mr-1.5 inline-block h-1.5 w-1.5 rounded-full ${DOT[resolved]}`} />
      {LABELS[resolved] ?? "Unknown"}
    </Badge>
  );
}