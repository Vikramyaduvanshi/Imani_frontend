import { configureStore } from "@reduxjs/toolkit";
import productslice from "../redux/productslice"
import cartReducer from "../redux/Cartslice";



export let store= configureStore({
reducer:{
    Allproducts:productslice,
    cart:cartReducer
}
})
