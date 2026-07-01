/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AgentEmptyStateProps {
  hasFilters: any | undefined;
  onAddAgent: () => void;
  onClearFilters?: () => void;
}

export function AgentEmptyState({
  hasFilters,
  onAddAgent,
  onClearFilters,
}: AgentEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border bg-muted/20 py-12 px-4">
      <Users className="w-12 h-12 text-muted-foreground mb-4" />
      <h3 className="text-lg font-semibold text-foreground mb-2">
        {hasFilters ? 'No agents found' : 'No agents yet'}
      </h3>
      <p className="text-sm text-muted-foreground mb-6 max-w-xs text-center">
        {hasFilters
          ? 'Try adjusting your filters or search terms.'
          : 'There are currently no agents assigned under your leadership.'}
      </p>
      <div className="flex gap-2 flex-wrap justify-center">
        {!hasFilters && (
          <Button onClick={onAddAgent}>
            Add Agent
          </Button>
        )}
        {hasFilters && onClearFilters && (
          <Button variant="outline" onClick={onClearFilters}>
            Clear Filters
          </Button>
        )}
      </div>
    </div>
  );
}
