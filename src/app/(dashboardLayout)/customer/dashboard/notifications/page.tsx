import { Metadata } from "next";
import { CustomerNotifications } from "@/components/notification/CustomerNotifications";

export const metadata: Metadata = {
  title: "My Notifications",
  description: "Customer Notification.",
};

export default function CustomerNotificationContentPage() {
  return <CustomerNotifications />;
}