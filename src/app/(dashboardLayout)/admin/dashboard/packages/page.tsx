import type { Metadata } from 'next';
import PackageManagement from '@/components/package/PackageManagement';

export const metadata: Metadata = {
  title: 'Insurance Packages | Shurokkha',
  description: 'Manage your insurance packages',
};

export default function PackagesPage() {
  return (
    <div>
      <PackageManagement />
    </div>
  );
}
