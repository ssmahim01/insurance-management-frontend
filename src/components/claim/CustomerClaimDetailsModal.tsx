"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { IClaim } from "@/types/claim.types";
import { formatDate } from "@/lib/utils/format-subscription";
import { getClaimSubscriptionLabel } from "@/utils/format-claim";
import { ClaimStatusBadge } from "./ClaimStatusBadge";

interface ClaimDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item: IClaim;
}

export function CustomerClaimDetailsModal({ open, onOpenChange, item }: ClaimDetailsModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="uppercase tracking-widest text-sm">Claim Details</DialogTitle>
        </DialogHeader>

        <Separator />

        <div className="space-y-4 pt-1 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Status</span>
            <ClaimStatusBadge status={item.status} />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Subscription</span>
            <span className="font-medium text-foreground">{getClaimSubscriptionLabel(item.subscription)}</span>
          </div>
          <div className="space-y-1">
            <span className="text-muted-foreground">Service Title</span>
            <p className="font-medium text-foreground">{item.serviceTitle}</p>
          </div>
          <div className="space-y-1">
            <span className="text-muted-foreground">Description</span>
            <p className="text-foreground whitespace-pre-wrap">{item.description}</p>
          </div>

          {item.attachments && item.attachments.length > 0 && (
            <div className="space-y-2">
              <span className="text-muted-foreground">Attachments</span>
              <div className="grid grid-cols-3 gap-2">
                {item.attachments.map((url, idx) => (
                  <a
                    key={idx}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="aspect-square rounded-lg overflow-hidden border border-border block"
                  >
                    <img src={url} alt={`Attachment ${idx + 1}`} className="w-full h-full object-cover" />
                  </a>
                ))}
              </div>
            </div>
          )}

          {item.adminNote && (
            <div className="space-y-1">
              <span className="text-muted-foreground">Admin Note</span>
              <p className="text-foreground whitespace-pre-wrap">{item.adminNote}</p>
            </div>
          )}

          <Separator />

          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Submitted {formatDate(item.createdAt)}</span>
            {item.reviewedAt && <span>Reviewed {formatDate(item.reviewedAt)}</span>}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}