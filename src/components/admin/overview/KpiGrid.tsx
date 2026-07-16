"use client";

import {
  Wallet,
  Users,
  ShieldCheck,
  Package,
  UserCog,
  Crown,
} from "lucide-react";

import { IDashboardSummary } from "@/types/dashboard";
import { formatCurrency } from "@/lib/utils/format-subscription";
import { KpiCard } from "./KpiCard";
import { useGetMeQuery } from "@/redux/features/user/user.api";

interface KpiGridProps {
  summary: IDashboardSummary;
  isCustomer?: boolean;
}


type KpiCardColor =
  | "emerald"
  | "blue"
  | "violet"
  | "amber"
  | "cyan"
  | "rose";

export function KpiGrid({ summary, isCustomer }: KpiGridProps) {
  const cards: Array<{
    label: string;
    value: string;
    icon: typeof Wallet;
    color: KpiCardColor;
  }> = [
 {
    label: isCustomer ? "My Spending" : "Total Revenue",
    value: formatCurrency(summary.totalRevenue),
    icon: Wallet,
    color: "emerald",
  },

  {
    label: isCustomer ? "My Policies" : "Customers",
    value: summary.totalCustomers.toLocaleString(),
    icon: Users,
    color: "blue",
  },

  {
    label: isCustomer ? "My Subscriptions" : "Subscriptions",
    value: summary.totalSubscriptions.toLocaleString(),
    icon: ShieldCheck,
    color: "violet",
  },

    // {
    //   label: "Packages",
    //   value: summary.totalPackages.toLocaleString(),
    //   icon: Package,
    //   color: "amber",
    // },
  ];

  if (!isCustomer && summary.totalAgents > 0) {
    cards.push({
      label: "Agents",
      value: summary.totalAgents.toLocaleString(),
      icon: UserCog,
      color: "cyan",
    });
  }

  if (!isCustomer && summary.totalAgentLeaders > 0) {
    cards.push({
      label: "Agent Leaders",
      value: summary.totalAgentLeaders.toLocaleString(),
      icon: Crown,
      color: "rose",
    });
  }

  const { data: me } = useGetMeQuery(undefined);
  const role = me?.data?.role;

  return (
    <div
      className={`
        grid gap-4
        ${role === "ADMIN" ? "grid-cols-2 md:grid-cols-4 xl:grid-cols-5" : role === "AGENT_LEADER" ? "grid-cols-2 md:grid-cols-3 xl:grid-cols-4" : "grid-cols-2 md:grid-cols-3 xl:grid-cols-3"}
      `}
    >
      {cards.map((card) => (
        <KpiCard
          key={card.label}
          label={card.label}
          value={card.value}
          icon={card.icon}
          color={card.color}
        />
      ))}
    </div>
  );
}
