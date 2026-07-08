import type { Metadata } from 'next';
import NotificationManagement from '@/components/notification/NotificationManagement';

export const metadata: Metadata = {
  title: 'Insurance Notifications | Shurokkha',
  description: 'Manage your insurance notifications',
};

export default function NotificationsPage() {
  return (
    <div>
      <NotificationManagement />
    </div>
  );
}