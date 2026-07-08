"use client";

import React, { useState, useEffect } from "react";
import {
    Eye,
    Trash2,
    Search,
    ChevronUp,
    ChevronDown,
    ChevronsUpDown,
    X,
    MessageSquare,
    LayoutGrid,
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
import { Skeleton } from "@/components/ui/skeleton";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { PageHeader } from "../shared/PageHeader";
import { Pagination } from "../pagination/Pagination";
import {
    useGetAllMessagesQuery,
    useSoftDeleteMessageMutation,
    IMessage,
} from "@/redux/features/message/message.api";
import Link from "next/link";
import { useUser } from "@/context/UserContext";
import { Role } from "@/types/user.types";
import { MessageDetailsModal } from "./MessageDetailsModal";

// ─── Types ────────────────────────────────────────────────────────────────────

type SortField = "phone" | "createdAt";
type SortDir = "asc" | "desc" | null;

// ─── Helpers ──────────────────────────────────────────────────────────────────

const formatDate = (iso?: string) => {
    if (!iso) return "—";
    return new Date(iso).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
};

// ─── Skeleton ─────────────────────────────────────────────────────────────────

function MessageRowSkeleton() {
    return (
        <TableRow>
            <TableCell>
                <div className="flex items-center gap-3">
                    <Skeleton className="w-10 h-10 rounded-lg shrink-0" />
                    <div className="space-y-1.5">
                        <Skeleton className="h-4 w-40" />
                        <Skeleton className="h-3 w-24" />
                    </div>
                </div>
            </TableCell>
            {Array.from({ length: 2 }).map((_, i) => (
                <TableCell key={i}>
                    <Skeleton className="h-4 w-20" />
                </TableCell>
            ))}
            <TableCell>
                <div className="flex gap-1.5 justify-end">
                    <Skeleton className="h-8 w-8 rounded-md" />
                    <Skeleton className="h-8 w-8 rounded-md" />
                </div>
            </TableCell>
        </TableRow>
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
        <ChevronUp className="w-3.5 h-3.5 ml-1 text-violet-500" />
    ) : (
        <ChevronDown className="w-3.5 h-3.5 ml-1 text-violet-500" />
    );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function MessageManagement() {
    // ── filters ──
    const [searchTerm, setSearchTerm] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [page, setPage] = useState(1);
    const limit = 10;

    // ── sort ──
    const [sortField, setSortField] = useState<SortField | null>(null);
    const [sortDir, setSortDir] = useState<SortDir>(null);

    // ── modals ──
    const [viewingMessage, setViewingMessage] = useState<IMessage | null>(null);
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);
    const [deletingMessage, setDeletingMessage] = useState<IMessage | null>(null);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);

    const { user } = useUser();

    useEffect(() => { setPage(1); }, [searchTerm]);

    // ── API ──
    const { data, isLoading, refetch } = useGetAllMessagesQuery({
        searchTerm: searchTerm || undefined,
        page,
        limit,
        ...(startDate && { startDate }),
        ...(endDate && { endDate }),
    });

    const [softDeleteMessage, { isLoading: isDeleting }] = useSoftDeleteMessageMutation();

    // ── derived ──
    const messages: IMessage[] = data?.data ?? [];
    const meta = data?.meta;
    const totalPage = meta?.totalPage ?? 1;

    const hasDateFilter = !!(startDate || endDate);

    // ── client sort ──
    const sortedMessages = React.useMemo(() => {
        if (!sortField || !sortDir) return messages;
        return [...messages].sort((a, b) => {
            let aVal = "";
            let bVal = "";
            if (sortField === "phone") { aVal = a.phone ?? ""; bVal = b.phone ?? ""; }
            if (sortField === "createdAt") { aVal = a.createdAt ?? ""; bVal = b.createdAt ?? ""; }
            return sortDir === "asc" ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
        });
    }, [messages, sortField, sortDir]);

    // ── handlers ──
    const handleSort = (field: SortField) => {
        if (sortField !== field) { setSortField(field); setSortDir("asc"); return; }
        if (sortDir === "asc") { setSortDir("desc"); return; }
        setSortField(null); setSortDir(null);
    };

    const clearDateFilter = () => { setStartDate(""); setEndDate(""); };

    const openDetailsDialog = (m: IMessage) => { setViewingMessage(m); setIsDetailsOpen(true); };
    const openDeleteDialog = (m: IMessage) => { setDeletingMessage(m); setIsDeleteOpen(true); };

    const handleDelete = async () => {
        if (!deletingMessage?._id) return;
        try {
            await softDeleteMessage(deletingMessage._id).unwrap();
            toast.success("Message moved to trash");
            setIsDeleteOpen(false);
            setDeletingMessage(null);
            refetch();
        } catch (err: any) {
            toast.error(err?.data?.message || "Failed to delete message");
        }
    };

    // ── sortable header ──
    const SortableTh = ({ field, label }: { field: SortField; label: string }) => (
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

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <PageHeader
                title="Message Management"
                description="View SMS messages sent to users"
                breadcrumbs={[
                    { label: "Dashboard", href: "/dashboard" },
                    { label: "Message Management" },
                ]}
                action={
                    <div className="flex items-center gap-2">
                        <Link
                            href="/admin/dashboard/messages/trash"
                        >
                            <Button
                                variant="outline"
                                className="hover:cursor-pointer flex items-center"
                            >
                                <Trash2 className="mr-2 h-4 w-4" />
                                <span>Trash</span>
                            </Button>
                        </Link>
                    </div>
                }
            />

            {/* ── Total Card ── */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-3 flex flex-wrap items-center gap-3">
                    <p className="text-sm text-slate-500 dark:text-slate-400 shrink-0">
                        Filter by date:
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

                <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 sm:col-span-1">
                    <div className="flex items-center justify-between mb-3">
                        <p className="text-sm text-slate-500 dark:text-slate-400">Total Messages</p>
                        <div className="p-2 rounded-lg bg-violet-50 dark:bg-violet-900/20">
                            <LayoutGrid className="w-5 h-5 text-violet-600 dark:text-violet-400" />
                        </div>
                    </div>
                    <p className="text-2xl font-semibold text-slate-900 dark:text-white">
                        {meta?.total ?? 0}
                    </p>
                    <p className="text-xs mt-1 text-violet-600 dark:text-violet-400">
                        sent messages
                    </p>
                </div>
            </div>

            {/* ── Search ── */}
            <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input
                        placeholder="Search by phone or message..."
                        className="pl-10"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* ── Table ── */}
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-slate-50 dark:bg-slate-800/50">
                                <TableHead className="whitespace-nowrap">Message</TableHead>
                                <SortableTh field="phone" label="Phone" />
                                <SortableTh field="createdAt" label="Sent" />
                                <TableHead className="text-right whitespace-nowrap">Actions</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {isLoading ? (
                                Array.from({ length: 6 }).map((_, i) => (
                                    <MessageRowSkeleton key={i} />
                                ))
                            ) : sortedMessages.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={4}>
                                        <div className="flex flex-col items-center justify-center py-16 text-slate-400">
                                            <MessageSquare className="w-12 h-12 mb-4 opacity-30" />
                                            {searchTerm ? (
                                                <>
                                                    <p className="text-base font-medium">No results found</p>
                                                    <p className="text-sm mt-1">Try adjusting your search</p>
                                                </>
                                            ) : (
                                                <>
                                                    <p className="text-base font-medium">No messages yet</p>
                                                    <p className="text-sm mt-1">Sent SMS messages will appear here</p>
                                                </>
                                            )}
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                sortedMessages.map((msg) => (
                                    <TableRow
                                        key={msg._id}
                                        className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
                                    >
                                        {/* Message */}
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-lg bg-linear-to-br from-violet-400 to-purple-600 flex items-center justify-center text-white shrink-0">
                                                    <MessageSquare className="w-4 h-4" />
                                                </div>
                                                <p className="font-medium text-slate-900 dark:text-white truncate max-w-72">
                                                    {msg.message}
                                                </p>
                                            </div>
                                        </TableCell>

                                        {/* Phone */}
                                        <TableCell className="text-slate-600 dark:text-slate-400 font-mono text-sm">
                                            {msg.phone ?? "—"}
                                        </TableCell>

                                        {/* Sent date */}
                                        <TableCell className="text-slate-500 dark:text-slate-400 text-sm whitespace-nowrap">
                                            {formatDate(msg.createdAt)}
                                        </TableCell>

                                        {/* Actions */}
                                        <TableCell>
                                            <div className="flex gap-1.5 justify-end">
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    className="h-8 w-8"
                                                    title="View details"
                                                    onClick={() => openDetailsDialog(msg)}
                                                >
                                                    <Eye className="w-3.5 h-3.5" />
                                                </Button>
                                                <Button
                                                    variant="destructive"
                                                    size="icon"
                                                    className="h-8 w-8"
                                                    title="Delete message"
                                                    onClick={() => openDeleteDialog(msg)}
                                                >
                                                    <Trash2 className="w-3.5 h-3.5" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>

                    <Pagination
                        page={page}
                        totalPage={totalPage}
                        onPageChange={setPage}
                    />
                </div>

                {/* Footer count */}
                {!isLoading && sortedMessages.length > 0 && (
                    <div className="px-4 py-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                            Showing{" "}
                            <span className="font-semibold text-slate-700 dark:text-slate-300">
                                {sortedMessages.length}
                            </span>{" "}
                            message{sortedMessages.length !== 1 ? "s" : ""}
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
            {viewingMessage && (
                <MessageDetailsModal
                    open={isDetailsOpen}
                    onOpenChange={setIsDetailsOpen}
                    item={viewingMessage}
                />
            )}

            {/* Delete confirm */}
            <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Move to Trash</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to move this message to{" "}
                            <strong>{deletingMessage?.phone}</strong> to trash? This can be
                            restored later.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <div className="flex gap-2">
                        <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDelete}
                            disabled={isDeleting}
                            className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
                        >
                            {isDeleting ? "Moving..." : "Move to Trash"}
                        </AlertDialogAction>
                    </div>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}