import type { Metadata } from "next";
import { MyAgentsPage } from "@/components/agent-leader/team-management/MyAgentsPage";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "My Agents | Shurokkha",
  description:
    "Manage your assigned insurance agents and monitor their performance.",
};

export default function Page() {
  return <MyAgentsPage />;
}
