import { Metadata } from "next";
import { AgentLeaderSubscriptionTrash } from "@/components/agent-leader/customer-subscriptions/AgentLeaderSubscriptionTrash";

export const metadata: Metadata = {
  title: "Subscription Trash",
  description: "View subscriptions deleted from your team's records.",
};

export default function Page() {
  return <AgentLeaderSubscriptionTrash />;
}
