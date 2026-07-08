import MessageManagement from '@/components/message/MessageManagement';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Insurance Messages | Shurokkha',
  description: 'Manage your insurance messages',
};

export default function MessagesPage() {
  return (
    <div>
      <MessageManagement />
    </div>
  );
}