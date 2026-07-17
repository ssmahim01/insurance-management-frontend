"use client";

import { useEffect, useMemo } from "react";
import { skipToken } from "@reduxjs/toolkit/query";

import { useGeolocation } from "@/hooks/useGeolocation";
import { useGetAllPartnersQuery } from "@/redux/features/partner/partner.api";
import { useGetNearbyBranchesQuery } from "@/redux/features/branch/branch.api";

import { NearbyBranchesHeader } from "./NearbyBranchesHeader";
import { BranchSearchCard } from "./BranchSearchCard";
import { BranchStatsCards } from "./BranchStatsCards";
import { BranchGrid } from "./BranchGrid";
import { BranchEmptyState } from "./BranchEmptyState";
import { BranchLoadingSkeleton } from "./BranchLoadingSkeleton";
import { BranchErrorState } from "./BranchErrorState";

export function NearbyBranches() {
  const geo = useGeolocation();

  useEffect(() => {
    geo.request();
  }, []);

  const {
    data: partnersData,
    isLoading: isPartnersLoading,
    isError: isPartnersError,
  } = useGetAllPartnersQuery({
    isActive: "true",
    limit: 500,
  });

  const partnerIds = useMemo(
    () =>
      (partnersData?.data ?? [])
        .map((partner) => partner._id)
        .filter(Boolean) as string[],
    [partnersData]
  );

  const canSearch =
    geo.status === "granted" &&
    !!geo.coords &&
    !isPartnersLoading &&
    !isPartnersError &&
    partnerIds.length > 0;

  const {
    data: nearbyData,
    isLoading: isNearbyLoading,
    isFetching: isNearbyFetching,
    isError: isNearbyError,
    refetch,
  } = useGetNearbyBranchesQuery(
    canSearch && geo.coords
      ? {
          latitude: geo.coords.latitude,
          longitude: geo.coords.longitude,
          partnerIds,
        }
      : skipToken,
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const branches = useMemo(
    () => nearbyData?.data ?? [],
    [nearbyData]
  );

  const isLoading = isPartnersLoading || isNearbyLoading;
  const isError = isPartnersError || isNearbyError;

  const handleRetrySearch = () => {
    if (canSearch) {
      refetch();
    } else {
      geo.request();
    }
  };

  // ── backend returns branches ordered by proximity, so the first result
  // is a reasonable stand-in for "nearest city" without a geocoding API ──
  const nearestCity = branches[0]?.city;

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* ── decorative background: blurred brand-color orbs + dot grid ── */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-32 -left-24 h-96 w-96 rounded-full bg-emerald-400/20 dark:bg-emerald-500/10 blur-3xl" />
        <div className="absolute top-1/3 -right-32 h-[28rem] w-[28rem] rounded-full bg-blue-400/20 dark:bg-blue-500/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/4 h-80 w-80 rounded-full bg-indigo-400/15 dark:bg-indigo-500/10 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.4] dark:opacity-[0.15]"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgb(100 116 139 / 0.15) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
      </div>

      <div className="mx-auto w-full max-w-[1600px] space-y-8 px-4 py-8 sm:px-6 lg:px-10 xl:px-14">
        <NearbyBranchesHeader
          branchCount={geo.status === "granted" && !isLoading ? branches.length : undefined}
        />

        {geo.status !== "granted" && (
          <BranchSearchCard
            status={geo.status}
            errorMessage={geo.errorMessage}
            onRetry={geo.request}
          />
        )}

        {geo.status === "granted" && (
          <>
            {!isLoading && !isError && branches.length > 0 && (
              <BranchStatsCards
                branchCount={branches.length}
                partnerCount={partnerIds.length}
                nearestCity={nearestCity}
                userCoords={geo.coords}
              />
            )}

            {isLoading ? (
              <BranchLoadingSkeleton />
            ) : isError ? (
              <BranchErrorState onRetry={handleRetrySearch} />
            ) : branches.length === 0 ? (
              <BranchEmptyState onRetry={handleRetrySearch} onRefreshLocation={geo.request} />
            ) : (
              <BranchGrid branches={branches} userCoords={geo.coords} />
            )}

            {isNearbyFetching && !isNearbyLoading && (
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                Updating nearby branches...
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}