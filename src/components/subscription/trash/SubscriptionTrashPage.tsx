"use client";

import { useCallback, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import {
  useGetAllTrashSubscriptionsQuery,
  useRestoreSubscriptionMutation,
  usePermanentDeleteSubscriptionMutation,
} from "@/redux/features/subscription/subscription.api";
import { ITrashFilters } from "@/types/agent-leader";
import { ISubscription } from "@/types/subscription.types";
import { getNestedName } from "@/lib/utils/format-subscription";

import { PageHeader } from "@/components/shared/PageHeader";
import { SubscriptionStatsCards } from "@/components/agent-leader/customer-subscriptions/SubscriptionStatsCards";
import { TrashFilters } from "@/components/shared/trash/TrashFilters";
import { TrashPagination } from "@/components/shared/trash/TrashPagination";
import { TrashEmptyState } from "@/components/shared/trash/TrashEmptyState";
import { RestoreDialog } from "@/components/shared/trash/RestoreDialog";
import { PermanentDeleteDialog } from "@/components/shared/trash/PermanentDeleteDialog";
import { SubscriptionTrashTable } from "./SubscriptionTrashTable";

interface DialogState {
  isOpen: boolean;
  itemId: string;
  itemName: string;
}

const EMPTY_DIALOG: DialogState = { isOpen: false, itemId: "", itemName: "" };

export function SubscriptionTrashManagement() {
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
          ? "-createdAt"
          : filters.sortBy === "oldest"
            ? "createdAt"
            : filters.sortBy === "name-asc"
              ? "name"
              : "-name",
      startDate: filters.startDate,
      endDate: filters.endDate,
    }),
    [page, limit, filters],
  );

  const { data, isLoading, isError } =
    useGetAllTrashSubscriptionsQuery(queryParams);
  const [restoreSubscription, { isLoading: isRestoring }] =
    useRestoreSubscriptionMutation();
  const [permanentDeleteSubscription, { isLoading: isDeleting }] =
    usePermanentDeleteSubscriptionMutation();

  const subscriptions: ISubscription[] = data?.data?.data ?? [];
  const stats = data?.data?.stats;
  const meta = data?.data?.meta;

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
      await restoreSubscription(restoreDialog.itemId).unwrap();
      toast.success("Subscription restored successfully.");
      setRestoreDialog(EMPTY_DIALOG);
    } catch (err) {
      const message =
        err && typeof err === "object" && "data" in err
          ? ((err as { data?: { message?: string } }).data?.message ??
            "Failed to restore subscription.")
          : "Failed to restore subscription.";
      toast.error(message);
    }
  }, [restoreSubscription, restoreDialog.itemId]);

  const handleDeleteConfirm = useCallback(async () => {
    try {
      await permanentDeleteSubscription(deleteDialog.itemId).unwrap();
      toast.success("Subscription permanently deleted.");
      setDeleteDialog(EMPTY_DIALOG);
    } catch (err) {
      const message =
        err && typeof err === "object" && "data" in err
          ? ((err as { data?: { message?: string } }).data?.message ??
            "Failed to delete subscription.")
          : "Failed to delete subscription.";
      toast.error(message);
    }
  }, [permanentDeleteSubscription, deleteDialog.itemId]);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Subscription Trash"
        description="Restore or permanently remove deleted subscriptions."
        breadcrumbs={[
          { label: "Dashboard", href: "/admin/dashboard" },
          {
            label: "Subscription Management",
            href: "/admin/dashboard/subscriptions",
          },
          { label: "Trash" },
        ]}
      />

      <SubscriptionStatsCards stats={stats} isLoading={isLoading} />

      <TrashFilters
        filters={filters}
        onFiltersChange={handleFiltersChange}
        onReset={handleResetFilters}
      />

      {isError ? (
        <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-destructive">
          <p>Failed to load trash. Please try again.</p>
        </div>
      ) : !isLoading && subscriptions.length === 0 ? (
        <TrashEmptyState
          hasFilters={hasFilters}
          title="No deleted subscriptions found"
          onClearFilters={hasFilters ? handleResetFilters : undefined}
          onGoBack={() => router.push("/admin/dashboard/subscriptions")}
        />
      ) : (
        <>
          <SubscriptionTrashTable
            items={subscriptions}
            isLoading={isLoading}
            onRestore={(id) => {
              const item = subscriptions.find((s) => s._id === id);
              if (item) handleRestoreClick(id, getNestedName(item.customer));
            }}
            onPermanentDelete={(id) => {
              const item = subscriptions.find((s) => s._id === id);
              if (item) handleDeleteClick(id, getNestedName(item.customer));
            }}
          />
          <TrashPagination
            meta={meta}
            currentPage={page}
            onPageChange={setPage}
            isLoading={isLoading}
          />
        </>
      )}

      <RestoreDialog
        isOpen={restoreDialog.isOpen}
        itemName={restoreDialog.itemName}
        entityName="Subscription"
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
