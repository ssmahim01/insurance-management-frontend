
import { Role } from "@/types/user.types";

export type UserRole = Role;

export type RouteConfig = {
  exact: string[];
  patterns: RegExp[];
};

// ── Route Configs (most specific first, checked in isValidRouteForRole) ──

export const superAdminOnlyRoutes: RouteConfig = {
  exact: [],
  patterns: [
    /^\/admin\/dashboard\/admin\/trash/,
    /^\/admin\/dashboard\/admin/,
  ],
};

export const adminRoutes: RouteConfig = {
  exact: [],
  patterns: [
    /^\/admin\/dashboard/],
};

export const managerRoutes: RouteConfig = {
  exact: [],
  patterns: [/^\/manager\/dashboard/],
};

export const agentLeaderRoutes: RouteConfig = {
  exact: [],
  patterns: [/^\/agent-leader\/dashboard/],
};

export const agentRoutes: RouteConfig = {
  exact: [],
  patterns: [/^\/agent\/dashboard/],
};

export const customerRoutes: RouteConfig = {
  exact: ["/customer/dashboard"],
  patterns: [/^\/customer\/dashboard(?!\/admin)/], // "/customer/dashboard*" but NOT "/customer/dashboard/admin"
};

export const sharedAuthRoutes: RouteConfig = {
  exact: [],
  patterns: [/^\/dashboard\/profile/, /^\/dashboard\/settings/],
};

// ── Helpers ──

export const isRouteMatches = (
  pathname: string,
  routes: RouteConfig
): boolean => {
  if (routes.exact.includes(pathname)) return true;
  return routes.patterns.some((pattern) => pattern.test(pathname));
};

export const getRouteOwner = (pathname: string): UserRole | null => {
  if (isRouteMatches(pathname, superAdminOnlyRoutes)) return Role.SUPER_ADMIN;
  if (isRouteMatches(pathname, adminRoutes)) return Role.ADMIN;
  if (isRouteMatches(pathname, managerRoutes)) return Role.MANAGER;
  if (isRouteMatches(pathname, agentLeaderRoutes)) return Role.AGENT_LEADER;
  if (isRouteMatches(pathname, agentRoutes)) return Role.AGENT;
  if (isRouteMatches(pathname, customerRoutes)) return Role.CUSTOMER;
  return null;
};

export const isValidRouteForRole = (
  pathname: string,
  role: UserRole
): boolean => {
  // Shared routes — any authenticated role
  if (isRouteMatches(pathname, sharedAuthRoutes)) {
    return true;
  }

  // Super-admin-only routes
  if (isRouteMatches(pathname, superAdminOnlyRoutes)) {
    return role === Role.SUPER_ADMIN;
  }

  // Admin section — SUPER_ADMIN and ADMIN
  if (isRouteMatches(pathname, adminRoutes)) {
    return role === Role.SUPER_ADMIN || role === Role.ADMIN;
  }

  // Manager section
  if (isRouteMatches(pathname, managerRoutes)) {
    return role === Role.MANAGER;
  }

  // Agent Leader section
  if (isRouteMatches(pathname, agentLeaderRoutes)) {
    return role === Role.AGENT_LEADER;
  }

  // Agent section
  if (isRouteMatches(pathname, agentRoutes)) {
    return role === Role.AGENT;
  }

  // Customer section
  if (isRouteMatches(pathname, customerRoutes)) {
    return role === Role.CUSTOMER;
  }

  // Public route
  return true;
};

/**
 * Role er default dashboard route.
 */
export const getDefaultDashboardRoute = (role: UserRole): string => {
  switch (role) {
    case Role.SUPER_ADMIN:
    case Role.ADMIN:
      return "/admin/dashboard";
    case Role.MANAGER:
      return "/manager/dashboard";
    case Role.AGENT_LEADER:
      return "/agent-leader/dashboard";
    case Role.AGENT:
      return "/agent/dashboard";
    case Role.CUSTOMER:
      return "/customer/dashboard";
    default:
      return "/";
  }
};