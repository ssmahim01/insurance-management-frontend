import { Metadata } from "next";
import { AdminOverviewPage } from "@/components/admin/overview/AdminOverviewPage";

export const metadata: Metadata = {
  title: "Overview",
  description: "Subscription revenue and performance at a glance.",
};

export default function Page() {
  return <AdminOverviewPage />;
}