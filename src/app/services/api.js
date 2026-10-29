import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react'


const baseQuery = fetchBaseQuery({
    baseUrl: 'https://api.favorit-parts.ru/hs/hsprice',
    paramsSerializer: (params) => {
        return Object.entries(params)
            .map(([key, val]) => `${key}=${encodeURIComponent(val)}`)
            .join('&');
    }
})

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 3 })

export const api = createApi({
    reducerPath: 'splitApi',
    baseQuery: baseQueryWithRetry,
    endpoints: () => ({})
})