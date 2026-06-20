import { z } from 'zod';

const planSchema = z.object({
  name: z.string().min(1, 'Plan name is required'),
  duration: z.number().min(1, 'Duration must be at least 1'),
  price: z.number().min(0, 'Price must be positive'),
});

const benefitSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, 'Benefit title is required'),
  description: z.string().optional(),
});

const exclusionSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, 'Exclusion title is required'),
  description: z.string().optional(),
});

export const packageSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  slug: z.string().optional(),
  description: z.string().max(500, 'Description must be less than 500 characters'),
  coverageAmount: z.number().min(1, 'Coverage amount must be positive'),
  plans: z.array(planSchema).min(1, 'At least one plan is required'),
  benefits: z.array(benefitSchema).min(1, 'At least one benefit is required'),
  exclusions: z.array(exclusionSchema).optional(),
  status: z.enum(['active', 'inactive']),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export type InsurancePackage = z.infer<typeof packageSchema>;
export type Plan = z.infer<typeof planSchema>;
export type Benefit = z.infer<typeof benefitSchema>;
export type Exclusion = z.infer<typeof exclusionSchema>;

export const packageFilterSchema = z.object({
  search: z.string().optional(),
  status: z.enum(['all', 'active', 'inactive']).optional(),
  sortBy: z.enum(['name', 'coverageAmount', 'createdAt']).optional(),
  sortOrder: z.enum(['asc', 'desc']).optional(),
  page: z.number().optional(),
  limit: z.number().optional(),
});

export type PackageFilter = z.infer<typeof packageFilterSchema>;
