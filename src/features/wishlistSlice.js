import { createSlice } from '@reduxjs/toolkit'

// Load wishlist from localStorage
const loadWishlistFromStorage = () => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('wishlist')
    return saved ? JSON.parse(saved) : []
  }
  return []
}

const initialState = {
  wishlistItems: loadWishlistFromStorage()
}

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    setWishlistItems: (state, action) => {
      state.wishlistItems = action.payload
    },
    addToWishlist: (state, action) => {
      if (!state.wishlistItems.some(item => item.id === action.payload.id)) {
        state.wishlistItems.push(action.payload)
      }
    },
    removeFromWishlist: (state, action) => {
      state.wishlistItems = state.wishlistItems.filter(item => item.id !== action.payload)
    }
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action) => action.type.startsWith('wishlist/'),
        (state) => {
          // Save to localStorage whenever wishlist state changes
          if (typeof window !== 'undefined') {
            localStorage.setItem('wishlist', JSON.stringify(state.wishlistItems))
          }
        }
      )
  }
})

export const { setWishlistItems, addToWishlist, removeFromWishlist } = wishlistSlice.actions

export const selectWishlistItems = (state) => state.wishlist.wishlistItems
export const selectIsInWishlist = (state, productId) => state.wishlist.wishlistItems.some(item => item.id === productId)

export default wishlistSlice.reducer
