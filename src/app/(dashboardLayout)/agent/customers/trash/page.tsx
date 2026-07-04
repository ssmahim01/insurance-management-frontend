import { Metadata } from "next";
import { AgentSubscriptionTrash } from "@/components/agent/AgentSubscriptionTrash";

export const metadata: Metadata = {
  title: "My Deleted Subscriptions",
  description: "Subscriptions you've deleted from your customer records.",
};

export default function Page() {
  return <AgentSubscriptionTrash />;
}