"use client";

import { useCallback, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import {
  useGetAllTrashUsersQuery,
  useRestoreUserMutation,
  usePermanentDeleteUserMutation,
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
import { AdminTrashTable } from "./AdminTrashTable";
import { useUser } from "@/context/UserContext";
// import { AdminTrashTable } from "./AdminTrashTable";

interface DialogState {
  isOpen: boolean;
  itemId: string;
  itemName: string;
}

const EMPTY_DIALOG: DialogState = { isOpen: false, itemId: "", itemName: "" };

export function AdminTrash() {
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
      role: Role.ADMIN,
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

  const { data, isLoading, isError } = useGetAllTrashUsersQuery(queryParams);
  const [restoreUser, { isLoading: isRestoring }] = useRestoreUserMutation();
  const [permanentDeleteUser, { isLoading: isDeleting }] =
    usePermanentDeleteUserMutation();

  const { user, logout } = useUser();

  const userRole = user?.role;

  const admins: IUser[] = useMemo(
    () => (data?.data ?? []).filter((u) => u.role === Role.ADMIN),
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
      toast.success("Admin restored successfully.");
      setRestoreDialog(EMPTY_DIALOG);
    } catch (err) {
      const message =
        err && typeof err === "object" && "data" in err
          ? ((err as { data?: { message?: string } }).data?.message ??
            "Failed to restore admin.")
          : "Failed to restore admin.";
      toast.error(message);
    }
  }, [restoreUser, restoreDialog.itemId]);

  const handleDeleteConfirm = useCallback(async () => {
    try {
      await permanentDeleteUser(deleteDialog.itemId).unwrap();
      toast.success("Admin permanently deleted.");
      setDeleteDialog(EMPTY_DIALOG);
    } catch (err) {
      const message =
        err && typeof err === "object" && "data" in err
          ? ((err as { data?: { message?: string } }).data?.message ??
            "Failed to delete admin.")
          : "Failed to delete admin.";
      toast.error(message);
    }
  }, [permanentDeleteUser, deleteDialog.itemId]);


  if (userRole !== Role.SUPER_ADMIN) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-4rem)]">
        <p className="text-lg text-muted-foreground">
          You are not authorized to view this page.
        </p>
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title="Admin Trash"
        description="Restore or permanently remove deleted admins."
        breadcrumbs={[
          { label: "Dashboard", href: "/admin/dashboard" },
          {
            label: "Admin Management",
            href: "/admin/dashboard/admin",
          },
          { label: "Trash" },
        ]}
      />

      <TrashStatsCards
        items={admins}
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
      ) : admins.length > 0 ? (
        <>
          <AdminTrashTable
            items={admins}
            isLoading={isLoading}
            onRestore={(id) => {
              const item = admins.find((a) => a._id === id);
              if (item) handleRestoreClick(id, item.name);
            }}
            onPermanentDelete={(id) => {
              const item = admins.find((a) => a._id === id);
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
            title="No deleted admins found"
            onClearFilters={hasFilters ? handleResetFilters : undefined}
            onGoBack={() => router.push("/admin/dashboard/admin")}
          />
        )
      )}

      <RestoreDialog
        isOpen={restoreDialog.isOpen}
        itemName={restoreDialog.itemName}
        entityName="Admin"
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