import { Metadata } from "next";
import { DashboardPageContent } from "@/components/admin/overview/DashboardPageContent";

export const metadata: Metadata = {
  title: "Overview",
  description: "Subscription revenue and performance at a glance.",
};

export default function Page() {
  return <DashboardPageContent />;
}