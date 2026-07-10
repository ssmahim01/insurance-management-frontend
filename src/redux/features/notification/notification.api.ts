// notification.api.ts
import { baseApi } from "../baseApi";

export enum NotificationType {
  SUBSCRIPTION_CREATED = "SUBSCRIPTION_CREATED",
  PAYMENT_SUCCESS = "PAYMENT_SUCCESS",
  PAYMENT_FAILED = "PAYMENT_FAILED",
  SUBSCRIPTION_EXPIRING = "SUBSCRIPTION_EXPIRING",
  SUBSCRIPTION_EXPIRED = "SUBSCRIPTION_EXPIRED",
  GENERAL = "GENERAL",
  CLAIM = "CLAIM",
}

export interface INotification {
  _id: string;
  user: string | { _id: string; name: string; phone: string; role: string };
  title: string;
  message: string;
  type?: NotificationType;
  isRead: boolean;
  isDeleted: boolean;
  createdAt?: string;
  updatedAt?: string;
}

interface INotificationListResponse {
  data: INotification[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
  stats: {
    total: number;
    read: number;
    unread: number;
  };
}

interface ISingleNotificationResponse {
  data: INotification;
}

interface GetNotificationsParams {
  searchTerm?: string;
  isRead?:     string;
  type?:       string;
  userId?:     string;
  phone?:      string;
  page?:       number;
  limit?:      number;
  startDate?:  string;
  endDate?:    string;
  sort?:       string;
}

interface ICreateNotificationPayload {
  user:    string;
  title:   string;
  message: string;
}

export const notificationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    createNotification: builder.mutation<ISingleNotificationResponse, ICreateNotificationPayload>({
      query: (data) => ({
        url: "/notification/create-notification",
        method: "POST",
        data,
      }),
      invalidatesTags: ["NOTIFICATIONS"],
    }),

    getAllNotifications: builder.query<INotificationListResponse, GetNotificationsParams | undefined>({
      query: (params) => ({
        url: "/notification/all-notifications",
        method: "GET",
        params,
      }),
      providesTags: ["NOTIFICATIONS"],
    }),

    getAllTrashNotifications: builder.query<INotificationListResponse, GetNotificationsParams | undefined>({
      query: (params) => ({
        url: "/notification/all-trash-notifications",
        method: "GET",
        params,
      }),
      providesTags: ["NOTIFICATIONS"],
    }),

    getSingleNotification: builder.query<ISingleNotificationResponse, string>({
      query: (id) => ({
        url: `/notification/${id}`,
        method: "GET",
      }),
      providesTags: ["NOTIFICATIONS"],
    }),

    markAsRead: builder.mutation<ISingleNotificationResponse, string>({
      query: (id) => ({
        url: `/notification/${id}/read`,
        method: "PATCH",
      }),
      invalidatesTags: ["NOTIFICATIONS"],
    }),

    softDeleteNotification: builder.mutation<ISingleNotificationResponse, string>({
      query: (id) => ({
        url: `/notification/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["NOTIFICATIONS"],
    }),

    restoreNotification: builder.mutation<ISingleNotificationResponse, string>({
      query: (id) => ({
        url: `/notification/restore/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["NOTIFICATIONS"],
    }),

    deleteNotification: builder.mutation<ISingleNotificationResponse, string>({
      query: (id) => ({
        url: `/notification/permanent/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["NOTIFICATIONS"],
    }),
  }),
});

export const {
  useCreateNotificationMutation,
  useGetAllNotificationsQuery,
  useGetAllTrashNotificationsQuery,
  useGetSingleNotificationQuery,
  useMarkAsReadMutation,
  useSoftDeleteNotificationMutation,
  useRestoreNotificationMutation,
  useDeleteNotificationMutation,
} = notificationApi;