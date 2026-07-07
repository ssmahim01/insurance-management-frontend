import type { Metadata } from 'next';
import { PageHeader } from '@/components/features/dashboard/components/PageHeader';
import { StatsCard } from '@/components/features/dashboard/components/StatsCard';
import { Activity, Users, GitBranch, Shield } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Dashboard | Shurokkha',
  description: 'Welcome to your insurance management dashboard',
};

export default function DashboardPage() {
  return (
    <div>
      <PageHeader
        title="Dashboard"
        description="Welcome to your insurance management system"
        breadcrumbs={[{ label: 'Dashboard' }]}

        
      />

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Total Partners"
          value="24"
          icon={<Users className="w-5 h-5 text-primary" />}
          trend={{ value: 12, isPositive: true }}
        />
        <StatsCard
          title="Active Branches"
          value="156"
          icon={<GitBranch className="w-5 h-5 text-blue-500" />}
          trend={{ value: 8, isPositive: true }}
        />
        <StatsCard
          title="Insurance Packages"
          value="18"
          icon={<Shield className="w-5 h-5 text-secondary" />}
          trend={{ value: 3, isPositive: false }}
        />
        <StatsCard
          title="Active Claims"
          value="42"
          icon={<Activity className="w-5 h-5 text-yellow-500" />}
          trend={{ value: 5, isPositive: false }}
        />
      </div>

      {/* Welcome Message */}
      <div className="rounded-lg border border-border bg-card p-8 text-center">
        <h2 className="text-2xl font-bold mb-2">Welcome to Shurokkha</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Your comprehensive insurance management platform. Use the sidebar to navigate between
          partner management, branch operations, and insurance packages.
        </p>
      </div>
    </div>
  );
}
