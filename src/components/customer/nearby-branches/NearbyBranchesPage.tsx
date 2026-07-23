/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useMemo, useState } from "react";
import { skipToken } from "@reduxjs/toolkit/query";

import { GeoStatus, useGeolocation } from "@/hooks/useGeolocation";
import { useGetAllPartnersQuery } from "@/redux/features/partner/partner.api";
import { useGetNearbyBranchesQuery } from "@/redux/features/branch/branch.api";

import { NearbyBranchesHeader } from "./NearbyBranchesHeader";
import { BranchSearchCard } from "./BranchSearchCard";
import { BranchStatsCards } from "./BranchStatsCards";
import { BranchGrid } from "./BranchGrid";
import { BranchEmptyState } from "./BranchEmptyState";
import { BranchLoadingSkeleton } from "./BranchLoadingSkeleton";
import { BranchErrorState } from "./BranchErrorState";
import { IPartnerBranch } from "@/types/branch.types";
import { CitySearchFallback } from "./CitySearchFallback";
import { BackToDashboardSection } from "@/components/shared/dashboard/BackToDashboardSection";
import { PartnerCategory } from "@/types/partner.types";
import { NearbyBranchesFilteredEmptyState } from "./NearbyBranchesFilteredEmptyState";
import { NearbyBranchesFilters } from "./NearbyBranchesFilters";

export function NearbyBranches() {
  const geo = useGeolocation();
  const [manualBranches, setManualBranches] = useState<IPartnerBranch[] | null>(
    null,
  );

  const isLocationResolved =
    geo.status === "granted" || geo.status === "ip-granted";

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

  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState<PartnerCategory | "all">("all");

  const partnerIds = useMemo(() => {
    const partners = partnersData?.data ?? [];
    const filtered =
      category === "all"
        ? partners
        : partners.filter((p) => p.category === category);
    return filtered.map((partner) => partner._id).filter(Boolean) as string[];
  }, [partnersData, category]);

  const hasFilters = Boolean(searchTerm.trim()) || category !== "all";

  const canSearch =
    isLocationResolved &&
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
    },
  );

  const branches = useMemo(() => nearbyData?.data ?? [], [nearbyData]);

  const isLoading = isPartnersLoading || isNearbyLoading;
  const isError = isPartnersError || isNearbyError;

  const handleRetrySearch = () => {
    if (canSearch) {
      refetch();
    } else {
      geo.request();
    }
  };

  const filteredBranches = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return branches;

    return branches.filter((branch) => {
      const partnerName =
        branch.partner && typeof branch.partner === "object"
          ? branch.partner.name
          : "";
      const haystack = [
        branch.branchName,
        partnerName,
        branch.city,
        branch.area,
        branch.address,
        branch.postalCode,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return haystack.includes(term);
    });
  }, [branches, searchTerm]);

  const nearestCity = filteredBranches[0]?.city;

  const nearbyPartners = useMemo(() => {
    const map = new Map();
    filteredBranches.forEach((branch) => {
      if (branch.partner) {
        map.set((branch?.partner as any)?._id, branch?.partner);
      }
    });
    return Array.from(map.values());
  }, [filteredBranches]);

  const handleResetFilters = () => {
    setSearchTerm("");
    setCategory("all");
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <BackToDashboardSection />
      {/* ── decorative background: blurred brand-color orbs + dot grid ── */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-32 -left-24 h-96 w-96 rounded-full bg-indigo-400/20 dark:bg-indigo-500/10 blur-3xl" />
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

      <div className="mx-auto w-full container space-y-8 px-4 py-8">
        <NearbyBranchesHeader
          branchCount={
            geo.status === "granted" && !isLoading ? branches.length : undefined
          }
        />

        {geo.status === "granted" && (
          <>
            <NearbyBranchesFilters
              searchTerm={searchTerm}
              onSearchTermChange={setSearchTerm}
              category={category}
              onCategoryChange={setCategory}
              onReset={handleResetFilters}
              hasFilters={hasFilters}
            />

            {!isLoading && !isError && filteredBranches.length > 0 && (
              <BranchStatsCards
                branchCount={filteredBranches.length}
                partnerCount={nearbyPartners.length}
                nearestCity={nearestCity}
                userCoords={geo.coords}
              />
            )}

            {isLoading ? (
              <BranchLoadingSkeleton />
            ) : isError ? (
              <BranchErrorState onRetry={handleRetrySearch} />
            ) : filteredBranches.length === 0 && hasFilters ? (
              <NearbyBranchesFilteredEmptyState
                onClearFilters={handleResetFilters}
              />
            ) : filteredBranches.length === 0 ? (
              <BranchEmptyState
                onRetry={handleRetrySearch}
                onRefreshLocation={geo.request}
              />
            ) : (
              <BranchGrid branches={filteredBranches} userCoords={geo.coords} />
            )}

            {isNearbyFetching && !isNearbyLoading && (
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-indigo-500" />
                Updating nearby branches...
              </div>
            )}
          </>
        )}

        {!isLocationResolved &&
          geo.status !== "ip-requesting" &&
          !manualBranches && (
            <BranchSearchCard
              status={
                geo.status as Exclude<GeoStatus, "granted" | "ip-granted">
              }
              errorMessage={geo.errorMessage}
              onRetry={geo.request}
            />
          )}

        {geo.status === "ip-failed" && !manualBranches && (
          <CitySearchFallback
            onResults={(branches) =>
              setManualBranches(branches as IPartnerBranch[])
            }
          />
        )}

      
      </div>
    </div>
  );
}
