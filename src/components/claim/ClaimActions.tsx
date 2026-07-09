"use client";

import { MoreHorizontal, Eye, Edit2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface ClaimActionsProps {
  onViewDetails: () => void;
  onEdit?: () => void;
}

export function ClaimActions({ onViewDetails, onEdit }: ClaimActionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-44">
        <DropdownMenuItem onClick={onViewDetails} className="gap-2 cursor-pointer">
          <Eye className="w-4 h-4" />
          View Details
        </DropdownMenuItem>
        {onEdit && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onEdit} className="gap-2 cursor-pointer">
              <Edit2 className="w-4 h-4" />
              Edit Claim
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}