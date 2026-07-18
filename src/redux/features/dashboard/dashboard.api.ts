import { baseApi } from "../baseApi";
import { IResponse } from "@/types";
import { IDashboardResponse, IManagerDashboardResponse } from "@/types/dashboard";

export const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardOverview: builder.query<IDashboardResponse, void>({
      query: () => ({
        url: "/dashboard/overview",
        method: "GET",
      }),
      providesTags: ["DASHBOARD"],
    }),

    getManagerDashboard: builder.query<IResponse<IManagerDashboardResponse>, void>({
      query: () => ({
        url: "/dashboard/manager",
        method: "GET",
      }),
      providesTags: ["DASHBOARD"],
    }),
  }),
});

export const {
  useGetDashboardOverviewQuery,
  useGetManagerDashboardQuery,
} = dashboardApi;