"use client";

import { useGetAgentLeaderOverviewQuery } from "@/redux/features/subscription/subscription.api";
import { PageHeader } from "@/components/shared/PageHeader";
import { OverviewDashboard } from "@/components/shared/overview/OverviewDashboard";

export function AgentLeaderOverviewPage() {
  const { data, isLoading, isError, refetch } = useGetAgentLeaderOverviewQuery();

  return (
    <div>
      <PageHeader
        title="Overview"
        description="Revenue and performance across your team."
        breadcrumbs={[
          { label: "Dashboard", href: "/agent-leader" },
          { label: "Overview" },
        ]}
      />
      <OverviewDashboard data={data?.data} isLoading={isLoading} isError={isError} onRetry={refetch} />
    </div>
  );
}