"use client";

import { useCallback, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import {
  useGetAllTrashUsersQuery,
  useRestoreUserMutation,
  usePermanentDeleteUserMutation,
  useGetMyTrashCustomersQuery,
} from "@/redux/features/user/user.api";
import { ITrashFilters } from "@/types/agent-leader";
import { IUser, Role } from "@/types/user.types";

import { PageHeader } from "@/components/shared/PageHeader";
import { TrashStatsCards } from "@/components/shared/trash/TrashStatsCards";
import { TrashFilters } from "@/components/shared/trash/TrashFilters";
import { TrashPagination } from "@/components/shared/trash/TrashPagination";
import { TrashEmptyState } from "@/components/shared/trash/TrashEmptyState";
import { RestoreDialog } from "@/components/shared/trash/RestoreDialog";
import { PermanentDeleteDialog } from "@/components/shared/trash/PermanentDeleteDialog";
import { TrashTable } from "../agent-leader/trash/TrashTable";

interface DialogState {
  isOpen: boolean;
  itemId: string;
  itemName: string;
}

const EMPTY_DIALOG: DialogState = { isOpen: false, itemId: "", itemName: "" };

export function AgentLeaderCustomerTrash() {
  const router = useRouter();
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(10);
  const [filters, setFilters] = useState<ITrashFilters>({
    searchTerm: "",
    sortBy: "newest",
  });

  const [restoreDialog, setRestoreDialog] = useState<DialogState>(EMPTY_DIALOG);
  const [deleteDialog, setDeleteDialog] = useState<DialogState>(EMPTY_DIALOG);

  const queryParams = useMemo(
    () => ({
      page,
      limit,
      role: Role.CUSTOMER,
      searchTerm: filters.searchTerm || undefined,
      sort:
        filters.sortBy === "newest"
          ? "-updatedAt"
          : filters.sortBy === "oldest"
            ? "updatedAt"
            : filters.sortBy === "name-asc"
              ? "name"
              : "-name",
      startDate: filters.startDate,
      endDate: filters.endDate,
    }),
    [page, limit, filters],
  );

  const { data, isLoading, isError } = useGetMyTrashCustomersQuery(queryParams);
  const [restoreUser, { isLoading: isRestoring }] = useRestoreUserMutation();
  const [permanentDeleteUser, { isLoading: isDeleting }] =
    usePermanentDeleteUserMutation();

  const customers: IUser[] = useMemo(
    () => (data?.data ?? []).filter((u) => u.role === Role.CUSTOMER),
    [data?.data],
  );

  const hasFilters = Boolean(
    filters.searchTerm || filters.startDate || filters.endDate,
  );

  const handleFiltersChange = useCallback((next: ITrashFilters) => {
    setFilters(next);
    setPage(1);
  }, []);

  const handleResetFilters = useCallback(() => {
    setFilters({ searchTerm: "", sortBy: "newest" });
    setPage(1);
  }, []);

  const handleRestoreClick = useCallback((itemId: string, itemName: string) => {
    setRestoreDialog({ isOpen: true, itemId, itemName });
  }, []);

  const handleDeleteClick = useCallback((itemId: string, itemName: string) => {
    setDeleteDialog({ isOpen: true, itemId, itemName });
  }, []);

  const handleRestoreConfirm = useCallback(async () => {
    try {
      await restoreUser(restoreDialog.itemId).unwrap();
      toast.success("Customer restored successfully.");
      setRestoreDialog(EMPTY_DIALOG);
    } catch (err) {
      const message =
        err && typeof err === "object" && "data" in err
          ? ((err as { data?: { message?: string } }).data?.message ??
            "Failed to restore customer.")
          : "Failed to restore customer.";
      toast.error(message);
    }
  }, [restoreUser, restoreDialog.itemId]);

  const handleDeleteConfirm = useCallback(async () => {
    try {
      await permanentDeleteUser(deleteDialog.itemId).unwrap();
      toast.success("Customer permanently deleted.");
      setDeleteDialog(EMPTY_DIALOG);
    } catch (err) {
      const message =
        err && typeof err === "object" && "data" in err
          ? ((err as { data?: { message?: string } }).data?.message ??
            "Failed to delete customer.")
          : "Failed to delete customer.";
      toast.error(message);
    }
  }, [permanentDeleteUser, deleteDialog.itemId]);

  return (
    <div>
      <PageHeader
        title="Customer Trash"
        description="Restore or permanently remove deleted customers."
        breadcrumbs={[
          { label: "Dashboard", href: "/agent-leader/dashboard" },
          {
            label: "Customer Management",
            href: "/agent-leader/dashboard/customers",
          },
          { label: "Trash" },
        ]}
      />

      <TrashStatsCards
        items={customers}
        totalCount={data?.meta.total}
        isLoading={isLoading}
      />

      <TrashFilters
        filters={filters}
        onFiltersChange={handleFiltersChange}
        onReset={handleResetFilters}
      />

      {isError ? (
        <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-destructive">
          <p>Failed to load trash. Please try again.</p>
        </div>
      ) : customers.length > 0 ? (
        <>
          <TrashTable
            items={customers}
            isLoading={isLoading}
            onRestore={(id) => {
              const item = customers.find((c) => c._id === id);
              if (item) handleRestoreClick(id, item.name);
            }}
            onPermanentDelete={(id) => {
              const item = customers.find((c) => c._id === id);
              if (item) handleDeleteClick(id, item.name);
            }}
          />
          <TrashPagination
            meta={data?.meta}
            currentPage={page}
            onPageChange={setPage}
            isLoading={isLoading}
          />
        </>
      ) : (
        !isLoading && (
          <TrashEmptyState
            hasFilters={hasFilters}
            title="No deleted customers found"
            onClearFilters={hasFilters ? handleResetFilters : undefined}
            onGoBack={() => router.push("/agent-leader/dashboard/customers")}
          />
        )
      )}

      <RestoreDialog
        isOpen={restoreDialog.isOpen}
        itemName={restoreDialog.itemName}
        entityName="Customer"
        onConfirm={handleRestoreConfirm}
        onCancel={() => setRestoreDialog(EMPTY_DIALOG)}
        isLoading={isRestoring}
      />

      <PermanentDeleteDialog
        isOpen={deleteDialog.isOpen}
        itemName={deleteDialog.itemName}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteDialog(EMPTY_DIALOG)}
        isLoading={isDeleting}
      />
    </div>
  );
}