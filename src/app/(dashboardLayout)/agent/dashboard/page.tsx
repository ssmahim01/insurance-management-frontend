import { Metadata } from "next";
import { DashboardPageContent } from "@/components/admin/overview/DashboardPageContent";

export const metadata: Metadata = {
  title: "Overview",
  description: "Your subscription revenue and performance.",
};

export default function Page() {
  return <DashboardPageContent />;
}