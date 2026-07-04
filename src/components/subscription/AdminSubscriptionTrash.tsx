"use client";

import { SubscriptionTrashContent } from "../shared/subscriptions/SubscriptionTrashContent";
import { useGetAllTrashSubscriptionsQuery } from "@/redux/features/subscription/subscription.api";

export function AdminSubscriptionTrash() {
  return (
    <SubscriptionTrashContent
      title="Subscription Trash"
      description="Restore or permanently remove deleted subscriptions."
      breadcrumbs={[
        { label: "Dashboard", href: "/admin/dashboard" },
        {
          label: "Subscription Management",
          href: "/admin/dashboard/customers",
        },
        { label: "Trash" },
      ]}
      useQuery={useGetAllTrashSubscriptionsQuery}
      backHref="/admin/dashboard/customers"
      showCreatedByColumn
      allowRestore
      allowPermanentDelete
    />
  );
}
