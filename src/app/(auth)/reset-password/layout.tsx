import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Reset Password | Insurance Management',
  description: 'Reset your Insurance Management password',
  openGraph: {
    title: 'Reset Password | Insurance Management',
    description: 'Reset your Insurance Management password',
  },
  keywords: ['reset password', 'insurance', 'management'],
};

export default function ResetPasswordLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
