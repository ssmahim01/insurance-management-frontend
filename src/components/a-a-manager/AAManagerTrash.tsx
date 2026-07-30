"use client";

import { useCallback, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import {
  useGetAllTrashManagersQuery,
  useRestoreUserMutation,
  usePermanentDeleteUserMutation,
  useGetAllTrashAAManagersQuery,
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
import { useUser } from "@/context/UserContext";
import { TrashTable } from "../agent-leader/trash/TrashTable";

interface DialogState {
  isOpen: boolean;
  itemId: string;
  itemName: string;
}

const EMPTY_DIALOG: DialogState = { isOpen: false, itemId: "", itemName: "" };

export function AAManagerTrash() {
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
      role: Role.A_A_MANAGER,
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

  const { data, isLoading, isError } = useGetAllTrashAAManagersQuery(queryParams);
  const [restoreUser, { isLoading: isRestoring }] = useRestoreUserMutation();
  const [permanentDeleteUser, { isLoading: isDeleting }] =
    usePermanentDeleteUserMutation();

  // const managers: IUser[] = useMemo(
  //   () => (data?.data ?? []).filter((u) => u.role === Role.A_A_MANAGER),
  //   [data?.data],
  // );

  const managers = data?.data ?? [];

  console.log("AAManagers  ", managers)

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
      toast.success("Manager restored successfully.");
      setRestoreDialog(EMPTY_DIALOG);
    } catch (err) {
      const message =
        err && typeof err === "object" && "data" in err
          ? ((err as { data?: { message?: string } }).data?.message ??
            "Failed to restore manager.")
          : "Failed to restore manager.";
      toast.error(message);
    }
  }, [restoreUser, restoreDialog.itemId]);

  const handleDeleteConfirm = useCallback(async () => {
    try {
      await permanentDeleteUser(deleteDialog.itemId).unwrap();
      toast.success("A.A. Manager permanently deleted.");
      setDeleteDialog(EMPTY_DIALOG);
    } catch (err) {
      const message =
        err && typeof err === "object" && "data" in err
          ? ((err as { data?: { message?: string } }).data?.message ??
            "Failed to delete manager.")
          : "Failed to delete manager.";
      toast.error(message);
    }
  }, [permanentDeleteUser, deleteDialog.itemId]);

  return (
    <div>
      <PageHeader
        title="A.A. Manager Trash"
        description="Restore or permanently remove deleted managers."
        breadcrumbs={[
          { label: "Dashboard", href: "/admin/dashboard" },
          {
            label: "Manager Management",
            href: "/admin/dashboard/a-a-managers",
          },
          { label: "Trash" },
        ]}
      />

      <TrashStatsCards
        items={managers}
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
      ) : managers.length > 0 ? (
        <>
          <TrashTable
            items={managers}
            isLoading={isLoading}
            onRestore={(id) => {
              const item = managers.find((m) => m._id === id);
              if (item) handleRestoreClick(id, item.name);
            }}
            onPermanentDelete={(id) => {
              const item = managers.find((m) => m._id === id);
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
            title="No deleted managers found"
            onClearFilters={hasFilters ? handleResetFilters : undefined}
            onGoBack={() => router.push("/admin/dashboard/a-a-managers")}
          />
        )
      )}

      <RestoreDialog
        isOpen={restoreDialog.isOpen}
        itemName={restoreDialog.itemName}
        entityName="Manager"
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