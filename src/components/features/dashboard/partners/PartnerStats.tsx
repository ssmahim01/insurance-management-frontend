import { Users, TrendingUp } from 'lucide-react';
import { StatsCard } from '../components/StatsCard';
import type { Partner } from '@/lib/schemas/partner.schema';

interface PartnerStatsProps {
  partners: Partner[];
  isLoading?: boolean;
}

export function PartnerStats({ partners }: PartnerStatsProps) {
  const totalPartners = partners.length;
  const activePartners = partners.filter((p) => p.status === 'active').length;
  const activePercentage = totalPartners > 0 
    ? Math.round((activePartners / totalPartners) * 100)
    : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <StatsCard
        title="Total Partners"
        value={totalPartners}
        icon={<Users className="w-5 h-5 text-primary" />}
        trend={{ value: 12, isPositive: true }}
      />
      <StatsCard
        title="Active Partners"
        value={activePartners}
        subtext={`${activePercentage}% active`}
        icon={<TrendingUp className="w-5 h-5 text-green-500" />}
      />
      <StatsCard
        title="Inactive Partners"
        value={totalPartners - activePartners}
        icon={<Users className="w-5 h-5 text-muted-foreground" />}
      />
    </div>
  );
}
