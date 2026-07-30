import {
  BadgeDollarSign,
  Building2,
  LayoutDashboard,
  Package,
} from "lucide-react";
import { NavGroup } from "@/types/dashboard";

export const AAManagerNavigation: NavGroup[] = [
  {
    label: "Overview",
    items: [
      {
        id: "dashboard",
        label: "Dashboard",
        href: "/a-a-manager/dashboard",
        icon: LayoutDashboard,
      },
    ],
  },

  {
    label: "Insurance Management",
    items: [
      {
        id: "customer",
        label: "Customers",
        href: "/a-a-manager/dashboard/customers",
        icon: Package,
      },
    ],
  },
      {
    label: "Payment Management",
    items: [
      {
        id: "payments",
        label: "Payments",
        href: "/a-a-manager/dashboard/payments",
        icon: BadgeDollarSign,
      },
     
    ],
  }
];