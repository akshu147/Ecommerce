// "use client";
// import React, { createContext, useContext } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { setwishlist } from '../app/redux/wishlistslice/wishlistslice';

// const Mycontext = createContext();

// export const AuthProvider = ({ children }) => {
//   const dispatch = useDispatch();
//   const wishlist = useSelector(state => state.wishlist.value);

//   const addToWishlist = (product) => {
//     const updatedWishlist = [...wishlist, product];
//     dispatch(setwishlist(updatedWishlist));
//   };

//   const removeFromWishlist = (id) => {
//     const updatedWishlist = wishlist.filter(item => item.id !== id);
//     dispatch(setwishlist(updatedWishlist));
//   };

//   const isInWishlist = (id) => {
//     return wishlist.some(item => item.id === id);
//   };

//   return (
//     <Mycontext.Provider value={{ addToWishlist, removeFromWishlist, isInWishlist }}>
//       {children}
//     </Mycontext.Provider>
//   );
// };

// export { Mycontext };
