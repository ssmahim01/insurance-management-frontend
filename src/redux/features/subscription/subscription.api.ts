// redux/api/subscriptionApi.ts

import {
  GetSubscriptionsParams,
  ICreateSubscriptionPayload,
  ICreateSubscriptionResponse,
  ISingleSubscriptionResponse,
  ISubscriptionListResponse,
  IUpdateSubscriptionPayload,
} from "@/types/subscription.types";
import { baseApi } from "../baseApi";

export const subscriptionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    // ── CREATE ──────────────────────────────────────────────────────────────

    createSubscription: builder.mutation<ICreateSubscriptionResponse, ICreateSubscriptionPayload>({
      query: (payload) => ({
        url: "/subscription/create-subscription",
        method: "POST",
        data: payload,
      }),
      invalidatesTags: ["SUBSCRIPTIONS"],
    }),

    // ── GET ALL (admin/super-admin) ────────────────────────────────────────

    getAllSubscriptions: builder.query<ISubscriptionListResponse, GetSubscriptionsParams | undefined>({
      query: (params) => ({
        url: "/subscription/all-subscriptions",
        method: "GET",
        params,
      }),
      providesTags: ["SUBSCRIPTIONS"],
    }),

    // ── GET ALL TRASH ─────────────────────────────────────────────────────────

    getAllTrashSubscriptions: builder.query<ISubscriptionListResponse, GetSubscriptionsParams | undefined>({
      query: (params) => ({
        url: "/subscription/all-trash-subscriptions",
        method: "GET",
        params,
      }),
      providesTags: ["SUBSCRIPTIONS"],
    }),

    // ── GET BY AGENT (admin/super-admin/agent-leader) ────────────────────────

    getAgentsAllSubscriptions: builder.query<
      ISubscriptionListResponse,
      { id: string; params?: GetSubscriptionsParams }
    >({
      query: ({ id, params }) => ({
        url: `/subscription/agents-all-subscriptions/${id}`,
        method: "GET",
        params,
      }),
      providesTags: ["SUBSCRIPTIONS"],
    }),

    // ── AGENT LEADER'S OWN TEAM SUBSCRIPTIONS ─────────────────────────────────

    getAgentLeaderSubscriptions: builder.query<ISubscriptionListResponse, GetSubscriptionsParams | undefined>({
      query: (params) => ({
        url: "/subscription/leader-subscriptions/me",
        method: "GET",
        params,
      }),
      providesTags: ["SUBSCRIPTIONS"],
    }),

    // ── AGENT LEADER SUBSCRIPTIONS BY ADMIN ───────────────────────────────────

    getAgentLeaderSubscriptionsByAdmin: builder.query<
      ISubscriptionListResponse,
      { id: string; params?: GetSubscriptionsParams }
    >({
      query: ({ id, params }) => ({
        url: `/subscription/leader-subscriptions/${id}`,
        method: "GET",
        params,
      }),
      providesTags: ["SUBSCRIPTIONS"],
    }),

    // ── MY SUBSCRIPTIONS (any authenticated role) ─────────────────────────────

    getMySubscriptions: builder.query<ISubscriptionListResponse, GetSubscriptionsParams | undefined>({
      query: (params) => ({
        url: "/subscription/my-subscriptions",
        method: "GET",
        params,
      }),
      providesTags: ["SUBSCRIPTIONS"],
    }),

    // ── GET SINGLE ───────────────────────────────────────────────────────────

    getSingleSubscription: builder.query<ISingleSubscriptionResponse, string>({
      query: (id) => ({
        url: `/subscription/${id}`,
        method: "GET",
      }),
      providesTags: ["SUBSCRIPTIONS"],
    }),

    // ── UPDATE ─────────────────────────────────────────────────────────────

    updateSubscription: builder.mutation<ISingleSubscriptionResponse, { id: string; data: IUpdateSubscriptionPayload }>({
      query: ({ id, data }) => ({
        url: `/subscription/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["SUBSCRIPTIONS"],
    }),

    // ── SOFT DELETE (move to trash) ────────────────────────────────────────

    softDeleteSubscription: builder.mutation<ISingleSubscriptionResponse, string>({
      query: (id) => ({
        url: `/subscription/soft-delete/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["SUBSCRIPTIONS"],
    }),

  }),
});

export const {
  useCreateSubscriptionMutation,
  useGetAllSubscriptionsQuery,
  useGetAllTrashSubscriptionsQuery,
  useGetAgentsAllSubscriptionsQuery,
  useGetAgentLeaderSubscriptionsQuery,
  useGetAgentLeaderSubscriptionsByAdminQuery,
  useGetMySubscriptionsQuery,
  useGetSingleSubscriptionQuery,
  useUpdateSubscriptionMutation,
  useSoftDeleteSubscriptionMutation,
} = subscriptionApi;