/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { BranchForm } from '@/components/features/dashboard/branches/BranchForm';
import { PageHeader } from '@/components/features/dashboard/components/PageHeader';

const mockBranch = {
  id: '1',
  partnerId: '1',
  name: 'Dhaka Head Office',
  email: 'dhaka@abcins.com',
  phone: '+880 1700 100001',
  address: '123 Main Street, Dhaka',
  city: 'Dhaka',
  area: 'Gulshan',
  postalCode: '1212',
  latitude: 23.81,
  longitude: 90.41,
  status: 'active' as const,
  createdAt: new Date('2024-01-15'),
};

const mockPartners = [
  { id: '1', name: 'ABC Insurance Co.', email: 'contact@abcins.com', phone: '+880 1700 000001', website: 'https://abcins.com', logo: '', description: '', status: 'active' as const },
  { id: '2', name: 'XYZ Insurance Ltd.', email: 'info@xyzins.com', phone: '+880 1700 000002', website: 'https://xyzins.com', logo: '', description: '', status: 'active' as const },
];

interface EditBranchPageProps {
  params: { id: string };
}

export default function EditBranchPage({ params }: EditBranchPageProps) {
  const handleSubmit = async (data: any) => {
    // TODO: Replace with RTK Query mutation
    console.log('Updated branch data:', data);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
  };

  return (
    <div>
      <PageHeader
        title="Edit Branch"
        description="Update branch information"
        breadcrumbs={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Branches', href: '/dashboard/branches' },
          { label: 'Edit' },
        ]}
      />

      <div className="rounded-lg border border-border p-8">
        <BranchForm partners={mockPartners} initialData={mockBranch} onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
