"use client"
import React, { createContext, useState, useContext } from 'react'

// Main Context
export const Mycontext = createContext()

const Authcontext = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([])
  const [dummydata, setDummyData] = useState([])
  const [query, setQuery] = useState('') // for search functionality

  // Load wishlist from localStorage on mount
  React.useEffect(() => {
    const savedWishlist = localStorage.getItem('wishlist')
    if (savedWishlist) {
      setWishlistItems(JSON.parse(savedWishlist))
    }
  }, [])

  // Save wishlist to localStorage whenever it changes
  React.useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlistItems))
  }, [wishlistItems])

  // Add to wishlist
  const addToWishlist = (product) => {
    if (!wishlistItems.some(item => item.id === product.id)) {
      const updated = [...wishlistItems, product]
      setWishlistItems(updated)
    }
  }

  // Remove from wishlist
  const removeFromWishlist = (productId) => {
    const updated = wishlistItems.filter(item => item.id !== productId)
    setWishlistItems(updated)
  }

  // Check if item is in wishlist
  const isInWishlist = (productId) => {
    return wishlistItems.some(item => item.id === productId)
  }

  return (
    <Mycontext.Provider value={{ 
      wishlistItems, 
      setWishlistItems, 
      dummydata, 
      setDummyData, 
      query, 
      setQuery,
      addToWishlist,
      removeFromWishlist,
      isInWishlist
    }}>
        {children}
    </Mycontext.Provider>
  )
}

export default Authcontext
