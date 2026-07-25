
import { baseApi } from "../baseApi";

export enum ConsultationStatus {
  INITIATED = "INITIATED",
  ELIGIBLE = "ELIGIBLE",
  BOOKED = "BOOKED",
  PAID = "PAID",
  RINGING = "RINGING",
  ACCEPTED = "ACCEPTED",
  REJECTED = "REJECTED",
  TIMEOUT = "TIMEOUT",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
  POOL_EXHAUSTED = "POOL_EXHAUSTED",
  FAILED = "FAILED",
}

export interface IConsultation {
  _id: string;
  customer: string;
  subscription: string;
  zaynaxBookingId?: string;
  zaynaxOrderType?: string;
  roomId?: string;
  doctorId?: string;
  doctorName?: string;
  status: ConsultationStatus;
  failureReason?: string;
  callStartedAt?: string;
  callEndedAt?: string;
  prescriptionUrl?: string;
  isDeleted: boolean;
  createdAt?: string;
  updatedAt?: string;
}

interface IInitiateConsultationResult {
  consultationId: string;
  roomId: string;
  orderID: string;
  doctorInfo: {
    firstName: { en: string; bn: string };
    lastName: { en: string; bn: string };
    image: string;
  };
  zaynaxAuthToken: string;
}

interface IInitiateConsultationResponse {
  data: IInitiateConsultationResult;
}

interface IConsultationListResponse {
  data: IConsultation[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
}

interface ISingleConsultationResponse {
  data: IConsultation;
}

interface IConsultationCountResponse {
  data: { count: number };
}

interface IFetchPrescriptionResponse {
  data: { prescriptionUrl: string | null; ready: boolean };
}

interface IActiveConsultation {
  consultationId: string;
  roomId: string;
  orderID?: string;
  zaynaxAuthToken: string;
}

interface IActiveConsultationResponse {
  data: IActiveConsultation | null;
}

interface GetConsultationsParams {
  searchTerm?: string;
  status?: string;
  page?: number;
  limit?: number;
  startDate?: string;
  endDate?: string;
  sort?: string;
}

interface IUpdateConsultationStatusPayload {
  id: string;
  status: ConsultationStatus;
  callStartedAt?: string;
  callEndedAt?: string;
  prescriptionUrl?: string;
}

export const consultationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    initiateConsultation: builder.mutation<IInitiateConsultationResponse, void>({
      query: () => ({
        url: "/consultation/initiate",
        method: "POST",
      }),
      invalidatesTags: ["CONSULTATIONS"],
    }),

    getMyConsultations: builder.query<IConsultationListResponse, GetConsultationsParams | undefined>({
      query: (params) => ({
        url: "/consultation/my-consultations",
        method: "GET",
        params,
      }),
      providesTags: ["CONSULTATIONS"],
    }),

    getMyConsultationCount: builder.query<IConsultationCountResponse, void>({
      query: () => ({
        url: "/consultation/my-consultations/count",
        method: "GET",
      }),
      providesTags: ["CONSULTATIONS"],
    }),

    getSingleConsultation: builder.query<ISingleConsultationResponse, string>({
      query: (id) => ({
        url: `/consultation/${id}`,
        method: "GET",
      }),
      providesTags: ["CONSULTATIONS"],
    }),

    // Checked once on page load so the frontend can proactively reconnect
    // a socket and listen for a doctor callback on a booking from an
    // earlier (not-yet-terminal) attempt.
    getActiveConsultation: builder.query<IActiveConsultationResponse, void>({
      query: () => ({
        url: "/consultation/active",
        method: "GET",
      }),
      providesTags: ["CONSULTATIONS"],
    }),

    updateConsultationStatus: builder.mutation<ISingleConsultationResponse, IUpdateConsultationStatusPayload>({
      query: ({ id, ...body }) => ({
        url: `/consultation/${id}/status`,
        method: "PATCH",
        data: body,
      }),
      invalidatesTags: ["CONSULTATIONS"],
    }),

    fetchPrescription: builder.mutation<IFetchPrescriptionResponse, string>({
      query: (id) => ({
        url: `/consultation/${id}/prescription`,
        method: "GET",
      }),
      invalidatesTags: ["CONSULTATIONS"],
    }),
  }),
});

export const {
  useInitiateConsultationMutation,
  useGetMyConsultationsQuery,
  useGetMyConsultationCountQuery,
  useGetSingleConsultationQuery,
  useGetActiveConsultationQuery,
  useUpdateConsultationStatusMutation,
  useFetchPrescriptionMutation,
} = consultationApi;