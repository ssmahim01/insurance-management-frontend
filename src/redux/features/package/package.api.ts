
import {
  GetPackagesParams,
  IPackageListResponse,
  ISinglePackageResponse,
} from "@/types/package.types";
import { baseApi } from "../baseApi";

export const packageApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    // ── CREATE ──────────────────────────────────────────────────────────────

    createPackage: builder.mutation<ISinglePackageResponse, FormData>({
      query: (formData) => ({
        url: "/package/create-package",
        method: "POST",
        data: formData,
      }),
      invalidatesTags: ["PACKAGES"],
    }),

    // ── GET ALL (active) ─────────────────────────────────────────────────────

    getAllPackages: builder.query<IPackageListResponse, GetPackagesParams | undefined>({
      query: (params) => ({
        url: "/package/all-packages",
        method: "GET",
        params,
      }),
      providesTags: ["PACKAGES"],
    }),

    // ── GET ALL TRASH ─────────────────────────────────────────────────────────

    getAllTrashPackages: builder.query<IPackageListResponse, GetPackagesParams | undefined>({
      query: (params) => ({
        url: "/package/all-trash-packages",
        method: "GET",
        params,
      }),
      providesTags: ["PACKAGES"],
    }),

    // ── GET SINGLE ───────────────────────────────────────────────────────────

    getSinglePackage: builder.query<ISinglePackageResponse, string>({
      query: (id) => ({
        url: `/package/${id}`,
        method: "GET",
      }),
      providesTags: ["PACKAGES"],
    }),

    // ── UPDATE ─────

    updatePackage: builder.mutation<ISinglePackageResponse, { id: string; data: FormData }>({
      query: ({ id, data }) => ({
        url: `/package/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["PACKAGES"],
    }),

    // ── SOFT DELETE (move to trash) ─────

    softDeletePackage: builder.mutation<ISinglePackageResponse, string>({
      query: (id) => ({
        url: `/package/soft-delete/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["PACKAGES"],
    }),

    // ── HARD DELETE (permanent) ───────────────────────────────────────────────

    deletePackage: builder.mutation<ISinglePackageResponse, string>({
      query: (id) => ({
        url: `/package/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["PACKAGES"],
    }),

  }),
});

export const {
  useCreatePackageMutation,
  useGetAllPackagesQuery,
  useGetAllTrashPackagesQuery,
  useGetSinglePackageQuery,
  useUpdatePackageMutation,
  useSoftDeletePackageMutation,
  useDeletePackageMutation,
} = packageApi;