
export enum PartnerCategory {
  DIAGNOSTIC_HOSPITAL = "DIAGNOSTIC_HOSPITAL",
  PHARMACEUTICALS = "PHARMACEUTICALS"
}

export interface IPartner {
  _id?: string;
  name: string;
  logo?: string;
  description?: string;
  category?: PartnerCategory;
  phone?: string;
  email?: string;
  website?: string;
  branchCount?: number;

  isActive: boolean;
  isDeleted?: boolean;
  createdBy?: string | { _id: string; name: string; role?: string };
  createdAt?: string;
  updatedAt?: string;
}