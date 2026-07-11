"use client";

import { useGetAdminOverviewQuery } from "@/redux/features/subscription/subscription.api";
import { PageHeader } from "@/components/shared/PageHeader";
import { OverviewDashboard } from "@/components/shared/overview/OverviewDashboard";

export function AdminOverviewPage() {
  const { data, isLoading, isError, refetch } = useGetAdminOverviewQuery();

  return (
    <div>
      <PageHeader
        title="Overview"
        description="Subscription revenue and performance at a glance."
        breadcrumbs={[
          { label: "Dashboard", href: "/admin/dashboard" },
          { label: "Overview" },
        ]}
      />
      <OverviewDashboard data={data?.data} isLoading={isLoading} isError={isError} onRetry={refetch} />
    </div>
  );
}