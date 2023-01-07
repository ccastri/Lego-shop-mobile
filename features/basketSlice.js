import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

export const getCartItems = createAsyncThunk('cart/getCartItems',
    async (_, thunkAPI) => {
        try {
            const resp = await axios.get(url);
            console.log(resp.data);
            const dataa = await resp.data
            console.log(dataa);
            return dataa;
        }
        catch (err) {
            console.log(err)
        }
    })

const initialState = {
    items: [],
}

export const basketSlice = createSlice({
    name: 'basket',
    initialState,
    reducers: {
        addToBasket: (state, action) => {
            state.items = [...state.items, action.payload] //lo que sea que tenias mas lo nuevo que llegue x payload
            // console.log(state.items)
        },
        removeFromBasket: (state, action) => {
            const index = state.items.findIndex(item => item.id === action.payload.id)

            let newBasket = [...state.items]
            if (index >= 0) {
                newBasket.splice(index, 1)
            } else {

                console.warn(`Product (id:${id}) cannot be removed. It's not yer in the basket`)
            }


            state.items = newBasket;
        },
        // incrementByAmount: (state, action) => {
        //     state.value += action.payload
        // },
    },
})

// Action creators are generated for each case reducer function
export const { addToBasket, removeFromBasket } = basketSlice.actions

export const selectBasketItems = (state) => state.basket.items

export const selectBasketItemsById = (state, id) =>
    state.basket.items.filter(item => item.id === id)

export const selectBasketTotal = state => state.basket.items.reduce((total, item) =>
    total += item.price, 0)
export default basketSlice.reducer