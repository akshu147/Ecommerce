const { createSlice } = require("@reduxjs/toolkit");
const initialState = {
    value:[]
}
const allproductslice = createSlice({
    name:"all-products",
    initialState,
    reducers:{
        setallallproducts:(state, action)=> {
            state.value = action.payload
        }
    }
})
export const {setallallproducts} = allproductslice.actions
export default allproductslice.reducer;