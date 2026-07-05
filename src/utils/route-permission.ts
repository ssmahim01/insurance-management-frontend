// import { Role } from "@/types/user.types";

// // ─── Route Permission Config ───────────────────────────────────────────────
// // Maps a route prefix to the roles allowed to access it.
// // IMPORTANT: middleware.ts must sort these by pathname length DESCENDING
// // before checking `pathname.startsWith(route)` — otherwise a shorter,
// // broader route (e.g. "/admin/dashboard/admin") will match before a more
// // specific one (e.g. "/admin/dashboard/admin/trash"), letting the wrong
// // role through or blocking the right one.

// export interface RoutePermission {
//   route: string;
//   roles: Role[];
// }

// export const routePermissions: RoutePermission[] = [
//   // ── Overview ──
//   { route: "/admin/dashboard", roles: [Role.SUPER_ADMIN, Role.ADMIN] },

//   // ── Insurance Management ──
//   { route: "/admin/dashboard/packages", roles: [Role.SUPER_ADMIN, Role.ADMIN] },
//   { route: "/admin/dashboard/claims/trash", roles: [Role.SUPER_ADMIN] },
//   { route: "/admin/dashboard/claims", roles: [Role.SUPER_ADMIN, Role.ADMIN] },

//   // ── Team Management ──
//   { route: "/admin/dashboard/admin/trash", roles: [Role.SUPER_ADMIN] },
//   { route: "/admin/dashboard/admin", roles: [Role.SUPER_ADMIN] },
//   { route: "/admin/dashboard/agent-leader/trash", roles: [Role.SUPER_ADMIN] },
//   { route: "/admin/dashboard/agent-leader", roles: [Role.SUPER_ADMIN, Role.ADMIN] },
//   { route: "/admin/dashboard/agents/trash", roles: [Role.SUPER_ADMIN] },
//   { route: "/admin/dashboard/agents", roles: [Role.SUPER_ADMIN, Role.ADMIN] },
//   { route: "/admin/dashboard/customers/trash", roles: [Role.SUPER_ADMIN] },
//   { route: "/admin/dashboard/customers", roles: [Role.SUPER_ADMIN, Role.ADMIN] },
//   { route: "/admin/dashboard/partners/trash", roles: [Role.SUPER_ADMIN] },
//   { route: "/admin/dashboard/partners", roles: [Role.SUPER_ADMIN, Role.ADMIN] },
//   { route: "/admin/dashboard/branches/trash", roles: [Role.SUPER_ADMIN] },
//   { route: "/admin/dashboard/branches", roles: [Role.SUPER_ADMIN, Role.ADMIN] },

//   // ── Agent Leader ──
//   { route: "/agent-leader/my-agents/create", roles: [Role.AGENT_LEADER] },
//   { route: "/agent-leader/my-agents/trash", roles: [Role.AGENT_LEADER] },
//   { route: "/agent-leader/my-agents", roles: [Role.AGENT_LEADER] },
//   { route: "/agent-leader/customers", roles: [Role.AGENT_LEADER] },
//   { route: "/agent-leader/dashboard", roles: [Role.AGENT_LEADER] },

//   // ── Agent ──
//   { route: "/agent/customers", roles: [Role.AGENT] },
//   { route: "/agent/subscriptions", roles: [Role.AGENT] },
//   { route: "/agent/trash", roles: [Role.AGENT] },
//   { route: "/agent", roles: [Role.AGENT] },

//   // ── Shared (any authenticated role) ──
//   {
//     route: "/dashboard/profile",
//     roles: [Role.SUPER_ADMIN, Role.ADMIN, Role.AGENT_LEADER, Role.AGENT, Role.CUSTOMER],
//   },
//   {
//     route: "/dashboard/settings",
//     roles: [Role.SUPER_ADMIN, Role.ADMIN, Role.AGENT_LEADER, Role.AGENT, Role.CUSTOMER],
//   },
// ];

// // Pre-sorted by pathname length descending — always use this exported
// // array in middleware, never the raw `routePermissions` above.
// export const sortedRoutePermissions: RoutePermission[] = [...routePermissions].sort(
//   (a, b) => b.route.length - a.route.length,
// );

// /**
//  * Returns the roles allowed for a given pathname, or `null` if the
//  * pathname doesn't match any configured route (i.e. public route).
//  */
// export function getAllowedRoles(pathname: string): Role[] | null {
//   const match = sortedRoutePermissions.find((perm) =>
//     pathname.startsWith(perm.route),
//   );
//   return match ? match.roles : null;
// }



import { Role } from "@/types/user.types";

export type UserRole = Role;

interface RoutePermission {
  route: string;
  roles: UserRole[];
}

// Route length descending order e sort kora — specific route (e.g. "/admin/dashboard/admin/trash")
// generic route ("/admin/dashboard/admin") er age match korবে
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
  { route: "/admin/dashboard/agent-leader/trash", roles: [Role.SUPER_ADMIN] },
  { route: "/admin/dashboard/agent-leader", roles: [Role.SUPER_ADMIN, Role.ADMIN] },
  { route: "/admin/dashboard/agents/trash", roles: [Role.SUPER_ADMIN] },
  { route: "/admin/dashboard/agents", roles: [Role.SUPER_ADMIN, Role.ADMIN] },
  { route: "/admin/dashboard/customers/trash", roles: [Role.SUPER_ADMIN] },
  { route: "/admin/dashboard/customers", roles: [Role.SUPER_ADMIN, Role.ADMIN] },
  { route: "/admin/dashboard/partners/trash", roles: [Role.SUPER_ADMIN] },
  { route: "/admin/dashboard/partners", roles: [Role.SUPER_ADMIN, Role.ADMIN] },
  { route: "/admin/dashboard/branches/trash", roles: [Role.SUPER_ADMIN] },
  { route: "/admin/dashboard/branches", roles: [Role.SUPER_ADMIN, Role.ADMIN] },

  // ── Agent Leader ──
  { route: "/agent-leader/my-agents/create", roles: [Role.AGENT_LEADER] },
  { route: "/agent-leader/my-agents/trash", roles: [Role.AGENT_LEADER] },
  { route: "/agent-leader/my-agents", roles: [Role.AGENT_LEADER] },
  { route: "/agent-leader/customers", roles: [Role.AGENT_LEADER] },
  { route: "/agent-leader/dashboard", roles: [Role.AGENT_LEADER] },

  // ── Agent ──
  { route: "/agent/customers", roles: [Role.AGENT] },
  { route: "/agent/subscriptions", roles: [Role.AGENT] },
  { route: "/agent/trash", roles: [Role.AGENT] },
  { route: "/agent", roles: [Role.AGENT] },

  // ── Shared (any authenticated role) ──
  {
    route: "/dashboard/profile",
    roles: [Role.SUPER_ADMIN, Role.ADMIN, Role.AGENT_LEADER, Role.AGENT, Role.CUSTOMER],
  },
  {
    route: "/dashboard/settings",
    roles: [Role.SUPER_ADMIN, Role.ADMIN, Role.AGENT_LEADER, Role.AGENT, Role.CUSTOMER],
  },
];

const sortedRoutePermissions = [...routePermissions].sort(
  (a, b) => b.route.length - a.route.length,
);

/**
 * Kono pathname protected route hole matching config entry return kore,
 * public route hole null.
 */
export function getRouteOwner(pathname: string): RoutePermission | null {
  return sortedRoutePermissions.find((perm) => pathname.startsWith(perm.route)) ?? null;
}

/**
 * Given pathname + role, check kore role ei route access korte pare kina.
 */
export function isValidRouteForRole(pathname: string, role: UserRole): boolean {
  const owner = getRouteOwner(pathname);
  if (!owner) return true; // public route
  return owner.roles.includes(role);
}

/**
 * Role er default dashboard route.
 */
export function getDefaultDashboardRoute(role: UserRole): string {
  const map: Record<UserRole, string> = {
    [Role.SUPER_ADMIN]: "/admin/dashboard",
    [Role.ADMIN]: "/admin/dashboard",
    [Role.AGENT_LEADER]: "/agent-leader/dashboard",
    [Role.AGENT]: "/agent",
    [Role.CUSTOMER]: "/dashboard",
  };
  return map[role] ?? "/";
}