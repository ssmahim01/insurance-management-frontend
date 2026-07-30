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

export const managerNavigation: NavGroup[] = [
  {
    label: "Overview",
    items: [
      {
        id: "dashboard",
        label: "Dashboard",
        href: "/manager/dashboard",
        icon: LayoutDashboard,
      },
    ],
  },

  {
    label: "Insurance Management",
    items: [
      {
        id: "partner",
        label: "Partners",
        href: "/manager/dashboard/partners",
        icon: Package,
      },
      {
        id: "branches",
        label: "Branches",
        href: "/manager/dashboard/branches",
        icon: Building2,
      },
    ],
  },
];