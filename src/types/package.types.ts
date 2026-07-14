
export enum PlanType {
  MONTHLY = "MONTHLY",
  QUARTERLY = "QUARTERLY",
  HALF_YEARLY = "HALF_YEARLY",
  YEARLY = "YEARLY",
  LIFETIME = "LIFETIME",
}

export interface IPlan {
  type: PlanType;
  durationInMonths: number;
  regularPrice: number;
  discountPrice: number;
}

export interface IPackageAnalytics {
  totalSubscriptions: number;
  totalRevenue: number;
  activeSubscriptions: number;
  pendingSubscriptions: number;
}

export interface IInsurancePackage {
  _id?: string;
  name: string;
  slug: string;
  featuredImage?: string;
  description: string;
  coverageAmount: number;
  plans: IPlan[];
  benefits: string[];
  exclusions: string[];
  isJoint?: boolean;
  isActive: boolean;
  isDeleted: boolean;
  analytics?: IPackageAnalytics;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

// ─── API Response Types ───────────────────────────────────────────────────────

export interface IPackageStats {
  total: number;
  active: number;
  inactive: number;
  totalCoverage: number;
  avgCoverage: number;
  totalRevenue: number;
  totalSubscriptions: number;
}

export interface IPaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

export interface IPackageListResponse {
  success: boolean;
  message: string;
  data: {
    data: IInsurancePackage[];
    meta: IPaginationMeta;
    stats: IPackageStats;
  };
}

export interface ISinglePackageResponse {
  success: boolean;
  message: string;
  data: IInsurancePackage;
}

export interface GetPackagesParams {
  page?: number;
  limit?: number;
  searchTerm?: string;
  sort?: string;
  isActive?: string;
  startDate?: string;
  endDate?: string;
}