import { Metadata } from "next";
import { CustomerClaimsPage } from "@/components/customer/CustomerClaimsPage";

export const metadata: Metadata = {
  title: "My Claims",
  description: "Submit and track claims against your active subscriptions.",
};

export default function CustomerClaimsContentPage() {
  return <CustomerClaimsPage />;
}