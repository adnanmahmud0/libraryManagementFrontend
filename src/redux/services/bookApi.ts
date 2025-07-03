import type { IBook } from '@/types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export const bookApi = createApi({
    reducerPath: 'bookApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://library-management-five-delta.vercel.app/api/' }),
    tagTypes: ['Books'],
    endpoints: (builder) => ({

        //getbook
        getBooks: builder.query<IBook[], void>({
            query: () => "books",
            transformResponse: (response: {
                success: boolean;
                message: string;
                data: IBook[];
            }) => response.data,
            providesTags: ["Books"],
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
