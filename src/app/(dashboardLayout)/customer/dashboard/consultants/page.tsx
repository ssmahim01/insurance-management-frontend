import CustomerConsultant from "@/components/consultant/CustomerConsultant";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Consultants",
  description: "Customer Consultants",
};

export default function CustomerConsultantPage() {
//   return <h2>Customer consultant page</h2>;
  return <CustomerConsultant />;
}