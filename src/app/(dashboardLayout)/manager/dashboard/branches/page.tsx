
import type { Metadata } from 'next';
import PartnerManagement from '@/components/partner/PartnerManagement';
import BranchManagement from '@/components/branch/BranchManagement';

export const metadata: Metadata = {
  title: 'Branch Management | Shurokkha',
  description: 'Manage your insurance branches',
};

export default function BranchManagementPage() {
  return (
    <div>
      <BranchManagement />
    </div>
  );
}

