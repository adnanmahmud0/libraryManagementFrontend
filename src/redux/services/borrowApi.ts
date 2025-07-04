import type { IBorrow, IBorrowSummary } from '@/types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export const borrowApi = createApi({
    reducerPath: 'borrowApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://library-management-five-delta.vercel.app/api/' }),
    tagTypes: ["Books", "Borrow"],
    endpoints: (builder) => ({
        borrowBook: builder.mutation<void, IBorrow>({
            query: (data) => ({
                url: 'borrow',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Books', 'Borrow'],
        }),
        getBorrowSummary: builder.query<IBorrowSummary[], void>({
            query: () => 'borrow',
            transformResponse: (response: { success: boolean; data: IBorrowSummary[] }) => response.data,
            providesTags: ['Borrow'],
        }),
    }),
});

export const {
    useBorrowBookMutation,
    useGetBorrowSummaryQuery,
} = borrowApi;
