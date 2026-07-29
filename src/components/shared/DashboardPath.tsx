// utils/getDashboardPath.ts
type Role =
  | "SUPER_ADMIN"
  | "ADMIN"
  | "MANAGER"
  | "AGENT"
  | "AGENT_LEADER"
  | "CUSTOMER";

export const getDashboardPath = (role?: Role | string): string => {
  switch (role) {
    case "SUPER_ADMIN":
      return "/admin/dashboard";
    case "ADMIN":
      return "/admin/dashboard";
    case "MANAGER":
      return "/manager/dashboard";
    case "AGENT_LEADER":
      return "/agent-leader/dashboard";
    case "AGENT":
      return "/agent/dashboard";
    case "CUSTOMER":
      return "/customer/dashboard";
    default:
      return "/login";
  }
};