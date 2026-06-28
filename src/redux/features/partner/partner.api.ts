
// import { IPartner } from "@/types/partner.types";
// import { baseApi } from "../baseApi";
// import {
//   IResponse,
//   GetQueryParams,
// } from "@/types";

// interface PartnerResponse {
//   success: boolean;
//   data: IPartner[];
//   meta: {
//     total: number;
//     totalPage: number;
//   };
//   stats: {
//     total: number;
//     active: number;
//     inactive: number;
//   };
// }

// export const partnerApi = baseApi.injectEndpoints({
//   endpoints: (builder) => ({
//     createPartner: builder.mutation<
//       IResponse<IPartner>,
//       Partial<IPartner>
//     >({
//       query: (data) => ({
//         url: "/partner/create-partner",
//         method: "POST",
//         data,
//       }),
//       invalidatesTags: ["PARTNERS"],
//     }),

//     updatePartner: builder.mutation<
//       IResponse<IPartner>,
//       { id: string; data: Partial<IPartner> }
//     >({
//       query: ({ id, data }) => ({
//         url: `/partner/${id}`,
//         method: "PATCH",
//         data,
//       }),
//       invalidatesTags: ["PARTNERS"],
//     }),

//     getAllPartners: builder.query<
//       PartnerResponse,
//       GetQueryParams
//     >({
//       query: (params) => ({
//         url: "/partner/all-partners",
//         method: "GET",
//         params,
//       }),
//       providesTags: ["PARTNERS"],
//     }),

//     getSinglePartner: builder.query<
//       IResponse<IPartner>,
//       string
//     >({
//       query: (id) => ({
//         url: `/partner/${id}`,
//         method: "GET",
//       }),
//       providesTags: ["PARTNER"],
//     }),

//     softDeletePartner: builder.mutation<
//       IResponse<IPartner>,
//       string
//     >({
//       query: (id) => ({
//         url: `/partner/soft-delete/${id}`,
//         method: "PATCH",
//       }),
//       invalidatesTags: ["PARTNERS"],
//     }),
//   }),
// });

// export const {
//   useCreatePartnerMutation,
//   useUpdatePartnerMutation,
//   useGetAllPartnersQuery,
//   useGetSinglePartnerQuery,
//   useSoftDeletePartnerMutation,
// } = partnerApi;


import { IPartner } from "@/types/partner.types";
import { baseApi } from "../baseApi";

interface IPartnerListResponse {
  data: IPartner[];
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

interface ISinglePartnerResponse {
  data: IPartner;
}

interface GetPartnersParams {
  searchTerm?: string;
  isActive?:   string;
  page?:       number;
  limit?:      number;
  startDate?:  string;
  endDate?:    string;
  sort?:       string;
}

export const partnerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    createPartner: builder.mutation<ISinglePartnerResponse, FormData>({
      query: (formData) => ({
        url: "/partner/create-partner",
        method: "POST",
        data: formData,
      }),
      invalidatesTags: ["PARTNERS"],
    }),

    getAllPartners: builder.query<IPartnerListResponse, GetPartnersParams | undefined>({
      query: (params) => ({
        url: "/partner/all-partners",
        method: "GET",
        params,
      }),
      providesTags: ["PARTNERS"],
    }),

    getAllTrashPartners: builder.query<IPartnerListResponse, GetPartnersParams | undefined>({
      query: (params) => ({
        url: "/partner/all-trash-partners",
        method: "GET",
        params,
      }),
      providesTags: ["PARTNERS"],
    }),

    getSinglePartner: builder.query<ISinglePartnerResponse, string>({
      query: (id) => ({
        url: `/partner/${id}`,
        method: "GET",
      }),
      providesTags: ["PARTNERS"],
    }),

    updatePartner: builder.mutation<ISinglePartnerResponse, { id: string; data: FormData }>({
      query: ({ id, data }) => ({
        url: `/partner/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["PARTNERS"],
    }),

    softDeletePartner: builder.mutation<ISinglePartnerResponse, string>({
      query: (id) => ({
        url: `/partner/soft-delete/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["PARTNERS"],
    }),

    deletePartner: builder.mutation<ISinglePartnerResponse, string>({
      query: (id) => ({
        url: `/partner/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["PARTNERS"],
    }),
  }),
});

export const {
  useCreatePartnerMutation,
  useGetAllPartnersQuery,
  useGetAllTrashPartnersQuery,
  useGetSinglePartnerQuery,
  useUpdatePartnerMutation,
  useSoftDeletePartnerMutation,
  useDeletePartnerMutation,
} = partnerApi;