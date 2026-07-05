"use client";

import { useCallback, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import {
    useGetAllTrashClaimsQuery,
    useRestoreClaimMutation,
    useDeleteClaimMutation,
} from "@/redux/features/claim/claim.api";
import { ITrashFilters } from "@/types/agent-leader";
import { IClaim } from "@/types/claim.types";

import { PageHeader } from "@/components/shared/PageHeader";
import { TrashStatsCards } from "@/components/shared/trash/TrashStatsCards";
import { TrashFilters } from "@/components/shared/trash/TrashFilters";
import { TrashPagination } from "@/components/shared/trash/TrashPagination";
import { TrashEmptyState } from "@/components/shared/trash/TrashEmptyState";
import { RestoreDialog } from "@/components/shared/trash/RestoreDialog";
import { PermanentDeleteDialog } from "@/components/shared/trash/PermanentDeleteDialog";
import { ClaimTrashTable } from "./ClaimTrashTable";
import { ClaimTrashStatsCards } from "./ClaimTrashStatsCard";

interface DialogState {
    isOpen: boolean;
    itemId: string;
    itemName: string;
}

const EMPTY_DIALOG: DialogState = { isOpen: false, itemId: "", itemName: "" };

export function ClaimTrash() {
    const router = useRouter();
    const [page, setPage] = useState<number>(1);
    const [limit] = useState<number>(10);
    const [filters, setFilters] = useState<ITrashFilters>({
        searchTerm: "",
        sortBy: "newest",
    });

    const [restoreDialog, setRestoreDialog] = useState<DialogState>(EMPTY_DIALOG);
    const [deleteDialog, setDeleteDialog] = useState<DialogState>(EMPTY_DIALOG);

    const queryParams = useMemo(
        () => ({
            page,
            limit,
            searchTerm: filters.searchTerm || undefined,
            sort:
                filters.sortBy === "newest"
                    ? "-updatedAt"
                    : filters.sortBy === "oldest"
                        ? "updatedAt"
                        : filters.sortBy === "name-asc"
                            ? "serviceTitle"
                            : "-serviceTitle",
            startDate: filters.startDate,
            endDate: filters.endDate,
        }),
        [page, limit, filters],
    );

    const { data, isLoading, isError } = useGetAllTrashClaimsQuery(queryParams);
    const [restoreClaim, { isLoading: isRestoring }] = useRestoreClaimMutation();
    const [deleteClaim, { isLoading: isDeleting }] = useDeleteClaimMutation();

    const claims: IClaim[] = data?.data ?? [];

    const hasFilters = Boolean(
        filters.searchTerm || filters.startDate || filters.endDate,
    );

    const handleFiltersChange = useCallback((next: ITrashFilters) => {
        setFilters(next);
        setPage(1);
    }, []);

    const handleResetFilters = useCallback(() => {
        setFilters({ searchTerm: "", sortBy: "newest" });
        setPage(1);
    }, []);

    const handleRestoreClick = useCallback((itemId: string, itemName: string) => {
        setRestoreDialog({ isOpen: true, itemId, itemName });
    }, []);

    const handleDeleteClick = useCallback((itemId: string, itemName: string) => {
        setDeleteDialog({ isOpen: true, itemId, itemName });
    }, []);

    const handleRestoreConfirm = useCallback(async () => {
        try {
            await restoreClaim(restoreDialog.itemId).unwrap();
            toast.success("Claim restored successfully.");
            setRestoreDialog(EMPTY_DIALOG);
        } catch (err) {
            const message =
                err && typeof err === "object" && "data" in err
                    ? ((err as { data?: { message?: string } }).data?.message ??
                        "Failed to restore claim.")
                    : "Failed to restore claim.";
            toast.error(message);
        }
    }, [restoreClaim, restoreDialog.itemId]);

    const handleDeleteConfirm = useCallback(async () => {
        try {
            await deleteClaim(deleteDialog.itemId).unwrap();
            toast.success("Claim permanently deleted.");
            setDeleteDialog(EMPTY_DIALOG);
        } catch (err) {
            const message =
                err && typeof err === "object" && "data" in err
                    ? ((err as { data?: { message?: string } }).data?.message ??
                        "Failed to delete claim.")
                    : "Failed to delete claim.";
            toast.error(message);
        }
    }, [deleteClaim, deleteDialog.itemId]);

    return (
        <div>
            <PageHeader
                title="Claims Trash"
                description="Restore or permanently remove deleted claims."
                breadcrumbs={[
                    { label: "Dashboard", href: "/dashboard" },
                    { label: "Claims", href: "/dashboard/claims" },
                    { label: "Trash" },
                ]}
            />

            <ClaimTrashStatsCards
                items={claims}
                totalCount={data?.meta?.total}
                isLoading={isLoading}
            />

            <TrashFilters
                filters={filters}
                onFiltersChange={handleFiltersChange}
                onReset={handleResetFilters}
            />

            {isError ? (
                <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-destructive">
                    <p>Failed to load trash. Please try again.</p>
                </div>
            ) : claims.length > 0 ? (
                <>
                    <ClaimTrashTable
                        items={claims}
                        isLoading={isLoading}
                        onRestore={(id) => {
                            const item = claims.find((c) => c._id === id);
                            if (item) handleRestoreClick(id, item.serviceTitle);
                        }}
                        onPermanentDelete={(id) => {
                            const item = claims.find((c) => c._id === id);
                            if (item) handleDeleteClick(id, item.serviceTitle);
                        }}
                    />
                    <TrashPagination
                        meta={data?.meta}
                        currentPage={page}
                        onPageChange={setPage}
                        isLoading={isLoading}
                    />
                </>
            ) : (
                !isLoading && (
                    <TrashEmptyState
                        hasFilters={hasFilters}
                        title="No deleted claims found"
                        onClearFilters={hasFilters ? handleResetFilters : undefined}
                        onGoBack={() => router.push("/dashboard/claims")}
                    />
                )
            )}

            <RestoreDialog
                isOpen={restoreDialog.isOpen}
                itemName={restoreDialog.itemName}
                entityName="Claim"
                onConfirm={handleRestoreConfirm}
                onCancel={() => setRestoreDialog(EMPTY_DIALOG)}
                isLoading={isRestoring}
            />

            <PermanentDeleteDialog
                isOpen={deleteDialog.isOpen}
                itemName={deleteDialog.itemName}
                onConfirm={handleDeleteConfirm}
                onCancel={() => setDeleteDialog(EMPTY_DIALOG)}
                isLoading={isDeleting}
            />
        </div>
    );
}