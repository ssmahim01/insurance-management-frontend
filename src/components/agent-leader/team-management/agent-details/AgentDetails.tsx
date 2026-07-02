"use client";

import { useRouter } from "next/navigation";
import { useGetSingleUserQuery } from "@/redux/features/user/user.api";

import { AgentProfileHeader } from "./AgentProfileHeader";
import { AgentPersonalInfoCard } from "./AgentPersonalInfoCard";
import { AgentAddressCard } from "./AgentAddressCard";
import { AgentActivityCard } from "./AgentActivityCard";
import { AgentDetailsSkeleton } from "./AgentDetailsSkeleton";
import { AgentDetailsErrorState } from "./AgentDetailsErrorState";

interface AgentDetailsProps {
  agentId: string;
}

export function AgentDetails({ agentId }: AgentDetailsProps) {
  const router = useRouter();
  const { data, isLoading, isError } = useGetSingleUserQuery(agentId);

  const agent = data?.data;

  const handleBack = () => router.back();

  if (isLoading) {
    return <AgentDetailsSkeleton />;
  }

  if (isError || !agent) {
    return <AgentDetailsErrorState onBack={handleBack} />;
  }

  return (
    <div className="space-y-6">
      <AgentProfileHeader agent={agent} onBack={handleBack} />

      {/* <DetailStatsCards /> */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <AgentPersonalInfoCard agent={agent} />
        <AgentAddressCard agent={agent} />
        {/* <AgentEmploymentCard agent={agent} /> */}
        <AgentActivityCard agent={agent} />
      </div>
    </div>
  );
}