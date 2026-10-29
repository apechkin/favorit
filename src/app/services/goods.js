import { api } from "./api"

const KEY = '00000000-0000-0000-0000-000000000001'

export const goodsApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getGoodsByParams: builder.query({
            query: (arg) => ({
                url: '',
                params: {
                    key: KEY,
                    ...(arg?.analogues ? { analogues: 'on' } : {}),
                    ...(arg?.info ? { info: 'on' } : {})
                }
            })
        })
    })
})

export const { useGetGoodsByParamsQuery } = goodsApi