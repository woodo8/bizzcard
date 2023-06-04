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
        getAllCards: builder.query({
            query: () => ({
                url: `/cards/get_all_cards/`,
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
        }),
        createNewPortfolio: builder.mutation({
            query: (payload) => ({
                headers: {
                    authorization: `Bearer ${payload.token}`,
                },
                url: `/portfolio/create_portfolio/${payload.id}`,
                body: payload.body,
                method: "POST",
            })
        }),
        getAllPortfolios: builder.query({
            query: (id) => ({
                url: `/portfolio/get_portfolio/${id}`,
                method: "GET",
            })
        }),
        deletePortfolio: builder.mutation({
            query: ({ id, token }) => ({
                headers: {
                    authorization: `Bearer ${token}`,
                },
                url: `/portfolio/remove_portfolio/${id}`,
                method: "DELETE",
            })
        }),
    })
});

export const {
    useGetCardQuery,
    useGetMyCardsQuery,
    useCreateNewCardMutation,
    useEditCardMutation,
    useGetAllCardsQuery,
    useCreateNewPortfolioMutation,
    useGetAllPortfoliosQuery,
    useDeletePortfolioMutation
} = cardApi;