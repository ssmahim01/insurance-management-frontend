import { Role } from "@/types/user.types";

import { adminNavigation } from "./admin.navigation";
import { agentLeaderNavigation } from "./agentLeader.navigation";

export const getDashboardNavigation = (role?: Role) => {
  switch (role) {
    case Role.SUPER_ADMIN:
    case Role.ADMIN:
      return adminNavigation;

    case Role.AGENT_LEADER:
      return agentLeaderNavigation;

    // case Role.AGENT:
    //   return agentNavigation;

    default:
      return [];
  }
};