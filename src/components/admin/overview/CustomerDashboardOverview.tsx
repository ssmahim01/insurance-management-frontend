"use client";

import { ShieldCheck, CheckCircle2, Clock, ShieldAlert } from "lucide-react";
import { IDashboardSummary } from "@/types/dashboard";
import { formatCurrency } from "@/lib/utils/format-subscription";
import { KpiCard } from "./KpiCard";

type KpiCardColor = "emerald" | "blue" | "violet" | "amber" | "cyan" | "rose";

interface CustomerDashboardOverviewProps {
  summary: IDashboardSummary;
}

export function CustomerDashboardOverview({
  summary,
}: CustomerDashboardOverviewProps) {
  const cards: Array<{
    label: string;
    value: string;
    icon: typeof ShieldCheck;
    color: KpiCardColor;
  }> = [
    {
      label: "My Subscriptions",
      value: summary.totalSubscriptions.toLocaleString(),
      icon: ShieldCheck,
      color: "violet",
    },
    {
      label: "Active Subscriptions",
      value: summary.activeSubscriptions.toLocaleString(),
      icon: CheckCircle2,
      color: "emerald",
    },
    {
      label: "Pending Subscriptions",
      value: summary.pendingSubscriptions.toLocaleString(),
      icon: Clock,
      color: "amber",
    },
    {
      label: "Unpaid Subscriptions",
      value: summary.unpaidSubscriptions.toLocaleString(),
      icon: ShieldAlert,
      color: "rose",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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