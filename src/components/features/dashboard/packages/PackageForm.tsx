/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/incompatible-library */
'use client';

import { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
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
import { Loader2, Plus, Trash2 } from 'lucide-react';
import { packageSchema, type InsurancePackage } from '@/lib/schemas/package.schema';

interface PackageFormProps {
  initialData?: InsurancePackage;
  isLoading?: boolean;
  onSubmit: (data: InsurancePackage) => Promise<void>;
}

export function PackageForm({
  initialData,
  isLoading,
  onSubmit,
}: PackageFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    control,
  } = useForm<InsurancePackage>({
    resolver: zodResolver(packageSchema),
    defaultValues: {
      status: 'active',
      plans: [{ name: '', duration: 12, price: 0 }],
      benefits: [{ title: '' }],
      exclusions: [],
      ...initialData,
    },
  });

  const { fields: planFields, append: appendPlan, remove: removePlan } = useFieldArray({
    control,
    name: 'plans',
  });

  const { fields: benefitFields, append: appendBenefit, remove: removeBenefit } = useFieldArray({
    control,
    name: 'benefits',
  });

  const { fields: exclusionFields, append: appendExclusion, remove: removeExclusion } = useFieldArray({
    control,
    name: 'exclusions',
  });

  const status = watch('status');

  const onSubmitForm = async (data: InsurancePackage) => {
    try {
      setIsSubmitting(true);
      await onSubmit(data);
      toast.success(initialData ? 'Package updated' : 'Package created');
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
            <label className="text-sm font-medium">Package Name</label>
            <Input
              {...register('name')}
              placeholder="e.g., Premium Health Package"
              className="mt-1.5"
            />
            {errors.name && (
              <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium">Coverage Amount</label>
            <Input
              {...register('coverageAmount', { valueAsNumber: true })}
              type="number"
              placeholder="500000"
              className="mt-1.5"
            />
            {errors.coverageAmount && (
              <p className="text-xs text-red-500 mt-1">{errors.coverageAmount.message}</p>
            )}
          </div>
        </div>

        <div>
          <label className="text-sm font-medium">Description</label>
          <Textarea
            {...register('description')}
            placeholder="Detailed description of the package"
            rows={4}
            className="mt-1.5"
          />
          {errors.description && (
            <p className="text-xs text-red-500 mt-1">{errors.description.message}</p>
          )}
        </div>
      </div>

      {/* Plans */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Plans</h3>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => appendPlan({ name: '', duration: 12, price: 0 })}
            className="gap-1"
          >
            <Plus className="w-3 h-3" />
            Add Plan
          </Button>
        </div>

        {planFields.map((field, idx) => (
          <div key={field.id} className="grid md:grid-cols-3 gap-3 p-4 border rounded-lg">
            <div>
              <Input
                {...register(`plans.${idx}.name`)}
                placeholder="Plan name"
              />
            </div>
            <div>
              <Input
                {...register(`plans.${idx}.duration`, { valueAsNumber: true })}
                type="number"
                placeholder="Duration (months)"
              />
            </div>
            <div className="flex gap-2">
              <Input
                {...register(`plans.${idx}.price`, { valueAsNumber: true })}
                type="number"
                placeholder="Price"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removePlan(idx)}
              >
                <Trash2 className="w-4 h-4 text-red-500" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Benefits */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Benefits</h3>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => appendBenefit({ title: '', description: '' })}
            className="gap-1"
          >
            <Plus className="w-3 h-3" />
            Add Benefit
          </Button>
        </div>

        {benefitFields.map((field, idx) => (
          <div key={field.id} className="space-y-2 p-4 border rounded-lg">
            <div className="flex gap-2">
              <Input
                {...register(`benefits.${idx}.title`)}
                placeholder="Benefit title"
                className="flex-1"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeBenefit(idx)}
              >
                <Trash2 className="w-4 h-4 text-red-500" />
              </Button>
            </div>
            <Textarea
              {...register(`benefits.${idx}.description`)}
              placeholder="Benefit description"
              rows={2}
            />
          </div>
        ))}
      </div>

      {/* Exclusions */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Exclusions</h3>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => appendExclusion({ title: '', description: '' })}
            className="gap-1"
          >
            <Plus className="w-3 h-3" />
            Add Exclusion
          </Button>
        </div>

        {exclusionFields.map((field, idx) => (
          <div key={field.id} className="space-y-2 p-4 border rounded-lg">
            <div className="flex gap-2">
              <Input
                {...register(`exclusions.${idx}.title`)}
                placeholder="Exclusion title"
                className="flex-1"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeExclusion(idx)}
              >
                <Trash2 className="w-4 h-4 text-red-500" />
              </Button>
            </div>
            <Textarea
              {...register(`exclusions.${idx}.description`)}
              placeholder="Exclusion description"
              rows={2}
            />
          </div>
        ))}
      </div>

      {/* Status */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Status</h3>
        <Select value={status} onValueChange={(value) => setValue('status', value as any)}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-6 border-t">
        <Button
          type="submit"
          disabled={isSubmitting || isLoading}
          className="gap-2 hover:scale-105 transition-transform duration-200"
        >
          {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
          {initialData ? 'Update Package' : 'Create Package'}
        </Button>
      </div>
    </form>
  );
}
