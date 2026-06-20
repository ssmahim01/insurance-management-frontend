import { z } from 'zod';

export const branchSchema = z.object({
  id: z.string().optional(),
  partnerId: z.string().min(1, 'Partner is required'),
  name: z.string().min(2, 'Branch name must be at least 2 characters'),
  phone: z.string().regex(/^[0-9\s\-\+\(\)]{7,}$/, 'Invalid phone number'),
  email: z.string().email('Invalid email address'),
  address: z.string().min(5, 'Address must be at least 5 characters'),
  city: z.string().min(2, 'City is required'),
  area: z.string().optional(),
  postalCode: z.string().min(2, 'Postal code is required'),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  status: z.enum(['active', 'inactive']),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export type Branch = z.infer<typeof branchSchema>;

export const branchFilterSchema = z.object({
  search: z.string().optional(),
  status: z.enum(['all', 'active', 'inactive']).optional(),
  partnerId: z.string().optional(),
  city: z.string().optional(),
  sortBy: z.enum(['name', 'createdAt']).optional(),
  sortOrder: z.enum(['asc', 'desc']).optional(),
  page: z.number().optional(),
  limit: z.number().optional(),
});

export type BranchFilter = z.infer<typeof branchFilterSchema>;
