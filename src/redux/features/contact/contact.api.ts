import {
  IContactQueryParams,
  IContactResponse,
  IContactsResponse,
  ICreateContact,
} from "@/types/contact.type";

import { baseApi } from "../baseApi";

export const contactApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // CREATE CONTACT
    createContact: builder.mutation<IContactResponse,ICreateContact>({
      query: (payload) => ({
        url: "/contact/create-contact",
        method: "POST",
        data: payload,
      }),

      invalidatesTags: ["CONTACTS"],
    }),

    // GET ALL CONTACTS
    getAllContacts: builder.query<IContactsResponse,IContactQueryParams>({
      query: (params) => ({
        url: "/contact/all-contacts",
        method: "GET",
        params,
      }),

      providesTags: ["CONTACTS"],
    }),

      // GET ALL TRASH CONTACTS
    getAllTrashContacts: builder.query<IContactsResponse, IContactQueryParams>({
      query: (params) => ({
        url: "/contact/all-trash-contacts",
        method: "GET",
        params,
      }),
      providesTags: ["CONTACTS"],
    }),

    // GET SINGLE CONTACT
    getSingleContact: builder.query<IContactResponse,string>({
      query: (id) => ({
        url: `/contact/${id}`,
        method: "GET",
      }),

      providesTags: ["CONTACTS"],
    }),

    // MARK AS READ
    markAsRead: builder.mutation<IContactResponse, string>({
      query: (id) => ({
        url: `/contact/read/${id}`,
        method: "PATCH",
      }),

      invalidatesTags: ["CONTACTS"],
    }),

    // MARK AS REPLIED
    markAsReplied: builder.mutation<IContactResponse,string>({
      query: (id) => ({
        url: `/contact/reply/${id}`,
        method: "PATCH",
      }),

      invalidatesTags: ["CONTACTS"],
    }),

    // SOFT DELETE CONTACT
    softDeleteContact: builder.mutation<IContactResponse,string>({
      query: (id) => ({
        url: `/contact/${id}`,
        method: "DELETE",
      }),

      invalidatesTags: ["CONTACTS"],
    }),


  // RESTORE CONTACT
  restoreContact: builder.mutation<IContactResponse, string>({
    query: (id) => ({
      url: `/contact/restore/${id}`,
      method: "POST",
    }),
    invalidatesTags: ["CONTACTS"],
  }),

  // PERMANENT DELETE CONTACT
  deleteContact: builder.mutation<IContactResponse, string>({
    query: (id) => ({
      url: `/contact/permanent/${id}`,
      method: "DELETE",
    }),
    invalidatesTags: ["CONTACTS"],
  }),
  }),
});


export const {
  useCreateContactMutation,

  useGetAllContactsQuery,
  useLazyGetAllContactsQuery,

  useGetSingleContactQuery,
  useLazyGetSingleContactQuery,

  useMarkAsReadMutation,
  useMarkAsRepliedMutation,

  useSoftDeleteContactMutation,

  useGetAllTrashContactsQuery,
  useRestoreContactMutation,
  useDeleteContactMutation,
} = contactApi;