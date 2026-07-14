import { Metadata } from "next";
import { DashboardPageContent } from "@/components/admin/overview/DashboardPageContent";

export const metadata: Metadata = {
  title: "Overview",
  description: "Revenue and performance across your team.",
};

export default function Page() {
  return <DashboardPageContent />;
}