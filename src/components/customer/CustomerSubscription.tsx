"use client";

import { SubscriptionPageContent } from "@/components/shared/subscriptions/SubscriptionPageContent";
import { useGetMySubscriptionsQuery } from "@/redux/features/subscription/subscription.api";
import { CreateSubscriptionModal } from "@/components/subscription/CreateSubscriptionModal";

export function CustomerSubscriptions() {
  return (
    <SubscriptionPageContent
      title="My Subscriptions"
      description="View and manage your insurance subscriptions."
      breadcrumbs={[
        { label: "Dashboard", href: "/customer/dashboard" },
        { label: "My Subscriptions" },
      ]}
      useQuery={useGetMySubscriptionsQuery}
      showAgentColumn={false}
      allowUpdate={false}
      allowDelete={false}
      headerAction={(refetch) => (
        <CreateSubscriptionModal isCustomer onSuccess={refetch} />
      )}
    />
  );
}