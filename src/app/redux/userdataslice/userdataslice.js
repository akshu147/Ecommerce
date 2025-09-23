const { createSlice } = require("@reduxjs/toolkit");
const initialState = {
    value:[]
}
const userdataslice = createSlice({
    name:"userdata",
    initialState,
    reducers:{
        setuserdata:(state, action)=> {
            state.value = action.payload
        }

    }
})
export const {setuserdata} = userdataslice.actions
export default userdataslice.reducer
