import { Metadata } from "next";
import { AdminSubscriptionTrash } from "@/components/subscription/AdminSubscriptionTrash";
import { CustomerTrash } from "@/components/customer/CustomerTrash";

export const metadata: Metadata = {
  title: "Subscription Trash",
  description: "Restore or permanently remove deleted subscriptions.",
};

export default function Page() {
  return <CustomerTrash />;
}