"use client";

import { MapPin, Navigation } from "lucide-react";

interface NearbyBranchesHeaderProps {
  /** Optional live count shown as a small stat chip once branches have loaded. */
  branchCount?: number;
}

export function NearbyBranchesHeader({ branchCount }: NearbyBranchesHeaderProps) {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-indigo-800 via-indigo-600 to-blue-900 p-6 sm:p-8 lg:p-10 shadow-lg shadow-indigo-900/10 dark:shadow-black/30">
      {/* decorative accents */}
      <div className="pointer-events-none absolute -top-14 -right-14 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 left-10 h-64 w-64 rounded-full bg-blue-300/10 blur-3xl" />
      <Navigation className="pointer-events-none absolute right-6 top-6 h-24 w-24 text-white/10 rotate-12 sm:h-32 sm:w-32" />

      <div className="relative flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur-sm px-3 py-1 text-xs font-semibold uppercase tracking-widest text-white ring-1 ring-white/20">
            <MapPin className="h-3.5 w-3.5" />
            Live location
          </div>
          <h1 className="text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
            Branches Near You
          </h1>
          <p className="mt-2 max-w-xl text-sm text-indigo-50/90 sm:text-base">
            Find the closest partner branches, get directions, and reach out instantly —
            all based on your current location.
          </p>
        </div>

        {typeof branchCount === "number" && (
          <div className="flex items-center gap-3 rounded-2xl bg-white/15 backdrop-blur-sm px-5 py-3 ring-1 ring-white/20 shrink-0">
            <div className="text-3xl font-bold text-white tabular-nums">{branchCount}</div>
            <div className="text-xs font-medium leading-tight text-indigo-50/90">
              branch{branchCount !== 1 ? "es" : ""}
              <br />
              found nearby
            </div>
          </div>
        )}
      </div>
    </div>
  );
}