import { configureStore } from "@reduxjs/toolkit";
import demoReducer from "./demo/demo";
import wishlistReducer from "./wishlistslice/wishlistslice";
import searchproductReducer from "./productsearchslice/productsearchslice";
import allproductReducer from "./allproductslice/allproductslice";
import userdataReducer from "./userdataslice/userdataslice";
import cartReducer from './cartSlice/cartSlice'

const store = configureStore({
  reducer: {
    demo: demoReducer,
    wishlist: wishlistReducer,
    searchproduct: searchproductReducer,
    allproduct: allproductReducer,
    userdata: userdataReducer,
    cart: cartReducer, // <- add cart slice
  },
});

export { store };
