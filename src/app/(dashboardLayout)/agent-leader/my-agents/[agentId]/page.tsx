import { Metadata } from "next";
import { AgentDetails } from "@/components/agent-leader/team-management/agent-details/AgentDetails";

export const metadata: Metadata = {
  title: "Agent Details | Insurance Management",
  description:
    "View complete information, activity and performance of an insurance agent.",
};

interface Props {
  params: Promise<{
    agentId: string;
  }>;
}

export default async function Page({ params }: Props) {
  const { agentId } = await params;

  return <AgentDetails agentId={agentId} />;
}