import type { Metadata } from 'next';
import { DashboardLayoutWrapper } from '@/components/features/dashboard/layout/DashboardLayout';
import ReduxProvider from '@/providers/ReduxProvider';
import Navbar from '@/components/public-views/layout/Navbar';
import Footer from '@/components/public-views/layout/Footer';
import AnnouncementBar from '@/components/public-views/layout/AnnouncementBar';

export const metadata: Metadata = {
  title: 'Dashboard | Shurokkha',
  description: 'Insurance Management System Dashboard',
};

export default function Layout({ children }: { children: React.ReactNode }) {

  return (
      <ReduxProvider>
        <AnnouncementBar />
        <Navbar />
        {children}
        <Footer />
      </ReduxProvider>
  );
}
