'use client'
import React, { useContext, useEffect, useState } from 'react'
import { IoMdCart } from 'react-icons/io'
import Link from 'next/link'
import { X, Minus, Plus, Trash2 } from 'lucide-react'
import { Mycontext } from '../context/Authcontext'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { motion, AnimatePresence } from 'framer-motion'
import { CiSearch } from 'react-icons/ci'
import { FaSearch } from 'react-icons/fa'
import axios from 'axios'
import { useRouter } from 'next/navigation'

const Navbar = () => {
  const [showCart, setShowCart] = useState(false)
  const [showWishlist, setShowWishlist] = useState(false)
  const [cartItems, setCartItems] = useState([])
  const [wishlistItem, setWishlistItem] = useState([])
  const { wishlistItems, setWishlistItems, query, setQuery } =
    useContext(Mycontext)
  const [index, setIndex] = useState(0)
  const [suggestions, setSuggestions] = useState([]) // for search functionality
  const nav = useRouter()
  const [searchholdernames, setsearchholdername] = useState([
    'Banana',
    'Apple',
    'Shirt',
    'Pant'
  ])

  const navitems = [
    { name: 'Home', link: '/' },
    { name: 'About', link: '/pages/about' },
    { name: 'Contact', link: '/pages/contect' },
    { name: 'Products', link: '/pages/products' },
    { name: 'Support', link: '#' },
    { name: 'Document', link: '#' }
  ]

  useEffect(() => {
    AOS.init({ duration: 800, once: true }) // 👈 AOS Init
  }, [])

  useEffect(() => {
    // const storedCart = localStorage.getItem('cartItems')
    const storedWishlist = localStorage.getItem('wishlist')

    // if (storedCart) {
    //   setCartItems(JSON.parse(storedCart))
    // }

    if (storedWishlist) {
      setWishlistItem(JSON.parse(storedWishlist))
    }
  }, [wishlistItems])

  // save after every chage

  // useEffect(()=> {
  //   localStorage.setItem("wishlist", JSON.stringify(wishlistItem))
  // }, [wishlistItem])

  const removeproductfromwishlist = id => {
    const updatedWishlist = wishlistItems.filter(item => item.id !== id)
    setWishlistItems(updatedWishlist)
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist))
    console.log(id)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(prev => (prev + 1) % searchholdernames.length)
    }, 2000) // change every 2 sec
    return () => clearInterval(interval)
  }, [])

  const updateplaceofsearchbar = e => {
    try {
      const value = e.target.value
      const names = ['Banana', 'Apple', 'Shirt', 'Pant']
      value.length <= 0 ? setsearchholdername(names) : setsearchholdername([])
      setQuery(e.target.value) // for searh queary
    } catch (err) {
      alert(err.message)
    }
  }

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.length < 2) {
        setSuggestions([])
        return
      }

      try {
        const res = await axios.get(
          `http://localhost:4000/api/user/search?name=${query}`
        )
        setSuggestions(res.data.results)
      } catch (err) {
        console.error(err.message)
      }
    }

    const delay = setTimeout(fetchSuggestions, 100)
    return () => clearTimeout(delay)
  }, [query])

  return (
    <>
      {/* Navbar */}
      <section className='flex justify-between items-center px-5 py-4 bg-[#D2D7D] backdrop-blur-[100px] shadow sticky top-0 z-50'>
        <div className='text-2xl font-bold cursor-pointer'>STARK</div>

        <nav className='hidden md:block'>
          <ul className='flex gap-6 text-sm font-medium'>
            {navitems.map((item, idx) => (
              <li key={idx} data-aos='fade-up' data-aos-delay={idx * 100}>
                <Link
                  href={item.link}
                  className='px-2 py-1 block rounded hover:bg-gray-100'
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <form className='justify-center'>
          <div className='relative w-96 flex'>
            <input
              type='text'
              className='w-full px-4 py-2 border rounded-[10px] focus:outline-none focus:ring-2 focus:ring-blue-400'
              onChange={updateplaceofsearchbar} // ✅ fixed
              placeholder=''
              value={query}
            />
            {suggestions.length > 0 && (
              <ul className='absolute top-full left-0 right-0 mt-1 bg-white text-gray-800 shadow-lg border border-gray-200 z-50 rounded-md overflow-hidden'>
                {suggestions.map((item, i) => (
                  <li
                    key={i}
                    className='px-4 py-2 hover:bg-blue-500 hover:text-white cursor-pointer transition-colors duration-200'
                    onClick={() => {
                      setQuery(item.name), setSuggestions([])
                    }}
                  >
                    {item.name}
                  </li>
                ))}
              </ul>
            )}

            {/* Animated placeholder overlay */}
            <div className='absolute left-4 top-2 text-gray-500 pointer-events-none'>
              <AnimatePresence mode='wait'>
                <motion.span
                  key={searchholdernames[index]}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className='absolute'
                >
                  {searchholdernames[index]}
                </motion.span>
              </AnimatePresence>
            </div>
            <div
              onClick={() => nav.push('/pages/products')}
              className='absolute top-[50%] right-2 transform -translate-y-1/2 bg-black text-white p-2 rounded-md cursor-pointer'
            >
              <FaSearch />
            </div>
          </div>
        </form>

        <i
          className='block md:hidden'
          onClick={() => nav.push('/pages/products')}
        >
          <CiSearch />
        </i>

        <div className='flex items-center gap-2'>
          <button className='p-1 px-3 bg-black text-white rounded hidden sm:block'>
            Open Store Free
          </button>
          <button
            onClick={() => setShowWishlist(true)}
            className='p-1 px-3 border border-black rounded hover:bg-black hover:text-white transition'
          >
            Wishlist
          </button>

          <div
            className='relative cursor-pointer'
            onClick={() => setShowCart(true)}
          >
            <IoMdCart className='text-[28px]' />
            <p className='absolute top-0 left-full transform -translate-y-1/2 -translate-x-1/2 text-black text-[13px] font-bold'>
              {cartItems?.length || 0}
            </p>
          </div>
        </div>
      </section>

      {/* Cart Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:max-w-[400px] bg-gradient-to-br from-purple-300 via-blue-200 to-gray-300 p-6 rounded-2xl shadow-xl z-50 transition-transform duration-500 ease-in-out ${
          showCart ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className='flex justify-between items-center p-4 border-b sticky top-0 bg-white z-60'>
          <h2 className='text-lg font-semibold'>Your Cart</h2>
          <button onClick={() => setShowCart(false)}>
            <X className='w-6 h-6 text-gray-600' />
          </button>
        </div>

        <div className='cart-panel text-sm h-[calc(100vh-100px)] overflow-y-auto'>
          {cartItems.map(item => (
            <div
              key={item.id}
              className='flex bg-white rounded-xl mb-4 p-3 relative shadow'
            >
              <img
                src={item.img}
                alt={item.name}
                className='w-16 h-16 object-cover rounded-md'
              />
              <div className='ml-3 flex-1'>
                <h3 className='font-medium text-gray-800'>{item.name}</h3>
                <p className='text-sm text-gray-500'>Size: {item.size}</p>
                <p className='font-bold text-md mt-1'>
                  ${item.price.toFixed(2)}
                </p>
              </div>
              <div className='flex items-center gap-2'>
                <button
                  onClick={() => updateQty(item.id, 'dec')}
                  className='w-7 h-7 bg-gray-200 rounded-full flex items-center justify-center'
                >
                  <Minus size={14} />
                </button>
                <span className='font-medium'>{item.qty || 1}</span>
                <button
                  onClick={() => updateQty(item.id, 'inc')}
                  className='w-7 h-7 bg-orange-500 text-white rounded-full flex items-center justify-center'
                >
                  <Plus size={14} />
                </button>
              </div>
              <button
                onClick={() => removeItem(item.id)}
                className='absolute top-0 right-0 p-2 text-red-500'
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}

          <div className='bg-white p-4 rounded-xl shadow space-y-2'>
            <div className='flex justify-between'>
              <span>Sub total :</span>
              {/* <span>${subTotal.toFixed(2)}</span> */}
            </div>
            <div className='flex justify-between'>
              <span>Discount :</span>
              {/* <span>${discount.toFixed(2)}</span> */}
            </div>
            <div className='flex justify-between font-semibold'>
              <span>Total :</span>
              {/* <span>${total.toFixed(2)}</span> */}
            </div>
            <button className='w-full mt-4 bg-orange-500 text-white py-3 rounded-full text-sm font-semibold'>
              Checkout
            </button>
          </div>
        </div>
      </div>

      {/* Wishlist Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:max-w-[400px] 
  bg-gradient-to-br from-purple-300 via-blue-200 to-gray-300 
  p-6 rounded-2xl shadow-xl z-50 transform transition-transform 
  duration-500 ease-in-out ${
    showWishlist ? 'translate-x-0' : 'translate-x-full'
  }`}
      >
        <div className='flex justify-between items-center p-4 border-b sticky top-0 bg-white z-60'>
          <h2 className='text-lg font-semibold'>Wishlist</h2>
          <button onClick={() => setShowWishlist(false)}>
            <X className='w-6 h-6 text-gray-600' />
          </button>
        </div>
        <div className='p-4 text-sm overflow-y-auto h-[calc(100vh-100px)]'>
          {wishlistItem.map(item => (
            <div
              key={item.id}
              className='flex items-center justify-between bg-white rounded-xl shadow px-[4] py-[2] relative mb-[3px]'
            >
              <div className='flex items-center gap-4'>
                <img
                  src={item.thumbnail}
                  alt={item.name}
                  className='w-16 h-16 rounded'
                />
                <div>
                  <h3 className='text-lg font-semibold'>{item.name}</h3>
                  <p className='text-gray-600'>{item.price}</p>
                </div>
              </div>
              <button
                onClick={() => removeproductfromwishlist(item.id)}
                className='bg-black text-white text-sm px-4 py-1 rounded-md'
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Backdrop */}
      {(showCart || showWishlist) && (
        <div
          className='fixed inset-0 bg-black/40 z-40'
          onClick={() => {
            setShowCart(false)
            setShowWishlist(false)
          }}
        />
      )}
      <div className='hidden lg:block'>
        <div className='flex justify-evenly bg-black text-white text-[14px] mx-[100px] rounded-bl-[20px] rounded-br-[20px]'>
          <div className='cursor-pointer font-bold'>Chair</div>
          <div className='cursor-pointer font-bold'>Sofa</div>
          <div className='cursor-pointer font-bold'>Double bad</div>
          <div className='cursor-pointer font-bold'>Coffee Table</div>
          <div className='cursor-pointer font-bold'>Sectional Sofa</div>
          <div className='cursor-pointer font-bold'>Bookshelf</div>
          <div className='cursor-pointer font-bold'>google</div>
          <div className='cursor-pointer font-bold'>google</div>
          <div className='cursor-pointer font-bold'>google</div>
          <div className='cursor-pointer font-bold'>google</div>
        </div>
      </div>
    </>
  )
}

export default Navbar
