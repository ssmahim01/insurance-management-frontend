"use client";

import { MoreHorizontal, Eye, Edit2, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface SubscriptionActionsProps {
  onViewDetails: () => void;
  onUpdate?: () => void;
  onDelete?: () => void;
}

export function SubscriptionActions({ onViewDetails, onUpdate, onDelete }: SubscriptionActionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem onClick={onViewDetails} className="gap-2 cursor-pointer">
          <Eye className="w-4 h-4" />
          View Details
        </DropdownMenuItem>

        {(onUpdate || onDelete) && <DropdownMenuSeparator />}

        {onUpdate && (
          <DropdownMenuItem onClick={onUpdate} className="gap-2 cursor-pointer">
            <Edit2 className="w-4 h-4" />
            Update Subscription
          </DropdownMenuItem>
        )}

        {onDelete && (
          <DropdownMenuItem
            onClick={onDelete}
            className="gap-2 cursor-pointer text-destructive focus:text-destructive"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}