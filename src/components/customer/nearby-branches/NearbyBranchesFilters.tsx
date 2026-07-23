"use client";

import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { PartnerCategory } from "@/types/partner.types";

export const CATEGORY_LABELS: Record<PartnerCategory, string> = {
  [PartnerCategory.DIAGNOSTIC_HOSPITAL]: "Diagnostic & Hospital",
  [PartnerCategory.PHARMACEUTICALS]: "Pharmaceuticals",
};

interface NearbyBranchesFiltersProps {
  searchTerm: string;
  onSearchTermChange: (value: string) => void;
  category: PartnerCategory | "all";
  onCategoryChange: (value: PartnerCategory | "all") => void;
  onReset: () => void;
  hasFilters: boolean;
}

export function NearbyBranchesFilters({
  searchTerm,
  onSearchTermChange,
  category,
  onCategoryChange,
  onReset,
  hasFilters,
}: NearbyBranchesFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <div className="relative flex-1 min-w-48">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by branch, partner, or city..."
          className="pl-9"
          value={searchTerm}
          onChange={(e) => onSearchTermChange(e.target.value)}
        />
      </div>

      <Select value={category as string} onValueChange={(v) => onCategoryChange(v as PartnerCategory | "all")}>
        <SelectTrigger className="w-full sm:w-56">
          <span>{category === "all" ? "All Categories" : CATEGORY_LABELS[category]}</span>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Categories</SelectItem>
          {Object.values(PartnerCategory).map((c) => (
            <SelectItem key={c} value={c}>{CATEGORY_LABELS[c]}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      {hasFilters && (
        <Button
          variant="outline"
          size="icon"
          onClick={onReset}
          title="Clear filters"
          className="shrink-0 transition-all duration-200 hover:shadow-sm"
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}