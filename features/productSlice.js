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
            // product && console.log(product)
        }
    },
})

// Action creators are generated for each case reducer function
export const { setProducts } = productSlice.actions
// !Puede ser que tenga que hacer el fetch de los productos aquí
// !O en el app también podría hacer. !La idea es: 
//! con un solo fetch mostrar los productos en home
//! y organizarlos en el carrito screen
// export const selectProduct = (state) => state
export const getProducts = (state) => state.product?.product;
// export const selectProductById = (state, id) => state

export default productSlice.reducer