import { IPartnerBranch } from "@/types/branch.types";
import { baseApi } from "../baseApi";

interface IBranchListResponse {
  data: IPartnerBranch[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
  stats: {
    total: number;
    active: number;
    inactive: number;
  };
}

interface ISingleBranchResponse {
  data: IPartnerBranch;
}

interface GetBranchesParams {
  searchTerm?: string;
  isActive?:   string;
  partner?:    string;
  page?:       number;
  limit?:      number;
  startDate?:  string;
  endDate?:    string;
  sort?:       string;
}

interface IGetNearbyBranchesPayload {
  latitude:   number;
  longitude:  number;
  partnerIds: string[];
}

export const branchApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    createBranch: builder.mutation<ISingleBranchResponse, Partial<IPartnerBranch>>({
      query: (data) => ({
        url: "/branch/create-branch",
        method: "POST",
        data,
      }),
      invalidatesTags: ["BRANCHES"],
    }),

    getAllBranches: builder.query<IBranchListResponse, GetBranchesParams | undefined>({
      query: (params) => ({
        url: "/branch/all-branches",
        method: "GET",
        params,
      }),
      providesTags: ["BRANCHES"],
    }),

    getAllTrashBranches: builder.query<IBranchListResponse, GetBranchesParams | undefined>({
      query: (params) => ({
        url: "/branch/all-trash-branches",
        method: "GET",
        params,
      }),
      providesTags: ["BRANCHES"],
    }),

    getSingleBranch: builder.query<ISingleBranchResponse, string>({
      query: (id) => ({
        url: `/branch/${id}`,
        method: "GET",
      }),
      providesTags: ["BRANCHES"],
    }),

    updateBranch: builder.mutation<ISingleBranchResponse, { id: string; data: Partial<IPartnerBranch> }>({
      query: ({ id, data }) => ({
        url: `/branch/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["BRANCHES"],
    }),

    softDeleteBranch: builder.mutation<ISingleBranchResponse, string>({
      query: (id) => ({
        url: `/branch/soft-delete/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["BRANCHES"],
    }),

    restoreBranch: builder.mutation<ISingleBranchResponse, string>({
      query: (id) => ({
        url: `/branch/restore/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["BRANCHES"],
    }),

    deleteBranch: builder.mutation<ISingleBranchResponse, string>({
      query: (id) => ({
        url: `/branch/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["BRANCHES"],
    }),

    getNearbyBranches: builder.mutation<{ data: IPartnerBranch[] }, IGetNearbyBranchesPayload>({
      query: (data) => ({
        url: "/branch/nearby/search",
        method: "GET",
        data,
      }),
    }),
  }),
});

export const {
  useCreateBranchMutation,
  useGetAllBranchesQuery,
  useGetAllTrashBranchesQuery,
  useGetSingleBranchQuery,
  useUpdateBranchMutation,
  useSoftDeleteBranchMutation,
  useRestoreBranchMutation,
  useDeleteBranchMutation,
  useGetNearbyBranchesMutation,
} = branchApi;