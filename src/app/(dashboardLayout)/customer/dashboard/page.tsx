import type { Metadata } from 'next';
import { DashboardPageContent } from '@/components/admin/overview/DashboardPageContent';
import { CustomerDashboardOverview } from '@/components/customer/Dashboard/CustomerDashboardOverview';

export const metadata: Metadata = {
  title: 'Dashboard | Shurokkha',
  description: 'Welcome to your insurance management dashboard',
};

export default function DashboardPage() {
  return (
    <CustomerDashboardOverview />
  );
}
