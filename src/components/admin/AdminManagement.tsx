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
  Users,
  UserCheck,
  UserX,
  ShieldAlert,
  ShieldCheck,
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
  useGetAllAdminsQuery,
  useDeleteUserMutation,
} from "@/redux/features/user/user.api";

import { PageHeader } from "../shared/PageHeader";
import { Pagination } from "../pagination/Pagination";
import { IsActive, IUser, Role } from "@/types/user.types";
import { AdminDetailsModal } from "./AdminDetailsModal";
import Link from "next/link";
import { CreateAdminModal } from "./CreateAdminModal";
import { UpdateAdminModal } from "./UpdateAdminModal";
import { useUser } from "@/context/UserContext";

// ─── Types ───────────────────────────────────────────────────────────────────

type SortField = "name" | "phone" | "isActive" | "createdAt";
type SortDir = "asc" | "desc" | null;

// ─── Helpers ─────────────────────────────────────────────────────────────────

const STATUS_LABELS: Record<IsActive, string> = {
  [IsActive.ACTIVE]: "Active",
  [IsActive.INACTIVE]: "Inactive",
  [IsActive.BLOCKED]: "Blocked",
  [IsActive.ALL]: "All",
};

const STATUS_STYLES: Record<IsActive, string> = {
  [IsActive.ACTIVE]:
    "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-400",
  [IsActive.INACTIVE]:
    "border-slate-200 bg-slate-50 text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400",
  [IsActive.BLOCKED]:
    "border-red-200 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-900/20 dark:text-red-400",
  [IsActive.ALL]:
    "border-slate-200 bg-slate-50 text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400",
};

const STATUS_DOT: Record<IsActive, string> = {
  [IsActive.ACTIVE]: "bg-emerald-500",
  [IsActive.INACTIVE]: "bg-slate-400",
  [IsActive.BLOCKED]: "bg-red-500",
  [IsActive.ALL]: "bg-slate-400",
};

const formatDate = (iso?: string) => {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

// ─── Skeleton Row ─────────────────────────────────────────────────────────────

function AdminRowSkeleton() {
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
      {Array.from({ length: 4 }).map((_, i) => (
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

type StatColor = "blue" | "emerald" | "slate" | "red";

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
  slate: {
    bg: "bg-slate-100 dark:bg-slate-800",
    icon: "text-slate-500 dark:text-slate-400",
    text: "text-slate-500 dark:text-slate-400",
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
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5">
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

// ─── Main Component ───────────────────────────────────────────────────────────

export default function AdminManagement() {
  // ── filters & pagination ──
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<IsActive | "all">("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [page, setPage] = useState(1);
  const limit = 10;

  // ── sort ──
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortDir, setSortDir] = useState<SortDir>(null);

  // ── modals ──
  const [editingAdmin, setEditingAdmin] = useState<IUser | null>(null);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [viewingAdmin, setViewingAdmin] = useState<IUser | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [deletingAdmin, setDeletingAdmin] = useState<IUser | null>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  // ── reset page on filter change ──
  useEffect(() => {
    setTimeout(() => {
      setPage(1);
    }, 100);
  }, [searchTerm, statusFilter]);

  // ── API ──
  const { data, isLoading, refetch } = useGetAllAdminsQuery({
    searchTerm: searchTerm || undefined,
    isActive: statusFilter !== "all" ? statusFilter : undefined,
    page,
    limit,
    ...(startDate && { startDate }),
    ...(endDate && { endDate }),
  });

  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();

  // ── derived ──
  const admins: IUser[] = useMemo(() => data?.data ?? [], [data]);
  const stats = data?.stats;
  const meta = data?.meta;
  const totalPage = meta?.totalPage ?? 1;

  const hasActiveFilters = statusFilter !== "all";
  const hasDateFilter = !!(startDate || endDate);
  const { user, logout } = useUser();

  const userRole = user?.role;

  // ── client-side sort ──
  const sortedAdmins = useMemo(() => {
    if (!sortField || !sortDir) return admins;
    return [...admins].sort((a, b) => {
      let aVal = "";
      let bVal = "";
      if (sortField === "name") {
        aVal = a.name ?? "";
        bVal = b.name ?? "";
      }
      if (sortField === "phone") {
        aVal = a.phone ?? "";
        bVal = b.phone ?? "";
      }
      if (sortField === "isActive") {
        aVal = a.isActive ?? "";
        bVal = b.isActive ?? "";
      }
      if (sortField === "createdAt") {
        aVal = a.createdAt ?? "";
        bVal = b.createdAt ?? "";
      }
      return sortDir === "asc"
        ? aVal.localeCompare(bVal)
        : bVal.localeCompare(aVal);
    });
  }, [admins, sortField, sortDir]);

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

  const clearFilters = () => setStatusFilter("all");
  const clearDateFilter = () => {
    setStartDate("");
    setEndDate("");
  };

  const openEditDialog = (a: IUser) => {
    setEditingAdmin(a);
    setIsUpdateOpen(true);
  };
  const openDetailsDialog = (a: IUser) => {
    setViewingAdmin(a);
    setIsDetailsOpen(true);
  };
  const openDeleteDialog = (a: IUser) => {
    setDeletingAdmin(a);
    setIsDeleteOpen(true);
  };

  const handleDelete = async () => {
    if (!deletingAdmin?._id) return;
    try {
      await deleteUser(String(deletingAdmin._id)).unwrap();
      toast.success("Admin deleted successfully");
      setIsDeleteOpen(false);
      setDeletingAdmin(null);
      refetch();
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to delete admin");
    }
  };

  const getCreatedByName = (u: IUser): string => {
    const c = u.createdBy;
    if (!c) return "—";
    if (typeof c === "string") return c;
    return c.name ?? "—";
  };

  // ── sortable th ──
  const SortableTh = ({
    field,
    label,
  }: {
    field: SortField;
    label: string;
  }) => (
    <TableHead
      className="cursor-pointer select-none whitespace-nowrap"
      onClick={() => handleSort(field)}
    >
      <span className="inline-flex items-center hover:text-slate-900 dark:hover:text-white transition-colors">
        {label}
        <SortIcon field={field} sortField={sortField} sortDir={sortDir} />
      </span>
    </TableHead>
  );

  // ─────────────────────────────────────────────────────────────────────────────

  if (userRole !== Role.SUPER_ADMIN) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-4rem)]">
        <p className="text-lg text-muted-foreground">
          You are not authorized to view this page.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <PageHeader
        title="Admin Management"
        description="Manage all admins and monitor their activity"
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Admin Management" },
        ]}
        action={
          <div className="flex items-center gap-2">
            <Link href="/admin/dashboard/admin/trash">
              <Button
                variant="outline"
                className="hover:cursor-pointer flex items-center"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                <span>Trash</span>
              </Button>
            </Link>

            <CreateAdminModal onSuccess={refetch} />
          </div>
        }
      />

      {/* ── Stat Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Date filter row */}
        <div className="sm:col-span-2 lg:col-span-4 flex flex-wrap items-center gap-3">
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
          </>
        ) : (
          <>
            <StatCard
              label="Total Admins"
              value={stats?.total ?? 0}
              sub="registered in the system"
              icon={Users}
              color="blue"
            />
            <StatCard
              label="Active Admins"
              value={stats?.active ?? 0}
              sub={`${stats?.total ? Math.round(((stats?.active ?? 0) / stats.total) * 100) : 0}% of total`}
              icon={UserCheck}
              color="emerald"
            />
            <StatCard
              label="Inactive Admins"
              value={stats?.inactive ?? 0}
              sub="not currently active"
              icon={UserX}
              color="slate"
            />
            <StatCard
              label="Blocked Admins"
              value={stats?.blocked ?? 0}
              sub="access restricted"
              icon={ShieldAlert}
              color="red"
            />
          </>
        )}
      </div>

      {/* ── Search & Filters ── */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            placeholder="Search by name or phone..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <Select
          value={statusFilter as any}
          onValueChange={(v) => setStatusFilter(v as IsActive | "all")}
        >
          <SelectTrigger className="w-40 h-9 text-sm">
            <span>
              {statusFilter === "all"
                ? "All Status"
                : STATUS_LABELS[statusFilter as IsActive]}
            </span>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value={IsActive.ACTIVE}>Active</SelectItem>
            <SelectItem value={IsActive.INACTIVE}>Inactive</SelectItem>
            <SelectItem value={IsActive.BLOCKED}>Blocked</SelectItem>
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
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50 dark:bg-slate-800/50">
                <SortableTh field="name" label="Admin" />
                <SortableTh field="phone" label="Phone" />
                <TableHead className="whitespace-nowrap">Created By</TableHead>
                <SortableTh field="createdAt" label="Joined" />
                <TableHead className="whitespace-nowrap">Last Login</TableHead>
                <SortableTh field="isActive" label="Status" />
                <TableHead className="text-right whitespace-nowrap">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {isLoading ? (
                Array.from({ length: 6 }).map((_, i) => (
                  <AdminRowSkeleton key={i} />
                ))
              ) : sortedAdmins.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7}>
                    <div className="flex flex-col items-center justify-center py-16 text-slate-400">
                      <ShieldCheck className="w-12 h-12 mb-4 opacity-30" />
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
                            No admins added yet
                          </p>
                          <p className="text-sm mt-1">
                            Click the Add Admin button to get started
                          </p>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                sortedAdmins.map((admin) => {
                  const status = admin.isActive ?? IsActive.INACTIVE;
                  return (
                    <TableRow
                      key={String(admin._id)}
                      className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
                    >
                      {/* Name + phone */}
                      <TableCell>
                        <div className="flex items-center gap-3">
                          {admin.picture ? (
                            <img
                              src={admin.picture}
                              alt={admin.name}
                              className="w-9 h-9 rounded-full object-cover border-2 border-slate-200 dark:border-slate-700 shrink-0"
                            />
                          ) : (
                            <div className="w-9 h-9 rounded-full bg-linear-to-br from-indigo-400 to-purple-600 flex items-center justify-center text-white font-bold text-sm shrink-0">
                              {admin.name?.charAt(0)?.toUpperCase() ?? "A"}
                            </div>
                          )}
                          <div className="min-w-0">
                            <p className="font-medium text-slate-900 dark:text-white truncate max-w-36">
                              {admin.name ?? "—"}
                            </p>
                            <p className="text-xs text-slate-500 dark:text-slate-400 font-mono truncate max-w-36">
                              {admin.phone ?? "—"}
                            </p>
                          </div>
                        </div>
                      </TableCell>

                      {/* Phone */}
                      <TableCell className="text-slate-600 dark:text-slate-400 font-mono text-sm">
                        {admin.phone ?? "—"}
                      </TableCell>

                      {/* Created By */}
                      <TableCell className="text-slate-600 dark:text-slate-400 text-sm">
                        {getCreatedByName(admin)}
                      </TableCell>

                      {/* Joined */}
                      <TableCell className="text-slate-500 dark:text-slate-400 text-sm whitespace-nowrap">
                        {formatDate(admin.createdAt)}
                      </TableCell>

                      {/* Last Login */}
                      <TableCell className="text-slate-500 dark:text-slate-400 text-sm whitespace-nowrap">
                        {admin.lastLoginAt ? (
                          formatDate(admin.lastLoginAt)
                        ) : (
                          <span className="text-slate-300 dark:text-slate-600 italic text-xs">
                            Never
                          </span>
                        )}
                      </TableCell>

                      {/* Status */}
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={
                            STATUS_STYLES[status as IsActive] ??
                            STATUS_STYLES[IsActive.INACTIVE]
                          }
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full mr-1.5 inline-block ${STATUS_DOT[status as IsActive] ?? STATUS_DOT[IsActive.INACTIVE]}`}
                          />
                          {STATUS_LABELS[status as IsActive] ?? "Unknown"}
                        </Badge>
                      </TableCell>

                      {/* Actions */}
                      <TableCell>
                        <div className="flex gap-1.5 justify-end">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            title="View details"
                            onClick={() => openDetailsDialog(admin)}
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            title="Edit admin"
                            onClick={() => openEditDialog(admin)}
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </Button>
                          <Button
                            variant="destructive"
                            size="icon"
                            className="h-8 w-8"
                            title="Delete admin"
                            onClick={() => openDeleteDialog(admin)}
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

        {/* Footer */}
        {!isLoading && sortedAdmins.length > 0 && (
          <div className="px-4 py-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Showing{" "}
              <span className="font-semibold text-slate-700 dark:text-slate-300">
                {sortedAdmins.length}
              </span>{" "}
              admin{sortedAdmins.length !== 1 ? "s" : ""}
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
      {editingAdmin && (
        <UpdateAdminModal
          open={isUpdateOpen}
          onOpenChange={setIsUpdateOpen}
          item={editingAdmin}
          onSuccess={refetch}
        />
      )}
      {viewingAdmin && (
        <AdminDetailsModal
          open={isDetailsOpen}
          onOpenChange={setIsDetailsOpen}
          item={viewingAdmin}
        />
      )}

      {/* Delete confirm */}
      <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Admin</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete{" "}
              <strong>{deletingAdmin?.name}</strong>? This action cannot be
              undone.
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