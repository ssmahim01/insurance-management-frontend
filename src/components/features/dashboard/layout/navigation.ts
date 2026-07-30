import { Role } from "@/types/user.types";

import { adminNavigation } from "./navigations/admin.navigation";
import { agentLeaderNavigation } from "./navigations/agentLeader.navigation";
import { agentNavigation } from "./navigations/agent.navigation";
import { superAdminNavigation } from "./navigations/superAdmin.navigation";
import { managerNavigation } from "./navigations/manager.navigation";
import { customerNavigation } from "./navigations/customer.navigation";

export const getDashboardNavigation = (role?: Role) => {
  switch (role) {
    case Role.SUPER_ADMIN:
      return superAdminNavigation;

    case Role.ADMIN:
      return adminNavigation;

    case Role.MANAGER:
      return managerNavigation;
      
    case Role.AGENT_LEADER:
      return agentLeaderNavigation;

    case Role.AGENT:
      return agentNavigation;
      
    case Role.CUSTOMER:
      return customerNavigation;

    default:
      return [];
  }
};