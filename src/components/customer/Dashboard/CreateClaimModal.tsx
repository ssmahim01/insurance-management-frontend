/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { FilePlus2, Loader2 } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { useCreateClaimMutation } from "@/redux/features/claim/claim.api";
import { ISubscription } from "@/types/subscription.types";
import { useGetMeQuery } from "@/redux/features/user/user.api";

const schema = z.object({
  subscription: z.string().min(1, "Please select a subscription"),
  serviceTitle: z.string().min(2, "Title is required"),
  description: z
    .string()
    .min(10, "Please describe your claim (min 10 characters)"),
});
type FormValues = z.infer<typeof schema>;

interface CreateClaimModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  subscriptions: ISubscription[];
  defaultSubscriptionId?: string;
}

export function CreateClaimModal({
  open,
  onOpenChange,
  subscriptions,
  defaultSubscriptionId,
}: CreateClaimModalProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [createClaim, { isLoading }] = useCreateClaimMutation();
  const { data: user } = useGetMeQuery();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      subscription: defaultSubscriptionId ?? "",
      serviceTitle: "",
      description: "",
    },
  });

  const selectedSubscriptionId = watch("subscription");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const list = e.target.files;
    if (!list) return;
    setFiles(Array.from(list));
  };

  const handleClose = () => {
    reset({ subscription: "", serviceTitle: "", description: "" });
    setFiles([]);
    onOpenChange(false);
  };

  const onSubmit = async (values: FormValues) => {
    try {
      const formData = new FormData();
      formData.append("subscription", values.subscription);
      formData.append("serviceTitle", values.serviceTitle);
      formData.append("description", values.description);
      formData.append("customer", user?.data?._id ?? "");
      files.forEach((f) => formData.append("attachments", f));

      await createClaim(formData).unwrap();
      toast.success("Claim submitted successfully");
      handleClose();
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to submit claim");
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        if (!v) handleClose();
        else onOpenChange(true);
      }}
    >
      <DialogContent className="sm:max-w-lg">
        <DialogHeader className="flex flex-col items-center gap-2 pb-2">
          <div className="w-12 h-12 rounded-xl bg-linear-to-br from-indigo-600 to-blue-600 flex items-center justify-center shadow-md mb-1">
            <FilePlus2 className="w-6 h-6 text-white" />
          </div>
          <DialogTitle className="text-lg font-bold">Create Claim</DialogTitle>
          <DialogDescription className="text-sm text-center">
            Submit a new claim against one of your subscriptions.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-1">
          <div className="space-y-1.5">
            <Label className="text-xs font-semibold uppercase tracking-wide">
              Subscription *
            </Label>
            <Select
              value={selectedSubscriptionId}
              onValueChange={(v: any) =>
                setValue("subscription", v, { shouldValidate: true })
              }
            >
              <SelectTrigger className="w-full">
                <span>
                  {selectedSubscriptionId
                    ? getPackageLabel(subscriptions, selectedSubscriptionId)
                    : "Select a subscription"}
                </span>
              </SelectTrigger>
              <SelectContent>
                {subscriptions.map((s) => (
                  <SelectItem key={String(s._id)} value={String(s._id)}>
                    {getPackageLabel(subscriptions, String(s._id))}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.subscription && (
              <p className="text-xs text-red-500">
                {errors.subscription.message}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs font-semibold uppercase tracking-wide">
              Service Title *
            </Label>
            <Input
              placeholder="e.g. Out-patient Coverage"
              {...register("serviceTitle")}
            />
            {errors.serviceTitle && (
              <p className="text-xs text-red-500">
                {errors.serviceTitle.message}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs font-semibold uppercase tracking-wide">
              Description *
            </Label>
            <Textarea
              rows={4}
              placeholder="Describe your claim..."
              {...register("description")}
            />
            {errors.description && (
              <p className="text-xs text-red-500">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs font-semibold uppercase tracking-wide">
              Attachments
            </Label>
            <label
              htmlFor="claim-attachments"
              className="flex flex-col items-center justify-center gap-2 rounded-md border border-dashed border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 px-4 py-6 cursor-pointer transition-colors"
            >
              <FilePlus2 className="h-6 w-6 text-slate-400" />
              <p className="text-sm text-slate-500">
                {files.length > 0
                  ? `${files.length} file(s) selected`
                  : "Click to browse files"}
              </p>
              <p className="text-xs text-slate-400">JPG, PNG, PDF, DOC, DOCX</p>
              <input
                id="claim-attachments"
                type="file"
                multiple
                accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full gap-2 bg-linear-to-r from-indigo-600 to-blue-600 text-white hover:from-indigo-700 hover:to-blue-700 transition-all duration-200 ease-out hover:shadow-lg active:scale-[0.98]"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Submitting...
              </>
            ) : (
              "Submit Claim"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function getPackageLabel(subscriptions: ISubscription[], id: string): string {
  const sub = subscriptions.find((s) => String(s._id) === id);
  const pkg = sub?.package as unknown as { name?: string } | undefined;
  return pkg?.name ?? "Subscription";
}
