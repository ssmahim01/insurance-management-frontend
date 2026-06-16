import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login | Insurance Management',
  description: 'Sign in to your Insurance Management account',
  openGraph: {
    title: 'Login | Insurance Management',
    description: 'Sign in to your Insurance Management account',
  },
  keywords: ['login', 'sign in', 'insurance', 'management'],
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
