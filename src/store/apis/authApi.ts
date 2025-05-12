import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    }
  }),
  tagTypes: ["Auth"],
  endpoints: (builder) => ({
    signup: builder?.mutation({
      query: (payload) => ({
        url: "/api/signup",
        body: payload,
        method: "POST",
      }),
    }),
    login: builder?.mutation({
      query: (payload) => ({
        url: "/api/login",
        body: payload,
        method: "POST",
      }),
      invalidatesTags: ["Auth"],
    }),
    refresh: builder?.mutation({
      query: () => ({
        url: "/api/refresh",
        method: "POST",
      }),
    }),
    getAuthData: builder?.query({
      query: () => ({
        url: "/api/auth-data",
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Auth"],
    }),
    logout: builder?.mutation({
      query: () => ({
        url: "/api/logout",
        method: "POST",
      }),
    }),
    forgotPassword: builder?.mutation({
      query: (email: string) => ({
        url: "/api/forgot-password",
        method: "POST",
        body: { email },
      })
    }),
    resetPassword: builder?.mutation({
      query: (payload) => ({
        url: "/api/reset-password",
        method: "POST",
        body: JSON.stringify(payload),
      })
    })
  }),
});

export default authApi;

export const {
  useSignupMutation,
  useLoginMutation,
  useRefreshMutation,
  useGetAuthDataQuery,
  useLogoutMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation
} = authApi;
