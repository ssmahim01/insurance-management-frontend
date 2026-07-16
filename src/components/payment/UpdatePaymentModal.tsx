// UpdatePayment.tsx
"use client";

import { useEffect } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { CreditCard } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";

import { useUpdatePaymentMutation, IPayment, PaymentStatus } from "@/redux/features/payment/payment.api";

// ─── Schema ───────────────────────────────────────────────────────────────────

const updatePaymentSchema = z.object({
  status: z.enum(["UNPAID", "PAID", "COMPLETED", "FAILED", "CANCELLED", "REFUNDED"]),
});

type UpdatePaymentFormValues = z.infer<typeof updatePaymentSchema>;

interface UpdatePaymentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item: IPayment;
  onSuccess?: () => void;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const STATUS_DOT: Record<string, string> = {
  UNPAID: "bg-amber-500",
  PAID: "bg-emerald-500",
  COMPLETED: "bg-emerald-500",
  FAILED: "bg-red-500",
  CANCELLED: "bg-slate-400",
  REFUNDED: "bg-blue-500",
};

const formatAmount = (amount: number) =>
  new Intl.NumberFormat("en-BD", { style: "currency", currency: "BDT" }).format(amount ?? 0);

// ─── Component ────────────────────────────────────────────────────────────────

export function UpdatePaymentModal({
  open,
  onOpenChange,
  item,
  onSuccess,
}: UpdatePaymentModalProps) {
  const [updatePayment, { isLoading }] = useUpdatePaymentMutation();

  const {
    setValue,
    watch,
    handleSubmit,
    reset,
  } = useForm<UpdatePaymentFormValues>({
    resolver: zodResolver(updatePaymentSchema) as any,
    defaultValues: {
      status: item.status,
    },
  });

  useEffect(() => {
    if (!open) return;
    reset({ status: item.status });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, item]);

  const selectedStatus = watch("status");

  const handleClose = () => {
    onOpenChange(false);
  };

  const onSubmit = async (data: UpdatePaymentFormValues) => {
    try {
      await updatePayment({ id: item._id, data: { status: data.status as PaymentStatus } }).unwrap();
      toast.success("Payment status updated successfully!");
      handleClose();
      onSuccess?.();
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update payment status");
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(val) => { if (!val) handleClose(); }}
    >
      <DialogContent className="sm:max-w-2xl max-h-[90vh] scrollbar-none overflow-y-auto p-6">
        <DialogHeader className="flex flex-col items-center gap-2 pb-2">
          <div className="w-12 h-12 rounded-xl from-violet-500 to-purple-600 flex items-center justify-center shadow-md mb-1">
            <CreditCard className="w-6 h-6 text-white" />
          </div>
          <DialogTitle className="text-xl font-bold tracking-widest uppercase">
            Update Payment
          </DialogTitle>
          <DialogDescription className="text-[#96999A] text-sm tracking-wide">
            Manually update this payment&apos;s status
          </DialogDescription>
        </DialogHeader>

        <Separator />

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 pt-1">

          {/* ── Read-only info ── */}
          <div>
            <p className="text-xs font-bold tracking-widest uppercase text-slate-400 mb-3">
              Transaction Info
            </p>
            <div className="space-y-2">
              <div className="flex justify-between py-1.5 border-b border-border">
                <span className="text-sm text-muted-foreground">Transaction ID</span>
                <span className="text-sm font-medium text-foreground">{item.transactionId}</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-sm text-muted-foreground">Amount</span>
                <span className="text-sm font-medium text-foreground">{formatAmount(item.amount)}</span>
              </div>
            </div>
          </div>

          <Separator />

          {/* ── Status ── */}
          <div className="space-y-1.5">
            <Label className="text-xs font-semibold tracking-widest uppercase">
              Status <span className="text-red-500">*</span>
            </Label>
            <Select
              value={selectedStatus}
              onValueChange={(v) =>
                setValue("status", v as UpdatePaymentFormValues["status"], { shouldValidate: true })
              }
            >
              <SelectTrigger className="w-full">
                <span className="flex items-center gap-2 text-sm">
                  <span
                    className={`h-2 w-2 rounded-full inline-block ${STATUS_DOT[selectedStatus] ?? STATUS_DOT.UNPAID}`}
                  />
                  {selectedStatus}
                </span>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="UNPAID">
                  <span className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-amber-500 inline-block" />
                    Unpaid
                  </span>
                </SelectItem>
                <SelectItem value="PAID">
                  <span className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 inline-block" />
                    Paid
                  </span>
                </SelectItem>
                <SelectItem value="COMPLETED">
                  <span className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 inline-block" />
                    Completed
                  </span>
                </SelectItem>
                <SelectItem value="FAILED">
                  <span className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-red-500 inline-block" />
                    Failed
                  </span>
                </SelectItem>
                <SelectItem value="CANCELLED">
                  <span className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-slate-400 inline-block" />
                    Cancelled
                  </span>
                </SelectItem>
                <SelectItem value="REFUNDED">
                  <span className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-blue-500 inline-block" />
                    Refunded
                  </span>
                </SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-slate-400">
              Changing to Completed / Failed / Cancelled / Refunded will also update the linked subscription&apos;s status.
            </p>
          </div>

          {/* ── Submit ── */}
          <Button
            type="submit"
            disabled={isLoading || selectedStatus === item.status}
           className="group hover:cursor-pointer border-indigo-600 text-white bg-indigo-700 hover:bg-indigo-800 hover:shadow-xl hover:text-white duration-500 dark:text-white mt-2 cursor-pointer font-bold tracking-widest uppercase transition-colors disabled:opacity-60 hover:scale-105 ease-in-out w-full"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                Updating...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                Update Payment
              </span>
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}