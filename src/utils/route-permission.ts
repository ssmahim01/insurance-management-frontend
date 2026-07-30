
import { Role } from "@/types/user.types";

export type UserRole = Role;

interface RoutePermission {
  route: string;
  roles: UserRole[];
}

const routePermissions: RoutePermission[] = [
  // ── Overview ──
  { route: "/admin/dashboard", roles: [Role.SUPER_ADMIN, Role.ADMIN] },

  // ── Insurance Management ──
  { route: "/admin/dashboard/packages", roles: [Role.SUPER_ADMIN, Role.ADMIN] },
  { route: "/admin/dashboard/claims/trash", roles: [Role.SUPER_ADMIN] },
  { route: "/admin/dashboard/claims", roles: [Role.SUPER_ADMIN, Role.ADMIN] },

  // ── Team Management ──
  { route: "/admin/dashboard/admin/trash", roles: [Role.SUPER_ADMIN] },
  { route: "/admin/dashboard/admin", roles: [Role.SUPER_ADMIN] },
  { route: "/admin/dashboard/agent-leader/trash", roles: [Role.SUPER_ADMIN, Role.ADMIN] },
  { route: "/admin/dashboard/agent-leader", roles: [Role.SUPER_ADMIN, Role.ADMIN] },
  { route: "/admin/dashboard/agents/trash", roles: [Role.SUPER_ADMIN, Role.ADMIN] },
  { route: "/admin/dashboard/agents", roles: [Role.SUPER_ADMIN, Role.ADMIN] },
  { route: "/admin/dashboard/customers/trash", roles: [Role.SUPER_ADMIN, Role.ADMIN] },
  { route: "/admin/dashboard/customers", roles: [Role.SUPER_ADMIN, Role.ADMIN] },
  { route: "/admin/dashboard/partners/trash", roles: [Role.SUPER_ADMIN, Role.ADMIN, Role.MANAGER] },
  { route: "/admin/dashboard/partners", roles: [Role.SUPER_ADMIN, Role.ADMIN, Role.MANAGER] },
  { route: "/admin/dashboard/branches/trash", roles: [Role.SUPER_ADMIN, Role.ADMIN, Role.MANAGER] },
  { route: "/admin/dashboard/branches", roles: [Role.SUPER_ADMIN, Role.ADMIN, Role.MANAGER] },

  // ── Agent Leader ──
  { route: "/agent-leader/dashboard/my-agents/create", roles: [Role.AGENT_LEADER] },
  { route: "/agent-leader/dashboard/my-agents/trash", roles: [Role.AGENT_LEADER] },
  { route: "/agent-leader/dashboard/my-agents", roles: [Role.AGENT_LEADER] },
  { route: "/agent-leader/dashboard/customers", roles: [Role.AGENT_LEADER] },
  { route: "/agent-leader/dashboard", roles: [Role.AGENT_LEADER] },

  // ── Agent ──
  { route: "/agent/dashboard/customers", roles: [Role.AGENT] },
  { route: "/agent/dashboard/subscriptions", roles: [Role.AGENT] },
  { route: "/agent/dashboard/trash", roles: [Role.AGENT] },
  { route: "/agent/dashboard", roles: [Role.AGENT] },

  // ── Shared (any authenticated role) ──
  {
    route: "/dashboard/profile",
    roles: [Role.SUPER_ADMIN, Role.ADMIN, Role.MANAGER, Role.AGENT_LEADER, Role.AGENT, Role.CUSTOMER],
  },
  {
    route: "/dashboard/settings",
    roles: [Role.SUPER_ADMIN, Role.ADMIN, Role.AGENT_LEADER, Role.AGENT, Role.CUSTOMER],
  },
];

const sortedRoutePermissions = [...routePermissions].sort(
  (a, b) => b.route.length - a.route.length,
);

export function getRouteOwner(pathname: string): RoutePermission | null {
  return sortedRoutePermissions.find((perm) => pathname.startsWith(perm.route)) ?? null;
}

export function isValidRouteForRole(pathname: string, role: UserRole): boolean {
  const owner = getRouteOwner(pathname);
  if (!owner) return true; // public route
  return owner.roles.includes(role);
}

export function getDefaultDashboardRoute(role: UserRole): string {
  const map: Record<UserRole, string> = {
    [Role.SUPER_ADMIN]: "/admin/dashboard",
    [Role.ADMIN]: "/admin/dashboard",
    [Role.AGENT_LEADER]: "/agent-leader/dashboard",
    [Role.AGENT]: "/agent/dashboard",
    [Role.MANAGER]: "/manager/dashboard",
    [Role.A_A_MANAGER]: "/a-a-manager/dashboard",
    [Role.CUSTOMER]: "/customer/dashboard",
  };
  return map[role] ?? "/";
}