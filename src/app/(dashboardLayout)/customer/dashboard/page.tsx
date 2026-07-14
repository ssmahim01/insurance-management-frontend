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
