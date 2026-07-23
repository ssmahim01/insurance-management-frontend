import { IPartner, PartnerCategory } from "./partner.types";

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
   category?: PartnerCategory;  
  description?: string;   
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

export interface IPopulatedBranchPartner {
  _id?: string;
  name: string;
  logo?: string;
  phone?: string;
  email?: string;
  website?: string;
  category?: PartnerCategory; 
  description?: string;      
}