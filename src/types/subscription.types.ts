// // ager frontend  /subscription.types.ts

// import { IUser } from "./user.types";
// import { IInsurancePackage } from "./package.types";

// export enum PlanType {
//   MONTHLY = "MONTHLY",
//   QUARTERLY = "QUARTERLY",
//   HALF_YEARLY = "HALF_YEARLY",
//   YEARLY = "YEARLY",
//   LIFETIME = "LIFETIME",
// }

// export enum SubscriptionStatus {
//   PENDING = "PENDING",
//   ACTIVE = "ACTIVE",
//   EXPIRED = "EXPIRED",
//   CANCELLED = "CANCELLED",
//   FAILED = "FAILED",
// }

// export enum PaymentStatus {
//   UNPAID = "UNPAID",
//   PAID = "PAID",
//   FAILED = "FAILED",
//   REFUNDED = "REFUNDED",
//   COMPLETED = "COMPLETED",
// }

// export interface IPackagePlan {
//   type: PlanType;
//   regularPrice: number;
//   discountPrice?: number;
//   durationInMonths?: number;
// }

// export interface ISubscription {
//   _id: string;

//   customer: IUser | string;
//   package: IInsurancePackage | string;

//   planType: PlanType;
//   durationInMonths?: number;

//   price: number;

//   paymentStatus: PaymentStatus;
//   transactionId?: string;

//   status: SubscriptionStatus;

//   startDate: string;
//   endDate?: string | null;

//   isLifetime?: boolean;

//   createdBy?: IUser | string;

//   autoRenew?: boolean;

//   isDeleted: boolean;
//   isActive: boolean;

//   createdAt?: string;
//   updatedAt?: string;
// }

// export interface ICustomerAddress {
//   division: string;
//   district: string;
//   thana: string;
//   union?: string;
// }

// export interface ICustomerNominee {
//   name?: string;
//   age?: number;
//   relationship?: string;
//   phone?: string;
// }

// export interface ICreateSubscriptionPayload {
//   customer?: string;
//   customerPayload?: {
//     name: string;
//     phone: string;
//     email?: string;
//     role?: "CUSTOMER";
//     nid?: string;
//     dateOfBirth?: string;
//     gender?: "MALE" | "FEMALE" | "OTHER";
//     address?: ICustomerAddress;
//     nominee?: ICustomerNominee;
//   };
//   package: string;
//   planType: PlanType;
//   durationInMonths?: number;
//   price: number;
//   autoRenew?: boolean;
// }

// export interface IUpdateSubscriptionPayload {
//   planType?: PlanType;
//   price?: number;
//   status?: SubscriptionStatus;
//   paymentStatus?: PaymentStatus;
//   startDate?: string;
//   autoRenew?: boolean;
// }

// export interface ISubscriptionStats {
//   total: number;
//   active: number;
//   pending: number;
//   expired: number;
//   cancelled: number;
//   paid: number;
//   unpaid: number;
//   refunded: number;
//   failed: number;
//   totalRevenue: number;
// }

// export interface GetSubscriptionsParams {
//   page?: number;
//   limit?: number;
//   sort?: string;
//   fields?: string;
//   searchTerm?: string;
//   status?: SubscriptionStatus;
//   paymentStatus?: PaymentStatus;
//   dateType?: "created" | "updatedAt" | "startDate" | "endDate";
//   startDate?: string;
//   endDate?: string;
//   [key: string]: any;
// }

// export interface IMeta {
//   page: number;
//   limit: number;
//   total: number;
//   totalPage: number;
// }

// export interface ISubscriptionListResponse {
//   success: boolean;
//   message: string;
//   data: {
//     data: ISubscription[];
//     meta: IMeta;
//     stats: ISubscriptionStats;
//   };
// }

// export interface ISingleSubscriptionResponse {
//   success: boolean;
//   message: string;
//   data: ISubscription;
// }

// export interface ICreateSubscriptionResponse {
//   success: boolean;
//   message: string;
//   data: {
//     data: {
//       subscription: ISubscription;
//       paymentUrl: string;
//     };
//   };
// }


// Version  2
// ager frontend  /subscription.types.ts

import { IUser } from "./user.types";
import { IInsurancePackage } from "./package.types";

export enum PlanType {
  MONTHLY = "MONTHLY",
  QUARTERLY = "QUARTERLY",
  HALF_YEARLY = "HALF_YEARLY",
  YEARLY = "YEARLY",
  LIFETIME = "LIFETIME",
}

export enum SubscriptionStatus {
  PENDING = "PENDING",
  ACTIVE = "ACTIVE",
  EXPIRED = "EXPIRED",
  CANCELLED = "CANCELLED",
  FAILED = "FAILED",
}

export enum PaymentStatus {
  UNPAID = "UNPAID",
  PAID = "PAID",
  FAILED = "FAILED",
  REFUNDED = "REFUNDED",
  COMPLETED = "COMPLETED",
}

export enum SubscribeFor {
  SELF = "SELF",
  OTHER = "OTHER",
}

export interface IBeneficiary {
  name: string;
  phone: string;
  dateOfBirth?: string;
  relationship: string;
}

export interface IPackagePlan {
  type: PlanType;
  regularPrice: number;
  discountPrice?: number;
  durationInMonths?: number;
}

export interface ISubscription {
  _id: string;

  customer: IUser | string;
  package: IInsurancePackage | string;

  planType: PlanType;
  durationInMonths?: number;

  price: number;

  paymentStatus: PaymentStatus;
  transactionId?: string;

  subscribeFor?: SubscribeFor;
  beneficiary?: IBeneficiary;

  status: SubscriptionStatus;

  startDate: string;
  endDate?: string | null;

  isLifetime?: boolean;

  createdBy?: IUser | string;

  autoRenew?: boolean;

  isDeleted: boolean;
  isActive: boolean;

  createdAt?: string;
  updatedAt?: string;
}

export interface ICustomerAddress {
  division: string;
  district: string;
  thana: string;
  union?: string;
}

export interface ICustomerNominee {
  name?: string;
  age?: number;
  relationship?: string;
  phone?: string;
}

export interface ICreateSubscriptionPayload {
  customer?: string;
  customerPayload?: {
    name: string;
    phone: string;
    email?: string;
    role?: "CUSTOMER";
    nid?: string;
    dateOfBirth?: string;
    gender?: "MALE" | "FEMALE" | "OTHER";
    address?: ICustomerAddress;
    nominee?: ICustomerNominee;
  };
  package: string;
  planType: PlanType;
  durationInMonths?: number;
  price: number;
  autoRenew?: boolean;
  subscribeFor?: SubscribeFor;
  beneficiary?: {
    name: string;
    phone: string;
    dateOfBirth?: string;
    relationship: string;
  };
}

export interface IUpdateSubscriptionPayload {
  planType?: PlanType;
  price?: number;
  status?: SubscriptionStatus;
  paymentStatus?: PaymentStatus;
  startDate?: string;
  autoRenew?: boolean;
}

export interface ISubscriptionStats {
  total: number;
  active: number;
  pending: number;
  expired: number;
  cancelled: number;
  paid: number;
  unpaid: number;
  refunded: number;
  failed: number;
  totalRevenue: number;
}

export interface GetSubscriptionsParams {
  page?: number;
  limit?: number;
  sort?: string;
  fields?: string;
  searchTerm?: string;
  status?: SubscriptionStatus;
  paymentStatus?: PaymentStatus;
  dateType?: "created" | "updatedAt" | "startDate" | "endDate";
  startDate?: string;
  endDate?: string;
  [key: string]: any;
}

export interface IMeta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

export interface ISubscriptionListResponse {
  success: boolean;
  message: string;
  data: {
    data: ISubscription[];
    meta: IMeta;
    stats: ISubscriptionStats;
  };
}

export interface ISingleSubscriptionResponse {
  success: boolean;
  message: string;
  data: ISubscription;
}

export interface ICreateSubscriptionResponse {
  success: boolean;
  message: string;
  data: {
    data: {
      subscription: ISubscription;
      paymentUrl: string;
    };
  };
}