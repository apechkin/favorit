import { api } from "./api";

export const goodsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getGoodsByParams: builder.query({
      query: (arg) => ({
        url: "/",
        params: {
          ...arg,
          ...(arg?.analogues ? { analogues: "on" } : {}),
          ...(arg?.info ? { info: "on" } : {}),
        },
      }),
    }),
  }),
});

export const { useGetGoodsByParamsQuery } = goodsApi;
