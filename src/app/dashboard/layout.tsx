import type { Metadata } from 'next';
import { DashboardLayoutWrapper } from '@/components/features/dashboard/layout/DashboardLayout';
import ReduxProvider from '@/providers/ReduxProvider';

export const metadata: Metadata = {
  title: 'Dashboard | Shurokkha',
  description: 'Insurance Management System Dashboard',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const mockUser = {
    name: 'Admin User',
    email: 'admin@shurokkha.com',
    role: 'Administrator',
  };

  return (
    <DashboardLayoutWrapper 
      user={mockUser}
      defaultOpen={true}
    >
<ReduxProvider>
      {children}
</ReduxProvider>
    </DashboardLayoutWrapper>
  );
}
