import { configureStore } from "@reduxjs/toolkit";
import { goodsApi } from "./services/goods";
import goodsSlice from "./services/goodsSlice";

export const createStore = (options) =>
  configureStore({
    reducer: {
      goods: goodsSlice,
      [goodsApi.reducerPath]: goodsApi.reducer,
    },
    middleware: (middleware) => middleware().concat(goodsApi.middleware),
    ...options,
  });

export const store = createStore();
