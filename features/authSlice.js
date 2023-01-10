import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    userInfo: {
        id: null,
        name: null,
        email: null,
        imgUrl: null,
        password: null,
        id_token: null, // for storing the JWT
    }, // for user object
    error: null,
    success: false,

}


export const createUser = () => {
    createUserWithEmailAndPassword(auth, user.email, user.password)
        .then(userCredential => {
            Alert.alert('Account created!')
            const user = userCredential.user;

        }).catch(err => {
            console.log(err)
        })
}
// !Sign in:
const handleSignIn = () => {
    signInWithEmailAndPassword(auth, user.email, user.password)
        .then((userCredential) => {
            console.log(`Welcome ${email}!`)
            const user = userCredential.user;
            return user
            // user && navigation.navigate('Home')

        }).catch(err => {
            console.log(err)
            Alert.alert(err.message)
        })
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUserInfo: (state, action) => {
            state.userInfo = action.payload
            console.log(state.userInfo)
        },
        // closeModal: (state, action) => {
        //     state.isDark = false;
        // },
    },
})

export const { setUserInfo } =
    authSlice.actions;

export default authSlice.reducer;

export const setUser = (state) => state.userInfo.user