"use client";

import { Wallet, FilterX, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SubscriptionEmptyStateProps {
  hasFilters: boolean;
  onClearFilters?: () => void;
  onRefresh: () => void;
}

export function SubscriptionEmptyState({ hasFilters, onClearFilters, onRefresh }: SubscriptionEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card/50 py-16 px-6 text-center">
      <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
        <Wallet className="h-6 w-6 text-primary" />
      </div>
      <h3 className="text-base font-semibold text-foreground mb-1">No subscriptions found.</h3>
      <p className="text-sm text-muted-foreground mb-6 max-w-sm">
        {hasFilters
          ? "Try adjusting or clearing your filters to see more results."
          : "Paid subscriptions from your team's agents will show up here."}
      </p>
      <div className="flex items-center gap-2">
        {hasFilters && onClearFilters && (
          <Button
            variant="outline"
            onClick={onClearFilters}
            className="gap-2 transition-all duration-300 hover:shadow-md"
          >
            <FilterX className="h-4 w-4" />
            Clear Filters
          </Button>
        )}
        <Button
          variant="outline"
          onClick={onRefresh}
          className="gap-2 transition-all duration-300 hover:shadow-md"
        >
          <RefreshCcw className="h-4 w-4" />
          Refresh
        </Button>
      </div>
    </div>
  );
}