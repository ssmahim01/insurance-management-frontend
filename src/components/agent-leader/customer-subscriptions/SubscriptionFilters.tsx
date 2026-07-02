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
import { PaymentStatus, SubscriptionStatus } from "@/types/subscription.types";
import { ISubscriptionFilters } from "@/types/subscription-filters";

interface SubscriptionFiltersProps {
  filters: ISubscriptionFilters;
  onFiltersChange: (filters: ISubscriptionFilters) => void;
  onReset: () => void;
}

const SORT_OPTIONS: { value: ISubscriptionFilters["sortBy"]; label: string }[] =
  [
    { value: "newest", label: "Newest First" },
    { value: "oldest", label: "Oldest First" },
    { value: "price-asc", label: "Price: Low to High" },
    { value: "price-desc", label: "Price: High to Low" },
  ];

const DATE_TYPE_OPTIONS: {
  value: ISubscriptionFilters["dateType"];
  label: string;
}[] = [
  { value: "none", label: "No Date Filter" },
  { value: "created", label: "Created Date" },
  { value: "startDate", label: "Start Date" },
  { value: "endDate", label: "End Date" },
];

export function SubscriptionFilters({
  filters,
  onFiltersChange,
  onReset,
}: SubscriptionFiltersProps) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col sm:flex-row gap-3 flex-wrap">
        <div className="relative flex-1 min-w-56">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search customer, phone, package, or transaction ID..."
            className="pl-9"
            value={filters.searchTerm}
            onChange={(e) =>
              onFiltersChange({ ...filters, searchTerm: e.target.value })
            }
          />
        </div>

        <Select
          value={(filters?.paymentStatus ?? "") as string}
          onValueChange={(v) =>
            onFiltersChange({
              ...filters,
              paymentStatus: v as ISubscriptionFilters["paymentStatus"],
            })
          }
        >
          <SelectTrigger className="w-full sm:w-44">
            <SelectValue placeholder="Payment Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Payments</SelectItem>
            {Object.values(PaymentStatus).map((s) => (
              <SelectItem key={s} value={s}>
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={(filters?.status ?? "") as string}
          onValueChange={(v) =>
            onFiltersChange({
              ...filters,
              status: v as ISubscriptionFilters["status"],
            })
          }
        >
          <SelectTrigger className="w-full sm:w-44">
            <SelectValue placeholder="Subscription Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            {Object.values(SubscriptionStatus).map((s) => (
              <SelectItem key={s} value={s}>
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={filters.sortBy}
          onValueChange={(v) =>
            onFiltersChange({
              ...filters,
              sortBy: v as ISubscriptionFilters["sortBy"],
            })
          }
        >
          <SelectTrigger className="w-full sm:w-48">
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

      <div className="flex flex-col sm:flex-row gap-3 flex-wrap items-center">
        <Select
          value={filters.dateType}
          onValueChange={(v) =>
            onFiltersChange({
              ...filters,
              dateType: v as ISubscriptionFilters["dateType"],
            })
          }
        >
          <SelectTrigger className="w-full sm:w-44">
            <SelectValue placeholder="Date Type" />
          </SelectTrigger>
          <SelectContent>
            {DATE_TYPE_OPTIONS.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {filters.dateType !== "none" && (
          <div className="flex items-center gap-2">
            <Input
              type="date"
              className="h-9 w-40 text-sm"
              value={filters.startDate ?? ""}
              onChange={(e) =>
                onFiltersChange({ ...filters, startDate: e.target.value })
              }
            />
            <span className="text-sm text-muted-foreground">to</span>
            <Input
              type="date"
              className="h-9 w-40 text-sm"
              value={filters.endDate ?? ""}
              onChange={(e) =>
                onFiltersChange({ ...filters, endDate: e.target.value })
              }
            />
          </div>
        )}
      </div>
    </div>
  );
}
