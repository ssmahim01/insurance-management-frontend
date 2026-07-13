"use client";

import { Loader2, Lock, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

type FormValues = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export default function ChangePasswordModal({
  open,
  onOpenChange,
}: Props) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
  } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    if (data.newPassword !== data.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      /**
       * Replace this with your RTK mutation
       *
       * await changePassword({
       *   oldPassword: data.currentPassword,
       *   newPassword: data.newPassword,
       * }).unwrap();
       */

      toast.success("Password changed successfully");

      reset();
      onOpenChange(false);
    } catch (err) {
      toast.error("Failed to change password");
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center">
          <DialogTitle className={"text-xl"}>Change Password</DialogTitle>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >
          <div className="space-y-2">
            <Label>Current Password</Label>
            <Input
              type="password"
              placeholder="Enter current password"
              {...register("currentPassword", {
                required: true,
              })}
            />
          </div>

          <div className="space-y-2">
            <Label>New Password</Label>
            <Input
              type="password"
              placeholder="Enter new password"
              {...register("newPassword", {
                required: true,
                minLength: 6,
              })}
            />
          </div>

          <div className="space-y-2">
            <Label>Confirm Password</Label>
            <Input
              type="password"
              placeholder="Confirm new password"
              {...register("confirmPassword", {
                required: true,
                validate: (value) =>
                  // eslint-disable-next-line react-hooks/incompatible-library
                  value === watch("newPassword") ||
                  "Passwords do not match",
              })}
            />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                reset();
                onOpenChange(false);
              }}
            >
              <X className="mr-2 h-4 w-4" />
              Cancel
            </Button>

            <Button
              type="submit"
              className="btn-bg text-white"
            >
              <Lock className="mr-2 h-4 w-4" />
              Change Password
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}