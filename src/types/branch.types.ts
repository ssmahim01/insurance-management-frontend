import { IPartner } from "./partner.types";

export interface IPartnerBranch {
  _id: string;
  partner: string | IPartner;
  branchName: string;
  phone?: string;
  email?: string;
  website?: string;
  address: string;
  city?: string;
  area?: string;
    distanceKm?: number; 
  postalCode?: string;
  location: {
    type: "Point";
    coordinates: number[];
  };
  isActive: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}