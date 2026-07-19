"use client";

import { MapPinX, RefreshCw, LocateFixed } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BranchEmptyStateProps {
  onRetry?: () => void;
  onRefreshLocation?: () => void;
}

export function BranchEmptyState({ onRetry, onRefreshLocation }: BranchEmptyStateProps) {
  return (
    <div className="relative overflow-hidden flex flex-col items-center justify-center gap-5 rounded-3xl border border-border bg-card/60 backdrop-blur-sm p-10 sm:p-16 text-center">
      <div className="pointer-events-none absolute -top-16 -left-16 h-48 w-48 rounded-full bg-blue-400/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-16 -right-16 h-48 w-48 rounded-full bg-indigo-400/10 blur-3xl" />

      <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-slate-200 to-slate-100 dark:from-slate-800 dark:to-slate-800/50">
        <MapPinX className="h-7 w-7 text-slate-400 dark:text-slate-500" />
      </div>

      <div className="relative space-y-1.5">
        <h3 className="text-lg font-semibold text-foreground">No branches nearby</h3>
        <p className="text-sm text-muted-foreground max-w-sm mx-auto leading-relaxed">
          We couldn&apos;t find any partner branches close to your current location. Try refreshing
          your location or searching again.
        </p>
      </div>

      <div className="relative flex flex-wrap items-center justify-center gap-3">
        {onRefreshLocation && (
          <Button
            onClick={onRefreshLocation}
            variant="outline"
            className="gap-2 transition-all duration-200 ease-out hover:shadow-md hover:-translate-y-0.5 active:scale-[0.97]"
          >
            <LocateFixed className="h-4 w-4" />
            Refresh Location
          </Button>
        )}
        {onRetry && (
          <Button
            onClick={onRetry}
            className="gap-2 bg-linear-to-r from-indigo-600 to-blue-600 text-white hover:from-indigo-700 hover:to-blue-700 transition-all duration-200 ease-out hover:shadow-lg hover:-translate-y-0.5 active:scale-[0.97]"
          >
            <RefreshCw className="h-4 w-4" />
            Try Again
          </Button>
        )}
      </div>
    </div>
  );
}