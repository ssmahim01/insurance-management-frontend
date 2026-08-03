/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useRef } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Plus, FileText, ImagePlus, X, Wallet } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import {
  Select, SelectContent, SelectItem, SelectTrigger,
} from "@/components/ui/select";

import { useCreateClaimMutation } from "@/redux/features/claim/claim.api";
import { useGetAllSubscriptionsQuery } from "@/redux/features/subscription/subscription.api";
import {
  GetSubscriptionsParams,
  ISubscription,
  ISubscriptionListResponse,
  SubscriptionStatus,
} from "@/types/subscription.types";
import { ClaimTitle, PaymentMethod } from "@/types/claim.types";
import { CLAIM_TITLE_LABELS, PAYMENT_METHOD_LABELS } from "@/lib/utils/claim-labels";
import { useGetMeQuery } from "@/redux/features/user/user.api";

// ─── Schema ───────────────────────────────────────────────────────────────────

const paymentInfoSchema = z.object({
  mobileNumber: z.string().optional(),
  bankName: z.string().optional(),
  accountName: z.string().optional(),
  accountNumber: z.string().optional(),
  routingNumber: z.string().optional(),
  branchName: z.string().optional(),
});

const createClaimSchema = z
  .object({
    subscription: z.string().min(1, "Subscription is required"),
    claimTitle: z.nativeEnum(ClaimTitle, { error: "Claim title is required" }),
    description: z.string().min(10, "Description must be at least 10 characters"),
    paymentMethod: z.nativeEnum(PaymentMethod, { error: "Payment method is required" }),
    paymentInfo: paymentInfoSchema,
    customer: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.paymentMethod === PaymentMethod.BKASH || data.paymentMethod === PaymentMethod.NAGAD) {
      if (!data.paymentInfo.mobileNumber?.trim()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["paymentInfo", "mobileNumber"],
          message: "Mobile number is required.",
        });
      }
    }

    if (data.paymentMethod === PaymentMethod.BANK) {
      const b = data.paymentInfo;
      const requiredBankFields: Array<[keyof typeof b, string]> = [
        ["bankName", "Bank name is required."],
        ["accountName", "Account holder name is required."],
        ["accountNumber", "Account number is required."],
        ["routingNumber", "Routing number is required."],
        ["branchName", "Branch name is required."],
      ];
      for (const [field, message] of requiredBankFields) {
        if (!b[field]?.trim()) {
          ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["paymentInfo", field], message });
        }
      }
    }
  });

type CreateClaimFormValues = z.infer<typeof createClaimSchema>;

interface CreateClaimModalProps {
  onSuccess?: () => void;
  useSubscriptionsQuery?: UseSubscriptionsForClaimQuery;
}

export interface SubscriptionsQueryResult {
  data?: { data?: { data?: ISubscription[] } } | { data?: ISubscription[] };
  isLoading: boolean;
}

export type UseSubscriptionsForClaimQuery = (
  params: GetSubscriptionsParams | undefined,
  options: { skip: boolean },
) => { data?: ISubscriptionListResponse; isLoading: boolean };

const MAX_ATTACHMENTS = 10;

const getPackageName = (sub?: ISubscription): string => {
  if (!sub) return "Select subscription";
  return typeof sub.package === "object" && sub.package !== null
    ? sub.package.name
    : String(sub._id);
};

// ─── Component ────────────────────────────────────────────────────────────────

export function CreateClaimModal({
  onSuccess,
  useSubscriptionsQuery = useGetAllSubscriptionsQuery,
}: CreateClaimModalProps) {
  const [open, setOpen] = useState(false);
  const [createClaim, { isLoading }] = useCreateClaimMutation();
  const { data: me } = useGetMeQuery(undefined);

  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { data: subsData, isLoading: isSubsLoading } = useSubscriptionsQuery(
    { status: SubscriptionStatus.ACTIVE, limit: 100 },
    { skip: !open },
  );
  const subscriptions = ((subsData?.data?.data ?? []) as ISubscription[]).filter(
    (s): s is ISubscription & { _id: string } => typeof s._id === "string",
  );

  const {
    register, handleSubmit, setValue, watch,
    formState: { errors }, reset,
  } = useForm<CreateClaimFormValues>({
    resolver: zodResolver(createClaimSchema),
    defaultValues: {
      subscription: "",
      claimTitle: undefined as any,
      description: "",
      paymentMethod: undefined as any,
      paymentInfo: {},
      customer: "",
    },
  });

  const watchedSubscription = watch("subscription");
  const watchedClaimTitle = watch("claimTitle");
  const watchedPaymentMethod = watch("paymentMethod");

  const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files ?? []);
    if (!selected.length) return;
    const combined = [...files, ...selected].slice(0, MAX_ATTACHMENTS);
    setFiles(combined);
    setPreviews(combined.map((f) => URL.createObjectURL(f)));
  };

  const handleRemoveFile = (idx: number) => {
    const nextFiles = files.filter((_, i) => i !== idx);
    setFiles(nextFiles);
    setPreviews(nextFiles.map((f) => URL.createObjectURL(f)));
  };

  const handleClose = () => {
    reset();
    setFiles([]);
    setPreviews([]);
    if (fileInputRef.current) fileInputRef.current.value = "";
    setOpen(false);
  };

  const onSubmit = async (data: CreateClaimFormValues) => {
    try {
      const formData = new FormData();
      files.forEach((file) => formData.append("attachments", file));

      formData.append("subscription", data.subscription);
      formData.append("claimTitle", data.claimTitle);
      formData.append("description", data.description);
      formData.append("paymentMethod", data.paymentMethod);
      formData.append("paymentInfo", JSON.stringify(data.paymentInfo ?? {}));
      formData.append("customer", me?.data?._id ?? "");

      await createClaim(formData).unwrap();
      toast.success("Claim submitted successfully!");
      handleClose();
      onSuccess?.();
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to submit claim");
    }
  };

  return (
    <>
      <Button
        variant="outline"
        onClick={() => setOpen(true)}
        className="group hover:cursor-pointer bg-indigo-600 hover:bg-indigo-700 hover:text-white text-white duration-300 w-full mt-2 font-bold tracking-widest uppercase transition-colors disabled:opacity-60"
      >
        <Plus className="h-4 w-4" />
        Submit Claim
      </Button>

      <Dialog open={open} onOpenChange={(v) => { if (!v) handleClose(); else setOpen(true); }}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] scrollbar-none overflow-y-auto p-6">
          <DialogHeader className="flex flex-col items-center gap-2 pb-2">
            <div className="w-12 h-12 rounded-xl bg-indigo-600 flex items-center justify-center shadow-md mb-1">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <DialogTitle className="text-xl font-bold tracking-widest uppercase">Submit a Claim</DialogTitle>
            <DialogDescription className="text-muted-foreground text-sm tracking-wide">
              Fill in the claim details below
            </DialogDescription>
          </DialogHeader>

          <Separator />

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 pt-1">

            {/* ── Subscription ── */}
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold tracking-widest uppercase">
                Subscription <span className="text-red-500">*</span>
              </Label>
              <Select
                value={watchedSubscription}
                onValueChange={(v: any) => setValue("subscription", v, { shouldValidate: true })}
              >
                <SelectTrigger className="h-9 text-sm w-full">
                  {isSubsLoading ? (
                    <span className="text-slate-400">Loading...</span>
                  ) : (
                    <span className="truncate">
                      {getPackageName(subscriptions.find((s) => s._id === watchedSubscription))}
                    </span>
                  )}
                </SelectTrigger>
                <SelectContent>
                  {subscriptions.length === 0 && !isSubsLoading && (
                    <div className="px-3 py-4 text-center text-xs text-slate-400">No active subscriptions found</div>
                  )}
                  {subscriptions.map((sub) => (
                    <SelectItem key={sub._id} value={sub._id}>{getPackageName(sub)}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.subscription && <p className="text-xs text-red-400">{errors.subscription.message}</p>}
            </div>

            {/* ── Claim Title ── */}
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold tracking-widest uppercase">
                Claim Title <span className="text-red-500">*</span>
              </Label>
              <Select
                value={watchedClaimTitle}
                onValueChange={(v) => setValue("claimTitle", v as ClaimTitle, { shouldValidate: true })}
              >
                <SelectTrigger className="h-9 text-sm w-full">
                  <span className={watchedClaimTitle ? "" : "text-slate-400"}>
                    {watchedClaimTitle ? CLAIM_TITLE_LABELS[watchedClaimTitle] : "Select claim type"}
                  </span>
                </SelectTrigger>
                <SelectContent>
                  {Object.values(ClaimTitle).map((t) => (
                    <SelectItem key={t} value={t}>{CLAIM_TITLE_LABELS[t]}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.claimTitle && <p className="text-xs text-red-400">{errors.claimTitle.message as string}</p>}
            </div>

            {/* ── Description ── */}
            <div className="space-y-1.5">
              <Label htmlFor="c-desc" className="text-xs font-semibold tracking-widest uppercase">
                Description <span className="text-red-500">*</span>
              </Label>
              <Textarea id="c-desc" rows={4} placeholder="Describe your claim in detail..." {...register("description")} />
              {errors.description && <p className="text-xs text-red-400">{errors.description.message}</p>}
            </div>

            <Separator />

            {/* ── Payment Method ── */}
            <div className="space-y-4">
              <div className="flex items-center gap-1.5">
                <Wallet className="h-3.5 w-3.5 text-slate-400" />
                <p className="text-xs font-bold tracking-widest uppercase text-slate-400">Receive Payment</p>
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-semibold tracking-widest uppercase">
                  Payment Method <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={watchedPaymentMethod}
                  onValueChange={(v) => setValue("paymentMethod", v as PaymentMethod, { shouldValidate: true })}
                >
                  <SelectTrigger className="h-9 text-sm w-full">
                    <span className={watchedPaymentMethod ? "" : "text-slate-400"}>
                      {watchedPaymentMethod ? PAYMENT_METHOD_LABELS[watchedPaymentMethod] : "Select a method"}
                    </span>
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(PaymentMethod).map((m) => (
                      <SelectItem key={m} value={m}>{PAYMENT_METHOD_LABELS[m]}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.paymentMethod && (
                  <p className="text-xs text-red-400">{errors.paymentMethod.message as string}</p>
                )}
              </div>

              {/* ── bKash / Nagad ── */}
              {(watchedPaymentMethod === PaymentMethod.BKASH || watchedPaymentMethod === PaymentMethod.NAGAD) && (
                <div className="space-y-1.5 animate-in fade-in slide-in-from-top-2 duration-300">
                  <Label className="text-xs font-semibold tracking-widest uppercase">
                    Mobile Number <span className="text-red-500">*</span>
                  </Label>
                  <Input placeholder="01XXXXXXXXX" {...register("paymentInfo.mobileNumber")} />
                  {errors.paymentInfo?.mobileNumber && (
                    <p className="text-xs text-red-400">{errors.paymentInfo.mobileNumber.message}</p>
                  )}
                </div>
              )}

              {/* ── Bank Account ── */}
              {watchedPaymentMethod === PaymentMethod.BANK && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-2 duration-300">
                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold tracking-widest uppercase">
                      Bank Name <span className="text-red-500">*</span>
                    </Label>
                    <Input {...register("paymentInfo.bankName")} />
                    {errors.paymentInfo?.bankName && (
                      <p className="text-xs text-red-400">{errors.paymentInfo.bankName.message}</p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold tracking-widest uppercase">
                      Account Holder Name <span className="text-red-500">*</span>
                    </Label>
                    <Input {...register("paymentInfo.accountName")} />
                    {errors.paymentInfo?.accountName && (
                      <p className="text-xs text-red-400">{errors.paymentInfo.accountName.message}</p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold tracking-widest uppercase">
                      Account Number <span className="text-red-500">*</span>
                    </Label>
                    <Input {...register("paymentInfo.accountNumber")} />
                    {errors.paymentInfo?.accountNumber && (
                      <p className="text-xs text-red-400">{errors.paymentInfo.accountNumber.message}</p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold tracking-widest uppercase">
                      Routing Number <span className="text-red-500">*</span>
                    </Label>
                    <Input {...register("paymentInfo.routingNumber")} />
                    {errors.paymentInfo?.routingNumber && (
                      <p className="text-xs text-red-400">{errors.paymentInfo.routingNumber.message}</p>
                    )}
                  </div>

                  <div className="space-y-1.5 sm:col-span-2">
                    <Label className="text-xs font-semibold tracking-widest uppercase">
                      Branch Name <span className="text-red-500">*</span>
                    </Label>
                    <Input {...register("paymentInfo.branchName")} />
                    {errors.paymentInfo?.branchName && (
                      <p className="text-xs text-red-400">{errors.paymentInfo.branchName.message}</p>
                    )}
                  </div>
                </div>
              )}
            </div>

            <Separator />

            {/* ── Attachments (unchanged) ── */}
            <div>
              <Label className="text-xs font-semibold tracking-widest uppercase">
                Attachments <span className="text-muted-foreground normal-case font-normal">(optional, up to {MAX_ATTACHMENTS})</span>
              </Label>

              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mt-2">
                {previews.map((src, idx) => (
                  <div key={idx} className="relative aspect-square rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/30">
                    <img src={src} alt={`Attachment ${idx + 1}`} className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => handleRemoveFile(idx)}
                      className="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center text-white transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}

                {files.length < MAX_ATTACHMENTS && (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="aspect-square rounded-lg border-2 border-dashed border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/20 hover:bg-slate-100/60 dark:hover:bg-slate-800/40 transition-colors flex flex-col items-center justify-center gap-1 text-slate-400"
                  >
                    <ImagePlus className="w-5 h-5" />
                    <span className="text-[10px] font-medium">Add file</span>
                  </button>
                )}
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,application/pdf"
                multiple
                className="hidden"
                onChange={handleFilesChange}
              />
            </div>

            <Button
              type="submit"
              variant="outline"
              disabled={isLoading}
              className="group hover:cursor-pointer bg-indigo-600 hover:bg-indigo-700 hover:text-white text-white duration-300 font-bold tracking-widest uppercase transition-colors w-full mt-2 disabled:opacity-60"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Submitting...
                </span>
              ) : (
                <span className="flex items-center gap-2"><FileText className="h-4 w-4" />Submit Claim</span>
              )}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}