// import { IInsurancePackage } from "@/types/package.types";
// import { baseApi } from "../baseApi";
// import {
//   IResponse,
//   GetQueryParams,
// } from "@/types";

// interface PackageResponse {
//   success: boolean;
//   data: IInsurancePackage[];
//   meta: {
//     total: number;
//     totalPage: number;
//   };
// }

// export const packageApi = baseApi.injectEndpoints({
//   endpoints: (builder) => ({
//     createPackage: builder.mutation<
//       IResponse<IInsurancePackage>,
//       Partial<IInsurancePackage>
//     >({
//       query: (data) => ({
//         url: "/package/create-package",
//         method: "POST",
//         data,
//       }),
//       invalidatesTags: ["PACKAGES"],
//     }),

//     updatePackage: builder.mutation<
//       IResponse<IInsurancePackage>,
//       {
//         id: string;
//         data: Partial<IInsurancePackage>;
//       }
//     >({
//       query: ({ id, data }) => ({
//         url: `/package/${id}`,
//         method: "PATCH",
//         data,
//       }),
//       invalidatesTags: ["PACKAGES"],
//     }),

//     getAllPackages: builder.query<
//       PackageResponse,
//       GetQueryParams
//     >({
//       query: (params) => ({
//         url: "/package/all-packages",
//         method: "GET",
//         params,
//       }),
//       providesTags: ["PACKAGES"],
//     }),

//     getSinglePackage: builder.query<
//       IResponse<IInsurancePackage>,
//       string
//     >({
//       query: (id) => ({
//         url: `/package/${id}`,
//         method: "GET",
//       }),
//       providesTags: ["PACKAGE"],
//     }),

//     getAllTrashPackages: builder.query<
//       PackageResponse,
//       GetQueryParams
//     >({
//       query: (params) => ({
//         url: "/package/all-trash-packages",
//         method: "GET",
//         params,
//       }),
//       providesTags: ["PACKAGES"],
//     }),

//     softDeletePackage: builder.mutation<
//       IResponse<IInsurancePackage>,
//       string
//     >({
//       query: (id) => ({
//         url: `/package/soft-delete/${id}`,
//         method: "PATCH",
//       }),
//       invalidatesTags: ["PACKAGES"],
//     }),

//     deletePackage: builder.mutation<
//       IResponse<null>,
//       string
//     >({
//       query: (id) => ({
//         url: `/package/${id}`,
//         method: "DELETE",
//       }),
//       invalidatesTags: ["PACKAGES"],
//     }),
//   }),
// });

// export const {
//   useCreatePackageMutation,
//   useUpdatePackageMutation,
//   useGetAllPackagesQuery,
//   useGetSinglePackageQuery,
//   useGetAllTrashPackagesQuery,
//   useSoftDeletePackageMutation,
//   useDeletePackageMutation,
// } = packageApi;


import {
  GetPackagesParams,
  IPackageListResponse,
  ISinglePackageResponse,
  IInsurancePackage,
} from "@/types/package.types";
import { baseApi } from "../baseApi";

export const packageApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    // ── CREATE ──────────────────────────────────────────────────────────────

    createPackage: builder.mutation<ISinglePackageResponse, Partial<IInsurancePackage>>({
      query: (data) => ({
        url: "/package/create-package",
        method: "POST",
        data,
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

    // ── UPDATE ───────────────────────────────────────────────────────────────

    updatePackage: builder.mutation<ISinglePackageResponse, { id: string; data: Partial<IInsurancePackage> }>({
      query: ({ id, data }) => ({
        url: `/package/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["PACKAGES"],
    }),

    // ── SOFT DELETE (move to trash) ───────────────────────────────────────────

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