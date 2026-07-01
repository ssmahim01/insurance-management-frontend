import { PageHeader } from "@/components/shared/PageHeader";
import { AgentForm } from "@/components/agent-leader/team-management/AgentForm";

export default function CreateAgentPage() {
  return (
    <div>
      <PageHeader
        title="Team Management"
        description="Manage your assigned insurance agents"
        breadcrumbs={[
          { label: "Dashboard", href: "/agent-leader" },
          { label: "My Agents", href: "/agent-leader/my-agents" },
          { label: "Create" },
        ]}
      />
      <AgentForm mode="create" />
    </div>
  );
}
