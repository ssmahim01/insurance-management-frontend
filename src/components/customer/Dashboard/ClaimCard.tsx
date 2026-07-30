import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { IClaim, ClaimStatus } from "@/types/claim.types";
import { formatDate } from "@/lib/utils/customer-portal-format";

interface PopulatedSubscription {
  _id?: string;
  package?: { _id?: string; name?: string };
}
interface PopulatedClaim extends Omit<IClaim, "subscription"> {
  subscription?: PopulatedSubscription | string;
}

interface ClaimCardProps {
  claim: PopulatedClaim;
}

// NOTE: our backend's ClaimStatus only has PENDING/APPROVED/REJECTED — there is
// no distinct "Processing" status. We label PENDING as "Processing" here only
// as display text (matching the reference's terminology), not as a new status.
const STATUS_META: Record<ClaimStatus, { label: string; className: string }> = {
  [ClaimStatus.PENDING]: {
    label: "Processing",
    className:
      "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800",
  },
  [ClaimStatus.APPROVED]: {
    label: "Approved",
    className:
      "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800",
  },
  [ClaimStatus.REJECTED]: {
    label: "Rejected",
    className:
      "bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800",
  },
  [ClaimStatus.ALL]: {
    label: "All",
    className:
      "bg-slate-50 text-slate-700 border-slate-200 dark:bg-slate-900/20 dark:text-slate-400 dark:border-slate-800",
  },
};

export function ClaimCard({ claim }: ClaimCardProps) {
  const subscription = claim.subscription as PopulatedSubscription | undefined;
  const meta = STATUS_META[claim.status];

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-green-200 dark:border-emerald-800 bg-green-50 dark:bg-emerald-950 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
      <div className="flex items-center justify-between px-5 pt-5">
        <h3 className="text-base font-bold text-slate-900 dark:text-white truncate pr-2">
          {claim.serviceTitle}
        </h3>
        <Badge
          variant="outline"
          className={`shrink-0 ${meta?.className ?? ""}`}
        >
          {meta?.label ?? claim.status}
        </Badge>
      </div>

      <div className="grid grid-cols-2 gap-4 px-5 py-4">
        <div>
          <p className="text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide">
            Claim ID
          </p>
          <p className="text-sm font-semibold text-indigo-700 dark:text-indigo-400 font-mono">
            {String(claim._id).slice(-6)}
          </p>
        </div>
        <div>
          <p className="text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide">
            Package
          </p>
          <p className="text-sm font-medium text-slate-800 dark:text-slate-200 truncate">
            {subscription?.package?.name ?? "—"}
          </p>
        </div>
        <div>
          <p className="text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide">
            Claim Date
          </p>
          <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
            {formatDate(claim.createdAt)}
          </p>
        </div>
        <div>
          <p className="text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide">
            Update Date
          </p>
          <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
            {formatDate(claim.updatedAt)}
          </p>
        </div>
      </div>

      {claim.status === ClaimStatus.REJECTED && claim.adminNote && (
        <div className="mx-5 mb-4 rounded-lg border border-red-100 dark:border-red-900/40 bg-red-50/60 dark:bg-red-950/20 px-3 py-2.5">
          <p className="text-xs font-semibold text-red-700 dark:text-red-400 mb-0.5">
            Claim Note
          </p>
          <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2">
            {claim.adminNote}
          </p>
        </div>
      )}

      <div className="flex items-center justify-end border-t border-green-100 dark:border-green-800 px-5 py-3.5 bg-green-100 dark:bg-emerald-800/30">
        <Button
          size="sm"
          className="bg-indigo-600 hover:bg-indigo-700 text-white transition-all duration-200 ease-out hover:shadow-md hover:-translate-y-0.5 active:scale-95"
        >
          <Link href={`/customer/dashboard/claims/${claim._id}`}>
            View Details
          </Link>
        </Button>
      </div>
    </div>
  );
}
