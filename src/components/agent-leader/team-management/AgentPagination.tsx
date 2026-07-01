'use client';

import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { IPaginationMeta } from '@/types/user.types';

interface AgentPaginationProps {
  meta: IPaginationMeta | undefined;
  currentPage: number;
  onPageChange: (page: number) => void;
  isLoading: boolean;
}

export function AgentPagination({
  meta,
  currentPage,
  onPageChange,
  isLoading,
}: AgentPaginationProps) {
  if (!meta || meta.totalPage <= 1) return null;

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < meta.totalPage) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
      <p className="text-sm text-muted-foreground">
        Page <span className="font-semibold text-foreground">{meta.page}</span> of{' '}
        <span className="font-semibold text-foreground">{meta.totalPage}</span>
        {' · '}
        <span className="font-semibold text-foreground">{meta.total}</span> total agents
      </p>

      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={handlePrevious}
          disabled={currentPage === 1 || isLoading}
          className="gap-1"
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={handleNext}
          disabled={currentPage >= meta.totalPage || isLoading}
          className="gap-1"
        >
          Next
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
