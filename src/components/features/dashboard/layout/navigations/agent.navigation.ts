import {
  LayoutDashboard,
  Users,
  ShieldCheck,
  Trash2,
  User,
  Settings,
} from "lucide-react";

import { NavGroup } from "@/types/dashboard";

export const agentNavigation: NavGroup[] = [
  {
    label: "Overview",
    items: [
      {
        id: "dashboard",
        label: "Dashboard",
        href: "/agent",
        icon: LayoutDashboard,
      },
    ],
  },

  {
    label: "Management",
    items: [
      {
        id: "customers",
        label: "Customers",
        href: "/agent/customers",
        icon: Users,
      },
      {
        id: "subscriptions",
        label: "Subscriptions",
        href: "/agent/subscriptions",
        icon: ShieldCheck,
      },
      {
        id: "trash",
        label: "Trash",
        href: "/agent/trash",
        icon: Trash2,
      },
    ],
  },

  {
    label: "System",
    items: [
      {
        id: "profile",
        label: "Profile",
        href: "/dashboard/profile",
        icon: User,
      },
      {
        id: "settings",
        label: "Settings",
        href: "/dashboard/settings",
        icon: Settings,
      },
    ],
  },
];