import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isDark: false,

}

export const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        switchTheme: (state, action) => {
            state.isDark = (prevState) => !prevState.isDark;
            console.log(state.isDark)
        },
        // closeModal: (state, action) => {
        //     state.isDark = false;
        // },
    },
})

export const { switchTheme } =
    themeSlice.actions;

export default themeSlice.reducer;