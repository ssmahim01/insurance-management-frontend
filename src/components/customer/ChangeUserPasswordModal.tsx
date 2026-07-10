/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { KeyRound, Eye, EyeOff, ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useAdminChangePasswordMutation } from "@/redux/features/auth/auth.api";

const changePasswordSchema = z
  .object({
    newPassword: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Please confirm the new password"),
  })
  .refine((d) => d.newPassword === d.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type ChangePasswordFormValues = z.infer<typeof changePasswordSchema>;

interface ChangeUserPasswordModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userId: string;
  userName?: string;
  onSuccess?: () => void;
}

export function ChangeUserPasswordModal({
  open,
  onOpenChange,
  userId,
  userName,
  onSuccess,
}: ChangeUserPasswordModalProps) {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [adminChangePassword, { isLoading }] = useAdminChangePasswordMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: { newPassword: "", confirmPassword: "" },
  });

  useEffect(() => {
    if (open) {
      reset({ newPassword: "", confirmPassword: "" });
      setTimeout(() => {
        setShowNewPassword(false);
        setShowConfirmPassword(false);
      }, 100);
    }
  }, [open, reset]);

  const handleClose = () => {
    reset({ newPassword: "", confirmPassword: "" });
    setShowNewPassword(false);
    setShowConfirmPassword(false);
    onOpenChange(false);
  };

  const onSubmit = async (data: ChangePasswordFormValues) => {
    try {
      await adminChangePassword({
        userId,
        newPassword: data.newPassword,
      }).unwrap();
      toast.success("Password changed successfully!");
      handleClose();
      onSuccess?.();
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to change password");
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(val) => {
        if (!val) handleClose();
        else onOpenChange(true);
      }}
    >
      <DialogContent className="sm:max-w-md p-6">
        <DialogHeader className="flex flex-col items-center gap-2 pb-2">
          <div className="w-12 h-12 rounded-xl bg-linear-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-md mb-1">
            <KeyRound className="w-6 h-6 text-white" />
          </div>
          <DialogTitle className="text-xl font-bold tracking-widest uppercase">
            Change Password
          </DialogTitle>
          <DialogDescription className="text-[#96999A] text-sm tracking-wide text-center">
            {userName ? (
              <>
                Set a new password for{" "}
                <span className="font-medium text-slate-600 dark:text-slate-300">
                  {userName}
                </span>
              </>
            ) : (
              "Set a new password for this customer"
            )}
          </DialogDescription>
        </DialogHeader>

        <Separator />

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 pt-1">
          <div className="space-y-1.5">
            <Label
              htmlFor="cp-new-password"
              className="text-xs font-semibold tracking-widest uppercase"
            >
              New Password <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <Input
                id="cp-new-password"
                type={showNewPassword ? "text" : "password"}
                placeholder="At least 6 characters"
                className="pr-10"
                {...register("newPassword")}
              />
              <button
                type="button"
                onClick={() => setShowNewPassword((p) => !p)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                tabIndex={-1}
              >
                {showNewPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
            {errors.newPassword && (
              <p className="text-xs text-red-400">
                {errors.newPassword.message}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label
              htmlFor="cp-confirm-password"
              className="text-xs font-semibold tracking-widest uppercase"
            >
              Confirm Password <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <Input
                id="cp-confirm-password"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Re-enter new password"
                className="pr-10"
                {...register("confirmPassword")}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((p) => !p)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                tabIndex={-1}
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-xs text-red-400">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="group hover:cursor-pointer border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white duration-300 w-full mt-2 cursor-pointer font-bold tracking-widest uppercase transition-colors disabled:opacity-60"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                Updating...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4" />
                Change Password
              </span>
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
