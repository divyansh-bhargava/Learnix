import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userData: null,
    loading: false,
    token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null,
}

const auth = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUserData: (state, action) => {
            state.userData = action.payload
            localStorage.setItem("token" , JSON.stringify(state.userData))
        },
   
        setLoading(state, value) {
            state.loading = value.payload;
        },

        setToken(state, value) {
            state.token = value.payload;
            localStorage.setItem("token" , JSON.stringify(state.token))
        },


    }
})

export const { setUserData , setLoading , setToken } = auth.actions;

export default auth.reducer