import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Register | Insurance Management',
  description: 'Create a new Insurance Management account',
  openGraph: {
    title: 'Register | Insurance Management',
    description: 'Create a new Insurance Management account',
  },
  keywords: ['register', 'sign up', 'insurance', 'management'],
};

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
