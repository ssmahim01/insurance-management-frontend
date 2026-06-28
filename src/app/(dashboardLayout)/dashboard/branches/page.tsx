import type { Metadata } from 'next';
import { PageHeader } from '@/components/features/dashboard/components/PageHeader';
import { BranchStats } from '@/components/features/dashboard/branches/BranchStats';
import { BranchTable } from '@/components/features/dashboard/branches/BranchTable';

export const metadata: Metadata = {
  title: 'Branches | Shurokkha',
  description: 'Manage your insurance branches',
};

// Mock data for now - replace with RTK Query
const mockBranches = [
  {
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
  },
  {
    id: '2',
    partnerId: '1',
    name: 'Chittagong Branch',
    email: 'chittagong@abcins.com',
    phone: '+880 1700 100002',
    address: '456 Port Road, Chittagong',
    city: 'Chittagong',
    area: 'Halishahar',
    postalCode: '4000',
    latitude: 22.35,
    longitude: 91.83,
    status: 'active' as const,
    createdAt: new Date('2024-02-20'),
  },
  {
    id: '3',
    partnerId: '2',
    name: 'Sylhet Branch',
    email: 'sylhet@xyzins.com',
    phone: '+880 1700 100003',
    address: '789 College Road, Sylhet',
    city: 'Sylhet',
    area: 'Banani',
    postalCode: '3100',
    latitude: 24.89,
    longitude: 91.87,
    status: 'inactive' as const,
    createdAt: new Date('2024-03-10'),
  },
];

export default function BranchesPage() {
  return (
    <div>
      <PageHeader
        title="Branches"
        description="Manage and view all your insurance branches"
        breadcrumbs={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Branches' },
        ]}
        action={{
          label: 'Create Branch',
          href: '/dashboard/branches/create',
        }}
      />

      <BranchStats branches={mockBranches} />

      <div className="space-y-6">
        <BranchTable branches={mockBranches} />
      </div>
    </div>
  );
}
