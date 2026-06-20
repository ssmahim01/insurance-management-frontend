/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/incompatible-library */
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormData } from "@/schemas/auth";
import { PhoneInput } from "./PhoneInput";
import { PasswordInput } from "./PasswordInput";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  ArrowRight,
  Loader2,
  ShieldCheck,
  Lock,
  Headphones,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

interface LoginFormProps {
  onSubmit?: (data: LoginFormData) => Promise<void>;
  isLoading?: boolean;
}

export function LoginForm({ onSubmit, isLoading = false }: LoginFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema as any),
    mode: "onBlur",
    defaultValues: {
      rememberMe: false,
    },
  });

  const rememberMe = watch("rememberMe");

  const loading = isSubmitting || isLoading;

  const handleFormSubmit = async (data: LoginFormData) => {
    try {
      if (onSubmit) {
        await onSubmit(data);
      } else {
        toast.error("Login handler not configured");
      }
    } catch (error) {
      console.error(error);

      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <div className="w-full">
      {/* Brand Header */}
      <div className="mb-8 text-center">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#007A5A]/10">
          <ShieldCheck className="h-8 w-8 text-[#007A5A]" />
        </div>

        <h1 className="text-3xl font-bold tracking-tight">Welcome Back</h1>

        <p className="mt-2 text-sm text-muted-foreground">
          Sign in to your Shurokkha account
        </p>
      </div>

      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-5">
        <PhoneInput
          label="Phone Number"
          placeholder="017XXXXXXXX"
          disabled={loading}
          error={errors.phoneNumber?.message}
          {...register("phoneNumber")}
        />

        <PasswordInput
          label="Password"
          placeholder="Enter your password"
          disabled={loading}
          error={errors.password?.message}
          {...register("password")}
        />

        {/* Remember Me */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Checkbox
              checked={rememberMe}
              onCheckedChange={(checked) => setValue("rememberMe", !!checked)}
            />

            <span className="text-sm text-muted-foreground">Remember me</span>
          </div>

          <Link
            href="/forgot-password"
            className="text-sm font-medium text-[#007A5A] hover:text-[#006349]"
          >
            Forgot password?
          </Link>
        </div>

        {/* Login Button */}
        <Button
          type="submit"
          disabled={loading}
          className="
            h-12
            w-full
            rounded-xl
            bg-[#007A5A]
            text-white
            shadow-lg
            shadow-[#007A5A]/20
  
            hover:bg-[#006349]
            hover:shadow-xl hover:cursor-pointer hover:scale-105 transition-transform duration-500 ease-in-out
          "
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Signing In...
            </>
          ) : (
            <>
              Sign In
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </>
          )}
        </Button>

        {/* Security Notice */}
        <div className="rounded-xl border bg-muted/30 p-4">
          <div className="flex items-center gap-2">
            <Lock className="h-4 w-4 text-[#007A5A]" />

            <span className="text-xs text-muted-foreground">
              Your account is protected with secure authentication and encrypted
              communication.
            </span>
          </div>
        </div>

        {/* Register */}
        {/* <div className="text-center">
          <span className="text-sm text-muted-foreground">
            Don&apos;t have an account?
          </span>

          <Link
            href="/register"
            className="ml-1 font-semibold text-[#007A5A] hover:text-[#006349]"
          >
            Create Account
          </Link>
        </div> */}

        {/* Trust Section */}
        <div className="grid grid-cols-3 gap-4 border-t pt-6">
          <div className="text-center">
            <ShieldCheck className="mx-auto mb-2 h-5 w-5 text-[#007A5A]" />
            <p className="text-sm font-semibold">Secure</p>
            <p className="text-xs text-muted-foreground">Authentication</p>
          </div>

          <div className="text-center">
            <Headphones className="mx-auto mb-2 h-5 w-5 text-[#007A5A]" />
            <p className="text-sm font-semibold">24/7</p>
            <p className="text-xs text-muted-foreground">Support</p>
          </div>

          <div className="text-center">
            <Lock className="mx-auto mb-2 h-5 w-5 text-[#007A5A]" />
            <p className="text-sm font-semibold">Trusted</p>
            <p className="text-xs text-muted-foreground">Platform</p>
          </div>
        </div>
      </form>
    </div>
  );
}
