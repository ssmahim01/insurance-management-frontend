"use client";

import { Search, RotateCcw } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ITrashFilters } from "@/types/agent-leader";

interface TrashFiltersProps {
  filters: ITrashFilters;
  onFiltersChange: (filters: ITrashFilters) => void;
  onReset: () => void;
}

const SORT_OPTIONS: { value: ITrashFilters["sortBy"]; label: string }[] = [
  { value: "newest", label: "Recently Deleted" },
  { value: "oldest", label: "Oldest Deleted" },
  { value: "name-asc", label: "Name (A-Z)" },
  { value: "name-desc", label: "Name (Z-A)" },
];

export function TrashFilters({ filters, onFiltersChange, onReset }: TrashFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by name, phone, or email..."
          className="pl-9"
          value={filters.searchTerm}
          onChange={(e) =>
            onFiltersChange({ ...filters, searchTerm: e.target.value })
          }
        />
      </div>

      <Select
        value={filters.sortBy}
        onValueChange={(value) =>
          onFiltersChange({ ...filters, sortBy: value as ITrashFilters["sortBy"] })
        }
      >
        <SelectTrigger className="w-full sm:w-52">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          {SORT_OPTIONS.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Button
        variant="outline"
        onClick={onReset}
        className="gap-2 transition-all duration-300 hover:shadow-md"
      >
        <RotateCcw className="h-4 w-4" />
        Reset
      </Button>
    </div>
  );
}