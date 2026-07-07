import { TrashAgents } from "@/components/agent-leader/trash/TrashAgents";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Agent Trash | Surokkha",
  description:
    "View, restore, or permanently delete deleted agents from your team.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function TrashAgentsPage() {
  return <TrashAgents />;
}
