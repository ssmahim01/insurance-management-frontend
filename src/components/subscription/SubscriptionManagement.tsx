/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  Edit2,
  Trash2,
  Search,
  Eye,
  ChevronUp,
  ChevronDown,
  ChevronsUpDown,
  X,
  ShieldCheck,
  Clock,
  Ban,
  Wallet,
  UserCog,
  Crown,
  XCircle,
  User,
  Users,
} from "lucide-react";
import { toast } from "sonner";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  useGetAllSubscriptionsQuery,
  useGetAgentsAllSubscriptionsQuery,
  useGetAgentLeaderSubscriptionsByAdminQuery,
  useSoftDeleteSubscriptionMutation,
} from "@/redux/features/subscription/subscription.api";
import {
  useGetAllAgentLeadersQuery,
  useGetAllUsersQuery,
} from "@/redux/features/user/user.api";

import { PageHeader } from "../shared/PageHeader";
import { Pagination } from "../pagination/Pagination";
import {
  ISubscription,
  SubscriptionStatus,
  PaymentStatus,
  SubscribeFor,
} from "@/types/subscription.types";
import { IUser } from "@/types/user.types";
import { UpdateSubscriptionModal } from "./UpdateSubscriptionModal";
import { SubscriptionDetailsModal } from "./SubscriptionDetailsModal";
import { CreateSubscriptionModal } from "./CreateSubscriptionModal";
import Link from "next/link";

// ─── Types ───────────────────────────────────────────────────────────────────

type SortField = "price" | "startDate" | "endDate" | "status";
type SortDir = "asc" | "desc" | null;
type FilterMode = "all" | "by_agent" | "by_leader";

// ─── Helpers ─────────────────────────────────────────────────────────────────

const STATUS_LABELS: Record<SubscriptionStatus, string> = {
  [SubscriptionStatus.PENDING]: "Pending",
  [SubscriptionStatus.ACTIVE]: "Active",
  [SubscriptionStatus.EXPIRED]: "Expired",
  [SubscriptionStatus.CANCELLED]: "Cancelled",
  [SubscriptionStatus.FAILED]: "Failed",
  [SubscriptionStatus.REFUNDED]: "Refunded",
};

const STATUS_STYLES: Record<SubscriptionStatus, string> = {
  [SubscriptionStatus.PENDING]:
    "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-800 dark:bg-amber-900/20 dark:text-amber-400",
  [SubscriptionStatus.ACTIVE]:
    "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-400",
  [SubscriptionStatus.EXPIRED]:
    "border-slate-200 bg-slate-50 text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400",
  [SubscriptionStatus.CANCELLED]:
    "border-red-200 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-900/20 dark:text-red-400",
  [SubscriptionStatus.FAILED]:
    "border-red-200 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-900/20 dark:text-red-400",
  REFUNDED:
    "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-900/20 dark:text-blue-400",
};

const STATUS_DOT: Record<SubscriptionStatus, string> = {
  [SubscriptionStatus.PENDING]: "bg-amber-500",
  [SubscriptionStatus.ACTIVE]: "bg-emerald-500",
  [SubscriptionStatus.EXPIRED]: "bg-slate-400",
  [SubscriptionStatus.CANCELLED]: "bg-red-500",
  [SubscriptionStatus.FAILED]: "bg-red-500",
   [SubscriptionStatus.REFUNDED]: "bg-red-500",
};

const PAYMENT_STYLES: Record<string, string> = {
  PAID: "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-400",
  UNPAID:
    "border-slate-200 bg-slate-50 text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400",
  FAILED:
    "border-red-200 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-900/20 dark:text-red-400",
  REFUNDED:
    "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-900/20 dark:text-blue-400",
};

const formatDate = (iso?: string | null) => {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const formatCurrency = (n?: number) => `৳${(n ?? 0).toLocaleString("en-BD")}`;

const getNestedName = (v: any): string => {
  if (!v) return "—";
  if (typeof v === "string") return v;
  return v.name ?? "—";
};

// ─── Skeleton Row ─────────────────────────────────────────────────────────────

function SubscriptionRowSkeleton() {
  return (
    <TableRow>
      <TableCell>
        <div className="flex items-center gap-3">
          <Skeleton className="w-9 h-9 rounded-full shrink-0" />
          <div className="space-y-1.5">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-24" />
          </div>
        </div>
      </TableCell>
      {Array.from({ length: 6 }).map((_, i) => (
        <TableCell key={i}>
          <Skeleton className="h-4 w-20" />
        </TableCell>
      ))}
      <TableCell>
        <div className="flex gap-1.5 justify-end">
          <Skeleton className="h-8 w-8 rounded-md" />
          <Skeleton className="h-8 w-8 rounded-md" />
          <Skeleton className="h-8 w-8 rounded-md" />
        </div>
      </TableCell>
    </TableRow>
  );
}

// ─── Stat Card ────────────────────────────────────────────────────────────────

function StatCardSkeleton() {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5">
      <div className="flex items-center justify-between mb-3">
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-9 w-9 rounded-lg" />
      </div>
      <Skeleton className="h-7 w-16 mb-1" />
      <Skeleton className="h-3 w-24" />
    </div>
  );
}

type StatColor = "blue" | "emerald" | "amber" | "red";

const STAT_COLOR_MAP: Record<
  StatColor,
  { bg: string; icon: string; text: string }
> = {
  blue: {
    bg: "bg-blue-50 dark:bg-blue-900/20",
    icon: "text-blue-600 dark:text-blue-400",
    text: "text-blue-600 dark:text-blue-400",
  },
  emerald: {
    bg: "bg-emerald-50 dark:bg-emerald-900/20",
    icon: "text-emerald-600 dark:text-emerald-400",
    text: "text-emerald-600 dark:text-emerald-400",
  },
  amber: {
    bg: "bg-amber-50 dark:bg-amber-900/20",
    icon: "text-amber-600 dark:text-amber-400",
    text: "text-amber-600 dark:text-amber-400",
  },
  red: {
    bg: "bg-red-50 dark:bg-red-900/20",
    icon: "text-red-500 dark:text-red-400",
    text: "text-red-500 dark:text-red-400",
  },
};

function StatCard({
  label,
  value,
  sub,
  icon: Icon,
  color,
}: {
  label: string;
  value: string | number;
  sub?: string;
  icon: React.ElementType;
  color: StatColor;
}) {
  const c = STAT_COLOR_MAP[color];
  return (
    <div className="bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5">
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm text-slate-500 dark:text-slate-400">{label}</p>
        <div className={`p-2 rounded-lg ${c.bg}`}>
          <Icon className={`w-5 h-5 ${c.icon}`} />
        </div>
      </div>
      <p className="text-2xl font-semibold text-slate-900 dark:text-white">
        {value}
      </p>
      {sub && <p className={`text-xs mt-1 ${c.text}`}>{sub}</p>}
    </div>
  );
}

// ─── Sort Icon ────────────────────────────────────────────────────────────────

function SortIcon({
  field,
  sortField,
  sortDir,
}: {
  field: SortField;
  sortField: SortField | null;
  sortDir: SortDir;
}) {
  if (sortField !== field)
    return <ChevronsUpDown className="w-3.5 h-3.5 ml-1 text-slate-400" />;
  return sortDir === "asc" ? (
    <ChevronUp className="w-3.5 h-3.5 ml-1 text-blue-500" />
  ) : (
    <ChevronDown className="w-3.5 h-3.5 ml-1 text-blue-500" />
  );
}

type SortableThProps = {
  field: SortField;
  label: string;
  sortField: SortField | null;
  sortDir: SortDir;
  onSort: (field: SortField) => void;
};

function SortableTh({
  field,
  label,
  sortField,
  sortDir,
  onSort,
}: SortableThProps) {
  return (
    <TableHead
      className="cursor-pointer select-none whitespace-nowrap"
      onClick={() => onSort(field)}
    >
      <span className="inline-flex items-center hover:text-slate-900 dark:hover:text-white transition-colors">
        {label}
        <SortIcon field={field} sortField={sortField} sortDir={sortDir} />
      </span>
    </TableHead>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function SubscriptionManagement() {
  // ── filters & pagination ──
  const [searchTerm, setSearchTerm] = useState("");
  const [filterMode, setFilterMode] = useState<FilterMode>("all");
  const [selectedAgentId, setSelectedAgentId] = useState("");
  const [selectedLeaderId, setSelectedLeaderId] = useState("");
  const [statusFilter, setStatusFilter] = useState<SubscriptionStatus | "all">(
    "all",
  );
  const [paymentFilter, setPaymentFilter] = useState<PaymentStatus | "all">(
    "all",
  );
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [page, setPage] = useState(1);
  const limit = 10;

  // ── sort ──
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortDir, setSortDir] = useState<SortDir>(null);

  // ── modals ──
  const [editingSub, setEditingSub] = useState<ISubscription | null>(null);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [viewingSub, setViewingSub] = useState<ISubscription | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [deletingSub, setDeletingSub] = useState<ISubscription | null>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  // ── reset page on filter change ──
  useEffect(() => {
    setTimeout(() => {
      setPage(1);
    }, 100);
  }, [
    searchTerm,
    filterMode,
    selectedAgentId,
    selectedLeaderId,
    statusFilter,
    paymentFilter,
  ]);

  // ── shared query params ──
  const baseParams = {
    searchTerm: searchTerm || undefined,
    status: statusFilter !== "all" ? statusFilter : undefined,
    paymentStatus: paymentFilter !== "all" ? paymentFilter : undefined,
    page,
    limit,
    ...(startDate && { startDate }),
    ...(endDate && { endDate }),
  };

  // ── 3 different API calls depending on filter mode ──
  const allResult = useGetAllSubscriptionsQuery(baseParams, {
    skip: filterMode !== "all",
  });

  const agentResult = useGetAgentsAllSubscriptionsQuery(
    { id: selectedAgentId, params: baseParams },
    { skip: filterMode !== "by_agent" || !selectedAgentId },
  );

  const leaderResult = useGetAgentLeaderSubscriptionsByAdminQuery(
    { id: selectedLeaderId, params: baseParams },
    { skip: filterMode !== "by_leader" || !selectedLeaderId },
  );

  // ── pick active result ──
  const activeResult =
    filterMode === "by_agent"
      ? agentResult
      : filterMode === "by_leader"
        ? leaderResult
        : allResult;

  const { data, isLoading, refetch } = activeResult;
  const [softDeleteSubscription, { isLoading: isDeleting }] =
    useSoftDeleteSubscriptionMutation();

  // ── dropdown data ──
  // const { data: agentsData } = useGetAllAgentsQuery({ limit: 200 });
  const { data: usersData } = useGetAllUsersQuery({ limit: 200 });
  const { data: leadersData } = useGetAllAgentLeadersQuery({ limit: 100 });

  // ── derived data ──
  const subscriptions: ISubscription[] = useMemo(
    () => data?.data?.data ?? [],
    [data?.data?.data],
  );
  const stats = data?.data?.stats;
  const meta = data?.data?.meta;
  const totalPage = meta?.totalPage ?? 1;

  const hasActiveFilters =
    filterMode !== "all" || statusFilter !== "all" || paymentFilter !== "all";
  const hasDateFilter = !!(startDate || endDate);

  // ── client-side sort only ──
  const sortedSubscriptions = useMemo(() => {
    if (!sortField || !sortDir) return subscriptions;
    return [...subscriptions].sort((a, b) => {
      let aVal: string | number = "",
        bVal: string | number = "";
      if (sortField === "price") {
        aVal = a.price ?? 0;
        bVal = b.price ?? 0;
      }
      if (sortField === "startDate") {
        aVal = a.startDate ?? "";
        bVal = b.startDate ?? "";
      }
      if (sortField === "endDate") {
        aVal = a.endDate ?? "";
        bVal = b.endDate ?? "";
      }
      if (sortField === "status") {
        aVal = a.status ?? "";
        bVal = b.status ?? "";
      }
      if (typeof aVal === "number" && typeof bVal === "number") {
        return sortDir === "asc" ? aVal - bVal : bVal - aVal;
      }
      return sortDir === "asc"
        ? String(aVal).localeCompare(String(bVal))
        : String(bVal).localeCompare(String(aVal));
    });
  }, [subscriptions, sortField, sortDir]);

  // ── handlers ──
  const handleSort = (field: SortField) => {
    if (sortField !== field) {
      setSortField(field);
      setSortDir("asc");
      return;
    }
    if (sortDir === "asc") {
      setSortDir("desc");
      return;
    }
    setSortField(null);
    setSortDir(null);
  };

  const clearFilters = () => {
    setFilterMode("all");
    setSelectedAgentId("");
    setSelectedLeaderId("");
    setStatusFilter("all");
    setPaymentFilter("all");
  };
  const clearDateFilter = () => {
    setStartDate("");
    setEndDate("");
  };

  const openEditDialog = (s: ISubscription) => {
    setEditingSub(s);
    setIsUpdateOpen(true);
  };
  const openDetailsDialog = (s: ISubscription) => {
    setViewingSub(s);
    setIsDetailsOpen(true);
  };
  const openDeleteDialog = (s: ISubscription) => {
    setDeletingSub(s);
    setIsDeleteOpen(true);
  };

  const handleDelete = async () => {
    if (!deletingSub?._id) return;
    try {
      await softDeleteSubscription(String(deletingSub._id)).unwrap();
      toast.success("Subscription moved to trash");
      setIsDeleteOpen(false);
      setDeletingSub(null);
      refetch();
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to delete subscription");
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Customer and Subscription Management"
        description="Manage all customer subscriptions and monitor revenue"
        breadcrumbs={[
          { label: "Dashboard", href: "/admin/dashboard" },
          { label: "Customer and Subscription Management" },
        ]}
        action={
          <div className="flex items-center gap-2">
            <Link href="/admin/dashboard/customers/trash">
              <Button variant="outline" className="hover:cursor-pointer flex items-center">
                <Trash2 className="mr-2 h-4 w-4" />
                <span>Trash</span>
              </Button>
            </Link>

            <CreateSubscriptionModal onSuccess={refetch} />
          </div>
        }
      />

      {/* ── Stat Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
        <div className="sm:col-span-2 lg:col-span-6 flex flex-wrap items-center gap-3">
          <p className="text-sm text-slate-500 dark:text-slate-400 shrink-0">
            Filter stats by date:
          </p>
          <div className="flex items-center gap-2 flex-wrap">
            <Input
              type="date"
              className="h-9 w-40 text-sm"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <span className="text-slate-400 text-sm">to</span>
            <Input
              type="date"
              className="h-9 w-40 text-sm"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
            {hasDateFilter && (
              <Button
                variant="outline"
                size="icon"
                className="h-9 w-9 shrink-0"
                onClick={clearDateFilter}
                title="Clear date filter"
              >
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>

        {isLoading ? (
          <>
            <StatCardSkeleton />
            <StatCardSkeleton />
            <StatCardSkeleton />
            <StatCardSkeleton />
            <StatCardSkeleton />
            <StatCardSkeleton />
          </>
        ) : (
          <>
            <StatCard
              label="Total Subscriptions"
              value={stats?.total ?? 0}
              sub="all-time records"
              icon={Wallet}
              color="blue"
            />
            <StatCard
              label="Active"
              value={stats?.active ?? 0}
              sub={`${stats?.total ? Math.round(((stats?.active ?? 0) / stats.total) * 100) : 0}% of total`}
              icon={ShieldCheck}
              color="emerald"
            />
            <StatCard
              label="Pending"
              value={stats?.pending ?? 0}
              sub="awaiting payment"
              icon={Clock}
              color="amber"
            />
            <StatCard
              label="Expired / Cancelled"
              value={(stats?.expired ?? 0) + (stats?.cancelled ?? 0)}
              sub="no longer active"
              icon={Ban}
              color="red"
            />
            <StatCard
              label="Failed"
              value={stats?.failed ?? 0}
              sub="payment failed"
              icon={XCircle}
              color="red"
            />
            <StatCard
              label="Total Revenue"
              value={formatCurrency(stats?.totalRevenue)}
              sub="from paid subscriptions"
              icon={Wallet}
              color="emerald"
            />
          </>
        )}
      </div>

      {/* ── Search & Filters ── */}
      <div className="flex flex-col sm:flex-row gap-3 flex-wrap">
        {/* Search */}
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            placeholder="Search by customer or agent name..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Agent Leader filter */}
        <Select
          value={
            filterMode === "by_leader"
              ? selectedLeaderId || "__leader__"
              : "__leader__"
          }
          onValueChange={(v) => {
            if (v === "__leader__") {
              setFilterMode("all");
              setSelectedLeaderId("");
              return;
            }
            setFilterMode("by_leader");
            setSelectedLeaderId(v as any);
            setSelectedAgentId("");
          }}
        >
          <SelectTrigger className="w-52 h-9 text-sm">
            <span className="flex items-center gap-2">
              <Crown className="w-4 h-4 text-slate-400 shrink-0" />
              {filterMode === "by_leader" && selectedLeaderId
                ? (leadersData?.data ?? []).find(
                  (l: IUser) => String(l._id) === selectedLeaderId,
                )?.name || "Leader"
                : "All Leaders"}
            </span>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="__leader__">All Leaders</SelectItem>
            {(leadersData?.data ?? []).map((leader: IUser) => (
              <SelectItem key={String(leader._id)} value={String(leader._id)}>
                {leader.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Agent filter */}

        <Select
          value={
            filterMode === "by_agent"
              ? selectedAgentId || "__creator__"
              : "__creator__"
          }
          onValueChange={(v) => {
            if (v === "__creator__") {
              setFilterMode("all");
              setSelectedAgentId("");
              return;
            }
            setFilterMode("by_agent");
            setSelectedAgentId(v as any);
            setSelectedLeaderId("");
          }}
        >
          <SelectTrigger className="w-48 h-9 text-sm">
            <span className="flex items-center gap-2">
              <UserCog className="w-4 h-4 text-slate-400 shrink-0" />
              {filterMode === "by_agent" && selectedAgentId
                ? (usersData?.data ?? []).find(
                  (a: IUser) => String(a._id) === selectedAgentId,
                )?.name || "Agent"
                : "All Creators"}
            </span>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="__creator__">All Creators</SelectItem>
            {(usersData?.data ?? []).map((user: IUser) => (
              <SelectItem key={String(user._id)} value={String(user._id)}>
                {user.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Payment status filter */}
        <Select
          value={paymentFilter as any}
          onValueChange={(v) => setPaymentFilter(v as PaymentStatus | "all")}
        >
          <SelectTrigger className="w-40 h-9 text-sm">
            <span>
              {paymentFilter === "all" ? "All Payments" : paymentFilter}
            </span>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Payments</SelectItem>
            <SelectItem value={PaymentStatus.PAID}>Paid</SelectItem>
            <SelectItem value={PaymentStatus.UNPAID}>Unpaid</SelectItem>
            <SelectItem value={PaymentStatus.FAILED}>Failed</SelectItem>
            <SelectItem value={PaymentStatus.REFUNDED}>Refunded</SelectItem>
          </SelectContent>
        </Select>

        {/* Status filter */}
        <Select
          value={statusFilter as any}
          onValueChange={(v) =>
            setStatusFilter(v as SubscriptionStatus | "all")
          }
        >
          <SelectTrigger className="w-40 h-9 text-sm">
            <span>
              {statusFilter === "all"
                ? "All Status"
                : STATUS_LABELS[statusFilter as SubscriptionStatus]}
            </span>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value={SubscriptionStatus.PENDING}>Pending</SelectItem>
            <SelectItem value={SubscriptionStatus.ACTIVE}>Active</SelectItem>
            <SelectItem value={SubscriptionStatus.EXPIRED}>Expired</SelectItem>
            <SelectItem value={SubscriptionStatus.CANCELLED}>
              Cancelled
            </SelectItem>
            <SelectItem value={SubscriptionStatus.FAILED}>Failed</SelectItem>
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

      {/* ── Table ── */}
      <div className="bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50 dark:bg-slate-800/50">
                <TableHead className="whitespace-nowrap">Customer</TableHead>
                <TableHead className="whitespace-nowrap">
                  Subscribed For
                </TableHead>
                <TableHead className="whitespace-nowrap">Package</TableHead>
                <TableHead className="whitespace-nowrap">Plan</TableHead>
                <SortableTh
                  field="price"
                  label="Price"
                  sortField={sortField}
                  sortDir={sortDir}
                  onSort={handleSort}
                />
                <TableHead className="whitespace-nowrap">Payment</TableHead>
                <SortableTh
                  field="status"
                  label="Status"
                  sortField={sortField}
                  sortDir={sortDir}
                  onSort={handleSort}
                />
                <SortableTh
                  field="startDate"
                  label="Start"
                  sortField={sortField}
                  sortDir={sortDir}
                  onSort={handleSort}
                />
                <SortableTh
                  field="endDate"
                  label="End"
                  sortField={sortField}
                  sortDir={sortDir}
                  onSort={handleSort}
                />
                <TableHead className="whitespace-nowrap">Created By</TableHead>
                <TableHead className="text-right whitespace-nowrap">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {isLoading ? (
                Array.from({ length: 6 }).map((_, i) => (
                  <SubscriptionRowSkeleton key={i} />
                ))
              ) : sortedSubscriptions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={10}>
                    <div className="flex flex-col items-center justify-center py-16 text-slate-400">
                      <Wallet className="w-12 h-12 mb-4 opacity-30" />
                      {searchTerm || hasActiveFilters ? (
                        <>
                          <p className="text-base font-medium">
                            No results found
                          </p>
                          <p className="text-sm mt-1">
                            Try adjusting your search or filters
                          </p>
                        </>
                      ) : (
                        <>
                          <p className="text-base font-medium">
                            No subscriptions yet
                          </p>
                          <p className="text-sm mt-1">
                            Subscriptions created via package purchase will show
                            here
                          </p>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                sortedSubscriptions.map((sub) => {
                  const status = sub.status ?? SubscriptionStatus.PENDING;
                  const customerName = getNestedName(sub.customer);
                  const customerPhone =
                    typeof sub.customer === "object"
                      ? sub.customer?.phone
                      : undefined;
                  const packageName = getNestedName(sub.package);
                  return (
                    <TableRow
                      key={String(sub._id)}
                      className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
                    >
                      {/* Customer */}
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-linear-to-br from-violet-400 to-purple-600 flex items-center justify-center text-white font-bold text-sm shrink-0">
                            {customerName?.charAt(0)?.toUpperCase() ?? "C"}
                          </div>

                          <div className="min-w-0">
                            <p className="font-medium text-slate-900 dark:text-white truncate max-w-32">
                              {customerName}
                            </p>
                            <p className="text-xs text-slate-500 dark:text-slate-400 font-mono truncate max-w-32">
                              {customerPhone ?? "—"}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {sub.subscribeFor === SubscribeFor.OTHER &&
                          sub.beneficiary ? (
                          <div className="flex flex-col gap-0.5 max-w-32">
                            <span className="inline-flex items-center gap-1 text-xs font-medium text-violet-700 dark:text-violet-400">
                              <Users className="w-3 h-3 shrink-0" />
                              <span className="truncate">
                                {sub.beneficiary.name}
                              </span>
                            </span>
                            <span className="text-[11px] text-slate-400 truncate">
                              {sub.beneficiary.relationship} ·{" "}
                              {sub.beneficiary.phone}
                            </span>
                          </div>
                        ) : (
                          <Badge
                            variant="outline"
                            className="font-normal border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
                          >
                            <User className="w-3 h-3 mr-1" />
                            Self
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-slate-600 dark:text-slate-400 text-sm max-w-40 truncate">
                        {packageName}
                      </TableCell>
                      <TableCell className="text-slate-600 dark:text-slate-400 text-sm">
                        <Badge variant="outline" className="font-normal">
                          {sub.planType}
                        </Badge>
                      </TableCell>

                      <TableCell className="text-slate-700 dark:text-slate-300 font-medium text-sm whitespace-nowrap">
                        {formatCurrency(sub.price)}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={
                            PAYMENT_STYLES[sub.paymentStatus] ??
                            PAYMENT_STYLES.UNPAID
                          }
                        >
                          {sub.paymentStatus}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={
                            STATUS_STYLES[status] ??
                            STATUS_STYLES[SubscriptionStatus.PENDING]
                          }
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full mr-1.5 inline-block ${STATUS_DOT[status] ?? STATUS_DOT[SubscriptionStatus.PENDING]}`}
                          />
                          {STATUS_LABELS[status] ?? "Unknown"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-slate-500 dark:text-slate-400 text-sm whitespace-nowrap">
                        {formatDate(sub.startDate)}
                      </TableCell>
                      <TableCell className="text-slate-500 dark:text-slate-400 text-sm whitespace-nowrap">
                        {sub.isLifetime ? (
                          <span className="italic text-xs text-slate-400">
                            Lifetime
                          </span>
                        ) : (
                          formatDate(sub.endDate)
                        )}
                      </TableCell>
                      <TableCell>
                        <span className="inline-flex items-center gap-1.5 text-sm text-slate-700 dark:text-slate-300">
                          <UserCog className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          {getNestedName(sub.createdBy)}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1.5 justify-end">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            title="View details"
                            onClick={() => openDetailsDialog(sub)}
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            title="Edit subscription"
                            onClick={() => openEditDialog(sub)}
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </Button>
                          <Button
                            variant="destructive"
                            size="icon"
                            className="h-8 w-8"
                            title="Delete subscription"
                            onClick={() => openDeleteDialog(sub)}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>

          <Pagination
            page={page}
            totalPage={totalPage}
            onPageChange={setPage}
          />
        </div>

        {!isLoading && sortedSubscriptions.length > 0 && (
          <div className="px-4 py-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Showing{" "}
              <span className="font-semibold text-slate-700 dark:text-slate-300">
                {sortedSubscriptions.length}
              </span>{" "}
              subscription{sortedSubscriptions.length !== 1 ? "s" : ""}
              {hasActiveFilters && " (filtered)"}
            </p>
            {totalPage > 1 && (
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Page {page} of {totalPage}
              </p>
            )}
          </div>
        )}
      </div>

      {/* ── Modals ── */}
      {editingSub && (
        <UpdateSubscriptionModal
          open={isUpdateOpen}
          onOpenChange={setIsUpdateOpen}
          item={editingSub}
          onSuccess={refetch}
        />
      )}
      {viewingSub && (
        <SubscriptionDetailsModal
          open={isDetailsOpen}
          onOpenChange={setIsDetailsOpen}
          item={viewingSub}
        />
      )}

      <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Subscription</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to move this subscription for{" "}
              <strong>{getNestedName(deletingSub?.customer)}</strong> to trash?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex gap-2">
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
