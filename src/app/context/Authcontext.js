"use client"
import React, { createContext, useState } from 'react'

// Context banate hain
export const Mycontext = createContext()

const Authcontext = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([])

  return (
    <Mycontext.Provider value={{ wishlistItems, setWishlistItems }}>
      {children}
    </Mycontext.Provider>
  )
}

export default Authcontext
