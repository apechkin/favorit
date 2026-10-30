import { configureStore } from "@reduxjs/toolkit";
import { goodsApi } from "./services/goodsApi";
import goodsFilterSlice from "./services/goodsFilterSlice";
import goodsSearchSlice from "./services/goodsSearchSlice";

export const createStore = (options) =>
  configureStore({
    reducer: {
      goodsFilter: goodsFilterSlice,
      goodsSearch: goodsSearchSlice,
      [goodsApi.reducerPath]: goodsApi.reducer,
    },
    middleware: (middleware) => middleware().concat(goodsApi.middleware),
    ...options,
  });

export const store = createStore();
