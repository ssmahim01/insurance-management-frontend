/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/incompatible-library */
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { partnerSchema, type Partner } from '@/lib/schemas/partner.schema';

interface PartnerFormProps {
  initialData?: Partner;
  isLoading?: boolean;
  onSubmit: (data: Partner) => Promise<void>;
}

export function PartnerForm({
  initialData,
  isLoading,
  onSubmit,
}: PartnerFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<Partner>({
    resolver: zodResolver(partnerSchema),
    defaultValues: initialData,
  });

  const status = watch('status');

  const onSubmitForm = async (data: Partner) => {
    try {
      setIsSubmitting(true);
      await onSubmit(data);
      toast.success(initialData ? 'Partner updated' : 'Partner created');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-8">
      {/* Basic Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Basic Information</h3>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">Name</label>
            <Input
              {...register('name')}
              placeholder="Partner name"
              className="mt-1.5"
            />
            {errors.name && (
              <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium">Email</label>
            <Input
              {...register('email')}
              type="email"
              placeholder="partner@example.com"
              className="mt-1.5"
            />
            {errors.email && (
              <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium">Phone</label>
            <Input
              {...register('phone')}
              placeholder="+880 1700 000000"
              className="mt-1.5"
            />
            {errors.phone && (
              <p className="text-xs text-red-500 mt-1">{errors.phone.message}</p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium">Website</label>
            <Input
              {...register('website')}
              type="url"
              placeholder="https://example.com"
              className="mt-1.5"
            />
            {errors.website && (
              <p className="text-xs text-red-500 mt-1">{errors.website.message}</p>
            )}
          </div>
        </div>

        <div>
          <label className="text-sm font-medium">Logo URL</label>
          <Input
            {...register('logo')}
            type="url"
            placeholder="https://example.com/logo.png"
            className="mt-1.5"
          />
          {errors.logo && (
            <p className="text-xs text-red-500 mt-1">{errors.logo.message}</p>
          )}
        </div>

        <div>
          <label className="text-sm font-medium">Description</label>
          <Textarea
            {...register('description')}
            placeholder="Brief description about the partner"
            rows={4}
            className="mt-1.5"
          />
          {errors.description && (
            <p className="text-xs text-red-500 mt-1">{errors.description.message}</p>
          )}
        </div>
      </div>

      {/* Status */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Status</h3>
        <div>
          <label className="text-sm font-medium">Status</label>
          <Select value={status} onValueChange={(value) => setValue('status', value as any)}>
            <SelectTrigger className="mt-1.5">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-6 border-t">
        <Button
          type="submit"
          disabled={isSubmitting || isLoading}
          className="gap-2 hover:scale-105 transition-transform duration-200"
        >
          {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
          {initialData ? 'Update Partner' : 'Create Partner'}
        </Button>
      </div>
    </form>
  );
}
