import type { Metadata } from "next";
import { PageHeader } from "@/components/features/dashboard/components/PageHeader";

export const metadata: Metadata = {
  title: "Agent Customers | Shurokkha",
  description: "View customers for this agent.",
};

export default function AgentCustomersPage({
  params,
}: {
  params: { agentId: string };
}) {
  return (
    <div>
      <PageHeader
        title="Agent Customers"
        description="View and manage customers for this agent."
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "My Agents", href: "/dashboard/agent-leader/my-agents" },
          { label: "Customers" },
        ]}
      />

      <div className="bg-card rounded-lg border border-border p-8 text-center">
        <p className="text-muted-foreground">
          Agent Customers page coming soon...
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          Agent ID: {params.agentId}
        </p>
      </div>
    </div>
  );
}
