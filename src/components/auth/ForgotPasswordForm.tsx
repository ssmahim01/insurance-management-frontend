/* eslint-disable react-hooks/incompatible-library */
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { forgotPasswordSchema, otpSchema, resetPasswordSchema, type ForgotPasswordFormData, type OTPFormData, type ResetPasswordFormData } from '@/schemas/auth';
import { PhoneInput } from './PhoneInput';
import { PasswordInput } from './PasswordInput';
import { PasswordStrengthIndicator } from './PasswordStrengthIndicator';
import { OTPInput } from './OTPInput';
import { TimerDisplay } from './TimerDisplay';
import { Button } from '@/components/ui/button';
import { Loader2, ArrowRight, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';
import { OTP_SETTINGS } from '@/constants/auth';

interface ForgotPasswordFormProps {
  onSubmit?: (data: ResetPasswordFormData, phone: string) => Promise<void>;
  isLoading?: boolean;
}

type Step = 'phone' | 'otp' | 'password';

export function ForgotPasswordForm({ onSubmit, isLoading = false }: ForgotPasswordFormProps) {
  const [step, setStep] = useState<Step>('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showTimer, setShowTimer] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(false);
  const [password, setPassword] = useState('');

  const phoneForm = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: 'onBlur',
  });

  const otpForm = useForm<OTPFormData>({
    resolver: zodResolver(otpSchema),
    mode: 'onChange',
  });

  const passwordForm = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    mode: 'onBlur',
  });

  const handlePhoneSubmit = async (data: ForgotPasswordFormData) => {
    try {
      setPhoneNumber(data.phoneNumber);
      // TODO: Call API to send OTP
      // await sendOTP(data.phoneNumber);
      console.log('Send OTP for:', data.phoneNumber);
      setShowTimer(true);
      setStep('otp');
      toast.success('OTP sent to your phone number');
    } catch (error) {
      console.error('Send OTP error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to send OTP');
    }
  };

  const handleOTPSubmit = async (data: OTPFormData) => {
    try {
      // TODO: Call API to verify OTP
      // await verifyOTP(phoneNumber, data.otp);
      console.log('Verify OTP:', data.otp);
      setStep('password');
      toast.success('OTP verified successfully');
    } catch (error) {
      console.error('Verify OTP error:', error);
      toast.error(error instanceof Error ? error.message : 'Invalid OTP');
    }
  };

  const handlePasswordSubmit = async (data: ResetPasswordFormData) => {
    try {
      if (onSubmit) {
        await onSubmit(data, phoneNumber);
      } else {
        console.log('Reset password:', data);
        toast.success('Password reset successful!');
      }
    } catch (error) {
      console.error('Reset password error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to reset password');
    }
  };

  const handleResendOTP = async () => {
    try {
      setResendDisabled(true);
      // TODO: Call API to resend OTP
      console.log('Resend OTP for:', phoneNumber);
      toast.success('OTP resent to your phone number');
      setShowTimer(true);
      setTimeout(() => setResendDisabled(false), OTP_SETTINGS.RESEND_DELAY_SECONDS * 1000);
    } catch (error) {
      console.error('Resend OTP error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to resend OTP');
      setResendDisabled(false);
    }
  };

  return (
    <>
      {step === 'phone' && (
        <form onSubmit={phoneForm.handleSubmit(handlePhoneSubmit)} className="space-y-4">
          <PhoneInput
            label="Phone Number"
            placeholder="0 1234 567890"
            error={phoneForm.formState.errors.phoneNumber?.message}
            {...phoneForm.register('phoneNumber')}
          />

          <Button
            type="submit"
            disabled={phoneForm.formState.isSubmitting || isLoading}
            size="lg"
            className="w-full h-11 group"
          >
            {phoneForm.formState.isSubmitting || isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Sending OTP...
              </>
            ) : (
              <>
                Send OTP
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </Button>

          <div className="text-center">
            <Link href="/login" className="text-sm text-primary hover:text-primary/80">
              Back to login
            </Link>
          </div>
        </form>
      )}

      {step === 'otp' && (
        <form onSubmit={otpForm.handleSubmit(handleOTPSubmit)} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Enter Verification Code
            </label>
            <p className="text-xs text-muted-foreground">
              We&apos;ve sent a 6-digit code to {phoneNumber}
            </p>
          </div>

          <OTPInput
            value={otpForm.watch('otp') || ''}
            onChange={(value) => otpForm.setValue('otp', value)}
            error={otpForm.formState.errors.otp?.message}
            disabled={otpForm.formState.isSubmitting || isLoading}
          />

          {showTimer && (
            <TimerDisplay
              initialSeconds={OTP_SETTINGS.EXPIRY_MINUTES * 60}
              onExpire={() => setShowTimer(false)}
            />
          )}

          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              size="lg"
              className="flex-1"
              onClick={() => {
                setStep('phone');
                phoneForm.reset();
              }}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <Button
              type="submit"
              size="lg"
              className="flex-1"
              disabled={otpForm.formState.isSubmitting || isLoading}
            >
              {otpForm.formState.isSubmitting || isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Verifying...
                </>
              ) : (
                'Verify'
              )}
            </Button>
          </div>

          <div className="text-center">
            <button
              type="button"
              onClick={handleResendOTP}
              disabled={resendDisabled}
              className="text-sm text-primary hover:text-primary/80 disabled:text-muted-foreground disabled:cursor-not-allowed"
            >
              {resendDisabled ? 'Resend in a moment' : 'Didn&apos;t receive code? Resend'}
            </button>
          </div>
        </form>
      )}

      {step === 'password' && (
        <form onSubmit={passwordForm.handleSubmit(handlePasswordSubmit)} className="space-y-4">
          <PasswordInput
            label="New Password"
            placeholder="Create a new password"
            error={passwordForm.formState.errors.newPassword?.message}
            onPasswordChange={setPassword}
            {...passwordForm.register('newPassword')}
          />
          {password && <PasswordStrengthIndicator password={password} />}

          <PasswordInput
            label="Confirm Password"
            placeholder="Confirm your password"
            error={passwordForm.formState.errors.confirmPassword?.message}
            {...passwordForm.register('confirmPassword')}
          />

          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              size="lg"
              className="flex-1"
              onClick={() => {
                setStep('otp');
                otpForm.reset();
              }}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <Button
              type="submit"
              size="lg"
              className="flex-1"
              disabled={passwordForm.formState.isSubmitting || isLoading}
            >
              {passwordForm.formState.isSubmitting || isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Resetting...
                </>
              ) : (
                'Reset Password'
              )}
            </Button>
          </div>
        </form>
      )}
    </>
  );
}
