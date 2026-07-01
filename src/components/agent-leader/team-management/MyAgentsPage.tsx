/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useGetMyAgentsQuery } from "@/redux/features/user/user.api";
import { toast } from "sonner";
import { IAgentFilters } from "@/types/agent-leader";

import { PageHeader } from "@/components/shared/PageHeader";
import { AgentStatsCards } from "./AgentStatsCards";
import { AgentFilters } from "./AgentFilters";
import { AgentTable } from "./AgentTable";
import { AgentEmptyState } from "./AgentEmptyState";
import { AgentPagination } from "./AgentPagination";
import { DeleteAgentDialog } from "./DeleteAgentDialog";
import { Plus } from "lucide-react";

export function MyAgentsPage() {
  const router = useRouter();
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(10);
  const [filters, setFilters] = useState<IAgentFilters>({
    searchTerm: "",
    status: "all",
    sortBy: "newest",
  });
  const [deleteDialog, setDeleteDialog] = useState<{
    isOpen: boolean;
    agentId: string;
    agentName: string;
  }>({
    isOpen: false,
    agentId: "",
    agentName: "",
  });

  // Build query params
  const queryParams = {
    page,
    limit,
    searchTerm: filters.searchTerm,
    isActive: filters.status !== "all" ? filters.status : undefined,
    sort:
      filters.sortBy === "newest"
        ? "-createdAt"
        : filters.sortBy === "oldest"
          ? "createdAt"
          : filters.sortBy === "name-asc"
            ? "name"
            : "-name",
    startDate: filters.startDate,
    endDate: filters.endDate,
  };

  const { data, isLoading, error } = useGetMyAgentsQuery(queryParams);

  const hasFilters =
    filters.searchTerm ||
    (filters.status && filters.status !== "all") ||
    filters.startDate ||
    filters.endDate;

  const handleFiltersChange = useCallback((newFilters: IAgentFilters) => {
    setFilters(newFilters);
    setPage(1);
  }, []);

  const handleResetFilters = useCallback(() => {
    setFilters({
      searchTerm: "",
      status: "all",
      sortBy: "newest",
    });
    setPage(1);
  }, []);

  const handleViewCustomers = useCallback(
    (agentId: string) => {
      router.push(`/agent-leader/my-agents/${agentId}/customers`);
    },
    [router],
  );

  const handleViewDetails = useCallback((agentId: string) => {
    toast.info(`View details for agent: ${agentId}`);
  }, []);

  const handleEdit = useCallback((agentId: string) => {
    toast.info(`Edit agent: ${agentId}`);
  }, []);

  const handleToggleBlock = useCallback(
    (agentId: string, isBlocked: boolean) => {
      toast.info(`${isBlocked ? "Unblock" : "Block"} agent: ${agentId}`);
    },
    [],
  );

  const handleDeleteClick = (agentId: string, agentName: string) => {
    setDeleteDialog({
      isOpen: true,
      agentId,
      agentName,
    });
  };

  const handleDeleteConfirm = async () => {
    try {
      // TODO: Implement delete mutation
      toast.success("Agent deleted successfully");
      setDeleteDialog({ isOpen: false, agentId: "", agentName: "" });
    } catch (err) {
      toast.error("Failed to delete agent");
    }
  };

  return (
    <div>
      {/* Header */}
      <PageHeader
        title="My Agents"
        description="Manage your assigned insurance agents, monitor their activity, customer growth and performance."
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Team Management" },
        ]}
        actionButton={{
          label: "Add Agent",
          icon: Plus,
          onClick: () => router.push("/agent-leader/my-agents/create"),
        }}
      />

      {/* Stats Cards */}

      <AgentStatsCards stats={data?.stats} isLoading={isLoading} />

      <div>
        <AgentFilters
          filters={filters}
          onFiltersChange={handleFiltersChange}
          onReset={handleResetFilters}
        ></AgentFilters>
      </div>
      {/* Table or Empty State */}
      {data?.data && data.data.length > 0 ? (
        <>
          <AgentTable
            agents={data.data}
            isLoading={isLoading}
            onViewDetails={handleViewDetails}
            // onViewCustomers={handleViewCustomers}
            // onEdit={handleEdit}
            onToggleBlock={handleToggleBlock}
            onDelete={(agentId) => {
              const agent = data.data.find((a) => a._id === agentId);
              if (agent) {
                handleDeleteClick(agentId, agent.name);
              }
            }}
          />
          <AgentPagination
            meta={data.meta}
            currentPage={page}
            onPageChange={setPage}
            isLoading={isLoading}
          />
        </>
      ) : (
        <AgentEmptyState
          hasFilters={hasFilters}
          onAddAgent={() => router.push("/agent-leader/my-agents/create")}
          onClearFilters={hasFilters ? handleResetFilters : undefined}
        />
      )}

      {/* Error State */}
      {error && (
        <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-destructive">
          <p>Failed to load agents. Please try again.</p>
        </div>
      )}

      {/* Delete Dialog */}
      <DeleteAgentDialog
        isOpen={deleteDialog.isOpen}
        agentName={deleteDialog.agentName}
        onConfirm={handleDeleteConfirm}
        onCancel={() =>
          setDeleteDialog({ isOpen: false, agentId: "", agentName: "" })
        }
        isLoading={false}
      />
    </div>
  );
}
