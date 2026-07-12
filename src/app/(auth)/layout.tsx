import Footer from '@/components/public-views/layout/Footer';
import Navbar from '@/components/public-views/layout/Navbar';
import { Toaster } from 'sonner';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
        {children}
      <Footer />
      <Toaster position="top-right" richColors />
    </>
  );
}
