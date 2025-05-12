import { configureStore } from "@reduxjs/toolkit";
import authApi from "./apis/authApi";
import authSlice from "./slices/authSlice";
import todoSlice from "./slices/todoSlice";
import todoApi from "./apis/todoApi";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    auth: authSlice.reducer,
    [todoApi.reducerPath]: todoApi.reducer,
    todo: todoSlice.reducer
  },
  devTools: true,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([authApi.middleware, todoApi.middleware])
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch