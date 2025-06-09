import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice"
import cartSlice from "./slices/cartSlice"
import profileSlice from  "./slices/profileSlice"

const store = configureStore({
    reducer : {
        auth : authSlice,
        cart : cartSlice,
        profile : profileSlice,
    }
})

export default store