"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IPaginationMeta } from "@/types/user.types";

interface TrashPaginationProps {
  meta: IPaginationMeta | undefined;
  currentPage: number;
  onPageChange: (page: number) => void;
  isLoading: boolean;
}

export function TrashPagination({ meta, currentPage, onPageChange, isLoading }: TrashPaginationProps) {
  if (!meta || meta.totalPage <= 1) return null;

  return (
    <div className="flex items-center justify-between mt-4 px-1">
      <p className="text-sm text-muted-foreground">
        Page {meta.page} of {meta.totalPage} · {meta.total} total
      </p>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          disabled={isLoading || currentPage <= 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="gap-1 transition-all duration-300 hover:shadow-md"
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          disabled={isLoading || currentPage >= meta.totalPage}
          onClick={() => onPageChange(currentPage + 1)}
          className="gap-1 transition-all duration-300 hover:shadow-md"
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}