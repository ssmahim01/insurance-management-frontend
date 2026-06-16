'use client';

import { useState } from 'react';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { AuthCard } from '@/components/auth/AuthCard';
import { ResetPasswordForm } from '@/components/auth/ResetPasswordForm';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import type { ResetPasswordFormData } from '@/schemas/auth';
import { Shield, Key, Lock } from 'lucide-react';

const securityTips = [
  {
    icon: Shield,
    title: 'Strong Password',
    description: 'Use a mix of uppercase, lowercase, numbers, and symbols',
  },
  {
    icon: Key,
    title: 'Unique Password',
    description: 'Never reuse passwords across different accounts',
  },
  {
    icon: Lock,
    title: 'Keep It Safe',
    description: 'Never share your password with anyone',
  },
];

export default function ResetPasswordPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleResetPassword = async (data: ResetPasswordFormData) => {
    setIsLoading(true);
    try {
      // TODO: Replace with actual API call
      // const response = await resetPassword({
      //   newPassword: data.newPassword,
      // });
      // if (response.success) {
      //   toast.success('Password reset successful!');
      //   router.push('/login');
      // }

      // Mock success for now
      console.log(' Reset password:', data);
      toast.success('Password reset successful! Redirecting to login...');
      setTimeout(() => {
        router.push('/login');
      }, 500);
    } catch (error) {
      console.error(' Reset password error:', error);
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('Something went wrong. Please try again.');
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
              Password security tips
            </h3>
            <div className="space-y-4">
              {securityTips.map((tip, index) => {
                const Icon = tip.icon;
                return (
                  <div key={index} className="flex gap-4">
                    <div className="shrink-0">
                      <Icon size={24} className="text-primary-foreground" />
                    </div>
                    <div>
                      <p className="font-semibold text-primary-foreground text-sm">
                        {tip.title}
                      </p>
                      <p className="text-primary-foreground/70 text-xs">
                        {tip.description}
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
        title="Create new password"
        subtitle="Please enter a new password for your account"
      >
        <ResetPasswordForm onSubmit={handleResetPassword} isLoading={isLoading} />
      </AuthCard>
    </AuthLayout>
  );
}
