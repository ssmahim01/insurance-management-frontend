import type { Metadata } from 'next';
import { PageHeader } from '@/components/features/dashboard/components/PageHeader';
import { PartnerStats } from '@/components/features/dashboard/partners/PartnerStats';
import { PartnerTable } from '@/components/features/dashboard/partners/PartnerTable';

export const metadata: Metadata = {
  title: 'Partners | Shurokkha',
  description: 'Manage your insurance partners',
};

// Mock data for now - replace with RTK Query
const mockPartners = [
  {
    id: '1',
    name: 'ABC Insurance Co.',
    email: 'contact@abcins.com',
    phone: '+880 1700 000001',
    website: 'https://abcins.com',
    logo: 'https://via.placeholder.com/100',
    description: 'Leading insurance provider',
    status: 'active' as const,
    createdAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    name: 'XYZ Insurance Ltd.',
    email: 'info@xyzins.com',
    phone: '+880 1700 000002',
    website: 'https://xyzins.com',
    logo: 'https://via.placeholder.com/100',
    description: 'Comprehensive insurance solutions',
    status: 'active' as const,
    createdAt: new Date('2024-02-20'),
  },
  {
    id: '3',
    name: 'PQR Insurance Group',
    email: 'support@pqrins.com',
    phone: '+880 1700 000003',
    website: 'https://pqrins.com',
    logo: 'https://via.placeholder.com/100',
    description: 'Insurance for everyone',
    status: 'inactive' as const,
    createdAt: new Date('2024-03-10'),
  },
];

export default function PartnersPage() {
  return (
    <div>
      <PageHeader
        title="Partners"
        description="Manage and view all your insurance partners"
        breadcrumbs={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Partners' },
        ]}
        action={{
          label: 'Create Partner',
          href: '/dashboard/partners/create',
        }}
      />

      <PartnerStats partners={mockPartners} />

      <div className="space-y-6">
        <PartnerTable partners={mockPartners} />
      </div>
    </div>
  );
}
