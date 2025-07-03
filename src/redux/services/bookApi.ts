import type {IBooksApiResponse } from '@/types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export const bookApi = createApi({
    reducerPath: 'bookApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://library-management-five-delta.vercel.app/api/' }),
    tagTypes: ['Books'],
    endpoints: (builder) => ({

        //getbook
        getBooks: builder.query<IBooksApiResponse, { filter?: string; sortBy?: string; sort?: string; limit?: number; page?: number; }>({
            query: ({ filter, sortBy = "createdAt", sort = "desc", limit = 5, page = 1 }) => {
                const params = new URLSearchParams();
                if (filter) params.append("filter", filter);
                if (sortBy) params.append("sortBy", sortBy);
                if (sort) params.append("sort", sort);
                if (limit) params.append("limit", limit.toString());
                if (page) params.append("page", page.toString());

                return `/books?${params.toString()}`;
            },
        }),

        //getbook by id
        getBookById: builder.query({
            query: (id) => `books/${id}`,
        }),

        //add book
        addBook: builder.mutation({
            query: (data) => ({
                url: 'books',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Books'],
        }),

        //update book
        updateBook: builder.mutation({
            query: ({ id, data }) => ({
                url: `books/${id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Books'],
        }),

        //delete book
        deleteBook: builder.mutation({
            query: (id) => ({
                url: `books/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Books'],
        }),

    }),
});

export const {
    useGetBooksQuery,
    useGetBookByIdQuery,
    useAddBookMutation,
    useUpdateBookMutation,
    useDeleteBookMutation,
} = bookApi;
