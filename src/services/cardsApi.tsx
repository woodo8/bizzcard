import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const cardApi = createApi({
    reducerPath: "cardApi",
    baseQuery: fetchBaseQuery({
        // Local
        // baseUrl: "http://localhost:8080/"
        baseUrl: process.env.REACT_APP_BASE_URL
        // Server
        // baseUrl: "https://bizzcard-back.onrender.com/"
    }),
    endpoints: (builder) => ({
        getCard: builder.query({
            query: (id) => ({
                url: `/cards/get_card/${id}`,
                method: "GET",
            })
        }),
        getMyCards: builder.query({
            query: (payload) => ({
                headers: {
                    authorization: `Bearer ${payload.token}`,
                },
                url: `/cards/get_my_cards/${payload.id}`,
                method: "GET",
            })
        }),
        createNewCard: builder.mutation({
            query: (payload) => ({
                headers: {
                    authorization: `Bearer ${payload.token}`,
                },
                url: `/cards/create_card/${payload.id}`,
                body: payload.body,
                method: "POST",
            })
        }),
        editCard: builder.mutation({
            query: (payload) => ({
                headers: {
                    authorization: `Bearer ${payload.token}`,
                },
                url: `/cards/edit_card/${payload.owner}/${payload.id}`,
                body: payload.body,
                method: "PATCH",
            })
        })
    })
});

export const {
    useGetCardQuery, useGetMyCardsQuery, useCreateNewCardMutation, useEditCardMutation
} = cardApi;