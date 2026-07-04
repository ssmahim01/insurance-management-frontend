"use client";

import { SubscriptionPageContent } from "../shared/subscriptions/SubscriptionPageContent";
import { useGetMySubscriptionsQuery } from "@/redux/features/subscription/subscription.api";

export function AgentSubscriptions() {
  return (
    <SubscriptionPageContent
      title="My Subscriptions"
      description="Subscriptions you've created for your customers."
      breadcrumbs={[
        { label: "Dashboard", href: "/agent" },
        { label: "Subscriptions" },
      ]}
      useQuery={useGetMySubscriptionsQuery}
      showAgentColumn={false}
      allowUpdate
      allowDelete={false}
    />
  );
}
