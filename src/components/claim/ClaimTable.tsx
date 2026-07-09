"use client";

import { Paperclip } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IClaim, ClaimStatus } from "@/types/claim.types";
import { formatDate } from "@/lib/utils/format-subscription";
import { getAttachmentCount, getClaimSubscriptionLabel } from "@/utils/format-claim";
import { ClaimStatusBadge } from "./ClaimStatusBadge";
import { ClaimActions } from "./ClaimActions";
import { ClaimSkeleton } from "./ClaimSkeleton";

interface ClaimTableProps {
  claims: IClaim[];
  isLoading: boolean;
  onViewDetails: (claim: IClaim) => void;
  onEdit: (claim: IClaim) => void;
}

const COLUMNS = [
  "Service", "Subscription", "Status", "Submitted", "Reviewed", "Attachments", "Actions",
] as const;

const isEditable = (status: ClaimStatus) =>
  status === ClaimStatus.PENDING || status === ClaimStatus.REJECTED;

export function ClaimTable({ claims, isLoading, onViewDetails, onEdit }: ClaimTableProps) {
  return (
    <div className="rounded-lg border border-border overflow-hidden overflow-x-auto">
      <Table className="min-w-225">
        <TableHeader className="bg-muted/50 sticky top-0">
          <TableRow className="border-b border-border hover:bg-transparent">
            {COLUMNS.map((col) => (
              <TableHead
                key={col}
                className={`font-semibold text-foreground whitespace-nowrap ${col === "Actions" ? "text-right" : ""}`}
              >
                {col}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <ClaimSkeleton />
          ) : (
            claims.map((claim) => {
              const attachmentCount = getAttachmentCount(claim.attachments);
              return (
                <TableRow key={claim._id} className="border-b border-border transition-colors hover:bg-muted/30">
                  <TableCell className="text-sm font-medium text-foreground max-w-48 truncate">
                    {claim.serviceTitle}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground whitespace-nowrap">
                    {getClaimSubscriptionLabel(claim.subscription)}
                  </TableCell>
                  <TableCell><ClaimStatusBadge status={claim.status} /></TableCell>
                  <TableCell className="text-sm text-muted-foreground whitespace-nowrap">
                    {formatDate(claim.createdAt)}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground whitespace-nowrap">
                    {claim.reviewedAt ? formatDate(claim.reviewedAt) : "—"}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground whitespace-nowrap">
                    {attachmentCount > 0 ? (
                      <span className="flex items-center gap-1.5">
                        <Paperclip className="h-3.5 w-3.5 shrink-0" />
                        {attachmentCount}
                      </span>
                    ) : (
                      "—"
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <ClaimActions
                      onViewDetails={() => onViewDetails(claim)}
                      onEdit={isEditable(claim.status) ? () => onEdit(claim) : undefined}
                    />
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </div>
  );
}