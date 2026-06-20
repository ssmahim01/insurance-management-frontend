import { IPartnerBranch } from "@/types/branch.types";
import { baseApi } from "../baseApi";
import {
  IResponse,
  GetQueryParams,
} from "@/types";

interface BranchResponse {
  success: boolean;
  data: IPartnerBranch[];
  meta: {
    total: number;
    totalPage: number;
  };
  stats: {
    total: number;
    active: number;
    inactive: number;
  };
}

export const branchApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createBranch: builder.mutation<
      IResponse<IPartnerBranch>,
      Partial<IPartnerBranch>
    >({
      query: (data) => ({
        url: "/branch/create-branch",
        method: "POST",
        data,
      }),
      invalidatesTags: ["BRANCHES"],
    }),

    updateBranch: builder.mutation<
      IResponse<IPartnerBranch>,
      {
        id: string;
        data: Partial<IPartnerBranch>;
      }
    >({
      query: ({ id, data }) => ({
        url: `/branch/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["BRANCHES"],
    }),

    getAllBranches: builder.query<
      BranchResponse,
      GetQueryParams
    >({
      query: (params) => ({
        url: "/branch/all-branches",
        method: "GET",
        params,
      }),
      providesTags: ["BRANCHES"],
    }),

    getSingleBranch: builder.query<
      IResponse<IPartnerBranch>,
      string
    >({
      query: (id) => ({
        url: `/branch/${id}`,
        method: "GET",
      }),
      providesTags: ["BRANCH"],
    }),

    getAllTrashBranches: builder.query<
      BranchResponse,
      GetQueryParams
    >({
      query: (params) => ({
        url: "/branch/all-trash-branches",
        method: "GET",
        params,
      }),
      providesTags: ["BRANCHES"],
    }),

    softDeleteBranch: builder.mutation<
      IResponse<IPartnerBranch>,
      string
    >({
      query: (id) => ({
        url: `/branch/soft-delete/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["BRANCHES"],
    }),

    deleteBranch: builder.mutation<
      IResponse<null>,
      string
    >({
      query: (id) => ({
        url: `/branch/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["BRANCHES"],
    }),
  }),
});

export const {
  useCreateBranchMutation,
  useUpdateBranchMutation,
  useGetAllBranchesQuery,
  useGetSingleBranchQuery,
  useGetAllTrashBranchesQuery,
  useSoftDeleteBranchMutation,
  useDeleteBranchMutation,
} = branchApi;