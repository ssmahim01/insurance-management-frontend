import { ClaimStatus } from "@/types/claim.types";

export interface IClaimFilters {
  searchTerm: string;
  status: ClaimStatus | "all";
  sortBy: "newest" | "oldest";
  startDate?: string;
  endDate?: string;
}