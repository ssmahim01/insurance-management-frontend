import {
  LayoutDashboard,
  ShieldCheck,
  User,
  Users,
  Settings,
  Trash2,
  Plus,
} from "lucide-react";
import { NavGroup } from "@/types/dashboard";

export const agentLeaderNavigation: NavGroup[] = [
  {
    label: "Overview",
    items: [
      {
        id: "dashboard",
        label: "Dashboard",
        href: "/agent-leader/dashboard",
        icon: LayoutDashboard,
      },
    ],
  },

  {
    label: "Team Management",
    items: [
      {
        id: "my-agents",
        label: "My Agents",
        href: "/agent-leader/my-agents",
        icon: Users,
      },
      {
        id: "create-agent",
        label: "Add Agent",
        href: "/agent-leader/my-agents/create",
        icon: Plus,
      },
      {
        id: "trash-agents",
        label: "Trash",
        href: "/agent-leader/my-agents/trash",
        icon: Trash2,
      },
    ],
  },

  {
    label: "Insurance",
    items: [
      {
        id: "subscriptions",
        label: "Customer Subscriptions",
        href: "/agent-leader/subscriptions",
        icon: ShieldCheck,
      },
    ],
  },

  {
    label: "Account",
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