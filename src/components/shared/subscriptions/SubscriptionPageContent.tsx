
"use client";

import { useCallback, useMemo, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";

import {
  GetSubscriptionsParams,
  ISubscription,
  ISubscriptionListResponse,
} from "@/types/subscription.types";
import { ISubscriptionFilters } from "@/types/subscription-filters";
import { useSoftDeleteSubscriptionMutation } from "@/redux/features/subscription/subscription.api";

import { PageHeader } from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
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
import { SubscriptionCards } from "@/components/customer/SubscriptionCard";

const DEFAULT_FILTERS: ISubscriptionFilters = {
  searchTerm: "",
  status: "all",
  paymentStatus: "all",
  dateType: "none",
  sortBy: "newest",
};

interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface SubscriptionQueryResult {
  data?: ISubscriptionListResponse;
  isLoading: boolean;
  isError: boolean;
  refetch: () => void;
}

export type UseSubscriptionListQuery = (
  params: GetSubscriptionsParams | undefined,
) => SubscriptionQueryResult;

/** Either a static node, or a render-prop that receives `refetch` (needed by things like CreateSubscriptionModal's onSuccess). */
type HeaderAction =
  | React.ReactNode
  | ((refetch: () => void) => React.ReactNode);

interface SubscriptionPageContentProps {
  title: string;
  description: string;
  breadcrumbs: BreadcrumbItem[];
  useQuery: UseSubscriptionListQuery;
  /** Link to a role-appropriate trash page. Omit to hide the Trash button. */
  trashHref?: string;
  /** Extra header actions, e.g. a "New Subscription" button. Pass a function `(refetch) => <Node/>` if the action needs to refresh the list after a mutation (e.g. CreateSubscriptionModal). */
  headerAction?: HeaderAction;
  /** Hide the "Agent" (createdBy) column. Default true. */
  showAgentColumn?: boolean;
  /** Show the Update action + dialog. Set this to match what the backend route actually authorizes for the viewer's role. Default true. */
  allowUpdate?: boolean;
  /** Show the Delete action + dialog. Set this to match what the backend route actually authorizes for the viewer's role. Default true. */
  allowDelete?: boolean;
  /** "table" (default) renders the dense data table used by admin/agent views. "cards" renders a premium, mobile-first card grid — use for customer-facing pages. */
  layout?: "table" | "cards";
}

export function SubscriptionPageContent({
  title,
  description,
  breadcrumbs,
  useQuery,
  trashHref,
  headerAction,
  showAgentColumn = true,
  allowUpdate = true,
  allowDelete = true,
  layout = "table",
}: SubscriptionPageContentProps) {
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
      paymentStatus:
        filters.paymentStatus !== "all" ? filters.paymentStatus : undefined,
      dateType: filters.dateType !== "none" ? filters.dateType : undefined,
      startDate: filters.dateType !== "none" ? filters.startDate : undefined,
      endDate: filters.dateType !== "none" ? filters.endDate : undefined,
      sort:
        filters.sortBy === "newest"
          ? "-createdAt"
          : filters.sortBy === "oldest"
            ? "createdAt"
            : filters.sortBy === "price-asc"
              ? "price"
              : "-price",
    }),
    [page, limit, filters],
  );

  const { data, isLoading, isError, refetch } = useQuery(queryParams);
  const [softDeleteSubscription, { isLoading: isDeleting }] =
    useSoftDeleteSubscriptionMutation();

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
          ? ((err as { data?: { message?: string } }).data?.message ??
            "Failed to delete subscription")
          : "Failed to delete subscription";
      toast.error(message);
    }
  }, [softDeleteSubscription, deleteSub]);

  const resolvedHeaderAction =
    typeof headerAction === "function" ? headerAction(refetch) : headerAction;

  const combinedHeaderAction =
    trashHref || resolvedHeaderAction ? (
      <div className="flex flex-col md:flex-row items-center gap-2">
        {trashHref && (
          <Link href={trashHref}>
            <Button
              variant="outline"
              className="flex items-center gap-2 transition-all duration-200 ease-out hover:shadow-sm hover:-translate-y-0.5 active:scale-[0.97] hover:cursor-pointer"
            >
              <Trash2 className="h-4 w-4" />
              Trash
            </Button>
          </Link>
        )}
        {resolvedHeaderAction}
      </div>
    ) : undefined;

  return (
    <div className="space-y-6">
      <PageHeader
        title={title}
        description={description}
        breadcrumbs={breadcrumbs}
        action={combinedHeaderAction}
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
          {layout === "cards" ? (
            <SubscriptionCards
              subscriptions={subscriptions}
              isLoading={isLoading}
              showAgentColumn={showAgentColumn}
              onViewDetails={setDetailsSub}
              onUpdate={allowUpdate ? setUpdateSub : undefined}
              onDelete={allowDelete ? setDeleteSub : undefined}
            />
          ) : (
            <SubscriptionTable
              subscriptions={subscriptions}
              isLoading={isLoading}
              showAgentColumn={showAgentColumn}
              onViewDetails={setDetailsSub}
              onUpdate={allowUpdate ? setUpdateSub : undefined}
              onDelete={allowDelete ? setDeleteSub : undefined}
            />
          )}
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

      {allowUpdate && updateSub && (
        <UpdateSubscriptionModal
          open={Boolean(updateSub)}
          onOpenChange={(open) => !open && setUpdateSub(null)}
          item={updateSub}
          onSuccess={refetch}
        />
      )}

      {allowDelete && (
        <DeleteSubscriptionDialog
          isOpen={Boolean(deleteSub)}
          customerName={deleteSub ? getNestedName(deleteSub.customer) : ""}
          onConfirm={handleDeleteConfirm}
          onCancel={() => setDeleteSub(null)}
          isLoading={isDeleting}
        />
      )}
    </div>
  );
}