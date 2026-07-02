import { IUser } from "@/types/user.types";
import { IInsurancePackage } from "@/types/package.types";

export const formatDate = (iso?: string | null): string => {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export const formatCurrency = (n?: number): string => `৳${(n ?? 0).toLocaleString("en-BD")}`;

export const getNestedName = (
  value: IUser | IInsurancePackage | string | undefined,
): string => {
  if (!value) return "—";
  if (typeof value === "string") return "—";
  return "name" in value ? value.name : "—";
};

export const getNestedPhone = (value: IUser | string | undefined): string | undefined => {
  if (!value || typeof value === "string") return undefined;
  return value.phone;
};