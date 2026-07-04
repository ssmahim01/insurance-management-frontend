import { Role } from "@/types/user.types";

import { adminNavigation } from "./navigations/admin.navigation";
import { agentLeaderNavigation } from "./navigations/agentLeader.navigation";
import { agentNavigation } from "./navigations/agent.navigation";

export const getDashboardNavigation = (role?: Role) => {
  switch (role) {
    case Role.SUPER_ADMIN:
    case Role.ADMIN:
      return adminNavigation;

    case Role.AGENT_LEADER:
      return agentLeaderNavigation;

    case Role.AGENT:
      return agentNavigation;

    default:
      return [];
  }
};