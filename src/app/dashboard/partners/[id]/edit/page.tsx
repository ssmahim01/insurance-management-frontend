/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { PageHeader } from "@/components/features/dashboard/components/PageHeader";
import { PartnerForm } from '@/components/features/dashboard/partners/PartnerForm';

const mockPartner = {
  id: '1',
  name: 'ABC Insurance Co.',
  email: 'contact@abcins.com',
  phone: '+880 1700 000001',
  website: 'https://abcins.com',
  logo: 'https://via.placeholder.com/100',
  description: 'Leading insurance provider',
  status: 'active' as const,
  slug: 'abc-insurance',
  createdAt: new Date('2024-01-15'),
};

interface EditPartnerPageProps {
  params: { id: string };
}

export default function EditPartnerPage({ params }: EditPartnerPageProps) {
  const handleSubmit = async (data: any) => {
    // TODO: Replace with RTK Query mutation
    console.log('Updated partner data:', data);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
  };

  return (
    <div>
      <PageHeader
        title="Edit Partner"
        description="Update partner information"
        breadcrumbs={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Partners', href: '/dashboard/partners' },
          { label: 'Edit' },
        ]}
      />

      <div className="rounded-lg border border-border p-8">
        <PartnerForm initialData={mockPartner} onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
