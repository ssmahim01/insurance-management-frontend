import { PageHeader } from "@/components/shared/PageHeader";
import { AgentForm } from "@/components/agent-leader/team-management/AgentForm";

interface EditAgentPageProps {
  params: Promise<{ agentId: string }>;
}

export default async function EditAgentPage({ params }: EditAgentPageProps) {
  const { agentId } = await params;

  return (
    <div>
      <PageHeader
        title="Team Management"
        description="Manage your assigned insurance agents"
        breadcrumbs={[
          { label: "Dashboard", href: "/agent-leader" },
          { label: "My Agents", href: "/agent-leader/my-agents" },
          { label: "Edit" },
        ]}
      />
      <AgentForm mode="edit" agentId={agentId} />
    </div>
  );
}