"use client";

import { SubscriptionPageContent } from "../shared/subscriptions/SubscriptionPageContent";
import { useGetMySubscriptionsQuery } from "@/redux/features/subscription/subscription.api";
import { CreateSubscriptionModal } from "../subscription/CreateSubscriptionModal";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";

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
        <CreateSubscriptionModal
          onSuccess={refetch}
          trigger={
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2 transition-all duration-200 ease-out hover:shadow-lg hover:shadow-emerald-500/25 hover:-translate-y-0.5 active:scale-[0.98] hover:cursor-pointer">
              <Plus className="w-4 h-4" /> New Subscription
            </Button>
          }
        />
      )}
    />
  );
}
