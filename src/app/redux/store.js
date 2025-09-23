'use client'
import { configureStore } from '@reduxjs/toolkit'
import demoReducer from './demo/demo'
import wishlistReducer from "./wishlistslice/wishlistslice"
import searchproductReducer from "./productsearchslice/productsearchslice"
import allproductReducer from "./allproductslice/allproductslice"
import userdataReducer from './userdataslice/userdataslice'
const store = configureStore({
  reducer: {
    demo: demoReducer, // yaha "demo" slice ka naam ho gaya
    wishlist:wishlistReducer,
    searchproduct:searchproductReducer,
    allproduct:allproductReducer,
    userdata:userdataReducer
  }
})
export { store }
