import { Metadata } from "next";
import { AgentOverviewPage } from "@/components/agent/overview/AgentOverviewPage";

export const metadata: Metadata = {
  title: "Overview",
  description: "Your subscription revenue and performance.",
};

export default function Page() {
  return <AgentOverviewPage />;
}