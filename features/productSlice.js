import { createSlice } from "@reduxjs/toolkit";
// import { createSlice, } from "@reduxjs/toolkit"

const initialState = {
    product: []
}




export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setProducts: (state, action) => {
            state.product = action.payload
            // console.log(state.product.id)
        }
    },
})

// Action creators are generated for each case reducer function
export const { setProducts } = productSlice.actions
export const getProducts = (state) => state.product.product;
export const selectProductById = (state, id) =>
    state.product.product.filter(item => item.id === id)

export default productSlice.reducer