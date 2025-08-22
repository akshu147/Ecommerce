"use client"
import React, { createContext, useState } from 'react'

// Context banate hain
export const Mycontext = createContext()

const Authcontext = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([])
    const [dummydata, setDummyData] = useState([])
    const [query, setQuery] = useState('') //for search functionality
    
  

  return (
    <Mycontext.Provider value={{ wishlistItems, setWishlistItems, dummydata, setDummyData, query, setQuery  }}>
      {children}
    </Mycontext.Provider>
  )
}

export default Authcontext
