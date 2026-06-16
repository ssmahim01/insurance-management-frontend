"use client";

import { useState } from "react";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { AuthCard } from "@/components/auth/AuthCard";
import { ForgotPasswordForm } from "@/components/auth/ForgotPasswordForm";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import type { ResetPasswordFormData } from "@/schemas/auth";
import { Lock, Mail, Phone } from "lucide-react";

const steps = [
  {
    icon: Phone,
    title: "Enter Phone",
    description: "Provide your registered phone number",
  },
  {
    icon: Mail,
    title: "Verify OTP",
    description: "Enter the 6-digit code we sent you",
  },
  {
    icon: Lock,
    title: "Reset Password",
    description: "Create a new secure password",
  },
];

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleResetPassword = async (
    data: ResetPasswordFormData,
    phone: string,
  ) => {
    setIsLoading(true);
    try {
      // const response = await resetPassword({
      //   phone,
      //   newPassword: data.newPassword,
      // });
      // if (response.success) {
      //   toast.success('Password reset successful!');
      //   router.push('/login');
      // }

      // Mock success for now
      console.log(" Reset password for:", phone);
      console.log(" New password:", data.newPassword);
      toast.success("Password reset successful! Redirecting to login...");
      setTimeout(() => {
        router.push("/login");
      }, 500);
    } catch (error) {
      console.error(" Reset password error:", error);
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      showLeftPanel={true}
      leftPanelContent={
        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-semibold text-primary-foreground mb-6">
              Reset your password in 3 steps
            </h3>
            <div className="space-y-4">
              {steps.map((s, index) => {
                const Icon = s.icon;
                return (
                  <div key={index} className="flex gap-4">
                    <div className="shrink-0">
                      <div className="w-8 h-8 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                        <Icon size={16} className="text-primary-foreground" />
                      </div>
                    </div>
                    <div>
                      <p className="font-semibold text-primary-foreground text-sm">
                        {s.title}
                      </p>
                      <p className="text-primary-foreground/70 text-xs">
                        {s.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      }
    >
      <AuthCard
        title="Reset password"
        subtitle="Follow the steps below to reset your password"
      >
        <ForgotPasswordForm
          onSubmit={handleResetPassword}
          isLoading={isLoading}
        />
      </AuthCard>
    </AuthLayout>
  );
}
