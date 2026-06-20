import { IPartner } from "./partner.types";

export interface IPartnerBranch {
  _id: string;
  partner: string | IPartner;
  branchName: string;
  phone?: string;
  email?: string;
  address: string;
  city?: string;
  area?: string;
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