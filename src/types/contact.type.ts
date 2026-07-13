export interface ICreateContact {
  name: string;
  phone: string;
  email: string;
  subject?: string;
  message: string;
}


export interface IContact {
  _id: string;
  name: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
  isRead: boolean;
  isReplied: boolean;
  isDeleted: boolean;
  userId: string;
  relatedPackage: string;
  relatedPartner: string;
  createdAt: string;
  updatedAt: string;
}


export interface IContactResponse {
  // statusCode: number;
  success: boolean;
  message: string;
  data: IContact;
}