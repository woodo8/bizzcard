import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        // Local
        // baseUrl: "http://localhost:8080/"
        baseUrl: process.env.REACT_APP_BASE_URL
        // Server
        // baseUrl: "https://bizzcard-back.onrender.com/"
    }),
    endpoints: (builder) => ({
        signup: builder.mutation({
            query: (user) => ({
                url: "/auth/signup",
                method: "POST",
                body: user
            })
        }),
        signin: builder.mutation({
            query: (user) => ({
                url: "/auth/signin",
                method: "POST",
                body: user
            })
        }),
        getUser: builder.query({

            query: (payload: any) => ({
                headers: {
                    authorization: `Bearer ${payload.token}`,
                },
                url: `/user/profile/${payload.id}`,
                method: "GET",
            })
        }),
        updateUser: builder.mutation({
            query: (payload: any) => ({
                headers: {
                    authorization: `Bearer ${payload.token}`,
                },
                url: `/user/edit_profile/${payload.id}`,
                method: "PATCH",
                body: payload.user
            })
        }),
        forgotPassword: builder.mutation({
            query: (payload) => ({
                url: "/auth/forgot_password",
                method: "POST",
                body: payload
            })
        }),
        resetPassword: builder.mutation({
            query: (payload) => ({
                headers: {
                    authorization: `Bearer ${payload.token}`,
                },
                url: `/auth/reset_password`,
                method: "PATCH",
                body: payload.data,
            })
        })
    })
});

export const {
    useSignupMutation,
    useSigninMutation,
    useGetUserQuery,
    useUpdateUserMutation,
    useForgotPasswordMutation,
    useResetPasswordMutation,
} = authApi;