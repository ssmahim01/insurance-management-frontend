
import { GetClaimsParams, IClaimListResponse, ISingleClaimResponse } from "@/types/claim.types";
import { baseApi } from "../baseApi";

export const claimApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    // ── CREATE ──────────────────────────────────────────────────────────────

    createClaim: builder.mutation<ISingleClaimResponse, FormData>({
      query: (formData) => ({
        url: "/claim/create",
        method: "POST",
        data: formData,
      }),
      invalidatesTags: ["CLAIMS"],
    }),

    // ── GET ALL (active) ─────────────────────────────────────────────────────

    getAllClaims: builder.query<IClaimListResponse, GetClaimsParams | undefined>({
      query: (params) => ({
        url: "/claim/all-claims",
        method: "GET",
        params,
      }),
      providesTags: ["CLAIMS"],
    }),

    // ── GET ALL TRASH ─────────────────────────────────────────────────────────

    getAllTrashClaims: builder.query<IClaimListResponse, GetClaimsParams | undefined>({
      query: (params) => ({
        url: "/claim/all-trash-claims",
        method: "GET",
        params,
      }),
      providesTags: ["CLAIMS"],
    }),

    // ── GET SINGLE ───────────────────────────────────────────────────────────

    getSingleClaim: builder.query<ISingleClaimResponse, string>({
      query: (id) => ({
        url: `/claim/${id}`,
        method: "GET",
      }),
      providesTags: ["CLAIMS"],
    }),

    // ── UPDATE ─────

    updateClaim: builder.mutation<ISingleClaimResponse, { id: string; data: FormData }>({
      query: ({ id, data }) => ({
        url: `/claim/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["CLAIMS"],
    }),

    // ── ADMIN REVIEW ───────────────────────────────────────────────────────────

    reviewClaim: builder.mutation<ISingleClaimResponse, { id: string; data: { status: string; adminNote?: string } }>({
      query: ({ id, data }) => ({
        url: `/claim/review/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["CLAIMS"],
    }),

    // ── SOFT DELETE (move to trash) ─────

    softDeleteClaim: builder.mutation<ISingleClaimResponse, string>({
      query: (id) => ({
        url: `/claim/soft-delete/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["CLAIMS"],
    }),

    // Restore claim from trash
    restoreClaim: builder.mutation<ISingleClaimResponse, string>({
      query: (id) => ({
        url: `/claim/restore/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["CLAIMS"],
    }),

    // ── HARD DELETE (permanent) ───────────────────────────────────────────────

    deleteClaim: builder.mutation<ISingleClaimResponse, string>({
      query: (id) => ({
        url: `/claim/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["CLAIMS"],
    }),

  }),
});

export const {
  useCreateClaimMutation,
  useGetAllClaimsQuery,
  useGetAllTrashClaimsQuery,
  useGetSingleClaimQuery,
  useUpdateClaimMutation,
  useReviewClaimMutation,
  useSoftDeleteClaimMutation,
  useDeleteClaimMutation,
  useRestoreClaimMutation,
} = claimApi;