import { Briefcase } from "lucide-react";
import { format } from "date-fns";
import { IUser } from "@/types/user.types";
import { formatBDT, getPopulatedName } from "@/lib/utils/format-user";
import { DetailCard } from "./DetailCard";
import { DetailRow } from "./DetailRow";

interface AgentEmploymentCardProps {
  agent: IUser;
}

export function AgentEmploymentCard({ agent }: AgentEmploymentCardProps) {
  return (
    <DetailCard title="Employment" icon={Briefcase}>
      <DetailRow label="Monthly Salary" value={formatBDT(agent.salary)} />
      <DetailRow label="Salary Per Customer" value={formatBDT(agent.salaryPerCustomer)} />
      <DetailRow label="Agent Leader" value={getPopulatedName(agent.agentLeader)} />
      <DetailRow
        label="Created Date"
        value={agent.createdAt ? format(new Date(agent.createdAt), "MMM dd, yyyy") : "—"}
      />
    </DetailCard>
  );
}