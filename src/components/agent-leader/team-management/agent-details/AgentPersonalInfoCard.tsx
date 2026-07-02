import { User, CheckCircle2, XCircle } from "lucide-react";
import { IUser } from "@/types/user.types";
import { formatRole } from "@/lib/utils/format-user";
import { DetailCard } from "./DetailCard";
import { DetailRow } from "./DetailRow";
import { AgentStatusBadge } from "../AgentStatusBadge";

interface AgentPersonalInfoCardProps {
  agent: IUser;
}

export function AgentPersonalInfoCard({ agent }: AgentPersonalInfoCardProps) {
  return (
    <DetailCard title="Personal Information" icon={User}>
      <DetailRow label="Full Name" value={agent.name} />
      <DetailRow label="Phone" value={agent.phone} />
      {/* <DetailRow label="Email" value={agent.email || "—"} /> */}
      <DetailRow label="Role" value={formatRole(agent.role)} />
      <DetailRow label="Status" value={<AgentStatusBadge status={agent.isActive ?? undefined} />} />
      <DetailRow
        label="Verification"
        value={
          agent.isVerified ? (
            <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="h-3.5 w-3.5" />
              Verified
            </span>
          ) : (
            <span className="flex items-center gap-1 text-muted-foreground">
              <XCircle className="h-3.5 w-3.5" />
              Not Verified
            </span>
          )
        }
      />
      {/* <DetailRow label="Created By" value={getPopulatedName(agent.agentLeader)} /> */}
    </DetailCard>
  );
}