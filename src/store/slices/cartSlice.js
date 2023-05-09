import { createSlice } from "@reduxjs/toolkit";

const initialState = JSON.parse(localStorage.getItem("cart"))

export const cartSlice = createSlice({
    name:"cart",
    initialState: initialState!==null?initialState:{items:[]},
    reducers:{
        addToCart:(state,item)=>{
            const index = state.items.findIndex(i => i.product.id===item.payload.product.id?i.variantIndex===item.payload.variantIndex:false)
            if (index !== -1){
                state.items[index].quantity += item.payload.quantity
            }else{
                state.items.push(item.payload)
            }
            localStorage.setItem("cart",JSON.stringify(state))
        },
        removeFromCart:(state,i)=>{
            state.items = state.items.filter(item=>(item.product.id!==i.payload.id?true:item.variantIndex!==i.payload.variantIndex))
            localStorage.setItem("cart",JSON.stringify(state))
        },
        changeQuantity:(state,item)=>{
            const index = state.items.findIndex(i => i.product.id===item.payload.id?i.variantIndex===item.payload.variantIndex:false)
            if (index !== -1){
                state.items[index].quantity = item.payload.quantity
            }
        },
        updateCart:(state)=>{
            state.items = state.items.filter((item)=>item.quantity>0)
            localStorage.setItem("cart",JSON.stringify(state))
        },
        clearCart: (state)=>{
            state.items = []
            localStorage.removeItem("cart")
        }
    }
})


export const { addToCart, removeFromCart, clearCart,changeQuantity,updateCart} = cartSlice.actions

export default cartSlice.reducer