import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    value:[]
}
const wishlistslice = createSlice({
    name:[],
    initialState,
    reducers:{
        setwishlist:(state, action)=> {
            state.value = action.payload
        }
    }
})
export const {setwishlist} = wishlistslice.actions
export default wishlistslice.reducer // completes