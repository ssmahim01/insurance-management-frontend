import { Metadata } from "next";
import { SubscriptionPageContent } from "@/components/agent-leader/customer-subscriptions/SubscriptionPageContent";

export const metadata: Metadata = {
  title: "Insurance Subscriptions",
  description:
    "Manage paid insurance subscriptions created by your assigned agents. Monitor customer coverage, payment status and policy activity from one place.",
};

export default function Page() {
  return <SubscriptionPageContent />;
}
