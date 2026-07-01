/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { PageHeader } from "@/components/features/dashboard/components/PageHeader";
import { PackageForm } from '@/components/features/dashboard/packages/PackageForm';

const mockPackage = {
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
    { id: '1', title: 'Hospitalization', description: 'Up to 100% coverage' },
    { id: '2', title: 'Outpatient', description: 'Limited coverage' },
  ],
  exclusions: [
    { id: '1', title: 'Pre-existing conditions', description: 'Not covered in first year' },
  ],
  status: 'active' as const,
  createdAt: new Date('2024-01-15'),
};

interface EditPackagePageProps {
  params: { id: string };
}

export default function EditPackagePage({ params }: EditPackagePageProps) {
  const handleSubmit = async (data: any) => {
    // TODO: Replace with RTK Query mutation
    console.log('Updated package data:', data);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
  };

  return (
    <div>
      <PageHeader
        title="Edit Insurance Package"
        description="Update package information"
        breadcrumbs={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Insurance Packages', href: '/dashboard/packages' },
          { label: 'Edit' },
        ]}
      />

      <div className="rounded-lg border border-border p-8">
        <PackageForm initialData={mockPackage} onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
