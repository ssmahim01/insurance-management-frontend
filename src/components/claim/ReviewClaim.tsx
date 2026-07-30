"use client";

import { useEffect } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { ClipboardCheck, CheckCircle2, XCircle, Clock, FileText } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select, SelectContent, SelectItem, SelectTrigger,
} from "@/components/ui/select";

import { useReviewClaimMutation } from "@/redux/features/claim/claim.api";
import { IClaim, ClaimStatus } from "@/types/claim.types";

// ─── Schema ───────────────────────────────────────────────────────────────────

const reviewClaimSchema = z.object({
  status:    z.nativeEnum(ClaimStatus, { error: "Status is required" }),
  adminNote: z.string().optional(),
});

type ReviewClaimFormValues = z.infer<typeof reviewClaimSchema>;

interface ReviewClaimModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item: IClaim;
  onSuccess?: () => void;
}

const STATUS_LABELS: Record<ClaimStatus, string> = {
  [ClaimStatus.PENDING]:  "Pending",
  [ClaimStatus.APPROVED]: "Approved",
  [ClaimStatus.REJECTED]: "Rejected",
  [ClaimStatus.ALL]: "All",
};

const STATUS_ICONS: Record<ClaimStatus, React.ElementType> = {
  [ClaimStatus.PENDING]:  Clock,
  [ClaimStatus.APPROVED]: CheckCircle2,
  [ClaimStatus.REJECTED]: XCircle,
  [ClaimStatus.ALL]: FileText,
};

const getCustomerName = (claim: IClaim) =>
  typeof claim.customer === "object" ? claim.customer.name : "—";

// ─── Component ────────────────────────────────────────────────────────────────

export function ReviewClaimModal({ open, onOpenChange, item, onSuccess }: ReviewClaimModalProps) {
  const [reviewClaim, { isLoading }] = useReviewClaimMutation();

  const {
    register, handleSubmit, setValue, watch, reset,
    formState: { errors },
  } = useForm<ReviewClaimFormValues>({
    resolver: zodResolver(reviewClaimSchema),
    defaultValues: {
      status:    item.status,
      adminNote: item.adminNote ?? "",
    },
  });

  useEffect(() => {
    if (open) {
      reset({ status: item.status, adminNote: item.adminNote ?? "" });
    }
  }, [open, item, reset]);

  const watchedStatus = watch("status");

  const handleClose = () => onOpenChange(false);

  const onSubmit = async (data: ReviewClaimFormValues) => {
    try {
      await reviewClaim({
        id: String(item._id),
        data: { status: data.status, adminNote: data.adminNote },
      }).unwrap();
      toast.success("Claim reviewed successfully");
      handleClose();
      onSuccess?.();
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to review claim");
    }
  };

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) handleClose(); }}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto p-6">
        <DialogHeader className="flex flex-col items-center gap-2 pb-2">
          <div className="w-12 h-12 rounded-xl bg-linear-to-br from-blue-600 to-indigo-700 flex items-center justify-center shadow-md mb-1">
            <ClipboardCheck className="w-6 h-6 text-white" />
          </div>
          <DialogTitle className="text-xl font-bold tracking-widest uppercase">Review Claim</DialogTitle>
          <DialogDescription className="text-[#96999A] text-sm tracking-wide">Verify the claim and set its final status</DialogDescription>
        </DialogHeader>

        <Separator />

        {/* ── Claim Summary ── */}
        <div className="border border-slate-200 dark:border-slate-700 rounded-lg p-4 bg-slate-50/50 dark:bg-slate-800/30 space-y-2">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-slate-400 shrink-0" />
            <p className="font-medium text-sm text-slate-900 dark:text-white truncate">{item.serviceTitle}</p>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-3">{item.description}</p>
          <div className="flex items-center justify-between pt-1 text-xs text-slate-400">
            <span>Customer: <span className="text-slate-600 dark:text-slate-300 font-medium">{getCustomerName(item)}</span></span>
            <span>Attachments: <span className="text-slate-600 dark:text-slate-300 font-medium">{item.attachments?.length ?? 0}</span></span>
          </div>

          {item.attachments && item.attachments.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-1">
              {item.attachments.map((url, idx) => (
                <a
                  key={idx}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-14 h-14 rounded-md overflow-hidden border border-slate-200 dark:border-slate-700 shrink-0 hover:opacity-80 transition-opacity"
                >
                  <img src={url} alt={`Attachment ${idx + 1}`} className="w-full h-full object-cover" />
                </a>
              ))}
            </div>
          )}
        </div>

        <Separator />

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 pt-1">

          {/* ── Status ── */}
          <div className="space-y-1.5">
            <Label className="text-xs font-semibold tracking-widest uppercase">Status <span className="text-red-500">*</span></Label>
            <Select
              value={watchedStatus}
              onValueChange={(v) => setValue("status", v as ClaimStatus, { shouldValidate: true })}
            >
              <SelectTrigger className="h-9 text-sm w-full">
                <span className="flex items-center gap-2">
                  {STATUS_LABELS[watchedStatus] ?? "Select status"}
                </span>
              </SelectTrigger>
              <SelectContent>
                {Object.values(ClaimStatus).map((status) => {
                  const Icon = STATUS_ICONS[status];
                  return (
                    <SelectItem key={status} value={status}>
                      <span className="flex items-center gap-2">
                        <Icon className="w-3.5 h-3.5" />
                        {STATUS_LABELS[status]}
                      </span>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
            {errors.status && <p className="text-xs text-red-400">{errors.status.message}</p>}

            <div className="pt-1">
              <Badge
                variant="outline"
                className={
                  watchedStatus === ClaimStatus.APPROVED
                    ? "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-400"
                    : watchedStatus === ClaimStatus.REJECTED
                    ? "border-red-200 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-900/20 dark:text-red-400"
                    : "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-800 dark:bg-amber-900/20 dark:text-amber-400"
                }
              >
                Will be set to: {STATUS_LABELS[watchedStatus]}
              </Badge>
            </div>
          </div>

          {/* ── Admin Note ── */}
          <div className="space-y-1.5">
            <Label htmlFor="r-note" className="text-xs font-semibold tracking-widest uppercase">
              Admin Note <span className="text-[#96999A] normal-case font-normal">(optional)</span>
            </Label>
            <Textarea
              id="r-note"
              rows={4}
              placeholder="Reason for approval/rejection, or any note for the customer..."
              {...register("adminNote")}
            />
            {errors.adminNote && <p className="text-xs text-red-400">{errors.adminNote.message}</p>}
          </div>

          {/* ── Submit ── */}
          <Button type="submit" disabled={isLoading} className="group hover:cursor-pointer border-indigo-600 text-white bg-indigo-700 w-full hover:bg-indigo-800 hover:shadow-xl hover:text-white duration-500 dark:text-white mt-2 cursor-pointer font-bold tracking-widest uppercase transition-colors disabled:opacity-60 hover:scale-105 ease-in-out">
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                Saving...
              </span>
            ) : (
              <span className="flex items-center gap-2"><ClipboardCheck className="h-4 w-4" />Submit Review</span>
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}