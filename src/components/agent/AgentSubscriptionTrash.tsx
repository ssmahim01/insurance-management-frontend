"use client";

import { SubscriptionTrashContent } from "../shared/subscriptions/SubscriptionTrashContent";
import { useGetMyTrashSubscriptionsQuery } from "@/redux/features/subscription/subscription.api";

export function AgentSubscriptionTrash() {
  return (
    <SubscriptionTrashContent
      title="My Deleted Subscriptions"
      description="Subscriptions you've deleted from your customer records."
      breadcrumbs={[
        { label: "Dashboard", href: "/agent" },
        { label: "Subscriptions", href: "/agent/subscriptions" },
        { label: "Trash" },
      ]}
      useQuery={useGetMyTrashSubscriptionsQuery}
      backHref="/agent/subscriptions"
      showCreatedByColumn={false}
      allowRestore={false}
      allowPermanentDelete={false}
    />
  );
}
