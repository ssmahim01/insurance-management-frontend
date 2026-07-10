import { Metadata } from "next";
import AgentCustomerManagement from "@/components/agent/AgentCustomers/AgentCustomerManagement";

export const metadata: Metadata = {
  title: "My Subscriptions",
  description:
    "View and manage the insurance subscriptions you've created for your customers.",
};

export default function Page() {
  return <AgentCustomerManagement />;
}
