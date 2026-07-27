import { Clock } from "lucide-react";
import { format } from "date-fns";
import { IUser } from "@/types/user.types";
import { DetailCard } from "./DetailCard";
import { DetailRow } from "./DetailRow";

interface AgentActivityCardProps {
  agent: IUser;
}

export function AgentActivityCard({ agent }: AgentActivityCardProps) {
  return (
    <DetailCard title="Activity" icon={Clock}>
      <DetailRow
        label="Employee ID"
        value={agent.employeeId || "—"}
      />
      <DetailRow
        label="Last Login"
        value={
          agent.lastLoginAt
            ? format(new Date(agent.lastLoginAt), "MMM dd, yyyy 'at' hh:mm a")
            : "Never"
        }
      />
      <DetailRow
        label="Account Created"
        value={agent.createdAt ? format(new Date(agent.createdAt), "MMM dd, yyyy 'at' hh:mm a") : "—"}
      />
      <DetailRow
        label="Updated At"
        value={agent.updatedAt ? format(new Date(agent.updatedAt), "MMM dd, yyyy 'at' hh:mm a") : "—"}
      />
    </DetailCard>
  );
}