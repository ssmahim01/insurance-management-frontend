"use client";

import { useCallback, useMemo, useState } from "react";
import { toast } from "sonner";

import { useGetAgentLeaderSubscriptionsQuery, useSoftDeleteSubscriptionMutation } from "@/redux/features/subscription/subscription.api";
import { ISubscription } from "@/types/subscription.types";
import { ISubscriptionFilters } from "@/types/subscription-filters";

import { PageHeader } from "@/components/shared/PageHeader";
import { SubscriptionStatsCards } from "./SubscriptionStatsCards";
import { SubscriptionFilters } from "./SubscriptionFilters";
import { SubscriptionTable } from "./SubscriptionTable";
import { SubscriptionPagination } from "./SubscriptionPagination";
import { SubscriptionEmptyState } from "./SubscriptionEmptyState";
import { SubscriptionErrorState } from "./SubscriptionErrorState";
import { DeleteSubscriptionDialog } from "./DeleteSubscriptionDialog";
import { SubscriptionDetailsModal } from "@/components/subscription/SubscriptionDetailsModal";
import { UpdateSubscriptionModal } from "@/components/subscription/UpdateSubscriptionModal";
import { getNestedName } from "@/lib/utils/format-subscription";

const DEFAULT_FILTERS: ISubscriptionFilters = {
  searchTerm: "",
  status: "all",
  paymentStatus: "all",
  dateType: "none",
  sortBy: "newest",
};

export function SubscriptionPageContent() {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [filters, setFilters] = useState<ISubscriptionFilters>(DEFAULT_FILTERS);

  const [detailsSub, setDetailsSub] = useState<ISubscription | null>(null);
  const [updateSub, setUpdateSub] = useState<ISubscription | null>(null);
  const [deleteSub, setDeleteSub] = useState<ISubscription | null>(null);

  const queryParams = useMemo(
    () => ({
      page,
      limit,
      searchTerm: filters.searchTerm || undefined,
      status: filters.status !== "all" ? filters.status : undefined,
      paymentStatus: filters.paymentStatus !== "all" ? filters.paymentStatus : undefined,
      dateType: filters.dateType !== "none" ? filters.dateType : undefined,
      startDate: filters.dateType !== "none" ? filters.startDate : undefined,
      endDate: filters.dateType !== "none" ? filters.endDate : undefined,
      sort:
        filters.sortBy === "newest" ? "-createdAt" :
        filters.sortBy === "oldest" ? "createdAt" :
        filters.sortBy === "price-asc" ? "price" : "-price",
    }),
    [page, limit, filters],
  );

  const { data, isLoading, isError, refetch } = useGetAgentLeaderSubscriptionsQuery(queryParams);
  const [softDeleteSubscription, { isLoading: isDeleting }] = useSoftDeleteSubscriptionMutation();

  const subscriptions = data?.data?.data ?? [];
  const stats = data?.data?.stats;
  const meta = data?.data?.meta;

  const hasFilters = Boolean(
    filters.searchTerm ||
    filters.status !== "all" ||
    filters.paymentStatus !== "all" ||
    filters.dateType !== "none",
  );

  const handleFiltersChange = useCallback((next: ISubscriptionFilters) => {
    setFilters(next);
    setPage(1);
  }, []);

  const handleResetFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
    setPage(1);
  }, []);

  const handleDeleteConfirm = useCallback(async () => {
    if (!deleteSub?._id) return;
    try {
      await softDeleteSubscription(deleteSub._id).unwrap();
      toast.success("Subscription moved to trash");
      setDeleteSub(null);
    } catch (err) {
      const message =
        err && typeof err === "object" && "data" in err
          ? ((err as { data?: { message?: string } }).data?.message ?? "Failed to delete subscription")
          : "Failed to delete subscription";
      toast.error(message);
    }
  }, [softDeleteSubscription, deleteSub]);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Insurance Subscriptions"
        description="Manage paid insurance subscriptions created by your assigned agents."
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Subscriptions" },
        ]}
      />

      <SubscriptionStatsCards stats={stats} isLoading={isLoading} />

      <SubscriptionFilters
        filters={filters}
        onFiltersChange={handleFiltersChange}
        onReset={handleResetFilters}
      />

      {isError ? (
        <SubscriptionErrorState onRetry={refetch} />
      ) : !isLoading && subscriptions.length === 0 ? (
        <SubscriptionEmptyState
          hasFilters={hasFilters}
          onClearFilters={hasFilters ? handleResetFilters : undefined}
          onRefresh={refetch}
        />
      ) : (
        <>
          <SubscriptionTable
            subscriptions={subscriptions}
            isLoading={isLoading}
            onViewDetails={setDetailsSub}
            onUpdate={setUpdateSub}
            onDelete={setDeleteSub}
          />
          <SubscriptionPagination
            meta={meta}
            currentPage={page}
            onPageChange={setPage}
            isLoading={isLoading}
          />
        </>
      )}

      {detailsSub && (
        <SubscriptionDetailsModal
          open={Boolean(detailsSub)}
          onOpenChange={(open) => !open && setDetailsSub(null)}
          item={detailsSub}
        />
      )}

      {updateSub && (
        <UpdateSubscriptionModal
          open={Boolean(updateSub)}
          onOpenChange={(open) => !open && setUpdateSub(null)}
          item={updateSub}
          onSuccess={refetch}
        />
      )}

      <DeleteSubscriptionDialog
        isOpen={Boolean(deleteSub)}
        customerName={deleteSub ? getNestedName(deleteSub.customer) : ""}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteSub(null)}
        isLoading={isDeleting}
      />
    </div>
  );
}