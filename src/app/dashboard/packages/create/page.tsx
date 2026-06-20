/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { PageHeader } from "@/components/features/dashboard/components/PageHeader";
import { PackageForm } from '@/components/features/dashboard/packages/PackageForm';

export default function CreatePackagePage() {
  const handleSubmit = async (data: any) => {
    // TODO: Replace with RTK Query mutation
    console.log('Package data:', data);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
  };

  return (
    <div>
      <PageHeader
        title="Create Insurance Package"
        description="Add a new insurance package to your system"
        breadcrumbs={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Insurance Packages', href: '/dashboard/packages' },
          { label: 'Create' },
        ]}
      />

      <div className="rounded-lg border border-border p-8">
        <PackageForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
