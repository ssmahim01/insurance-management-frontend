"use client";

import { useCallback, useMemo, useState } from "react";
import { GetClaimsParams, IClaim, IClaimListResponse } from "@/types/claim.types";
import { IClaimFilters } from "@/types/claim-filters";

import { PageHeader } from "@/components/shared/PageHeader";
import { ClaimStatsCards } from "./ClaimStatsCards";
import { ClaimFilters } from "./ClaimFilters";
import { ClaimTable } from "./ClaimTable";
import { SubscriptionPagination } from "../shared/subscriptions/SubscriptionPagination";
import { ClaimEmptyState } from "./ClaimEmptyState";
import { ClaimErrorState } from "./ClaimErrorState";
import { ClaimDetailsModal } from "./ClaimDetailsModal";
import { UpdateClaimModal } from "./UpdateClaimModal";

const DEFAULT_FILTERS: IClaimFilters = {
  searchTerm: "",
  status: "all",
  sortBy: "newest",
};

interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface ClaimQueryResult {
  data?: IClaimListResponse;
  isLoading: boolean;
  isError: boolean;
  refetch: () => void;
}

export type UseClaimListQuery = (
  params: GetClaimsParams | undefined,
) => ClaimQueryResult;

type HeaderAction = React.ReactNode | ((refetch: () => void) => React.ReactNode);

interface ClaimPageContentProps {
  title: string;
  description: string;
  breadcrumbs: BreadcrumbItem[];
  useQuery: UseClaimListQuery;
  /** Header action, e.g. CreateClaimModal. Pass a function `(refetch) => <Node/>` if it needs to refresh the list after submit. */
  headerAction?: HeaderAction;
}

export function ClaimPageContent({ title, description, breadcrumbs, useQuery, headerAction }: ClaimPageContentProps) {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [filters, setFilters] = useState<IClaimFilters>(DEFAULT_FILTERS);

  const [detailsClaim, setDetailsClaim] = useState<IClaim | null>(null);
  const [editClaim, setEditClaim] = useState<IClaim | null>(null);

  const queryParams = useMemo(
    () => ({
      page,
      limit,
      searchTerm: filters.searchTerm || undefined,
      status: filters.status !== "all" ? filters.status : undefined,
      startDate: filters.startDate,
      endDate: filters.endDate,
      sort: filters.sortBy === "newest" ? "-createdAt" : "createdAt",
    }),
    [page, limit, filters],
  );

  const { data, isLoading, isError, refetch } = useQuery(queryParams);

  const claims = data?.data ?? [];
  const stats = data?.stats;
  const meta = data?.meta;

  const hasFilters = Boolean(
    filters.searchTerm || filters.status !== "all" || filters.startDate || filters.endDate,
  );

  const handleFiltersChange = useCallback((next: IClaimFilters) => {
    setFilters(next);
    setPage(1);
  }, []);

  const handleResetFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
    setPage(1);
  }, []);

  const resolvedHeaderAction =
    typeof headerAction === "function" ? headerAction(refetch) : headerAction;

  return (
    <div className="space-y-6">
      <PageHeader title={title} description={description} breadcrumbs={breadcrumbs} action={resolvedHeaderAction} />

      <ClaimStatsCards stats={stats} isLoading={isLoading} />

      <ClaimFilters filters={filters} onFiltersChange={handleFiltersChange} onReset={handleResetFilters} />

      {isError ? (
        <ClaimErrorState onRetry={refetch} />
      ) : !isLoading && claims.length === 0 ? (
        <ClaimEmptyState
          hasFilters={hasFilters}
          onClearFilters={hasFilters ? handleResetFilters : undefined}
          onRefresh={refetch}
        />
      ) : (
        <>
          <ClaimTable
            claims={claims}
            isLoading={isLoading}
            onViewDetails={setDetailsClaim}
            onEdit={setEditClaim}
          />
          <SubscriptionPagination
            meta={meta}
            currentPage={page}
            onPageChange={setPage}
            isLoading={isLoading}
          />
        </>
      )}

      {detailsClaim && (
        <ClaimDetailsModal
          open={Boolean(detailsClaim)}
          onOpenChange={(open) => !open && setDetailsClaim(null)}
          item={detailsClaim}
        />
      )}

      {editClaim && (
        <UpdateClaimModal
          open={Boolean(editClaim)}
          onOpenChange={(open) => !open && setEditClaim(null)}
          item={editClaim}
          onSuccess={refetch}
        />
      )}
    </div>
  );
}