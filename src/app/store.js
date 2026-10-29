import { configureStore } from '@reduxjs/toolkit'
import { goodsApi } from './services/goods'

export const createStore = (options) => configureStore({
    reducer: {
        [goodsApi.reducerPath]: goodsApi.reducer
    },
    middleware: (middleware) => middleware().concat(goodsApi.middleware),
    ...options
})

export const store = createStore()