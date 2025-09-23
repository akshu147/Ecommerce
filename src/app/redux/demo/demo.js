"use client"
import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    value:""
}
const demoslice = createSlice({
    name:"demo",
    initialState,
    reducers:{
        plus:(state)=> {
            state.value = ""
        }
    }
})
export const {plus} = demoslice.actions
export default demoslice.reducer









// const counterSlice = createSlice({
//   name: 'counter',
//   initialState,
//   reducers: {
//     increment: (state) => {
//       state.value += 1
//     },
//     decrement: (state) => {
//       state.value -= 1
//     },
//     incrementByAmount: (state, action) => {
//       state.value += action.payload
//     },
//   },
// })

// // Action creators are generated for each case reducer function
// export const { increment, decrement, incrementByAmount } = counterSlice.actions

// export default counterSlice.reducer