import { BaggageClaim, LayoutDashboard, User } from "lucide-react";
import { NavGroup } from "@/types/dashboard";

export const claimManagerNavigation: NavGroup[] = [
  {
    label: "Overview",
    items: [
      {
        id: "dashboard",
        label: "Dashboard",
        href: "/claims-manager/dashboard",
        icon: LayoutDashboard,
      },
    ],
  },

  {
    label: "Insurance",
    items: [
      {
        id: "claims",
        label: "Claims",
        href: "/claims-manager/dashboard/claims",
        icon: BaggageClaim,
      },
    ],
  },
  {
    label: "Account",
    items: [
      {
        id: "profile",
        label: "Profile",
        href: "/claims-manager/dashboard/profile",
        icon: User,
      },
    ],
  },
];
