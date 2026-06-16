/* eslint-disable react-hooks/incompatible-library */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, type RegisterFormData } from "@/schemas/auth";
import { PhoneInput } from "./PhoneInput";
import { PasswordInput } from "./PasswordInput";
import { PasswordStrengthIndicator } from "./PasswordStrengthIndicator";
import { Button } from "@/components/ui/button";
import { Loader2, Upload, User } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import Image from "next/image";

interface RegisterFormProps {
  onSubmit?: (data: RegisterFormData) => Promise<void>;
  isLoading?: boolean;
}

export function RegisterForm({
  onSubmit,
  isLoading = false,
}: RegisterFormProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [password, setPassword] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: "onBlur",
  });

  const watchedPassword = watch("password");

  const isLoading2 = isSubmitting || isLoading;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        toast.error("Please select an image file");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size must be less than 5MB");
        return;
      }
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleFormSubmit = async (data: RegisterFormData) => {
    try {
      if (onSubmit) {
        await onSubmit(data);
      } else {
        toast.error("Register handler not configured");
      }
    } catch (error) {
      console.error("[v0] Register error:", error);
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      {/* Full Name */}
      <div className="space-y-1.5">
        <label className="block text-sm font-medium text-foreground">
          Full Name
        </label>
        <input
          type="text"
          placeholder="John Doe"
          disabled={isLoading2}
          className={`w-full px-4 py-2.5 bg-background border rounded-lg transition-all duration-200 ${
            errors.fullName
              ? "border-red-500 ring-1 ring-red-500/20"
              : "border-border hover:border-border/80 focus:border-primary focus:ring-2 focus:ring-primary/20"
          }`}
          {...register("fullName")}
        />
        {errors.fullName && (
          <p className="text-xs text-red-500">{errors.fullName.message}</p>
        )}
      </div>

      {/* Phone Number */}
      <PhoneInput
        label="Phone Number"
        placeholder="0 1234 567890"
        disabled={isLoading2}
        error={errors.phoneNumber?.message}
        {...register("phoneNumber")}
      />

      {/* Password */}
      <PasswordInput
        label="Password"
        placeholder="Create a strong password"
        disabled={isLoading2}
        error={errors.password?.message}
        onPasswordChange={setPassword}
        {...register("password")}
      />
      {watchedPassword && (
        <PasswordStrengthIndicator password={watchedPassword} />
      )}

      {/* Confirm Password */}
      <PasswordInput
        label="Confirm Password"
        placeholder="Confirm your password"
        disabled={isLoading2}
        error={errors.confirmPassword?.message}
        {...register("confirmPassword")}
      />

      {/* Profile Picture (Optional) */}
      <div className="space-y-1.5">
        <label className="block text-sm font-medium text-foreground">
          Profile Picture{" "}
          <span className="text-muted-foreground text-xs font-normal">
            (Optional)
          </span>
        </label>
        <div className="flex gap-3 items-center">
          {previewUrl ? (
            <Image
              width={700}
              height={700}
              priority
              quality={90}
              src={previewUrl}
              alt="Preview"
              className="w-12 h-12 rounded-lg object-cover border border-border"
            />
          ) : (
            <div className="w-12 h-12 rounded-lg border border-border bg-muted flex items-center justify-center">
              <User size={24} className="text-muted-foreground" />
            </div>
          )}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={isLoading2}
            className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-muted/50 transition-colors disabled:opacity-50"
          >
            <Upload size={16} />
            <span className="text-sm">Choose Image</span>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            hidden
            onChange={handleFileChange}
            disabled={isLoading2}
          />
        </div>
      </div>

      {/* Terms & Conditions */}
      <label className="flex items-start gap-2 cursor-pointer">
        <input
          type="checkbox"
          disabled={isLoading2}
          className="w-4 h-4 border border-border rounded cursor-pointer mt-1"
          {...register("agreedToTerms")}
        />
        <span className="text-sm text-muted-foreground">
          I agree to the{" "}
          <a href="#" className="text-primary hover:text-primary/80">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="text-primary hover:text-primary/80">
            Privacy Policy
          </a>
        </span>
      </label>
      {errors.agreedToTerms && (
        <p className="text-xs text-red-500">{errors.agreedToTerms.message}</p>
      )}

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={isLoading2}
        size="lg"
        className="w-full h-11"
      >
        {isLoading2 ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Creating account...
          </>
        ) : (
          "Create Account"
        )}
      </Button>

      {/* Login Link */}
      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link
          href="/login"
          className="text-primary hover:text-primary/80 font-medium transition-colors"
        >
          Sign in
        </Link>
      </p>
    </form>
  );
}
