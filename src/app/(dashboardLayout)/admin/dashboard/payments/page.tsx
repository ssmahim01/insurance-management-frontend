
import type { Metadata } from 'next';
import PaymentManagement from '@/components/payment/PaymentManagement';

export const metadata: Metadata = {
  title: 'Payment Management | Shurokkha',
  description: 'Manage your insurance payments',
};

export default function PaymentManagementPage() {
  return (
    <div>
      <PaymentManagement />
    </div>
  );
}