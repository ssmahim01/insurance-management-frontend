// NotificationTrash.tsx
"use client";

import { useCallback, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import {
  useGetAllTrashNotificationsQuery,
  useRestoreNotificationMutation,
  useDeleteNotificationMutation,
  INotification,
} from "@/redux/features/notification/notification.api";
import { ITrashFilters } from "@/types/agent-leader";

import { PageHeader } from "@/components/shared/PageHeader";
import { TrashStatsCards } from "@/components/shared/trash/TrashStatsCards";
import { TrashFilters } from "@/components/shared/trash/TrashFilters";
import { TrashPagination } from "@/components/shared/trash/TrashPagination";
import { TrashEmptyState } from "@/components/shared/trash/TrashEmptyState";
import { RestoreDialog } from "@/components/shared/trash/RestoreDialog";
import { PermanentDeleteDialog } from "@/components/shared/trash/PermanentDeleteDialog";
import { NotificationTrashTable } from "./NotificationTrashTable";

interface DialogState {
  isOpen: boolean;
  itemId: string;
  itemName: string;
}

const EMPTY_DIALOG: DialogState = { isOpen: false, itemId: "", itemName: "" };

export function NotificationTrash() {
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
      searchTerm: filters.searchTerm || undefined,
      sort:
        filters.sortBy === "newest"
          ? "-updatedAt"
          : filters.sortBy === "oldest"
            ? "updatedAt"
            : filters.sortBy === "name-asc"
              ? "title"
              : "-title",
      startDate: filters.startDate,
      endDate: filters.endDate,
    }),
    [page, limit, filters],
  );

  const { data, isLoading, isError } = useGetAllTrashNotificationsQuery(queryParams);
  const [restoreNotification, { isLoading: isRestoring }] = useRestoreNotificationMutation();
  const [deleteNotification, { isLoading: isDeleting }] = useDeleteNotificationMutation();

  const notifications: INotification[] = useMemo(() => data?.data ?? [], [data?.data]);

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
      await restoreNotification(restoreDialog.itemId).unwrap();
      toast.success("Notification restored successfully.");
      setRestoreDialog(EMPTY_DIALOG);
    } catch (err) {
      const message =
        err && typeof err === "object" && "data" in err
          ? ((err as { data?: { message?: string } }).data?.message ??
            "Failed to restore notification.")
          : "Failed to restore notification.";
      toast.error(message);
    }
  }, [restoreNotification, restoreDialog.itemId]);

  const handleDeleteConfirm = useCallback(async () => {
    try {
      await deleteNotification(deleteDialog.itemId).unwrap();
      toast.success("Notification permanently deleted.");
      setDeleteDialog(EMPTY_DIALOG);
    } catch (err) {
      const message =
        err && typeof err === "object" && "data" in err
          ? ((err as { data?: { message?: string } }).data?.message ??
            "Failed to delete notification.")
          : "Failed to delete notification.";
      toast.error(message);
    }
  }, [deleteNotification, deleteDialog.itemId]);

  return (
    <div>
      <PageHeader
        title="Notification Trash"
        description="Restore or permanently remove deleted notifications."
        breadcrumbs={[
          { label: "Dashboard", href: "/admin/dashboard" },
          {
            label: "Notification Management",
            href: "/admin/dashboard/notification",
          },
          { label: "Trash" },
        ]}
      />

      <TrashStatsCards
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        items={notifications as any}
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
      ) : notifications.length > 0 ? (
        <>
          <NotificationTrashTable
            items={notifications}
            isLoading={isLoading}
            onRestore={(id) => {
              const item = notifications.find((n) => n._id === id);
              if (item) handleRestoreClick(id, item.title);
            }}
            onPermanentDelete={(id) => {
              const item = notifications.find((n) => n._id === id);
              if (item) handleDeleteClick(id, item.title);
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
            title="No deleted notifications found"
            onClearFilters={hasFilters ? handleResetFilters : undefined}
            onGoBack={() => router.push("/admin/dashboard/notification")}
          />
        )
      )}

      <RestoreDialog
        isOpen={restoreDialog.isOpen}
        itemName={restoreDialog.itemName}
        entityName="Notification"
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