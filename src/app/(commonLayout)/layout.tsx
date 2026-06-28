import type { Metadata } from 'next';
import { DashboardLayoutWrapper } from '@/components/features/dashboard/layout/DashboardLayout';
import ReduxProvider from '@/providers/ReduxProvider';

export const metadata: Metadata = {
  title: 'Dashboard | Shurokkha',
  description: 'Insurance Management System Dashboard',
};

export default function Layout({ children }: { children: React.ReactNode }) {

  return (
      <ReduxProvider>
        {children}
      </ReduxProvider>
  );
}
