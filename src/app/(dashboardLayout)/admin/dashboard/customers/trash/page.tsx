import { Metadata } from "next";
import { AdminSubscriptionTrash } from "@/components/subscription/AdminSubscriptionTrash";

export const metadata: Metadata = {
  title: "Subscription Trash",
  description: "Restore or permanently remove deleted subscriptions.",
};

export default function Page() {
  return <AdminSubscriptionTrash />;
}