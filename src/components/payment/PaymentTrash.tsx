"use client";

import { useCallback, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import {
  useGetAllTrashPaymentsQuery,
  useRestorePaymentMutation,
  useDeletePaymentMutation,
  IPayment,
} from "@/redux/features/payment/payment.api";
import { ITrashFilters } from "@/types/agent-leader";

import { PageHeader } from "@/components/shared/PageHeader";
import { TrashStatsCards } from "@/components/shared/trash/TrashStatsCards";
import { TrashFilters } from "@/components/shared/trash/TrashFilters";
import { TrashPagination } from "@/components/shared/trash/TrashPagination";
import { TrashEmptyState } from "@/components/shared/trash/TrashEmptyState";
import { RestoreDialog } from "@/components/shared/trash/RestoreDialog";
import { PermanentDeleteDialog } from "@/components/shared/trash/PermanentDeleteDialog";
import { useUser } from "@/context/UserContext";
import { Role } from "@/types/user.types";
import { PaymentTrashTable } from "./PaymentTrashTable";

interface DialogState {
  isOpen: boolean;
  itemId: string;
  itemName: string;
}

const EMPTY_DIALOG: DialogState = { isOpen: false, itemId: "", itemName: "" };

export function PaymentTrash() {
  const router = useRouter();
  const { user } = useUser();

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
              ? "transactionId"
              : "-transactionId",
      startDate: filters.startDate,
      endDate: filters.endDate,
    }),
    [page, limit, filters],
  );

  const { data, isLoading, isError } = useGetAllTrashPaymentsQuery(queryParams);
  const [restorePayment, { isLoading: isRestoring }] = useRestorePaymentMutation();
  const [deletePayment, { isLoading: isDeleting }] = useDeletePaymentMutation();

  const payments: IPayment[] = useMemo(() => data?.data ?? [], [data?.data]);

  const hasFilters = Boolean(
    filters.searchTerm || filters.startDate || filters.endDate,
  );

  const backHref =
    user?.role === Role.ADMIN || user?.role === Role.SUPER_ADMIN
      ? "/admin/dashboard/payment"
      : "/manager/dashboard/payment";

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
      await restorePayment(restoreDialog.itemId).unwrap();
      toast.success("Payment restored successfully.");
      setRestoreDialog(EMPTY_DIALOG);
    } catch (err) {
      const message =
        err && typeof err === "object" && "data" in err
          ? ((err as { data?: { message?: string } }).data?.message ??
            "Failed to restore payment.")
          : "Failed to restore payment.";
      toast.error(message);
    }
  }, [restorePayment, restoreDialog.itemId]);

  const handleDeleteConfirm = useCallback(async () => {
    try {
      await deletePayment(deleteDialog.itemId).unwrap();
      toast.success("Payment permanently deleted.");
      setDeleteDialog(EMPTY_DIALOG);
    } catch (err) {
      const message =
        err && typeof err === "object" && "data" in err
          ? ((err as { data?: { message?: string } }).data?.message ??
            "Failed to delete payment.")
          : "Failed to delete payment.";
      toast.error(message);
    }
  }, [deletePayment, deleteDialog.itemId]);

  return (
    <div>
      <PageHeader
        title="Payment Trash"
        description="Restore or permanently remove deleted payments."
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          {
            label: "Payment Management",
            href: backHref,
          },
          { label: "Trash" },
        ]}
      />

      <TrashStatsCards
        items={payments as any}
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
      ) : payments.length > 0 ? (
        <>
          <PaymentTrashTable
            items={payments}
            isLoading={isLoading}
            onRestore={(id) => {
              const item = payments.find((p) => p._id === id);
              if (item) handleRestoreClick(id, item.transactionId);
            }}
            onPermanentDelete={(id) => {
              const item = payments.find((p) => p._id === id);
              if (item) handleDeleteClick(id, item.transactionId);
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
            title="No deleted payments found"
            onClearFilters={hasFilters ? handleResetFilters : undefined}
            onGoBack={() => router.push(backHref)}
          />
        )
      )}

      <RestoreDialog
        isOpen={restoreDialog.isOpen}
        itemName={restoreDialog.itemName}
        entityName="Payment"
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