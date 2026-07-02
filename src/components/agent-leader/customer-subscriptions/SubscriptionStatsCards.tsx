import { Wallet, ShieldCheck, Clock, Ban } from "lucide-react";
import { ISubscriptionStats } from "@/types/subscription.types";
import { formatCurrency } from "@/lib/utils/format-subscription";

interface SubscriptionStatsCardsProps {
  stats: ISubscriptionStats | undefined;
  isLoading: boolean;
}

interface StatConfig {
  label: string;
  value: string;
  icon: typeof Wallet;
}

export function SubscriptionStatsCards({ stats, isLoading }: SubscriptionStatsCardsProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="rounded-xl border border-border bg-card p-5 space-y-3">
            <div className="h-4 w-20 bg-muted rounded animate-pulse" />
            <div className="h-7 w-16 bg-muted rounded animate-pulse" />
          </div>
        ))}
      </div>
    );
  }

  const cards: StatConfig[] = [
    { label: "Total", value: String(stats?.total ?? 0), icon: Wallet },
    { label: "Paid", value: String(stats?.paid ?? 0), icon: ShieldCheck },
    { label: "Pending", value: String(stats?.pending ?? 0), icon: Clock },
    { label: "Expired", value: String(stats?.expired ?? 0), icon: Ban },
    { label: "Revenue", value: formatCurrency(stats?.totalRevenue), icon: Wallet },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
      {cards.map(({ label, value, icon: Icon }) => (
        <div
          key={label}
          className="rounded-xl border border-border bg-card p-5 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
        >
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              {label}
            </p>
            <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Icon className="h-4 w-4 text-primary" />
            </div>
          </div>
          <p className="text-xl font-bold text-foreground">{value}</p>
        </div>
      ))}
    </div>
  );
}