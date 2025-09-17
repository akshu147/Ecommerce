import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  query: '',
  searchTerm: '',
  searchholdernames: ['Banana', 'Apple', 'Shirt', 'Pant']
}

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setQuery: (state, action) => {
      state.query = action.payload
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload
    },
    setSearchHolderNames: (state, action) => {
      state.searchholdernames = action.payload
    }
  }
})

export const { setQuery, setSearchTerm, setSearchHolderNames } = searchSlice.actions

export const selectQuery = (state) => state.search.query
export const selectSearchTerm = (state) => state.search.searchTerm
export const selectSearchHolderNames = (state) => state.search.searchholdernames

export default searchSlice.reducer
