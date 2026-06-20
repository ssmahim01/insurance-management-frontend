import { z } from 'zod';

export const partnerSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  slug: z.string().optional(),
  logo: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  description: z.string().max(500, 'Description must be less than 500 characters').optional(),
  phone: z.string().regex(/^[0-9\s\-\+\(\)]{7,}$/, 'Invalid phone number'),
  email: z.string().email('Invalid email address'),
  website: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  status: z.enum(['active', 'inactive']),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export type Partner = z.infer<typeof partnerSchema>;

export const partnerFilterSchema = z.object({
  search: z.string().optional(),
  status: z.enum(['all', 'active', 'inactive']).optional(),
  sortBy: z.enum(['name', 'createdAt']).optional(),
  sortOrder: z.enum(['asc', 'desc']).optional(),
  page: z.number().optional(),
  limit: z.number().optional(),
});

export type PartnerFilter = z.infer<typeof partnerFilterSchema>;
