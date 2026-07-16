// MessageTrash.tsx
"use client";

import { useCallback, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import {
  useGetAllTrashMessagesQuery,
  useRestoreMessageMutation,
  useDeleteMessageMutation,
  IMessage,
  MessageType,
} from "@/redux/features/message/message.api";
import { ITrashFilters } from "@/types/agent-leader";

import { PageHeader } from "@/components/shared/PageHeader";
import { TrashStatsCards } from "@/components/shared/trash/TrashStatsCards";
import { TrashFilters } from "@/components/shared/trash/TrashFilters";
import { TrashPagination } from "@/components/shared/trash/TrashPagination";
import { TrashEmptyState } from "@/components/shared/trash/TrashEmptyState";
import { RestoreDialog } from "@/components/shared/trash/RestoreDialog";
import { PermanentDeleteDialog } from "@/components/shared/trash/PermanentDeleteDialog";
import { MessageTrashTable } from "./MessageTrashTable";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";

const MESSAGE_TYPE_LABELS: Record<MessageType, string> = {
  [MessageType.SUBSCRIPTION]: "Subscription",
  [MessageType.PAYMENT]: "Payment",
  [MessageType.CLAIM]: "Claim",
  [MessageType.PROMOTIONAL]: "Promotional",
  [MessageType.GENERAL]: "General",
  [MessageType.OTP]: "OTP",
  [MessageType.SMS]: "SMS",
};

interface DialogState {
  isOpen: boolean;
  itemId: string;
  itemName: string;
}

const EMPTY_DIALOG: DialogState = { isOpen: false, itemId: "", itemName: "" };

export function MessageTrash() {
  const router = useRouter();
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(10);
  const [filters, setFilters] = useState<ITrashFilters>({
    searchTerm: "",
    sortBy: "newest",
  });
  const [typeFilter, setTypeFilter] = useState<"all" | MessageType>("all");

  const [restoreDialog, setRestoreDialog] = useState<DialogState>(EMPTY_DIALOG);
  const [deleteDialog, setDeleteDialog] = useState<DialogState>(EMPTY_DIALOG);

  const queryParams = useMemo(
    () => ({
      page,
      limit,
      searchTerm: filters.searchTerm || undefined,
      type: typeFilter !== "all" ? typeFilter : undefined,
      sort:
        filters.sortBy === "newest"
          ? "-updatedAt"
          : filters.sortBy === "oldest"
            ? "updatedAt"
            : filters.sortBy === "name-asc"
              ? "phone"
              : "-phone",
      startDate: filters.startDate,
      endDate: filters.endDate,
    }),
    [page, limit, filters, typeFilter],
  );

  const { data, isLoading, isError } = useGetAllTrashMessagesQuery(queryParams);
  const [restoreMessage, { isLoading: isRestoring }] = useRestoreMessageMutation();
  const [deleteMessage, { isLoading: isDeleting }] = useDeleteMessageMutation();

  const messages: IMessage[] = useMemo(() => data?.data ?? [], [data?.data]);

  const hasFilters = Boolean(
    filters.searchTerm || filters.startDate || filters.endDate || typeFilter !== "all",
  );

  const handleFiltersChange = useCallback((next: ITrashFilters) => {
    setFilters(next);
    setPage(1);
  }, []);

  const handleResetFilters = useCallback(() => {
    setFilters({ searchTerm: "", sortBy: "newest" });
    setTypeFilter("all");
    setPage(1);
  }, []);

  const handleTypeFilterChange = useCallback((value: "all" | MessageType) => {
    setTypeFilter(value);
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
      await restoreMessage(restoreDialog.itemId).unwrap();
      toast.success("Message restored successfully.");
      setRestoreDialog(EMPTY_DIALOG);
    } catch (err) {
      const message =
        err && typeof err === "object" && "data" in err
          ? ((err as { data?: { message?: string } }).data?.message ??
            "Failed to restore message.")
          : "Failed to restore message.";
      toast.error(message);
    }
  }, [restoreMessage, restoreDialog.itemId]);

  const handleDeleteConfirm = useCallback(async () => {
    try {
      await deleteMessage(deleteDialog.itemId).unwrap();
      toast.success("Message permanently deleted.");
      setDeleteDialog(EMPTY_DIALOG);
    } catch (err) {
      const message =
        err && typeof err === "object" && "data" in err
          ? ((err as { data?: { message?: string } }).data?.message ??
            "Failed to delete message.")
          : "Failed to delete message.";
      toast.error(message);
    }
  }, [deleteMessage, deleteDialog.itemId]);

  return (
    <div>
      <PageHeader
        title="Message Trash"
        description="Restore or permanently remove deleted messages."
        breadcrumbs={[
          { label: "Dashboard", href: "/admin/dashboard" },
          {
            label: "Message Management",
            href: "/admin/dashboard/message",
          },
          { label: "Trash" },
        ]}
      />

      <TrashStatsCards
        items={messages as any}
        totalCount={data?.meta.total}
        isLoading={isLoading}
      />

      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="flex-1">
          <TrashFilters
            filters={filters}
            onFiltersChange={handleFiltersChange}
            onReset={handleResetFilters}
          />
        </div>

        <Select
          value={typeFilter as any}
          onValueChange={(v) => handleTypeFilterChange(v as "all" | MessageType)}
        >
          <SelectTrigger className="w-48 h-9 text-sm shrink-0">
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
      </div>

      {isError ? (
        <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-destructive">
          <p>Failed to load trash. Please try again.</p>
        </div>
      ) : messages.length > 0 ? (
        <>
          <MessageTrashTable
            items={messages}
            isLoading={isLoading}
            onRestore={(id) => {
              const item = messages.find((m) => m._id === id);
              if (item) handleRestoreClick(id, item.phone);
            }}
            onPermanentDelete={(id) => {
              const item = messages.find((m) => m._id === id);
              if (item) handleDeleteClick(id, item.phone);
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
            title="No deleted messages found"
            onClearFilters={hasFilters ? handleResetFilters : undefined}
            onGoBack={() => router.push("/admin/dashboard/message")}
          />
        )
      )}

      <RestoreDialog
        isOpen={restoreDialog.isOpen}
        itemName={restoreDialog.itemName}
        entityName="Message"
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