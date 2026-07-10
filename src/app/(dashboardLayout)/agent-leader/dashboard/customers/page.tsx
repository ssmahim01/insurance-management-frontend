import { Metadata } from "next";
import AgentLeaderCustomerManagement from "@/components/agent-leader/customer-subscriptions/AgentLeaderCustomerManagement";

export const metadata: Metadata = {
  title: "Insurance Subscriptions | Surokkha",
  description:
    "Manage paid insurance subscriptions created by your assigned agents. Monitor customer coverage, payment status and policy activity from one place.",
};

export default function Page() {
  return <AgentLeaderCustomerManagement />;
}