// /* eslint-disable @typescript-eslint/no-explicit-any */

import { GetUsersParams, IAllUsersResponse, ISingleUserResponse, IUserListResponse } from "@/types/user.types";
import { baseApi } from "../baseApi";

// import { IRegisterResponse } from "@/types/auth.types";
// import { baseApi } from "../baseApi";
// import type {
//   IUser,
//   IUserApiResponse,
//   IResponse,
//   GetQueryParams,
// } from "@/types";

// interface GetAllUsersResponse {
//   success: boolean;
//   data: IUser[];
//   meta: {
//     total: number;
//     totalPage: number;

//     totalStaffs: number;
//     totalFixedSalary: number;
//     totalSalaryByProduct: number;
//     totalSalary: number;
//   };
// }

// export const userApi = baseApi.injectEndpoints({
//   endpoints: (builder) => ({
//     register: builder.mutation<IResponse<IRegisterResponse>, FormData>({
//       query: (formData) => ({
//         url: "/user/create-user",
//         method: "POST",
//         data: formData,
//       }),
//       invalidatesTags: () => ["USERS"],
//     }),

//     updateUser: builder.mutation<
//       IResponse<IUser>,
//       { id: string; data: FormData }
//     >({
//       query: ({ id, data }) => ({
//         url: `/user/${id}`,
//         method: "PATCH",
//         data: data,
//       }),
//       invalidatesTags: (result, error, { id }) => [
//         "USERS",
//         { type: "USER", id },
//       ],
//     }),

//     deleteUser: builder.mutation<IResponse<{ id: string }>, string>({
//       query: (id) => ({
//         url: `/user/${id}`,
//         method: "DELETE",
//       }),
//       invalidatesTags: (result, error, id) => [
//         "USERS",
//         { type: "USER", id },
//       ],
//     }),

//     getSingleUser: builder.query<IUserApiResponse, string>({
//       query: (id) => ({
//         url: `/user/${id}`,
//         method: "GET",
//       }),
//       providesTags: (result, error, id) => [{ type: "USER", id }],
//     }),

//     getAllUsers: builder.query<GetAllUsersResponse, GetQueryParams>({
//       query: (params) => ({
//         url: "/user/all-users",
//         method: "GET",
//         params: params,
//       }),
//       providesTags: ["USERS"],
//     }),

//     getMe: builder.query<IUserApiResponse, void>({
//       query: () => ({
//         url: "/user/me",
//         method: "GET",
//       }),

//       providesTags: ["ME", "USER"],
//     }),

//     getAllTrashUsers: builder.query<GetAllUsersResponse, GetQueryParams>({
//       query: (params) => ({
//         url: "/user/all-trash-users",
//         method: "GET",
//         params,
//       }),
//       providesTags: ["USERS"],
//     }),

//     trashUpdateUser: builder.mutation<IResponse<any>, { _id: string }>({
//       query: ({ _id }) => ({
//         url: `/user/user-trash/${_id}`,
//         method: "POST",
//       }),
//       invalidatesTags: (result, error, { _id }) => [
//         "USERS",
//         { type: "USER", _id },
//       ],
//     }),

  
//   }),
//   overrideExisting: true,
// });

// export const {
//   useRegisterMutation,
//   useUpdateUserMutation,
//   useDeleteUserMutation,
//   useGetSingleUserQuery,
//   useGetAllUsersQuery,
//   useGetMeQuery,
//   useGetAllTrashUsersQuery,
//   useTrashUpdateUserMutation,
// } = userApi;




      // Version 2
// ─── Enums ──────────────────────────────────────────────────────────────────

// export enum Role {
//   SUPER_ADMIN  = "SUPER_ADMIN",
//   ADMIN        = "ADMIN",
//   AGENT_LEADER = "AGENT_LEADER",
//   AGENT        = "AGENT",
//   CUSTOMER     = "CUSTOMER",
// }

// export enum IsActive {
//   ACTIVE   = "ACTIVE",
//   INACTIVE = "INACTIVE",
//   BLOCKED  = "BLOCKED",
// }

// // ─── Sub-interfaces ──────────────────────────────────────────────────────────

// export interface IAddress {
//   division?: string;
//   district?: string;
//   thana?: string;
//   union?: string;
// }

// export interface INominee {
//   name?         : string;
//   age?          : number;
//   relationship? : string;
//   phone?        : string;
// }

// // ─── Core User Interface ─────────────────────────────────────────────────────

// // Populated variants returned by the API after .populate()
// export interface IPopulatedAgentLeader {
//   _id   : string;
//   name  : string;
//   phone : string;
// }

// export interface IPopulatedCreatedBy {
//   _id   : string;
//   name  : string;
//   phone : string;
//   role  : Role;
// }

// export interface IUser {
//   _id?: string;

//   createdBy?   : string | IPopulatedCreatedBy;
//   agentLeader? : string | IPopulatedAgentLeader; // only for agents

//   // BASIC INFO
//   name     : string;
//   phone    : string;
//   email?   : string;
//   password?: string;
//   picture? : string;
//   role     : Role;

//   // CUSTOMER SPECIFIC INFO
//   nid?         : string;
//   dateOfBirth? : string; // ISO string from API (Date serialised)
//   gender?      : "MALE" | "FEMALE" | "OTHER";
//   address?     : IAddress;

//   // NOMINEE INFO
//   nominee? : INominee;

//   // EMPLOYEE RELATED
//   salary?            : string;
//   salaryPerCustomer? : string;

//   // SYSTEM FLAGS
//   isActive?     : IsActive;
//   isVerified?   : boolean;
//   isDeleted?    : boolean;
//   lastLoginAt?  : string; // ISO string from API

//   // Mongoose timestamps
//   createdAt? : string;
//   updatedAt? : string;
// }

// // ─── Query Params ────────────────────────────────────────────────────────────

// export interface GetUsersParams {
//   page?       : number;
//   limit?      : number;
//   searchTerm? : string;
//   sort?       : string;
//   fields?     : string;
//   startDate?  : string; // YYYY-MM-DD
//   endDate?    : string; // YYYY-MM-DD
//   role?       : Role;
//   isActive?   : IsActive;
//   gender?     : "MALE" | "FEMALE" | "OTHER";
// }

// export interface IPaginationMeta {
//   page: number;
//   limit: number;
//   total: number;
//   totalPage: number;
// }

// export interface IStats {
//   total: number;
//   active: number;
//   inactive: number;
//   blocked: number;
// }

// export interface IUserListResponse {
//   success: boolean;
//   message: string;
//   data: IUser[];
//   meta: IPaginationMeta;
//   stats: IStats;
// }

// export interface IAllUsersResponse {
//   success: boolean;
//   message: string;
//   data: IUser[];
//   meta: IPaginationMeta;
//   stats: {
//     total: number;
//     superAdmin: IStats;
//     admin: IStats;
//     agentLeader: IStats;
//     agent: IStats;
//     customer: IStats;
//   };
// }

// export interface ISingleUserResponse {
//   success: boolean;
//   message: string;
//   data: IUser;
// }

// ─── API ────────────────────────────────────────────────────────────────────

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    // ── CREATE ──────────────────────────────────────────────────────────────

    // Super Admin / Agent / Agent Leader — create any user
    createUser: builder.mutation<ISingleUserResponse, FormData>({
      query: (formData) => ({
        url: "/user/create-user",
        method: "POST",
        data: formData,
      }),
      invalidatesTags: ["USERS"],
    }),

    // ── PROFILE ─────────────────────────────────────────────────────────────

    // Any role — get own profile
    getMe: builder.query<ISingleUserResponse, void>({
      query: () => ({
        url: "/user/me",
        method: "GET",
      }),
      providesTags: ["USERS"],
    }),

    // Any role — update own profile
    updateProfile: builder.mutation<ISingleUserResponse, FormData>({
      query: (data) => ({
        url: "/user/update-profile",
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["USERS"],
    }),

    // ── ALL STAFF (non-customer) ─────────────────────────────────────────────

    // Super Admin / Agent Leader — get all staff (non-customer) users
    getAllUsers: builder.query<IAllUsersResponse, GetUsersParams | undefined>({
      query: (params) => ({
        url: "/user/all-users",
        method: "GET",
        params,
      }),
      providesTags: ["USERS"],
    }),

    // Super Admin — get all soft-deleted staff users
    getAllTrashUsers: builder.query<IUserListResponse, GetUsersParams | undefined>({
      query: (params) => ({
        url: "/user/all-trash-users",
        method: "GET",
        params,
      }),
      providesTags: ["USERS"],
    }),

    // ── ROLE-SPECIFIC LISTS (Admin / Super Admin) ────────────────────────────

    // Super Admin / Admin — get all agent leaders
    getAllAgentLeaders: builder.query<IUserListResponse, GetUsersParams | undefined>({
      query: (params) => ({
        url: "/user/all-agent-leaders",
        method: "GET",
        params,
      }),
      providesTags: ["USERS"],
    }),

    // Super Admin / Admin — get all agents
    getAllAgents: builder.query<IUserListResponse, GetUsersParams | undefined>({
      query: (params) => ({
        url: "/user/all-agents",
        method: "GET",
        params,
      }),
      providesTags: ["USERS"],
    }),

    // Super Admin / Admin — get all customers
    getAllCustomers: builder.query<IUserListResponse, GetUsersParams | undefined>({
      query: (params) => ({
        url: "/user/all-customers",
        method: "GET",
        params,
      }),
      providesTags: ["USERS"],
    }),

    // ── AGENT LEADER — own resources ─────────────────────────────────────────

    // Agent Leader — get own agents
    getMyAgents: builder.query<IUserListResponse, GetUsersParams | undefined>({
      query: (params) => ({
        url: "/user/my-agents",
        method: "GET",
        params,
      }),
      providesTags: ["USERS"],
    }),

    // Agent Leader — get customers created by own agents
    getMyLeaderCustomers: builder.query<IUserListResponse, GetUsersParams | undefined>({
      query: (params) => ({
        url: "/user/my-leader-customers",
        method: "GET",
        params,
      }),
      providesTags: ["USERS"],
    }),

    // Agent Leader — get customers of a specific agent under own leadership
    getAgentCustomersByLeader: builder.query<
      IUserListResponse,
      { agentId: string; params?: GetUsersParams }
    >({
      query: ({ agentId, params }) => ({
        url: `/user/leader-agent-customers/${agentId}`,
        method: "GET",
        params,
      }),
      providesTags: ["USERS"],
    }),

    // ── AGENT — own resources ────────────────────────────────────────────────

    // Agent — get own customers
    getMyCustomers: builder.query<IUserListResponse, GetUsersParams | undefined>({
      query: (params) => ({
        url: "/user/my-customers",
        method: "GET",
        params,
      }),
      providesTags: ["USERS"],
    }),

    // ── ADMIN / SUPER ADMIN — scoped lookups ─────────────────────────────────

    // Admin / Super Admin — get all customers under a specific agent leader
    getAgentLeaderCustomers: builder.query<
      IUserListResponse,
      { agentLeaderId: string; params?: GetUsersParams }
    >({
      query: ({ agentLeaderId, params }) => ({
        url: `/user/agent-leader-customers/${agentLeaderId}`,
        method: "GET",
        params,
      }),
      providesTags: ["USERS"],
    }),

    // Admin / Super Admin — get all customers of a specific agent
    getAgentCustomers: builder.query<
      IUserListResponse,
      { agentId: string; params?: GetUsersParams }
    >({
      query: ({ agentId, params }) => ({
        url: `/user/agent-customers/${agentId}`,
        method: "GET",
        params,
      }),
      providesTags: ["USERS"],
    }),

    // ── SINGLE / UPDATE / DELETE ─────────────────────────────────────────────

    // Any role — get single user by id
    getSingleUser: builder.query<ISingleUserResponse, string>({
      query: (id) => ({
        url: `/user/${id}`,
        method: "GET",
      }),
      providesTags: ["USERS"],
    }),

    // Any role — update user by id (Super Admin can update anything; others limited)
    updateUser: builder.mutation<ISingleUserResponse, { id: string; data: FormData }>({
      query: ({ id, data }) => ({
        url: `/user/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["USERS"],
    }),

    // Super Admin — soft-delete user by id
    deleteUser: builder.mutation<ISingleUserResponse, string>({
      query: (id) => ({
        url: `/user/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["USERS"],
    }),
  }),
});

export const {
  // Create
  useCreateUserMutation,
  // Profile
  useGetMeQuery,
  useUpdateProfileMutation,
  // All staff
  useGetAllUsersQuery,
  useGetAllTrashUsersQuery,
  // Role-specific (Admin / Super Admin)
  useGetAllAgentLeadersQuery,
  useGetAllAgentsQuery,
  useGetAllCustomersQuery,
  // Agent Leader — own resources
  useGetMyAgentsQuery,
  useGetMyLeaderCustomersQuery,
  useGetAgentCustomersByLeaderQuery,
  // Agent — own resources
  useGetMyCustomersQuery,
  // Admin / Super Admin — scoped
  useGetAgentLeaderCustomersQuery,
  useGetAgentCustomersQuery,
  // Single / Update / Delete
  useGetSingleUserQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userApi;