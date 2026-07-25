/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
import { Search, X, Bell, CheckCircle2, MailOpen } from "lucide-react";
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
import { Skeleton } from "@/components/ui/skeleton";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
} from "@/components/ui/select";

import { PageHeader } from "../shared/PageHeader";
import { Pagination } from "../pagination/Pagination";
import { NotificationCards } from "./NotificationCard";

import {
    useGetMyNotificationsQuery,
    useSoftDeleteNotificationMutation,
    useMarkAsReadMutation,
    INotification,
    NotificationType,
} from "@/redux/features/notification/notification.api";
import { NotificationDetailsModal } from "./NotificationDetailsModal";
import { BackToDashboardSection } from "../shared/dashboard/BackToDashboardSection";

// ─── Helpers ──────────────────────────────────────────────────────────────────

const NOTIFICATION_TYPE_LABELS: Record<NotificationType, string> = {
    [NotificationType.SUBSCRIPTION_CREATED]: "Subscription",
    [NotificationType.PAYMENT_SUCCESS]: "Payment Success",
    [NotificationType.PAYMENT_FAILED]: "Payment Failed",
    [NotificationType.SUBSCRIPTION_EXPIRING]: "Expiring Soon",
    [NotificationType.SUBSCRIPTION_EXPIRED]: "Expired",
    [NotificationType.GENERAL]: "General",
    [NotificationType.CLAIM]: "Claim",
};

type StatColor = "violet" | "emerald" | "blue";

// ── deep, brand-consistent gradients (unconditional — not dark:-only) ──
const STAT_COLOR_MAP: Record<StatColor, string> = {
    violet: "from-indigo-600 via-violet-700 to-purple-900",
    emerald: "from-emerald-600 via-emerald-700 to-teal-900",
    blue: "from-blue-600 via-blue-700 to-indigo-900",
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

function StatCard({
    label,
    value,
    icon: Icon,
    color,
}: {
    label: string;
    value: string | number;
    icon: React.ElementType;
    color: StatColor;
}) {
    const gradient = STAT_COLOR_MAP[color];
    return (
        <div
            className={`group relative overflow-hidden rounded-xl bg-linear-to-br ${gradient} p-4 shadow-sm ring-1 ring-white/10 transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-[1.02] hover:shadow-xl hover:shadow-black/20 hover:ring-white/25`}
        >
            <div className="pointer-events-none absolute -right-6 -top-6 h-20 w-20 rounded-full bg-white/10 blur-xl transition-transform duration-500 group-hover:scale-125" />

            <div className="relative flex items-center justify-between mb-2">
                <p className="text-xs text-white/75">{label}</p>
                <div className="p-1.5 rounded-lg bg-white/15 backdrop-blur-sm ring-1 ring-white/20 transition-transform duration-300 group-hover:scale-110">
                    <Icon className="w-4 h-4 text-white" />
                </div>
            </div>
            <p className="relative text-xl font-semibold text-white tracking-tight">{value}</p>
        </div>
    );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function CustomerNotifications() {
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState<"all" | "true" | "false">("all");
    const [typeFilter, setTypeFilter] = useState<"all" | NotificationType>("all");
    const [page, setPage] = useState(1);
    const limit = 10;

    const [viewingNotification, setViewingNotification] = useState<INotification | null>(null);
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);
    const [deletingNotification, setDeletingNotification] = useState<INotification | null>(null);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);

    useEffect(() => { setPage(1); }, [searchTerm, statusFilter, typeFilter]);

    const { data, isLoading, refetch } = useGetMyNotificationsQuery({
        searchTerm: searchTerm || undefined,
        isRead: statusFilter !== "all" ? statusFilter : undefined,
        type: typeFilter !== "all" ? typeFilter : undefined,
        page,
        limit,
    });

    const [softDeleteNotification, { isLoading: isDeleting }] = useSoftDeleteNotificationMutation();
    const [markAsRead, { isLoading: isMarking }] = useMarkAsReadMutation();

    const notifications: INotification[] = data?.data ?? [];
    const stats = data?.stats;
    const meta = data?.meta;
    const totalPage = meta?.totalPage ?? 1;

    const hasActiveFilters = statusFilter !== "all" || typeFilter !== "all";

    const clearFilters = () => { setStatusFilter("all"); setTypeFilter("all"); };

    const openDetailsDialog = (n: INotification) => {
        setViewingNotification(n);
        setIsDetailsOpen(true);
        if (!n.isRead) handleMarkAsRead(n, true);
    };

    const openDeleteDialog = (n: INotification) => {
        setDeletingNotification(n);
        setIsDeleteOpen(true);
    };

    const handleDelete = async () => {
        if (!deletingNotification?._id) return;
        try {
            await softDeleteNotification(deletingNotification._id).unwrap();
            toast.success("Notification deleted");
            setIsDeleteOpen(false);
            setDeletingNotification(null);
            refetch();
        } catch (err: any) {
            toast.error(err?.data?.message || "Failed to delete notification");
        }
    };

    const handleMarkAsRead = async (n: INotification, silent = false) => {
        try {
            await markAsRead(n._id).unwrap();
            if (!silent) toast.success("Marked as read");
            refetch();
        } catch (err: any) {
            if (!silent) toast.error(err?.data?.message || "Failed to mark as read");
        }
    };

    return (
        <div className="space-y-5">
            {/* <BackToDashboardSection /> */}
            <PageHeader
                title="Notifications"
                description="Stay updated on your subscriptions and claims."
                breadcrumbs={[
                    { label: "Dashboard", href: "/customer/dashboard" },
                    { label: "Notifications" },
                ]}
            />

            {/* Stats — 3 cols on mobile too, compact */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4">
                {isLoading ? (
                    <>
                        <StatCardSkeleton />
                        <StatCardSkeleton />
                        <StatCardSkeleton />
                    </>
                ) : (
                    <>
                        <StatCard label="Total" value={stats?.total ?? 0} icon={Bell} color="violet" />
                        <StatCard label="Read" value={stats?.read ?? 0} icon={CheckCircle2} color="emerald" />
                        <StatCard label="Unread" value={stats?.unread ?? 0} icon={MailOpen} color="blue" />
                    </>
                )}
            </div>

            {/* Search & Filters — stack on mobile */}
            <div className="flex flex-col gap-2 sm:flex-row sm:gap-3">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input
                        placeholder="Search notifications..."
                        className="pl-10"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="flex gap-2">
                    <Select
                        value={statusFilter}
                        onValueChange={(v) => setStatusFilter(v as "all" | "true" | "false")}
                    >
                        <SelectTrigger className="flex-1 sm:w-36 h-9 text-sm">
                            <span>
                                {statusFilter === "all" ? "All Status" : statusFilter === "true" ? "Read" : "Unread"}
                            </span>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Status</SelectItem>
                            <SelectItem value="true">Read</SelectItem>
                            <SelectItem value="false">Unread</SelectItem>
                        </SelectContent>
                    </Select>

                    <Select
                        value={typeFilter as any}
                        onValueChange={(v) => setTypeFilter(v as "all" | NotificationType)}
                    >
                        <SelectTrigger className="flex-1 sm:w-44 h-9 text-sm">
                            <span>
                                {typeFilter === "all" ? "All Types" : NOTIFICATION_TYPE_LABELS[typeFilter]}
                            </span>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Types</SelectItem>
                            {Object.values(NotificationType).map((t) => (
                                <SelectItem key={t} value={t}>
                                    {NOTIFICATION_TYPE_LABELS[t]}
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

            {/* ── Card List / Empty State ── */}
            {!isLoading && notifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-slate-400 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
                    <Bell className="w-12 h-12 mb-4 opacity-30" />
                    {searchTerm || hasActiveFilters ? (
                        <>
                            <p className="text-base font-medium">No results found</p>
                            <p className="text-sm mt-1">Try adjusting your search or filters</p>
                        </>
                    ) : (
                        <>
                            <p className="text-base font-medium">No notifications yet</p>
                            <p className="text-sm mt-1">Updates about your subscriptions and claims will appear here</p>
                        </>
                    )}
                </div>
            ) : (
                <NotificationCards
                    notifications={notifications}
                    isLoading={isLoading}
                    onMarkAsRead={handleMarkAsRead}
                    onDelete={openDeleteDialog}
                    isMarking={isMarking}
                />
            )}

            {!isLoading && notifications.length > 0 && (
                <Pagination page={page} totalPage={totalPage} onPageChange={setPage} />
            )}

            {/* ── Modals ── */}
            {viewingNotification && (
                <NotificationDetailsModal
                    open={isDetailsOpen}
                    onOpenChange={setIsDetailsOpen}
                    item={viewingNotification}
                />
            )}

            <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete Notification</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to delete{" "}
                            <strong>{deletingNotification?.title}</strong>? This action cannot be undone.
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