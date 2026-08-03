import {
  BaggageClaim,
  Bell,
  Building2,
  LayoutDashboard,
  MessageSquare,
  ShieldCheck,
  User,
  User2Icon,
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
      label: "Team Management",
      items: [
        
        {
          id: "branches",
          label: "Nearby Branches",
          href: "/customer/dashboard/nearby-branches",
          icon: Building2,
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
        id: "consultants",
        label: "Consultants",
        href: "/customer/dashboard/consultants",
        icon: User2Icon,
      },
    ],
  },
  {
    label: "Account",
    items: [
      {
        id: "profile",
        label: "Profile",
        href: "/customer/dashboard/profile",
        icon: User,
      },
    ],
  },
];
