"use client";

import { useGetManagerDashboardQuery } from "@/redux/features/dashboard/dashboard.api";
import { DashboardHeader } from "./DashboardHeader";
import { DashboardSkeleton } from "./DashboardSkeleton";
import { DashboardErrorState } from "./DashboardErrorState";
import { ManagerSummaryCards } from "./ManagerSummaryCards";
import { RecentPartnersList } from "./RecentPartnersList";
import { RecentBranchesList } from "./RecentBranchesList";
import { useGetMeQuery } from "@/redux/features/user/user.api";

export function ManagerDashboardContent() {
  const { data: me } = useGetMeQuery(undefined);
  const role = me?.data.role ?? "";

  const { data, isLoading, isError, refetch } = useGetManagerDashboardQuery();

  if (isLoading) return <DashboardSkeleton />;
  if (isError || !data?.data) return <DashboardErrorState onRetry={refetch} />;

  const dashboard = data.data;

  return (
    <div className="space-y-6">
      <DashboardHeader role={role} onRefresh={refetch} />

      <ManagerSummaryCards summary={dashboard.summary} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentPartnersList items={dashboard.recentPartners} />
        <RecentBranchesList items={dashboard.recentBranches} />
      </div>
    </div>
  );
}
