import {
  GetUsersParams,
  IAllUsersResponse,
  ISingleUserResponse,
  IUserListResponse,
} from "@/types/user.types";
import { baseApi } from "../baseApi";

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
    getAllTrashUsers: builder.query<
      IUserListResponse,
      GetUsersParams | undefined
    >({
      query: (params) => ({
        url: "/user/all-trash-users",
        method: "GET",
        params,
      }),
      providesTags: ["USERS"],
    }),

    // ── ROLE-SPECIFIC LISTS (Admin / Super Admin) ────────────────────────────

    // Super Admin / Admin — get all agent leaders
    getAllAgentLeaders: builder.query<
      IUserListResponse,
      GetUsersParams | undefined
    >({
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

    // Super Admin / Admin — get all soft-deleted agents (across all agent leaders)
    getAllTrashAgents: builder.query<
      IUserListResponse,
      GetUsersParams | undefined
    >({
      query: (params) => ({
        url: "/user/all-trash-agents",
        method: "GET",
        params,
      }),
      providesTags: ["USERS"],
    }),

    // Super Admin — get all admins
    getAllAdmins: builder.query<IUserListResponse, GetUsersParams | undefined>({
      query: (params) => ({
        url: "/user/all-admins",
        method: "GET",
        params,
      }),
      providesTags: ["USERS"],
    }),

    // Super Admin — get all soft-deleted admins
    getAllTrashAdmins: builder.query<
      IUserListResponse,
      GetUsersParams | undefined
    >({
      query: (params) => ({
        url: "/user/all-trash-admins",
        method: "GET",
        params,
      }),
      providesTags: ["USERS"],
    }),

    // Super Admin — get all managers
    getAllManagers: builder.query<
      IUserListResponse,
      GetUsersParams | undefined
    >({
      query: (params) => ({
        url: "/user/all-managers",
        method: "GET",
        params,
      }),
      providesTags: ["USERS"],
    }),

    // Super Admin — get all soft-deleted managers
    getAllTrashManagers: builder.query<
      IUserListResponse,
      GetUsersParams | undefined
    >({
      query: (params) => ({
        url: "/user/all-trash-managers",
        method: "GET",
        params,
      }),
      providesTags: ["USERS"],
    }),

    // Super Admin / Admin — get all customers
    getAllCustomers: builder.query<
      IUserListResponse,
      GetUsersParams | undefined
    >({
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

    getMyTrashAgents: builder.query<
      IUserListResponse,
      GetUsersParams | undefined
    >({
      query: (params) => ({
        url: "/user/my-trash-agents",
        method: "GET",
        params,
      }),
      providesTags: ["USERS"],
    }),

    // Agent Leader — get customers created by own agents
    getMyLeaderCustomers: builder.query<
      IUserListResponse,
      GetUsersParams | undefined
    >({
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

    getMyLeaderBothCustomers: builder.query<
      IUserListResponse,
      GetUsersParams | undefined
    >({
      query: (params) => ({
        url: "/user/my-team-customers",
        method: "GET",
        params,
      }),
      providesTags: ["USERS"],
    }),

    getMyTrashCustomers: builder.query<
      IUserListResponse,
      GetUsersParams | undefined
    >({
      query: (params) => ({
        url: "/user/my-trash-customers",
        method: "GET",
        params,
      }),
      providesTags: ["USERS"],
    }),

    // ── AGENT — own resources ────────────────────────────────────────────────

    // Agent — get own customers
    getMyCustomers: builder.query<
      IUserListResponse,
      GetUsersParams | undefined
    >({
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
    updateUser: builder.mutation<
      ISingleUserResponse,
      { id: string; data: FormData }
    >({
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

    restoreUser: builder.mutation<ISingleUserResponse, string>({
      query: (id) => ({
        url: `/user/restore/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["USERS"],
    }),

    permanentDeleteUser: builder.mutation<ISingleUserResponse, string>({
      query: (id) => ({
        url: `/user/permanent-delete/${id}`,
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
  useGetAllTrashAgentsQuery,
  useGetAllAdminsQuery,
  useGetAllTrashAdminsQuery,
  useGetAllCustomersQuery,
  useGetAllManagersQuery,
  useGetAllTrashManagersQuery,
  // Role-specific (Admin / Super Admin)
  // Agent Leader — own resources
  useGetMyAgentsQuery,
  useGetMyTrashAgentsQuery,
  useGetMyLeaderCustomersQuery,
  useGetMyLeaderBothCustomersQuery,
  useGetMyTrashCustomersQuery,
  useGetAgentCustomersByLeaderQuery,
  // Agent — own resources
  useGetMyCustomersQuery,
  // Admin / Super Admin — scoped
  useGetAgentLeaderCustomersQuery,
  useGetAgentCustomersQuery,
  // Single / Update / Delete
  useGetSingleUserQuery,
  useRestoreUserMutation,
  usePermanentDeleteUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userApi;
