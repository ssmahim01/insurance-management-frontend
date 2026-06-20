export interface IPartner {
  _id: string;
  name: string;
  logo?: string;
  description?: string;
  phone?: string;
  email?: string;
  website?: string;
  isActive: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}