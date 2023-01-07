import { configureStore } from '@reduxjs/toolkit'
import productReducer from './features/productSlice'
import basketReducer from './features/basketSlice'
// ...
export const store = configureStore({
    reducer: {
        product: productReducer,
        basket: basketReducer,
    },
})
