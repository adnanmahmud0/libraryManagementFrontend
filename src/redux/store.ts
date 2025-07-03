
import { configureStore } from "@reduxjs/toolkit";
import { bookApi } from "./services/bookApi";


export const store = configureStore({
  reducer: {
    [bookApi.reducerPath]: bookApi.reducer,

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(bookApi.middleware)
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
