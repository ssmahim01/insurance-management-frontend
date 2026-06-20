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

export interface IInsurancePackage {
  _id: string;
  name: string;
  slug: string;
  description: string;
  coverageAmount: number;
  plans: IPlan[];
  benefits: string[];
  exclusions: string[];
  isActive: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}