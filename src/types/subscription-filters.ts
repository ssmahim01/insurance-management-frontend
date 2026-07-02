import { PaymentStatus, SubscriptionStatus } from "@/types/subscription.types";

export interface ISubscriptionFilters {
  searchTerm: string;
  status: SubscriptionStatus | "all";
  paymentStatus: PaymentStatus | "all";
  dateType: "created" | "updatedAt" | "startDate" | "endDate" | "none";
  startDate?: string;
  endDate?: string;
  sortBy: "newest" | "oldest" | "price-asc" | "price-desc";
}