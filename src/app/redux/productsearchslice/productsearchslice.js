import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: ""
}

const searchproductslice = createSlice({
    name: "productsearch",
    initialState,
    reducers: {
        setsearchitem: (state, action) => {
            state.value = action.payload;
        }
    }
})

export const { setsearchitem } = searchproductslice.actions;
export default searchproductslice.reducer;
