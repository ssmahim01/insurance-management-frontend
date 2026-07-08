"use client";

import { SubscriptionPageContent } from "../shared/subscriptions/SubscriptionPageContent";
import { useGetMySubscriptionsQuery } from "@/redux/features/subscription/subscription.api";
import { CreateSubscriptionModal } from "../subscription/CreateSubscriptionModal";
// import { Button } from "../ui/button";
// import { Plus } from "lucide-react";

export function AgentSubscriptions() {
  return (
    <SubscriptionPageContent
      title="My Customer Subscriptions"
      description="Subscriptions you've created for your customers."
      breadcrumbs={[
        { label: "Dashboard", href: "/agent" },
        { label: "Subscriptions" },
      ]}
      useQuery={useGetMySubscriptionsQuery}
      showAgentColumn={false}
      allowUpdate
      allowDelete={false}
       headerAction={(refetch) => (
        <CreateSubscriptionModal onSuccess={refetch} />
         
      )}
    />
  );
}
