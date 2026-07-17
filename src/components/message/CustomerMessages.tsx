"use client";

import React, { useState, useEffect } from "react";
import { Search, X, MessageSquare, LayoutGrid } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";

import { PageHeader } from "../shared/PageHeader";
import { Pagination } from "../pagination/Pagination";
import { MessageCards } from "./MessageCard";

import {
  useGetMyMessagesQuery,
  MessageType,
} from "@/redux/features/message/message.api";

// ─── Helpers ──────────────────────────────────────────────────────────────────

const MESSAGE_TYPE_LABELS: Record<MessageType, string> = {
  [MessageType.SUBSCRIPTION]: "Subscription",
  [MessageType.PAYMENT]: "Payment",
  [MessageType.CLAIM]: "Claim",
  [MessageType.PROMOTIONAL]: "Promotional",
  [MessageType.GENERAL]: "General",
  [MessageType.OTP]: "OTP",
  [MessageType.SMS]: "SMS",
};

function StatCardSkeleton() {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4">
      <div className="flex items-center justify-between mb-2">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-8 w-8 rounded-lg" />
      </div>
      <Skeleton className="h-6 w-12" />
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function CustomerMessages() {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState<"all" | MessageType>("all");
  const [page, setPage] = useState(1);
  const limit = 10;

  useEffect(() => { setPage(1); }, [searchTerm, typeFilter]);

  const { data, isLoading } = useGetMyMessagesQuery({
    searchTerm: searchTerm || undefined,
    type: typeFilter !== "all" ? typeFilter : undefined,
    page,
    limit,
  });

  const messages = data?.data ?? [];
  const stats = data?.stats;
  const meta = data?.meta;
  const totalPage = meta?.totalPage ?? 1;

  const hasActiveFilters = typeFilter !== "all";
  const clearFilters = () => setTypeFilter("all");

  return (
    <div className="space-y-5">
      <PageHeader
        title="Messages"
        description="SMS updates sent to your registered phone number."
        breadcrumbs={[
          { label: "Dashboard", href: "/customer/dashboard" },
          { label: "Messages" },
        ]}
      />

      {/* Stats — total only, kept simple/compact */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {isLoading ? (
          <StatCardSkeleton />
        ) : (
          <div className="bg-indigo-800 rounded-xl border border-slate-200 dark:border-slate-800 p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-slate-100">Total Messages</p>
              <div className="p-1.5 rounded-lg bg-green-50 dark:bg-green-900/20">
                <LayoutGrid className="w-4 h-4 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <p className="text-xl font-semibold text-slate-200">{stats?.total ?? 0}</p>
          </div>
        )}
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col gap-2 sm:flex-row sm:gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            placeholder="Search messages..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex gap-2">
          <Select
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            value={typeFilter as any}
            onValueChange={(v) => setTypeFilter(v as "all" | MessageType)}
          >
            <SelectTrigger className="flex-1 sm:w-44 h-9 text-sm">
              <span>
                {typeFilter === "all" ? "All Types" : MESSAGE_TYPE_LABELS[typeFilter]}
              </span>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              {Object.values(MessageType).map((t) => (
                <SelectItem key={t} value={t}>
                  {MESSAGE_TYPE_LABELS[t]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {hasActiveFilters && (
            <Button
              variant="outline"
              size="icon"
              onClick={clearFilters}
              title="Clear filters"
              className="shrink-0"
            >
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>

      {/* ── List / Empty State ── */}
      {!isLoading && messages.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-slate-400 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
          <MessageSquare className="w-12 h-12 mb-4 opacity-30" />
          {searchTerm || hasActiveFilters ? (
            <>
              <p className="text-base font-medium">No results found</p>
              <p className="text-sm mt-1">Try adjusting your search or filters</p>
            </>
          ) : (
            <>
              <p className="text-base font-medium">No messages yet</p>
              <p className="text-sm mt-1">SMS updates sent to your number will appear here</p>
            </>
          )}
        </div>
      ) : (
        <MessageCards messages={messages} isLoading={isLoading} />
      )}

      {!isLoading && messages.length > 0 && (
        <Pagination page={page} totalPage={totalPage} onPageChange={setPage} />
      )}
    </div>
  );
}