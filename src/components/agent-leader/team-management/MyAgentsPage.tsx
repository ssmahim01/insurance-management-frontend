/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  useDeleteUserMutation,
  useGetMyAgentsQuery,
} from "@/redux/features/user/user.api";
import { toast } from "sonner";
import { IAgentFilters } from "@/types/agent-leader";

import { PageHeader } from "@/components/shared/PageHeader";
import { AgentStatsCards } from "./AgentStatsCards";
import { AgentFilters } from "./AgentFilters";
import { AgentTable } from "./AgentTable";
import { AgentEmptyState } from "./AgentEmptyState";
import { AgentPagination } from "./AgentPagination";
import { DeleteAgentDialog } from "./DeleteAgentDialog";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

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
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();

  const hasFilters = Boolean(
    filters.searchTerm ||
    (filters.status && filters.status !== "all") ||
    filters.startDate ||
    filters.endDate,
  );

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

  const handleViewDetails = useCallback(
    (agentId: string) => {
      router.push(`/agent-leader/my-agents/${agentId}`);
    },
    [router],
  );

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
      await deleteUser(deleteDialog.agentId).unwrap();

      toast.success("Agent moved to trash successfully.");

      setDeleteDialog({
        isOpen: false,
        agentId: "",
        agentName: "",
      });
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to move agent to trash.");
    }
  };

  return (
    <div>
      {/* Header */}
      <PageHeader
        title="My Agents"
        description="Manage your assigned insurance agents, monitor their activity, customer growth and performance."
        breadcrumbs={[
          { label: "Dashboard", href: "/agent-leader" },
          { label: "Team Management" },
        ]}
        actionButton={{
          label: "Add Agent",
          icon: Plus,
          onClick: () => router.push("/agent-leader/my-agents/create"),
        }}
      />

      <div className="mb-6 flex flex-wrap items-center justify-end gap-3">
        <Button
          variant="outline"
          onClick={() => router.push("/agent-leader/my-agents/trash")}
          className="group hover:cursor-pointer border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white transition-all duration-300"
        >
          <Trash2 className="mr-2 h-4 w-4 group-hover:rotate-6 transition-transform duration-300" />
          Trash
        </Button>
      </div>

      {/* Stats Cards */}

      <AgentStatsCards stats={data?.stats} isLoading={isLoading} />

      <AgentFilters
        filters={filters}
        onFiltersChange={handleFiltersChange}
        onReset={handleResetFilters}
      />
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
      {Boolean(error) && (
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
        isLoading={isDeleting}
      />
    </div>
  );
}
