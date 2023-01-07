import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    product: {
        id: null,
        imgUrl: null,
        title: null,
        rating: null,
        genre: null,
        short_description: null,
        price: null,
    },
}

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setProducts: (state, action) => {
            state.product = action.payload
        }
    },
})

// Action creators are generated for each case reducer function
export const { setProduct } = productSlice.actions

export const selectProduct = (state) => state

export default productSlice.reducer