import { Badge } from "@/components/ui/badge";
import { Role } from "@/types/user.types";
import { formatRole } from "@/lib/utils/format-user";

interface AgentRoleBadgeProps {
  role: Role | undefined;
}

export function AgentRoleBadge({ role }: AgentRoleBadgeProps) {
  return (
    <Badge variant="outline" className="font-medium">
      {formatRole(role)}
    </Badge>
  );
}