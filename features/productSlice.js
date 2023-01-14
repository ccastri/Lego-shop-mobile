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
            // console.log(product)
        }
    },
})

// Action creators are generated for each case reducer function
export const { setProduct } = productSlice.actions
// !Puede ser que tenga que hacer el fetch de los productos aquí
// !O en el app también podría hacer. !La idea es: 
//! con un solo fetch mostrar los productos en home
//! y organizarlos en el carrito screen
export const selectProduct = (state) => state
// export const selectProductById = (state, id) => state

export default productSlice.reducer