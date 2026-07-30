import type { Metadata } from 'next';
// import { DashboardLayoutWrapper } from '@/components/features/dashboard/layout/DashboardLayout';
import ReduxProvider from '@/providers/ReduxProvider';
import Navbar from '@/components/public-views/layout/Navbar';
import Footer from '@/components/public-views/layout/Footer';
import ScrollToTopButton from '@/components/shared/ScrollToTopButton';
import WhatsAppButton from '@/components/shared/WhatsAppButton';

export const metadata: Metadata = {
  title: 'Shurokkha',
  description: 'Insurance Management System Dashboard',
};

export default function Layout({ children }: { children: React.ReactNode }) {

  return (
    <ReduxProvider>
      <Navbar />
        {children}
        <WhatsAppButton />
        <ScrollToTopButton />
        {/* <Footer /> */}
      <WhatsAppButton />
      <ScrollToTopButton />
      {/* <Footer /> */}
    </ReduxProvider>
  );
}
