import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Forgot Password | Insurance Management',
  description: 'Reset your Insurance Management password',
  openGraph: {
    title: 'Forgot Password | Insurance Management',
    description: 'Reset your Insurance Management password',
  },
  keywords: ['forgot password', 'reset password', 'insurance', 'management'],
};

export default function ForgotPasswordLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
