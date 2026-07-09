import {
  BaggageClaim,
  Bell,
  LayoutDashboard,
  MessageSquare,
  Settings,
  ShieldCheck,
} from "lucide-react";
import { NavGroup } from "@/types/dashboard";

export const customerNavigation: NavGroup[] = [
  {
    label: "Overview",
    items: [
      {
        id: "dashboard",
        label: "Dashboard",
        href: "/customer/dashboard",
        icon: LayoutDashboard,
      },
    ],
  },

  {
    label: "Insurance",
    items: [
      {
        id: "subscriptions",
        label: "My Subscriptions",
        href: "/customer/dashboard/subscriptions",
        icon: ShieldCheck,
      },
      {
        id: "claims",
        label: "Claims",
        href: "/customer/dashboard/claims",
        icon: BaggageClaim,
      },
    ],
  },

  {
    label: "Support",
    items: [
      {
        id: "notifications",
        label: "Notifications",
        href: "/customer/dashboard/notifications",
        icon: Bell,
      },
      {
        id: "messages",
        label: "Messages",
        href: "/customer/dashboard/messages",
        icon: MessageSquare,
      },
      {
        id: "settings",
        label: "Settings",
        href: "/customer/dashboard/settings",
        icon: Settings,
      },
    ],
  },
];