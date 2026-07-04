"use client";

import { SubscriptionPageContent } from "@/components/shared/subscriptions/SubscriptionPageContent";
import { useGetAgentLeaderSubscriptionsQuery } from "@/redux/features/subscription/subscription.api";

export function AgentLeaderSubscriptions() {
  return (
    <SubscriptionPageContent
      title="Insurance Subscriptions"
      description="Manage paid insurance subscriptions created by your assigned agents."
      breadcrumbs={[
        { label: "Dashboard", href: "/agent-leader" },
        { label: "Subscriptions" },
      ]}
      useQuery={useGetAgentLeaderSubscriptionsQuery}
      showAgentColumn
      allowUpdate
      allowDelete
    />
  );
}
