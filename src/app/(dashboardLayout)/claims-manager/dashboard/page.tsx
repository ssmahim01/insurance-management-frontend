import type { Metadata } from 'next';
import ClaimsManagerDashboard from '@/components/claims-manager/ClaimsManagerDashboard';

export const metadata: Metadata = {
  title: 'Dashboard | Shurokkha',
  description: 'Welcome to your insurance management dashboard',
};

export default function DashboardPage() {
  return (
    <ClaimsManagerDashboard />
  );
}
