/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { PageHeader } from "@/components/features/dashboard/components/PageHeader";
import { PartnerForm } from '@/components/features/dashboard/partners/PartnerForm';

export default function CreatePartnerPage() {
  const handleSubmit = async (data: any) => {
    // TODO: Replace with RTK Query mutation
    console.log('Partner data:', data);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
  };

  return (
    <div>
      <PageHeader
        title="Create Partner"
        description="Add a new insurance partner to your system"
        breadcrumbs={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Partners', href: '/dashboard/partners' },
          { label: 'Create' },
        ]}
      />

      <div className="rounded-lg border border-border p-8">
        <PartnerForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
