"use client";

import { Trash2, FilterX, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TrashEmptyStateProps {
  hasFilters: boolean;
  onClearFilters?: () => void;
  onGoBack: () => void;
}

export function TrashEmptyState({ hasFilters, onClearFilters, onGoBack }: TrashEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card/50 py-16 px-6 text-center">
      <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
        <Trash2 className="h-6 w-6 text-primary" />
      </div>
      <h3 className="text-base font-semibold text-foreground mb-1">
        No deleted agents found.
      </h3>
      <p className="text-sm text-muted-foreground mb-6 max-w-sm">
        {hasFilters
          ? "Try adjusting or clearing your filters to see more results."
          : "Agents you delete will show up here until they're restored or permanently removed."}
      </p>
      {hasFilters && onClearFilters ? (
        <Button
          variant="outline"
          onClick={onClearFilters}
          className="gap-2 transition-all duration-300 hover:shadow-md"
        >
          <FilterX className="h-4 w-4" />
          Clear Filters
        </Button>
      ) : (
        <Button
          variant="outline"
          onClick={onGoBack}
          className="gap-2 transition-all duration-300 hover:shadow-md"
        >
          <ArrowLeft className="h-4 w-4" />
          Go Back
        </Button>
      )}
    </div>
  );
}