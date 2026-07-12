import { MapPin } from "lucide-react";
import { IUser } from "@/types/user.types";
import { DetailCard } from "./DetailCard";
import { DetailRow } from "./DetailRow";

interface AgentAddressCardProps {
  agent: IUser;
}

export function AgentAddressCard({ agent }: AgentAddressCardProps) {
  const address = agent.address;

  return (
    <DetailCard title="Address" icon={MapPin}>
      <DetailRow label="Division" value={address?.division || "—"} />
      <DetailRow label="District" value={address?.district || "—"} />
      <DetailRow label="Thana" value={address?.thana || "—"} />
      <DetailRow label="Street" value={address?.street || "—"} />
    </DetailCard>
  );
}