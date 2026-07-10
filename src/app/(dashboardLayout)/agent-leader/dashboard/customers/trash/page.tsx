import { AgentLeaderCustomerTrash } from "@/components/customer/AgentLeaderCustomerTrash";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Subscription Trash",
  description: "View subscriptions deleted from your team's records.",
};

export default function Page() {
  return <AgentLeaderCustomerTrash />;
}
