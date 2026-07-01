import { z } from "zod";

export const agentCreateSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters").max(100),
    phone: z.string().min(11, "Enter a valid phone number").max(15),
    email: z
      .string()
      .email("Enter a valid email address")
      .optional()
      .or(z.literal("")),
    isActive: z.boolean(),
    salary: z.preprocess(
      (val) => (val !== "" && val !== undefined ? Number(val) : undefined),
      z.number().min(0, "Must be 0 or more").optional(),
    ),
    salaryPerCustomer: z.preprocess(
      (val) => (val !== "" && val !== undefined ? Number(val) : undefined),
      z.number().min(0, "Must be 0 or more").optional(),
    ),
    division: z.string().optional(),
    district: z.string().optional(),
    thana: z.string().optional(),
    union: z.string().optional(),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type AgentCreateInput = z.infer<typeof agentCreateSchema>;

export const agentUpdateSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters").max(100),
    phone: z.string().min(11, "Enter a valid phone number").max(15),
    email: z
      .string()
      .email("Enter a valid email address")
      .optional()
      .or(z.literal("")),
    isActive: z.boolean(),
    salary: z.preprocess(
      (val) => (val !== "" && val !== undefined ? Number(val) : undefined),
      z.number().min(0, "Must be 0 or more").optional(),
    ),
    salaryPerCustomer: z.preprocess(
      (val) => (val !== "" && val !== undefined ? Number(val) : undefined),
      z.number().min(0, "Must be 0 or more").optional(),
    ),
    division: z.string().optional(),
    district: z.string().optional(),
    thana: z.string().optional(),
    union: z.string().optional(),
    // Optional password change
    newPassword: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .optional()
      .or(z.literal("")),
    confirmNewPassword: z.string().optional().or(z.literal("")),
  })
  .refine(
    (d) => {
      if (d.newPassword && d.newPassword.length > 0) {
        return d.newPassword === d.confirmNewPassword;
      }
      return true;
    },
    { message: "Passwords do not match", path: ["confirmNewPassword"] },
  )
  .refine(
    (d) => {
      if (d.confirmNewPassword && d.confirmNewPassword.length > 0) {
        return !!d.newPassword && d.newPassword.length > 0;
      }
      return true;
    },
    { message: "Please enter a new password first", path: ["newPassword"] },
  );

export type AgentUpdateInput = z.infer<typeof agentUpdateSchema>;

// Kept for any existing imports elsewhere — points at the create schema.
export const agentFormSchema = agentCreateSchema;
export type AgentFormInput = AgentCreateInput;