import { IContactResponse, ICreateContact } from "@/types/contact.type";
import { baseApi } from "../baseApi";

export const contactApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createContact: builder.mutation<IContactResponse, ICreateContact>({
      query: (payload) => ({
        url: "/contact/create-contact",
        method: "POST",
        data: payload,
      }),
      invalidatesTags: ["CONTACTS"],
    }),
  }),
});

export const { useCreateContactMutation } = contactApi;
