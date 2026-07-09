import { baseApi } from "../baseApi";

export type PaymentStatus =
    | "UNPAID"
    | "PAID"
    | "COMPLETED"
    | "FAILED"
    | "CANCELLED"
    | "REFUNDED";

export interface IPayment {
    _id: string;
    subscription:
    | string
    | {
        _id: string;
        planType?: string;
        durationInMonths?: number;
        price?: number;
        status?: string;
    };
    transactionId: string;
    amount: number;
    status: PaymentStatus;
    isDeleted: boolean;
    refundData?: {
        status?: string;
        refund_ref_id?: string;
        errorReason?: string;
        [key: string]: any;
    };
    refundRefId?: string;
    refundedAt?: string;
    createdAt?: string;
    updatedAt?: string;
}


interface IPaymentListResponse {
    data: IPayment[];
    meta: {
        page: number;
        limit: number;
        total: number;
        totalPage: number;
    };
    stats: {
        total: number;
        completed: number;
        unpaid: number;
        failed: number;
        cancelled: number;
        refunded: number;
        totalRevenue: number;
    };
}

interface ISinglePaymentResponse {
    data: IPayment;
}

interface GetPaymentsParams {
    searchTerm?: string;
    status?: string;
    page?: number;
    limit?: number;
    startDate?: string;
    endDate?: string;
    sort?: string;
}

export const paymentApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        getAllPayments: builder.query<IPaymentListResponse, GetPaymentsParams | undefined>({
            query: (params) => ({
                url: "/payment/all-payments",
                method: "GET",
                params,
            }),
            providesTags: ["PAYMENTS"],
        }),

        getAllTrashPayments: builder.query<IPaymentListResponse, GetPaymentsParams | undefined>({
            query: (params) => ({
                url: "/payment/all-trash-payments",
                method: "GET",
                params,
            }),
            providesTags: ["PAYMENTS"],
        }),

        getSinglePayment: builder.query<ISinglePaymentResponse, string>({
            query: (id) => ({
                url: `/payment/${id}`,
                method: "GET",
            }),
            providesTags: ["PAYMENTS"],
        }),

        // updatePayment: builder.mutation<ISinglePaymentResponse, { id: string; data: Partial<Pick<IPayment, "status">> }>({
        //     query: ({ id, data }) => ({
        //         url: `/payment/${id}`,
        //         method: "PATCH",
        //         data,
        //     }),
        //     invalidatesTags: ["PAYMENTS"],
        // }),

        updatePayment: builder.mutation<
            ISinglePaymentResponse,
            { id: string; data: { status?: PaymentStatus; refundRemarks?: string } }
        >({
            query: ({ id, data }) => ({
                url: `/payment/${id}`,
                method: "PATCH",
                data,
            }),
            invalidatesTags: ["PAYMENTS"],
        }),
        softDeletePayment: builder.mutation<ISinglePaymentResponse, string>({
            query: (id) => ({
                url: `/payment/soft-delete/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["PAYMENTS"],
        }),

        restorePayment: builder.mutation<ISinglePaymentResponse, string>({
            query: (id) => ({
                url: `/payment/restore/${id}`,
                method: "PATCH",
            }),
            invalidatesTags: ["PAYMENTS"],
        }),

        deletePayment: builder.mutation<ISinglePaymentResponse, string>({
            query: (id) => ({
                url: `/payment/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["PAYMENTS"],
        }),
    }),
});

export const {
    useGetAllPaymentsQuery,
    useGetAllTrashPaymentsQuery,
    useGetSinglePaymentQuery,
    useUpdatePaymentMutation,
    useSoftDeletePaymentMutation,
    useRestorePaymentMutation,
    useDeletePaymentMutation,
} = paymentApi;