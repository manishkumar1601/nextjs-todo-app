import { Todo } from "@/constants";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";



const todoApi = createApi({
  reducerPath: "todoApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000",
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      const state: any = getState();
      const token = state?.auth?.token;
      if (token) {
          headers.set("Authorization", `Bearer ${token}`);
      }
      headers.set("Content-Type", "application/json");
      return headers;
    }
  }),
  tagTypes: ["Todo"],
  endpoints: (builder) => ({
    getTodos: builder?.query<any, string>({
      query: (userId: string) => ({
        url: userId ? `/api/todo?userId=${userId}` : '/api/todo',
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Todo"],
    }),
    createTodo: builder?.mutation<any, Partial<Todo>>({
      query: (payload: Partial<Todo>) => ({
        url: "/api/todo",
        body: payload,
        method: "POST",
        credentials: "include",
      }),
      invalidatesTags: ["Todo"],
    }),
    updateTodo: builder?.mutation<any, Partial<Todo>>({
      query: (payload: Partial<Todo>) => ({
        url: `/api/todo/${payload?.id}`,
        body: payload,
        method: "PATCH",
        credentials: "include",
      }),
      invalidatesTags: ["Todo"],
    }),
    deleteTodo: builder?.mutation<any, Partial<Todo>>({
      query: (payload: Partial<Todo>) => ({
        url: `/api/todo/${payload?.id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["Todo"],
    }),
    deleteAllTodos: builder?.mutation<void, void>({
      query: () => ({
        url: "/api/todo",
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["Todo"],
    })
  }),
});

export default todoApi;

export const {
  useGetTodosQuery,
  useCreateTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
  useDeleteAllTodosMutation
} = todoApi;