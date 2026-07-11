"use client";

import { useGetAgentOverviewQuery } from "@/redux/features/subscription/subscription.api";
import { PageHeader } from "@/components/shared/PageHeader";
import { OverviewDashboard } from "@/components/shared/overview/OverviewDashboard";

export function AgentOverviewPage() {
  const { data, isLoading, isError, refetch } = useGetAgentOverviewQuery();

  return (
    <div>
      <PageHeader
        title="Overview"
        description="Your subscription revenue and performance."
        breadcrumbs={[
          { label: "Dashboard", href: "/agent" },
          { label: "Overview" },
        ]}
      />
      <OverviewDashboard data={data?.data} isLoading={isLoading} isError={isError} onRetry={refetch} />
    </div>
  );
}