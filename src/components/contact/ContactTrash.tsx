"use client";

import { useCallback, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import {
  useGetAllTrashContactsQuery,
  useRestoreContactMutation,
  useDeleteContactMutation,
} from "@/redux/features/contact/contact.api";

import { IContact } from "@/types/contact.type";
import { ITrashFilters } from "@/types/agent-leader";

import { PageHeader } from "@/components/shared/PageHeader";
import { TrashFilters } from "@/components/shared/trash/TrashFilters";
import { TrashPagination } from "@/components/shared/trash/TrashPagination";
import { TrashEmptyState } from "@/components/shared/trash/TrashEmptyState";
import { RestoreDialog } from "@/components/shared/trash/RestoreDialog";
import { PermanentDeleteDialog } from "@/components/shared/trash/PermanentDeleteDialog";
import { ContactTrashTable } from "./ContactTrashTable";
import { ContactTrashStatsCards } from "./ContactTrashStatsCards";



interface DialogState {
  isOpen: boolean;
  itemId: string;
  itemName: string;
}

const EMPTY_DIALOG: DialogState = {
  isOpen: false,
  itemId: "",
  itemName: "",
};

export function ContactTrash() {
  const router = useRouter();

  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(10);

  const [filters, setFilters] = useState<ITrashFilters>({
    searchTerm: "",
    sortBy: "newest",
  });

  const [restoreDialog, setRestoreDialog] =
    useState<DialogState>(EMPTY_DIALOG);

  const [deleteDialog, setDeleteDialog] =
    useState<DialogState>(EMPTY_DIALOG);

  // Query Params
  const queryParams = useMemo(
    () => ({
      page,
      limit,

      ...(filters.searchTerm && {
        searchTerm: filters.searchTerm,
      }),

      ...(filters.startDate && {
        startDate: filters.startDate,
      }),

      ...(filters.endDate && {
        endDate: filters.endDate,
      }),

      sort:
        filters.sortBy === "newest"
          ? "-updatedAt"
          : filters.sortBy === "oldest"
            ? "updatedAt"
            : filters.sortBy === "name-asc"
              ? "name"
              : "-name",
    }),
    [
      page,
      limit,
      filters.searchTerm,
      filters.startDate,
      filters.endDate,
      filters.sortBy,
    ],
  );

  // Get Trash Contacts
  const {
    data,
    isLoading,
    isFetching,
    isError,
  } = useGetAllTrashContactsQuery(queryParams);

  
  const [restoreContact, { isLoading: isRestoring }] =
    useRestoreContactMutation();

  const [deleteContact, { isLoading: isDeleting }] =
    useDeleteContactMutation();

  // Contacts
  const contacts: IContact[] = data?.data ?? [];

  // Filter Check
  const hasFilters = Boolean(
    filters.searchTerm ||
      filters.startDate ||
      filters.endDate,
  );

  // Filter Change
  const handleFiltersChange = useCallback(
    (nextFilters: ITrashFilters) => {
      setFilters(nextFilters);
      setPage(1);
    },
    [],
  );

  // Reset Filters
  const handleResetFilters = useCallback(() => {
    setFilters({
      searchTerm: "",
      sortBy: "newest",
    });

    setPage(1);
  }, []);

  // Restore Click
  const handleRestoreClick = useCallback(
    (itemId: string, itemName: string) => {
      setRestoreDialog({
        isOpen: true,
        itemId,
        itemName,
      });
    },
    [],
  );

  // Delete Click
  const handleDeleteClick = useCallback(
    (itemId: string, itemName: string) => {
      setDeleteDialog({
        isOpen: true,
        itemId,
        itemName,
      });
    },
    [],
  );


  // Restore Confirm
  const handleRestoreConfirm = useCallback(async () => {
    if (!restoreDialog.itemId) return;

    try {
      await restoreContact(restoreDialog.itemId).unwrap();

      toast.success("Contact restored successfully.");

      setRestoreDialog(EMPTY_DIALOG);
    } catch (error) {
      const message =
        error &&
        typeof error === "object" &&
        "data" in error
          ? (
              error as {
                data?: {
                  message?: string;
                };
              }
            ).data?.message ?? "Failed to restore contact."
          : "Failed to restore contact.";

      toast.error(message);
    }
  }, [restoreContact, restoreDialog.itemId]);

  // Permanent Delete Confirm
  const handleDeleteConfirm = useCallback(async () => {
    if (!deleteDialog.itemId) return;

    try {
      await deleteContact(deleteDialog.itemId).unwrap();

      toast.success("Contact permanently deleted.");

      setDeleteDialog(EMPTY_DIALOG);
    } catch (error) {
      const message =
        error &&
        typeof error === "object" &&
        "data" in error
          ? (
              error as {
                data?: {
                  message?: string;
                };
              }
            ).data?.message ?? "Failed to delete contact."
          : "Failed to delete contact.";

      toast.error(message);
    }
  }, [deleteContact, deleteDialog.itemId]);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <PageHeader
        title="Contact Trash"
        description="Restore or permanently remove deleted contact messages."
        breadcrumbs={[
          {
            label: "Dashboard",
            href: "/admin/dashboard",
          },
          {
            label: "Contact Management",
            href: "/admin/dashboard/contact",
          },
          {
            label: "Trash",
          },
        ]}
      />

        <ContactTrashStatsCards
         items={contacts}
         totalCount={data?.meta?.total}
         isLoading={isLoading}
       /> 

      {/* Filters */}
      <TrashFilters
        filters={filters}
        onFiltersChange={handleFiltersChange}
        onReset={handleResetFilters}
      />

      {/* Error */}
      {isError ? (
        <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-destructive">
          <p>Failed to load trash. Please try again.</p>
        </div>
      ) : (
        <>
          {/* Table */}
          {contacts.length > 0 || isLoading ? (
            <>
              <ContactTrashTable
                items={contacts}
                isLoading={isLoading}
                onRestore={(id) => {
                  const contact = contacts.find(
                    (item) => item._id === id,
                  );

                  if (contact) {
                    handleRestoreClick(
                      contact._id,
                      contact.name,
                    );
                  }
                }}
                onPermanentDelete={(id) => {
                  const contact = contacts.find(
                    (item) => item._id === id,
                  );

                  if (contact) {
                    handleDeleteClick(
                      contact._id,
                      contact.name,
                    );
                  }
                }}
              />

              {!isLoading && (
                <TrashPagination
                  meta={data?.meta}
                  currentPage={page}
                  onPageChange={setPage}
                  isLoading={isFetching}
                />
              )}
            </>
          ) : (
            <TrashEmptyState
              hasFilters={hasFilters}
              title="No deleted contacts found"
              onClearFilters={
                hasFilters ? handleResetFilters : undefined
              }
              onGoBack={() =>
                router.push("/admin/dashboard/contact")
              }
            />
          )}
        </>
      )}

      {/* Restore Dialog */}
      <RestoreDialog
        isOpen={restoreDialog.isOpen}
        itemName={restoreDialog.itemName}
        entityName="Contact"
        onConfirm={handleRestoreConfirm}
        onCancel={() => setRestoreDialog(EMPTY_DIALOG)}
        isLoading={isRestoring}
      />

      {/* Permanent Delete Dialog */}
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