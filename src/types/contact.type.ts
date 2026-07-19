// CREATE CONTACT
export interface ICreateContact {
  name: string;
  phone: string;
  email: string;
  subject?: string;
  message: string;
}

// CONTACT
export interface IContact {
  _id: string;

  name: string;
  phone: string;
  email: string;

  subject?: string;
  message: string;

  isRead: boolean;
  isReplied: boolean;
  isDeleted: boolean;

  createdAt: string;
  updatedAt: string;
}

// SINGLE CONTACT RESPONSE
export interface IContactResponse {
  success: boolean;
  message: string;
  data: IContact;
}

// GET ALL CONTACTS RESPONSE
export interface IContactsResponse {
  success: boolean;
  message: string;

  data: IContact[];

  meta: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
}


// CONTACT QUERY PARAMS
export interface IContactQueryParams {
  page?: number;
  limit?: number;
  searchTerm?: string;
  isRead?: boolean;
  phone?: string;
  sort?: string;
  fields?: string;
  startDate?: string;
  endDate?: string;
}