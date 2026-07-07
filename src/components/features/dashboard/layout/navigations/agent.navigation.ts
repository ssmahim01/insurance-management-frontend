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
        href: "/agent/dashboard",
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
        href: "/agent/dashboard/customers",
        icon: Users,
      },
      // {
      //   id: "subscriptions",
      //   label: "Subscriptions",
      //   href: "/agent/subscriptions",
      //   icon: ShieldCheck,
      // },
      // {
      //   id: "trash",
      //   label: "Trash",
      //   href: "/agent/trash",
      //   icon: Trash2,
      // },
    ],
  },
];