/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { PageHeader } from "@/components/features/dashboard/components/PageHeader";
import { BranchForm } from '@/components/features/dashboard/branches/BranchForm';

// Mock partners data
const mockPartners = [
  { id: '1', name: 'ABC Insurance Co.', email: 'contact@abcins.com', phone: '+880 1700 000001', website: 'https://abcins.com', logo: '', description: '', status: 'active' as const },
  { id: '2', name: 'XYZ Insurance Ltd.', email: 'info@xyzins.com', phone: '+880 1700 000002', website: 'https://xyzins.com', logo: '', description: '', status: 'active' as const },
];

export default function CreateBranchPage() {
  const handleSubmit = async (data: any) => {
    // TODO: Replace with RTK Query mutation
    console.log('Branch data:', data);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
  };

  return (
    <div>
      <PageHeader
        title="Create Branch"
        description="Add a new branch to your system"
        breadcrumbs={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Branches', href: '/dashboard/branches' },
          { label: 'Create' },
        ]}
      />

      <div className="rounded-lg border border-border p-8">
        <BranchForm partners={mockPartners} onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
