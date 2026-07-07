import { Metadata } from "next";
import { AgentSubscriptions } from "@/components/agent/AgentSubscriptions";

export const metadata: Metadata = {
  title: "My Subscriptions",
  description:
    "View and manage the insurance subscriptions you've created for your customers.",
};

export default function Page() {
  return <AgentSubscriptions />;
}
