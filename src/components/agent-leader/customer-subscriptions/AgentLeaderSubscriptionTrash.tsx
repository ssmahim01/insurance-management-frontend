"use client";

import { SubscriptionTrashContent } from "@/components/shared/subscriptions/SubscriptionTrashContent";
import { useGetAgentLeaderTrashSubscriptionsQuery } from "@/redux/features/subscription/subscription.api";

export function AgentLeaderSubscriptionTrash() {
  return (
    <SubscriptionTrashContent
      title="Subscription Trash"
      description="View subscriptions deleted from your team's records."
      breadcrumbs={[
        { label: "Dashboard", href: "/agent-leader" },
        { label: "Subscriptions", href: "/agent-leader/customers" },
        { label: "Trash" },
      ]}
      useQuery={useGetAgentLeaderTrashSubscriptionsQuery}
      backHref="/agent-leader/customers"
      showCreatedByColumn
      allowRestore={true}
      allowPermanentDelete={true}
    />
  );
}
