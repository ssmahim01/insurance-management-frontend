import { baseApi } from "../baseApi";

export enum MessageType {
  SUBSCRIPTION = "SUBSCRIPTION",
  PAYMENT = "PAYMENT",
  CLAIM = "CLAIM",
  PROMOTIONAL = "PROMOTIONAL",
  GENERAL = "GENERAL",
  OTP = "OTP",
}

export interface IMessage {
  _id: string;
  message: string;
  phone: string;
  type?: MessageType;
  isDeleted: boolean;
  createdAt?: string;
  updatedAt?: string;
}

interface IMessageStats {
  total: number;
  byType: Record<MessageType, number>;
}

interface IMessageListResponse {
  data: IMessage[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
  stats: IMessageStats;
}

interface ISingleMessageResponse {
  data: IMessage;
}

interface GetMessagesParams {
  searchTerm?: string;
  type?: string;
  page?: number;
  limit?: number;
  startDate?: string;
  endDate?: string;
  sort?: string;
}

interface ICreateMessagePayload {
  message: string;
  phone: string;
  type?: MessageType;
}

export const messageApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    createMessage: builder.mutation<ISingleMessageResponse, ICreateMessagePayload>({
      query: (data) => ({
        url: "/message/create-message",
        method: "POST",
        data,
      }),
      invalidatesTags: ["MESSAGES"],
    }),

    getAllMessages: builder.query<IMessageListResponse, GetMessagesParams | undefined>({
      query: (params) => ({
        url: "/message/all-messages",
        method: "GET",
        params,
      }),
      providesTags: ["MESSAGES"],
    }),

    getAllTrashMessages: builder.query<IMessageListResponse, GetMessagesParams | undefined>({
      query: (params) => ({
        url: "/message/all-trash-messages",
        method: "GET",
        params,
      }),
      providesTags: ["MESSAGES"],
    }),

    getMyMessages: builder.query<IMessageListResponse, GetMessagesParams | undefined>({
      query: (params) => ({
        url: "/message/my-messages",
        method: "GET",
        params,
      }),
      providesTags: ["MESSAGES"],
    }),

    getSingleMessage: builder.query<ISingleMessageResponse, string>({
      query: (id) => ({
        url: `/message/${id}`,
        method: "GET",
      }),
      providesTags: ["MESSAGES"],
    }),

    updateMessage: builder.mutation<ISingleMessageResponse, { id: string; data: Partial<ICreateMessagePayload> }>({
      query: ({ id, data }) => ({
        url: `/message/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["MESSAGES"],
    }),

    softDeleteMessage: builder.mutation<ISingleMessageResponse, string>({
      query: (id) => ({
        url: `/message/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["MESSAGES"],
    }),

    restoreMessage: builder.mutation<ISingleMessageResponse, string>({
      query: (id) => ({
        url: `/message/restore/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["MESSAGES"],
    }),

    deleteMessage: builder.mutation<ISingleMessageResponse, string>({
      query: (id) => ({
        url: `/message/permanent/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["MESSAGES"],
    }),
  }),
});

export const {
  useCreateMessageMutation,
  useGetAllMessagesQuery,
  useGetMyMessagesQuery,
  useGetAllTrashMessagesQuery,
  useGetSingleMessageQuery,
  useUpdateMessageMutation,
  useSoftDeleteMessageMutation,
  useRestoreMessageMutation,
  useDeleteMessageMutation,
} = messageApi;