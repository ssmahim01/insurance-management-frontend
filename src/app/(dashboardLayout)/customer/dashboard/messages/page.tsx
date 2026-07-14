import { CustomerMessages } from "@/components/message/CustomerMessages";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Messages",
  description: "Customer Messages.",
};

export default function CustomerMessageContentPage() {
  return <CustomerMessages />;
}