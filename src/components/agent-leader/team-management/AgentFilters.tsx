"use client";

import React from "react";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IsActive } from "@/types/user.types";
import { IAgentFilters } from "@/types/agent-leader";

interface AgentFiltersProps {
  filters: IAgentFilters;
  onFiltersChange: (filters: IAgentFilters) => void;
  onReset: () => void;
}

export function AgentFilters({
  filters,
  onFiltersChange,
  onReset,
}: AgentFiltersProps) {
  const handleSearchChange = (value: string) => {
    onFiltersChange({ ...filters, searchTerm: value });
  };

  const handleStatusChange = (value: string) => {
    onFiltersChange({
      ...filters,
      status: value === "all" ? "all" : (value as IsActive),
    });
  };

const handleSortChange = (
  value: IAgentFilters["sortBy"]
) => {
  onFiltersChange({
    ...filters,
    sortBy: value,
  });
};

  const hasActiveFilters =
    filters.searchTerm ||
    (filters.status && filters.status !== "all") ||
    filters.startDate ||
    filters.endDate;

  return (
    <div className="bg-card rounded-lg border border-border p-6 space-y-4 mb-6">
      {/* Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by name or phone..."
              value={filters.searchTerm || ""}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Status Filter */}
        <Select
          value={filters?.status || ""}
          onValueChange={(value) => handleStatusChange(value as string)}
        >
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value={IsActive.ACTIVE}>Active</SelectItem>
            <SelectItem value={IsActive.INACTIVE}>Inactive</SelectItem>
            <SelectItem value={IsActive.CREATED}>Created</SelectItem>
            <SelectItem value={IsActive.BLOCKED}>Blocked</SelectItem>
          </SelectContent>
        </Select>

        {/* Sort */}
        <Select
          value={filters.sortBy || "newest"}
          onValueChange={(value) => handleSortChange(value as IAgentFilters["sortBy"])}
        >
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue placeholder="Sort" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="oldest">Oldest</SelectItem>
            <SelectItem value="name-asc">Name A-Z</SelectItem>
            <SelectItem value="name-desc">Name Z-A</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Reset Button */}
      {hasActiveFilters && (
        <div className="flex justify-end">
          <Button
            variant="outline"
            size="sm"
            onClick={onReset}
            className="gap-2"
          >
            <X className="w-4 h-4" />
            Reset Filters
          </Button>
        </div>
      )}
    </div>
  );
}
