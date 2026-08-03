"use client";

import { Search, RotateCcw } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ClaimStatus } from "@/types/claim.types";
import { IClaimFilters } from "@/types/claim-filters";

interface ClaimFiltersProps {
  filters: IClaimFilters;
  onFiltersChange: (filters: IClaimFilters) => void;
  onReset: () => void;
}

const SORT_OPTIONS: { value: IClaimFilters["sortBy"]; label: string }[] = [
  { value: "newest", label: "Newest First" },
  { value: "oldest", label: "Oldest First" },
];

export function ClaimFilters({ filters, onFiltersChange, onReset }: ClaimFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 flex-wrap">
      <div className="relative flex-1 min-w-56">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by claim title..."
          className="pl-9"
          value={filters.searchTerm}
          onChange={(e) => onFiltersChange({ ...filters, searchTerm: e.target.value })}
        />
      </div>

      <Select
        value={filters.status as string}
        onValueChange={(v) => onFiltersChange({ ...filters, status: v as IClaimFilters["status"] })}
      >
        <SelectTrigger className="w-full sm:w-44">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Status</SelectItem>
          <SelectItem value={ClaimStatus.PENDING}>Pending</SelectItem>
          <SelectItem value={ClaimStatus.APPROVED}>Approved</SelectItem>
          <SelectItem value={ClaimStatus.REJECTED}>Rejected</SelectItem>
        </SelectContent>
      </Select>

      <Select
        value={filters.sortBy}
        onValueChange={(v) => onFiltersChange({ ...filters, sortBy: v as IClaimFilters["sortBy"] })}
      >
        <SelectTrigger className="w-full sm:w-44">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          {SORT_OPTIONS.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div className="flex items-center gap-2">
        <Input
          type="date"
          className="h-9 w-40 text-sm"
          value={filters.startDate ?? ""}
          onChange={(e) => onFiltersChange({ ...filters, startDate: e.target.value })}
        />
        <span className="text-sm text-muted-foreground">to</span>
        <Input
          type="date"
          className="h-9 w-40 text-sm"
          value={filters.endDate ?? ""}
          onChange={(e) => onFiltersChange({ ...filters, endDate: e.target.value })}
        />
      </div>

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