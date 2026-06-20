/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/incompatible-library */
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { branchSchema, type Branch } from '@/lib/schemas/branch.schema';
import type { Partner } from '@/lib/schemas/partner.schema';

interface BranchFormProps {
  partners: Partner[];
  initialData?: Branch;
  isLoading?: boolean;
  onSubmit: (data: Branch) => Promise<void>;
}

export function BranchForm({
  partners,
  initialData,
  isLoading,
  onSubmit,
}: BranchFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<Branch>({
    resolver: zodResolver(branchSchema),
    defaultValues: initialData,
  });

  const status = watch('status');

  const onSubmitForm = async (data: Branch) => {
    try {
      setIsSubmitting(true);
      await onSubmit(data);
      toast.success(initialData ? 'Branch updated' : 'Branch created');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-8">
      {/* Partner Selection */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Partner</h3>
        <div>
          <label className="text-sm font-medium">Select Partner</label>
          <Select 
            value={watch('partnerId') || ''} 
            onValueChange={(value) => setValue('partnerId', value ?? "")}
          >
            <SelectTrigger className="mt-1.5">
              <SelectValue placeholder="Select a partner" />
            </SelectTrigger>
            <SelectContent>
              {partners.map((partner) => (
                <SelectItem key={partner.id} value={partner.id || ''}>
                  {partner.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.partnerId && (
            <p className="text-xs text-red-500 mt-1">{errors.partnerId.message}</p>
          )}
        </div>
      </div>

      {/* Branch Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Branch Information</h3>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">Branch Name</label>
            <Input
              {...register('name')}
              placeholder="Branch name"
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
              placeholder="branch@example.com"
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
            <label className="text-sm font-medium">Postal Code</label>
            <Input
              {...register('postalCode')}
              placeholder="1200"
              className="mt-1.5"
            />
            {errors.postalCode && (
              <p className="text-xs text-red-500 mt-1">{errors.postalCode.message}</p>
            )}
          </div>
        </div>

        <div>
          <label className="text-sm font-medium">Address</label>
          <Input
            {...register('address')}
            placeholder="Full address"
            className="mt-1.5"
          />
          {errors.address && (
            <p className="text-xs text-red-500 mt-1">{errors.address.message}</p>
          )}
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="text-sm font-medium">City</label>
            <Input
              {...register('city')}
              placeholder="Dhaka"
              className="mt-1.5"
            />
            {errors.city && (
              <p className="text-xs text-red-500 mt-1">{errors.city.message}</p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium">Area</label>
            <Input
              {...register('area')}
              placeholder="Area name"
              className="mt-1.5"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Coordinates</label>
            <div className="flex gap-2 mt-1.5">
              <Input
                {...register('latitude', { valueAsNumber: true })}
                placeholder="Latitude"
                type="number"
                step="0.0001"
              />
              <Input
                {...register('longitude', { valueAsNumber: true })}
                placeholder="Longitude"
                type="number"
                step="0.0001"
              />
            </div>
          </div>
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
          {initialData ? 'Update Branch' : 'Create Branch'}
        </Button>
      </div>
    </form>
  );
}
