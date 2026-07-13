import { baseApi } from "../baseApi";
import { IDashboardResponse } from "@/types/dashboard";

export const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardOverview: builder.query<IDashboardResponse, void>({
      query: () => ({
        url: "/dashboard/overview",
        method: "GET",
      }),
      providesTags: ["DASHBOARD"],
    }),
  }),
});

export const {
  useGetDashboardOverviewQuery,
} = dashboardApi;