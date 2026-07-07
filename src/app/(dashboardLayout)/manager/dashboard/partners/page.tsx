
import type { Metadata } from 'next';
import PartnerManagement from '@/components/partner/PartnerManagement';

export const metadata: Metadata = {
  title: 'Partner Management | Shurokkha',
  description: 'Manage your insurance partners',
};

export default function PartnerManagementPage() {
  return (
    <div>
      <PartnerManagement />
    </div>
  );
}

