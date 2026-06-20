import type { Metadata } from 'next';
import { PageHeader } from '@/components/features/dashboard/components/PageHeader';
import { PackageStats } from '@/components/features/dashboard/packages/PackageStats';
import { PackageTable } from '@/components/features/dashboard/packages/PackageTable';

export const metadata: Metadata = {
  title: 'Insurance Packages | Shurokkha',
  description: 'Manage your insurance packages',
};

// Mock data for now - replace with RTK Query
const mockPackages = [
  {
    id: '1',
    name: 'Basic Health Package',
    slug: 'basic-health',
    description: 'Essential health coverage for individuals',
    coverageAmount: 500000,
    plans: [
      { name: 'Annual', duration: 12, price: 5000 },
      { name: 'Monthly', duration: 1, price: 500 },
    ],
    benefits: [
      { title: 'Hospitalization', description: 'Up to 100% coverage' },
      { title: 'Outpatient', description: 'Limited coverage' },
    ],
    exclusions: [
      { title: 'Pre-existing conditions', description: 'Not covered in first year' },
    ],
    status: 'active' as const,
    createdAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    name: 'Premium Family Package',
    slug: 'premium-family',
    description: 'Comprehensive family health coverage',
    coverageAmount: 2000000,
    plans: [
      { name: 'Annual', duration: 12, price: 18000 },
      { name: 'Quarterly', duration: 3, price: 5000 },
    ],
    benefits: [
      { title: 'Full Hospitalization', description: '100% coverage' },
      { title: 'Dental', description: 'Up to 50% coverage' },
      { title: 'Vision', description: 'Up to 60% coverage' },
    ],
    exclusions: [],
    status: 'active' as const,
    createdAt: new Date('2024-02-20'),
  },
  {
    id: '3',
    name: 'Critical Illness Package',
    slug: 'critical-illness',
    description: 'Protection against major illnesses',
    coverageAmount: 1500000,
    plans: [
      { name: 'Annual', duration: 12, price: 12000 },
    ],
    benefits: [
      { title: 'Critical Illness Cover', description: 'Up to 100% of coverage amount' },
      { title: 'Wellness', description: 'Annual health check-up' },
    ],
    exclusions: [
      { title: 'War or terrorism', description: 'Not covered' },
    ],
    status: 'inactive' as const,
    createdAt: new Date('2024-03-10'),
  },
];

export default function PackagesPage() {
  return (
    <div>
      <PageHeader
        title="Insurance Packages"
        description="Manage and view all your insurance packages"
        breadcrumbs={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Insurance Packages' },
        ]}
        action={{
          label: 'Create Package',
          href: '/dashboard/packages/create',
        }}
      />

      <PackageStats packages={mockPackages} />

      <div className="space-y-6">
        <PackageTable packages={mockPackages} />
      </div>
    </div>
  );
}
