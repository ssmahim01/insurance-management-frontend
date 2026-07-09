"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { PackageCheck, ChevronRight, Users, Pencil } from "lucide-react";
import { ISubscription } from "@/types/subscription.types";
import { SubscriptionDetailsModal } from "@/components/subscription/SubscriptionDetailsModal";
import { UpdateSubscriptionModal } from "@/components/subscription/UpdateSubscriptionModal";
import { IUser } from "@/types/user.types";
import { useGetCustomerSubscriptionsQuery } from "@/redux/features/subscription/subscription.api";

const STATUS_STYLES: Record<string, string> = {
  ACTIVE: "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-400",
  PENDING: "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-800 dark:bg-amber-900/20 dark:text-amber-400",
  EXPIRED: "border-slate-200 bg-slate-50 text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400",
  CANCELLED: "border-red-200 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-900/20 dark:text-red-400",
};

const formatCurrency = (n?: number) => `৳${(n ?? 0).toLocaleString("en-BD")}`;

const getPackageName = (pkg: any) =>
  typeof pkg === "string" ? pkg : pkg?.name ?? "—";

export function CustomerSubscriptionsModal({
  open,
  onOpenChange,
  customer,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  customer: IUser;
}) {
  const customerId = String(customer._id);

  const { data, isLoading, refetch } = useGetCustomerSubscriptionsQuery(customerId, {
    skip: !open || !customerId,
  });

  const [selected, setSelected] = useState<ISubscription | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const [editingSub, setEditingSub] = useState<ISubscription | null>(null);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);

  const subscriptions: ISubscription[] = data?.data ?? [] as any;

  const openDetails = (sub: ISubscription) => {
    setSelected(sub);
    setDetailsOpen(true);
  };

  const openUpdate = (sub: ISubscription, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingSub(sub);
    setIsUpdateOpen(true);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-2xl scrollbar-none min-h-5/12 max-h-10/12 overflow-y-auto">
          <DialogHeader className="text-center pt-4">
            <DialogTitle className="uppercase tracking-widest text-sm">
              Subscriptions — {customer.name}
            </DialogTitle>
          </DialogHeader>

          <Separator />

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Skeleton className="h-24 w-full rounded-lg" />
              <Skeleton className="h-24 w-full rounded-lg" />
              <Skeleton className="h-24 w-full rounded-lg" />
              <Skeleton className="h-24 w-full rounded-lg" />
            </div>
          ) : subscriptions.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-slate-400">
              <Users className="w-10 h-10 mb-3 opacity-30" />
              <p className="text-sm font-medium">No subscriptions found</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {subscriptions.map((sub) => (
                <div
                  key={String(sub._id)}
                  onClick={() => openDetails(sub)}
                  className="text-left rounded-lg border border-slate-200 dark:border-slate-800 p-3 hover:border-blue-300 dark:hover:border-blue-700 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors group cursor-pointer relative"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <PackageCheck className="w-4 h-4 text-blue-500 shrink-0" />
                      <p className="font-medium text-sm text-slate-900 dark:text-white truncate">
                        {getPackageName(sub.package)}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={(e) => openUpdate(sub, e)}
                        title="Edit subscription"
                        className="h-6 w-6 rounded-md flex items-center justify-center text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-blue-500" />
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="outline" className={STATUS_STYLES[sub.status] ?? STATUS_STYLES.EXPIRED}>
                      {sub.status}
                    </Badge>
                    <Badge variant="outline">{sub.planType}</Badge>
                  </div>

                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                    {formatCurrency(sub.price)} · {sub.paymentStatus}
                  </p>
                </div>
              ))}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {selected && (
        <SubscriptionDetailsModal
          open={detailsOpen}
          onOpenChange={setDetailsOpen}
          item={selected}
        />
      )}

      {editingSub && (
        <UpdateSubscriptionModal
          open={isUpdateOpen}
          onOpenChange={setIsUpdateOpen}
          item={editingSub}
          onSuccess={refetch}
        />
      )}
    </>
  );
}