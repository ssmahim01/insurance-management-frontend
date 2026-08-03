/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  ChevronUp,
  ChevronDown,
  ChevronsUpDown,
  Eye,
  Settings2,
  FileText,
  Paperclip,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

import { IClaim, ClaimStatus, PaymentMethod } from "@/types/claim.types";
import { CLAIM_TITLE_LABELS, PAYMENT_METHOD_LABELS } from "@/lib/utils/claim-labels";

export type ClaimSortField = "claimTitle" | "status" | "createdAt";
export type SortDir = "asc" | "desc" | null;

interface ClaimManagerTableProps {
  claims: IClaim[];
  isLoading: boolean;
  sortField: ClaimSortField | null;
  sortDir: SortDir;
  onSort: (field: ClaimSortField) => void;
  onViewDetails: (claim: IClaim) => void;
  onManage: (claim: IClaim) => void;
}

const STATUS_LABELS: Record<ClaimStatus, string> = {
  [ClaimStatus.PENDING]: "Pending",
  [ClaimStatus.APPROVED]: "Approved",
  [ClaimStatus.REJECTED]: "Rejected",
  [ClaimStatus.ALL]: "All",
};

const STATUS_STYLES: Record<ClaimStatus, string> = {
  [ClaimStatus.PENDING]:
    "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-800 dark:bg-amber-900/20 dark:text-amber-400",
  [ClaimStatus.APPROVED]:
    "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-400",
  [ClaimStatus.REJECTED]:
    "border-red-200 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-900/20 dark:text-red-400",
  [ClaimStatus.ALL]:
    "border-slate-200 bg-slate-50 text-slate-700 dark:border-slate-800 dark:bg-slate-900/20 dark:text-slate-400",
};

const STATUS_DOT: Record<ClaimStatus, string> = {
  [ClaimStatus.PENDING]: "bg-amber-500",
  [ClaimStatus.APPROVED]: "bg-emerald-500",
  [ClaimStatus.REJECTED]: "bg-red-500",
  [ClaimStatus.ALL]: "bg-slate-500",
};

const getCustomerName = (claim: IClaim) =>
  typeof claim.customer === "object" ? claim.customer?.name : "—";
const getCustomerPhone = (claim: IClaim) =>
  typeof claim.customer === "object" ? claim.customer?.phone : "—";

function getPackageName(claim: IClaim): string {
  const sub = claim.subscription as any;
  return sub?.package?.name ?? sub?.package?.title ?? "—";
}

const formatDate = (iso?: string | Date) => {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

function SortIcon({
  field,
  sortField,
  sortDir,
}: {
  field: ClaimSortField;
  sortField: ClaimSortField | null;
  sortDir: SortDir;
}) {
  if (sortField !== field)
    return <ChevronsUpDown className="w-3.5 h-3.5 ml-1 text-slate-400" />;
  return sortDir === "asc" ? (
    <ChevronUp className="w-3.5 h-3.5 ml-1 text-indigo-500" />
  ) : (
    <ChevronDown className="w-3.5 h-3.5 ml-1 text-indigo-500" />
  );
}

function ClaimRowSkeleton() {
  return (
    <TableRow>
      <TableCell><Skeleton className="h-4 w-40" /></TableCell>
      <TableCell><Skeleton className="h-4 w-32" /></TableCell>
      <TableCell><Skeleton className="h-4 w-24" /></TableCell>
      <TableCell><Skeleton className="h-4 w-20" /></TableCell>
      <TableCell><Skeleton className="h-4 w-20" /></TableCell>
      <TableCell><Skeleton className="h-4 w-24" /></TableCell>
      <TableCell>
        <div className="flex gap-1.5 justify-end">
          <Skeleton className="h-8 w-8 rounded-md" />
          <Skeleton className="h-8 w-20 rounded-md" />
        </div>
      </TableCell>
    </TableRow>
  );
}

export function ClaimManagerTable({
  claims,
  isLoading,
  sortField,
  sortDir,
  onSort,
  onViewDetails,
  onManage,
}: ClaimManagerTableProps) {
  const SortableTh = ({ field, label }: { field: ClaimSortField; label: string }) => (
    <TableHead className="cursor-pointer select-none whitespace-nowrap" onClick={() => onSort(field)}>
      <span className="inline-flex items-center hover:text-white transition-colors">
        {label}
        <SortIcon field={field} sortField={sortField} sortDir={sortDir} />
      </span>
    </TableHead>
  );

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
      <ScrollArea className="w-full whitespace-nowrap">
        <Table className="min-w-250">
          <TableHeader className="sticky top-0 z-10">
            <TableRow className="border-none bg-linear-to-r *:text-white from-indigo-600 via-blue-600 to-cyan-600 hover:bg-transparent">
              <SortableTh field="claimTitle" label="Claim" />
              <TableHead className="whitespace-nowrap text-white">Customer</TableHead>
              <TableHead className="whitespace-nowrap text-white">Package</TableHead>
              <TableHead className="whitespace-nowrap text-white">Payment</TableHead>
              <SortableTh field="status" label="Status" />
              <SortableTh field="createdAt" label="Submitted" />
              <TableHead className="text-right whitespace-nowrap text-white">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {isLoading ? (
              Array.from({ length: 8 }).map((_, i) => <ClaimRowSkeleton key={i} />)
            ) : claims.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7}>
                  <div className="flex flex-col items-center justify-center py-16 text-slate-400">
                    <FileText className="w-12 h-12 mb-4 opacity-30" />
                    <p className="text-base font-medium">No claims found</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              claims.map((claim, index) => {
                const paymentMethodLabel = claim.paymentMethod
                  ? PAYMENT_METHOD_LABELS[claim.paymentMethod as PaymentMethod]
                  : "—";
                return (
                  <TableRow
                    key={String(claim._id)}
                    className={`border-b transition-all duration-300 hover:shadow-sm hover:bg-indigo-50 dark:hover:bg-indigo-950/20 ${
                      index % 2 === 0
                        ? "bg-white dark:bg-background"
                        : "bg-linear-to-r from-slate-50 to-indigo-50/40 dark:from-slate-950 dark:to-indigo-950/10"
                    }`}
                  >
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-linear-to-br from-indigo-500 to-blue-600 flex items-center justify-center shrink-0">
                          <FileText className="w-4 h-4 text-white" />
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium text-slate-900 dark:text-white truncate max-w-44">
                            {CLAIM_TITLE_LABELS[claim.claimTitle] ?? claim.claimTitle}
                          </p>
                          <p className="text-xs text-slate-400 font-mono truncate max-w-44">
                            #{String(claim._id).slice(-6)}
                          </p>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell className="whitespace-nowrap">
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-slate-900 dark:text-white truncate max-w-32">
                          {getCustomerName(claim)}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 font-mono truncate max-w-32">
                          {getCustomerPhone(claim)}
                        </p>
                      </div>
                    </TableCell>

                    <TableCell className="text-slate-600 dark:text-slate-400 text-sm max-w-36 truncate">
                      {getPackageName(claim)}
                    </TableCell>

                    <TableCell>
                      <div className="flex items-center gap-1.5">
                        <Badge variant="outline" className="text-[10px] font-normal">
                          {paymentMethodLabel}
                        </Badge>
                        <span className="inline-flex items-center gap-1 text-xs text-slate-400">
                          <Paperclip className="h-3 w-3" />
                          {claim.attachments?.length ?? 0}
                        </span>
                      </div>
                    </TableCell>

                    <TableCell>
                      <Badge variant="outline" className={STATUS_STYLES[claim.status]}>
                        <span
                          className={`h-1.5 w-1.5 rounded-full mr-1.5 inline-block ${STATUS_DOT[claim.status]}`}
                        />
                        {STATUS_LABELS[claim.status]}
                      </Badge>
                    </TableCell>

                    <TableCell className="text-slate-500 dark:text-slate-400 text-sm whitespace-nowrap">
                      {formatDate(claim.createdAt)}
                    </TableCell>

                    <TableCell>
                      <div className="flex gap-1.5 justify-end">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 transition-all duration-200 hover:shadow-sm hover:-translate-y-0.5 active:scale-95"
                          title="View details"
                          onClick={() => onViewDetails(claim)}
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </Button>
                        <Button
                          size="sm"
                          className="gap-1.5 bg-linear-to-r from-indigo-600 to-blue-600 text-white hover:from-indigo-700 hover:to-blue-700 transition-all duration-200 ease-out hover:shadow-md hover:-translate-y-0.5 active:scale-95"
                          onClick={() => onManage(claim)}
                        >
                          <Settings2 className="h-3.5 w-3.5" />
                          Manage
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}