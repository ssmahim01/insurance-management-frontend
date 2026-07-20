/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetMySubscriptionsQuery } from "@/redux/features/subscription/subscription.api";
import { useGetAllClaimsQuery } from "@/redux/features/claim/claim.api";
import { CustomerPortalHeader } from "./CustomerPortalHeader";
import { SubscriptionCard } from "./SubscriptionCard";
import { ClaimCard } from "./ClaimCard";
import { CreateClaimModal } from "./CreateClaimModal";

export function CustomerDashboardOverview() {
  const [isCreateClaimOpen, setIsCreateClaimOpen] = useState(false);

  const { data: subsData, isLoading: isSubsLoading } = useGetMySubscriptionsQuery({ limit: 50 });
  const { data: claimsData, isLoading: isClaimsLoading } = useGetAllClaimsQuery({ limit: 50 });

  const subscriptions = subsData?.data?.data ?? [];
  const claims = claimsData?.data ?? [];

  return (
    <div className="min-h-screen">

      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* ── Subscriptions ── */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Subscriptions</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">Your insurance subscriptions</p>
              </div>
            </div>

            <div className="space-y-4">
              {isSubsLoading ? (
                Array.from({ length: 2 }).map((_, i) => (
                  <Skeleton key={i} className="h-48 w-full rounded-2xl" />
                ))
              ) : subscriptions.length === 0 ? (
                <EmptyBlock message="You don't have any subscriptions yet." />
              ) : (
                subscriptions.map((s) => <SubscriptionCard key={String(s._id)} subscription={s} />)
              )}
            </div>
          </div>

          {/* ── Claims ── */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Claims</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">Your insurance claims</p>
              </div>
              <Button
                onClick={() => setIsCreateClaimOpen(true)}
                className="gap-2 bg-linear-to-r from-indigo-600 hover:cursor-pointer to-blue-600 text-white hover:from-indigo-700 hover:to-blue-700 transition-all duration-200 ease-out hover:shadow-lg hover:-translate-y-0.5 active:scale-95"
              >
                <Plus className="h-4 w-4" /> Create Claim
              </Button>
            </div>

            <div className="space-y-4">
              {isClaimsLoading ? (
                Array.from({ length: 2 }).map((_, i) => (
                  <Skeleton key={i} className="h-48 w-full rounded-2xl" />
                ))
              ) : claims.length === 0 ? (
                <EmptyBlock message="You haven't submitted any claims yet." />
              ) : (
                claims.map((c: any) => <ClaimCard key={String(c._id)} claim={c} />)
              )}
            </div>
          </div>
        </div>
      </div>

      <CreateClaimModal open={isCreateClaimOpen} onOpenChange={setIsCreateClaimOpen} subscriptions={subscriptions} />
    </div>
  );
}

function EmptyBlock({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-12 text-center">
      <p className="text-sm text-slate-400">{message}</p>
    </div>
  );
}