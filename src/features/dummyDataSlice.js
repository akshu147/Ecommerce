import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  dummydata: []
}

const dummyDataSlice = createSlice({
  name: 'dummydata',
  initialState,
  reducers: {
    setDummyData: (state, action) => {
      state.dummydata = action.payload
    }
  }
})

export const { setDummyData } = dummyDataSlice.actions

export const selectDummyData = (state) => state.dummydata.dummydata

export default dummyDataSlice.reducer
