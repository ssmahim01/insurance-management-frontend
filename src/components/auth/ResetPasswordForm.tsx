/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/incompatible-library */
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { resetPasswordSchema, type ResetPasswordFormData } from '@/schemas/auth';
import { PasswordInput } from './PasswordInput';
import { PasswordStrengthIndicator } from './PasswordStrengthIndicator';
import { Button } from '@/components/ui/button';
import { Loader2, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

interface ResetPasswordFormProps {
  onSubmit?: (data: ResetPasswordFormData) => Promise<void>;
  isLoading?: boolean;
  showSuccess?: boolean;
}

export function ResetPasswordForm({
  onSubmit,
  isLoading = false,
  showSuccess = false,
}: ResetPasswordFormProps) {
  const [password, setPassword] = useState('');
  const [succeeded, setSucceeded] = useState(showSuccess);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    mode: 'onBlur',
  });

  const isLoading2 = isSubmitting || isLoading;

  const handleFormSubmit = async (data: ResetPasswordFormData) => {
    try {
      if (onSubmit) {
        await onSubmit(data);
        setSucceeded(true);
      } else {
        console.log('Reset password:', data);
        toast.success('Password reset successfully!');
        setSucceeded(true);
      }
    } catch (error) {
      console.error('Reset password error:', error);
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  if (succeeded) {
    return (
      <div className="space-y-6 text-center py-8">
        <div className="flex justify-center">
          <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center">
            <CheckCircle2 className="w-8 h-8 text-green-500" />
          </div>
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-foreground">
            Password reset successful!
          </h3>
          <p className="text-muted-foreground text-sm">
            Your password has been reset successfully. You can now login with your new password.
          </p>
        </div>
        <Link href="/login">
          <Button size="lg" className="w-full">
            Back to login
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <PasswordInput
        label="New Password"
        placeholder="Create a new password"
        disabled={isLoading2}
        error={errors.newPassword?.message}
        onPasswordChange={setPassword}
        {...register('newPassword')}
      />
      {watch('newPassword') && (
        <PasswordStrengthIndicator password={watch('newPassword')} />
      )}

      <PasswordInput
        label="Confirm Password"
        placeholder="Confirm your password"
        disabled={isLoading2}
        error={errors.confirmPassword?.message}
        {...register('confirmPassword')}
      />

      <Button
        type="submit"
        disabled={isLoading2}
        size="lg"
        className="w-full h-11"
      >
        {isLoading2 ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Resetting password...
          </>
        ) : (
          'Reset Password'
        )}
      </Button>

      <p className="text-center text-xs text-muted-foreground">
        Remember your password?{' '}
        <Link href="/login" className="text-primary hover:text-primary/80">
          Sign in
        </Link>
      </p>
    </form>
  );
}
