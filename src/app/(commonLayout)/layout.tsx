import type { Metadata } from 'next';
// import { DashboardLayoutWrapper } from '@/components/features/dashboard/layout/DashboardLayout';
import ReduxProvider from '@/providers/ReduxProvider';
import Navbar from '@/components/public-views/layout/Navbar';
import Footer from '@/components/public-views/layout/Footer';
import AnnouncementBar from '@/components/public-views/layout/AnnouncementBar';
import ScrollToTopButton from '@/components/shared/ScrollToTopButton';
import WhatsAppButton from '@/components/shared/WhatsAppButton';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Shurokkha',
  description: 'Insurance Management System Dashboard',
};

export default function Layout({ children }: { children: React.ReactNode }) {

  return (
    <ReduxProvider>
      {/* <AnnouncementBar />
        <Navbar />
        {children}
        <WhatsAppButton />
        <ScrollToTopButton />
        <Footer /> */}

      {/* <h2>Welcome to surokkha</h2> */}
 <Image
  className="w-full h-full cursor-pointer transition-transform duration-300 ease-out group-hover:scale-105 object-cover"
  src="/assets/comming-soon-banner-image.png"
  alt="Coming Soon"
  width={1920}
  height={400}
  priority
/>
    </ReduxProvider>
  );
}
