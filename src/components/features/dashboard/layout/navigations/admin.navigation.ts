import {
  Building2,
  Handshake,
  LayoutDashboard,
  Package,
  Settings,
  ShieldCheck,
  User,
  Users,
} from "lucide-react";
import { NavGroup } from "@/types/dashboard";

export const adminNavigation: NavGroup[] = [
  {
    label: "Overview",
    items: [
      {
        id: "dashboard",
        label: "Dashboard",
        href: "/admin/dashboard",
        icon: LayoutDashboard,
      },
    ],
  },

  {
    label: "Insurance Management",
    items: [
      {
        id: "packages",
        label: "Packages",
        href: "/admin/dashboard/packages",
        icon: Package,
      },
      // {
      //   id: "subscriptions",
      //   label: "Subscriptions",
      //   href: "/admin/dashboard/subscriptions",
      //   icon: ShieldCheck,
      // },
    ],
  },

  {
    label: "Team Management",
    items: [
            {
        id: "managers",
        label: "Managers",
        href: "/admin/dashboard/managers",
        icon: Users,
    },
      {
        id: "agent-leaders",
        label: "Agent Leaders",
        href: "/admin/dashboard/agent-leader",
        icon: Users,
      },
      {
        id: "agents",
        label: "Agents",
        href: "/admin/dashboard/agents",
        icon: Handshake,
      },
      {
        id: "customers",
        label: "Customers",
        href: "/admin/dashboard/customers",
        icon: User,
      },
      {
        id: "partners",
        label: "Partners",
        href: "/admin/dashboard/partners",
        icon: Handshake,
      },
      {
        id: "branches",
        label: "Branches",
        href: "/admin/dashboard/branches",
        icon: Building2,
      },
    ],
  }
];