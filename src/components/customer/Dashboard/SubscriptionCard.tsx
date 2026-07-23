import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ISubscription, SubscriptionStatus } from "@/types/subscription.types";
import { formatCurrency, formatPlanLabel } from "@/lib/utils/customer-portal-format";

interface PopulatedPackage {
  _id?: string;
  name: string;
  coverageAmount?: number;
}
interface PopulatedCustomer {
  _id?: string;
  name?: string;
}

interface SubscriptionCardProps {
  subscription: ISubscription;
}

const STATUS_STYLES: Partial<Record<SubscriptionStatus, string>> = {
  [SubscriptionStatus.ACTIVE]:
    "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800",
  [SubscriptionStatus.PENDING]:
    "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800",
  [SubscriptionStatus.EXPIRED]:
    "bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700",
  [SubscriptionStatus.CANCELLED]:
    "bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800",
  [SubscriptionStatus.REFUNDED]:
    "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800",
  [SubscriptionStatus.FAILED]:
    "bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800",
};

export function SubscriptionCard({ subscription }: SubscriptionCardProps) {
  const pkg = subscription.package as unknown as PopulatedPackage;
  const customer = subscription.customer as unknown as PopulatedCustomer;
  const peopleCount = subscription.joinMember ? 2 : 1;

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-l-4 border-slate-200 border-l-indigo-600 dark:border-slate-800 dark:border-l-indigo-500 bg-white dark:bg-slate-900 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
      <div className="flex items-center justify-between px-5 pt-5">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
          {pkg?.name ?? "Package"}{" "}
          <span className="text-slate-400 font-normal text-base">/ {formatPlanLabel(subscription.planType)}</span>
        </h3>
        <Badge variant="outline" className={STATUS_STYLES[subscription.status] ?? ""}>
          {subscription.status}
        </Badge>
      </div>

      <div className="grid grid-cols-2 gap-4 px-5 py-4">
        <div>
          <p className="text-[11px] text-slate-700 font-bold dark:text-slate-400 uppercase tracking-wide">Subscription ID</p>
          <p className="text-sm font-semibold text-indigo-700 dark:text-indigo-400 font-mono">
            {String(subscription._id).slice(-6)}
          </p>
        </div>
        <div>
          <p className="text-[11px] text-slate-700 font-bold dark:text-slate-400 uppercase tracking-wide">Insured Person</p>
          <p className="text-sm font-medium text-slate-800 dark:text-slate-200 truncate">
            {customer?.name ?? "—"}
          </p>
        </div>
        <div>
          <p className="text-[11px] text-slate-700 font-bold dark:text-slate-400 uppercase tracking-wide">No. of People</p>
          <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
            {peopleCount} {peopleCount === 1 ? "Person" : "People"}
          </p>
        </div>
        {typeof pkg?.coverageAmount === "number" && (
          <div>
            <p className="text-[11px] text-slate-700 font-bold dark:text-slate-400 uppercase tracking-wide">Total Coverage</p>
            <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
              {formatCurrency(pkg.coverageAmount)}
            </p>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800 px-5 py-4 bg-slate-50/60 dark:bg-slate-800/30">
        <p className="text-sm text-slate-500">
          Price:{" "}
          <span className="font-bold text-indigo-700 dark:text-indigo-400">{formatCurrency(subscription.price)}</span>{" "}
          / {formatPlanLabel(subscription.planType)}
        </p>
        <Button
          
          size="sm"
          className="bg-indigo-600 hover:bg-indigo-700 text-white transition-all duration-200 ease-out hover:shadow-md hover:-translate-y-0.5 active:scale-95"
        >
          <Link href={`/customer/dashboard/subscriptions/${subscription?._id}`}>View Details</Link>
        </Button>
      </div>
    </div>
  );
}