import { Metadata } from "next";
import { AgentLeaderOverviewPage } from "@/components/agent-leader/overview/AgentLeaderOverviewPage";

export const metadata: Metadata = {
  title: "Overview",
  description: "Revenue and performance across your team.",
};

export default function Page() {
  return <AgentLeaderOverviewPage />;
}