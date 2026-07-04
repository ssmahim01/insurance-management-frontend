"use client";

import { MoreHorizontal, RotateCcw, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface TrashActionsProps {
  onRestore?: () => void;
  onPermanentDelete?: () => void;
}

export function TrashActions({ onRestore, onPermanentDelete }: TrashActionsProps) {
  if (!onRestore && !onPermanentDelete) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {onRestore && (
          <DropdownMenuItem onClick={onRestore} className="gap-2 cursor-pointer">
            <RotateCcw className="w-4 h-4" />
            Restore
          </DropdownMenuItem>
        )}
        {onRestore && onPermanentDelete && <DropdownMenuSeparator />}
        {onPermanentDelete && (
          <DropdownMenuItem
            onClick={onPermanentDelete}
            className="gap-2 cursor-pointer text-destructive focus:text-destructive"
          >
            <Trash2 className="w-4 h-4" />
            Delete Permanently
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}