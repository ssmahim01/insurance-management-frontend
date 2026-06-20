import { MapPin, TrendingUp } from 'lucide-react';
import { StatsCard } from '../components/StatsCard';
import type { Branch } from '@/lib/schemas/branch.schema';

interface BranchStatsProps {
  branches: Branch[];
  isLoading?: boolean;
}

export function BranchStats({ branches }: BranchStatsProps) {
  const totalBranches = branches.length;
  const activeBranches = branches.filter((b) => b.status === 'active').length;
  const activePercentage = totalBranches > 0 
    ? Math.round((activeBranches / totalBranches) * 100)
    : 0;
  const cities = new Set(branches.map((b) => b.city)).size;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <StatsCard
        title="Total Branches"
        value={totalBranches}
        icon={<MapPin className="w-5 h-5 text-primary" />}
        trend={{ value: 8, isPositive: true }}
      />
      <StatsCard
        title="Active Branches"
        value={activeBranches}
        subtext={`${activePercentage}% active`}
        icon={<TrendingUp className="w-5 h-5 text-green-500" />}
      />
      <StatsCard
        title="Cities Covered"
        value={cities}
        icon={<MapPin className="w-5 h-5 text-blue-500" />}
      />
      <StatsCard
        title="Inactive"
        value={totalBranches - activeBranches}
        icon={<MapPin className="w-5 h-5 text-muted-foreground" />}
      />
    </div>
  );
}
