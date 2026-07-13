import { Wallet, Users, ShieldCheck, Package, UserCog, Crown } from "lucide-react";
import { IDashboardSummary } from "@/types/dashboard";
import { formatCurrency } from "@/lib/utils/format-subscription";
import { KpiCard } from "./KpiCard";

interface KpiGridProps {
  summary: IDashboardSummary;
}

export function KpiGrid({ summary }: KpiGridProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
      <KpiCard label="Revenue" value={formatCurrency(summary.totalRevenue)} icon={Wallet} accent="navy" />
      <KpiCard label="Customers" value={summary.totalCustomers.toLocaleString()} icon={Users} />
      <KpiCard label="Subscriptions" value={summary.totalSubscriptions.toLocaleString()} icon={ShieldCheck} />
      <KpiCard label="Packages" value={summary.totalPackages.toLocaleString()} icon={Package} />
      <KpiCard label="Agents" value={summary.totalAgents.toLocaleString()} icon={UserCog} />
      <KpiCard label="Agent Leaders" value={summary.totalAgentLeaders.toLocaleString()} icon={Crown} />
    </div>
  );
}