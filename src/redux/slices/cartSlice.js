import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
    cart : localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [] ,
    total : localStorage.getItem("total") ? JSON.parse(localStorage.getItem('total')) : 0 ,
    totalItem : localStorage.getItem("totalitem") ? JSON.parse(localStorage.getItem('totalItem')) : 0 
}

const cart = createSlice({
    name : "cart",
    initialState ,
    reducers : {
        addToCart : (state , action) => {
            const course = action.payload
            const index = state.cart.findIndex( (item) => item._id === course._id)

            if(index >= 0){
                toast.error("Course already in cart")
                return
            }

            state.cart.push(action.payload)
            state.totalItem++
            state.total += action.payload.price

            localStorage.setItem("cart" , JSON.stringify(state.cart))
            localStorage.setItem("total" , JSON.stringify(state.total))
            localStorage.setItem("totalItem" , JSON.stringify(state.totalItem))

            toast.success("course added successfully")

        },

        removeFromCart : (state , action) => {
            const course = action.payload
            const index = state.cart.findIndex( (item) => item._id === course._id)

            if(index >= 0){
                state.totalItem--
                state.total -= state.cart[index].price
                state.cart.splice(index, 1)

                localStorage.setItem("cart" , JSON.stringify(state.cart))
                localStorage.setItem("total" , JSON.stringify(state.total))
                localStorage.setItem("totalItem" , JSON.stringify(state.totalItem))

                toast.success("course removed successfully") 
            }

            
        },

        resetCart : (state , action ) => {
            state.cart = [] ,
            state.total = 0 ,
            state .totalItem = 0

            localStorage.removeItem("cart")
            localStorage.removeItem("total")
            localStorage.removeItem("totalItem")
        }
    }
})

export const { addToCart , removeFromCart , resetCart} = cart.actions
export default cart.reducer