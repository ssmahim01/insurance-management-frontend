import { Shield, TrendingUp, DollarSign } from 'lucide-react';
import { StatsCard } from '../components/StatsCard';
import type { InsurancePackage } from '@/lib/schemas/package.schema';

interface PackageStatsProps {
  packages: InsurancePackage[];
  isLoading?: boolean;
}

export function PackageStats({ packages }: PackageStatsProps) {
  const totalPackages = packages.length;
  const activePackages = packages.filter((p) => p.status === 'active').length;
  const activePercentage = totalPackages > 0 
    ? Math.round((activePackages / totalPackages) * 100)
    : 0;
  const totalCoverage = packages.reduce((sum, p) => sum + p.coverageAmount, 0);
  const avgCoverage = totalPackages > 0 ? totalCoverage / totalPackages : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <StatsCard
        title="Total Packages"
        value={totalPackages}
        icon={<Shield className="w-5 h-5 text-primary" />}
        trend={{ value: 5, isPositive: true }}
      />
      <StatsCard
        title="Active Packages"
        value={activePackages}
        subtext={`${activePercentage}% active`}
        icon={<TrendingUp className="w-5 h-5 text-green-500" />}
      />
      <StatsCard
        title="Avg Coverage"
        value={`₹${(avgCoverage / 100000).toFixed(1)}L`}
        icon={<DollarSign className="w-5 h-5 text-blue-500" />}
      />
      <StatsCard
        title="Total Coverage"
        value={`₹${(totalCoverage / 10000000).toFixed(0)}Cr`}
        icon={<Shield className="w-5 h-5 text-secondary" />}
      />
    </div>
  );
}
