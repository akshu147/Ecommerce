'use client'
import React, { useContext, useEffect, useState, useCallback } from 'react'
import { IoMdCart } from 'react-icons/io'
import { FaUserCircle } from 'react-icons/fa'
import Link from 'next/link'
import { X, Minus, Plus, Trash2 } from 'lucide-react'
import { Mycontext } from '../context/Authcontext'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { motion, AnimatePresence } from 'framer-motion'
import { FaSearch } from 'react-icons/fa'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { MdOutlineMenu } from 'react-icons/md'
import { debounce } from '../../utils/debounce'
import { LuHeartHandshake } from 'react-icons/lu'

const Navbar = () => {
  const [showCart, setShowCart] = useState(false)
  const [showWishlist, setShowWishlist] = useState(false)
  const [showMenu, setShowMenu] = useState(false)
  const [cartItems, setCartItems] = useState([])
  const [showmobilemenu, setshowmobilemenu] = useState('-100%')
  const [wishlistItem, setWishlistItem] = useState([])
  const {
    wishlistItems,
    setWishlistItems,
    query,
    setQuery,
    searchTerm,
    setSearchTerm,
    setsearchholdername,
    searchholdernames
  } = useContext(Mycontext)
  const [index, setIndex] = useState(0)
  const [suggestions, setSuggestions] = useState([]) // for search functionality
  const [loadingSuggestions, setLoadingSuggestions] = useState(false) // loading state
  const nav = useRouter()

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
    const storedWishlist = localStorage.getItem('wishlist')
    if (storedWishlist) {
      setWishlistItem(JSON.parse(storedWishlist))
    }
  }, [wishlistItems])

  useEffect(() => {
    const storedWishlist = localStorage.getItem('wishlist')
    if (storedWishlist) {
      setWishlistItem(JSON.parse(storedWishlist))
    }
  }, [])

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
    }, 1000) // change every 2 sec
    return () => clearInterval(interval)
  }, [])

  const updateplaceofsearchbar = e => {
    try {
      if (!e.target.value) {
        setSearchTerm('')
      }
      if(!e.target.value) { setsearchholdername(['Banana', 'Apple', 'Shirt', 'Pant'])}
      const value = e.target.value
      const names = ['Banana', 'Apple', 'Shirt', 'Pant']
      value.length <= 0 ? setsearchholdername(names) : setsearchholdername([])
      setQuery(e.target.value)
      // for searh queary
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

    const debouncedFetchSuggestions = debounce(fetchSuggestions, 300)
    debouncedFetchSuggestions()

    return () => {
      debouncedFetchSuggestions.cancel?.()
    }
  }, [query])

  const furnitureCategories = [
    {
      name: 'Living Room Furniture',
      children: [
        'Sofas & Couches',
        'Recliners',
        'Coffee Tables',
        'TV Units',
        'Chairs & Ottomans',
        'Bookcases / Shelving'
      ]
    },
    {
      name: 'Bedroom Furniture',
      children: [
        'Beds & Bed Frames',
        'Mattresses',
        'Wardrobes / Closets',
        'Nightstands / Side Tables',
        'Dressers & Chests'
      ]
    },
    {
      name: 'Dining Room Furniture',
      children: [
        'Dining Tables',
        'Dining Chairs',
        'Bar Stools',
        'Sideboards / Cabinets'
      ]
    },
    {
      name: 'Office Furniture',
      children: [
        'Office Desks',
        'Office Chairs',
        'Filing Cabinets',
        'Bookcases / Shelving'
      ]
    },
    {
      name: 'Outdoor / Garden Furniture',
      children: [
        'Patio Sets',
        'Outdoor Chairs & Tables',
        'Garden Benches',
        'Sun Loungers / Hammocks'
      ]
    },
    {
      name: 'Storage & Organization',
      children: [
        'Cabinets & Cupboards',
        'Shelving Units',
        'Storage Bins / Boxes'
      ]
    },
    {
      name: 'Kids Furniture',
      children: ['Kids Beds', 'Kids Chairs & Tables', 'Toy Storage']
    },
    {
      name: 'Specialty / Others',
      children: [
        'Mirrors & Decorative Furniture',
        'Accent Chairs',
        'Room Dividers',
        'Furniture Accessories'
      ]
    }
  ]

  return (
    <>
      {/* Navbar */}
      <section className='flex justify-between items-center px-5 py-2 md:py-4 bg-[#D2D7D] backdrop-blur-[100px] shadow sticky top-0 z-50'>
        <div className='text-2xl font-bold cursor-pointer hidden md:block'>
          <Link href={'/'}>FURNSTACK</Link>
        </div>
        <i>
          <MdOutlineMenu
            onClick={() => {
              setshowmobilemenu('0')
            }}
            className='md:hidden text-3xl cursor-pointer'
          />
        </i>

        <div
          style={{ left: showmobilemenu }}
          onTouchMove={() => {
            setshowmobilemenu('-100%')
          }}
          className={`fixed top-0 bg-[black] transition-all duration-1000 ease-in-out text-[white] h-[100vh] w-[90vw] z-50 overflow-y-scroll`}
        >
          <header className='flex justify-between p-5 border-b'>
            <div>icon</div>
            <div onClick={() => setshowmobilemenu('-100%')}>X</div>
          </header>

          <ul className='p-4'>
            {navitems.map((item, i) => (
              <li
                key={i}
                className='px-4 py-2 bg-[#ffffff41] cursor-pointer space-y-1 my-1 rounded-md'
                onClick={() => {
                  nav.push(item.link)
                }}
              >
                {item.name}
              </li>
            ))}
          </ul>
        </div>

        {/* Mobile Menu */}
        {/* <div className='w-full bg-black text-white over h-[100vh] overflow-y-scroll fixed top-0 left-0 p-5 z-60'>
          <header className='flex justify-between '>
            <div>Start</div>
            <div>X</div>
          </header>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis expedita nemo quas assumenda itaque mollitia dolor, distinctio tempora maiores molestiae atque, porro facilis exercitationem praesentium, impedit laboriosam perspiciatis illum soluta similique? Vel consectetur praesentium nam iste sed voluptas eveniet minima aspernatur ullam iure maxime, eligendi autem id totam obcaecati, accusantium recusandae tempora tempore ab itaque fuga alias ipsam ipsum. Voluptatem vero laboriosam quod labore esse minus est, quasi perspiciatis nulla cumque deleniti nisi assumenda dignissimos laudantium itaque totam. Dignissimos quae eveniet maxime minus rem illum debitis illo. Ipsa enim fugiat veritatis vitae mollitia dolores aliquam voluptatum, voluptatem, dicta magni facere sed voluptas eum aut alias, quod fugit doloremque harum accusantium sit tenetur! Quae autem, nobis dolorem vero modi delectus, minima nam aspernatur iusto assumenda, exercitationem officiis dolores id sapiente optio dolor laudantium cum a dicta blanditiis. Dolore sequi sapiente harum praesentium voluptate? Nisi voluptatum provident adipisci explicabo, eligendi ad suscipit, ducimus molestias quisquam sunt et rem iste labore ea dicta facilis recusandae ab sapiente quis dolores harum in laborum fugit hic? Nihil atque consectetur et reprehenderit ipsam quia dolore. Placeat voluptates corporis omnis saepe, dolore harum modi, blanditiis iusto necessitatibus repellat repellendus enim dolorem, unde mollitia doloremque tempora architecto animi veniam dolorum consequatur beatae distinctio! Libero unde accusantium provident odit atque, pariatur, temporibus cupiditate dolor, illum nemo cumque quasi modi necessitatibus assumenda fuga earum iure nam excepturi saepe. Facere, illum numquam eaque autem temporibus harum veniam ipsam voluptatibus ab similique dolor quisquam delectus, commodi, fuga ratione repellat sint quasi deleniti? Excepturi libero, non magnam aperiam quam fugiat pariatur doloremque deleniti natus, eos obcaecati voluptatibus dolorem hic est placeat repudiandae recusandae esse. Expedita, voluptate sunt. Sit omnis aspernatur quam nostrum commodi dolorem atque labore ipsam dignissimos impedit, voluptatum officia iusto quidem maiores nisi eum ea libero ducimus aliquid eveniet illum maxime est in quos? Consequuntur sint officiis laborum explicabo harum fugiat asperiores incidunt dicta distinctio non error sapiente consectetur, iusto quisquam. Vero, recusandae! Neque ducimus esse ipsum quam doloremque aut assumenda quisquam mollitia! Exercitationem possimus mollitia ullam distinctio voluptatum totam debitis blanditiis temporibus? Aperiam commodi corrupti quas eum, pariatur animi iure similique doloribus dignissimos eius iste alias nihil sapiente perferendis mollitia fugit laboriosam necessitatibus, ratione quae. Unde eligendi velit sequi optio, repudiandae ipsam quam sunt, ab soluta, omnis nostrum exercitationem ea laborum in quo. Modi neque ullam obcaecati deserunt. Nisi omnis eligendi officiis deserunt sunt aspernatur optio provident itaque alias repellat, eius ipsa! Maxime, eveniet rerum! Suscipit autem reiciendis earum? Eum placeat dolorum ratione dolore tempore labore ut odit blanditiis non commodi repellendus expedita ea est iusto rem, quo obcaecati! Esse, autem doloribus! Suscipit, accusantium fugit! Quae illo iusto necessitatibus temporibus rerum est iste vel ad odit tenetur delectus quam nulla voluptatem aperiam quasi, alias a illum, similique voluptatibus. Dolorum repudiandae et aliquam illum exercitationem distinctio iste, ut qui, deserunt sed iure unde minima. Dicta et hic animi eum ex cupiditate labore impedit minima sapiente quaerat molestiae quae id, ducimus dolor recusandae asperiores ipsa voluptas pariatur totam fugiat nesciunt! Tempora molestiae sunt cum, porro harum quaerat mollitia assumenda, perferendis atque illum vero dolores et officiis. Blanditiis, dolorum! Maiores libero cumque maxime facere tempore. Rem expedita praesentium amet, labore ipsum, at perspiciatis nesciunt, quasi necessitatibus autem explicabo laudantium ut ipsam hic? Nobis deserunt voluptas voluptates! Dignissimos et autem inventore exercitationem a, laudantium iste quia sit consectetur eligendi iure consequuntur minima repellat enim deserunt eum totam nobis nostrum tempore quam quisquam perferendis, quo saepe tempora. Officia sit voluptates omnis nemo veritatis quod quaerat enim quae dolor sunt ex rerum vitae esse cumque sequi fugiat ad nulla aliquam ducimus maiores officiis, error hic at! Saepe consequuntur quos minus animi natus nostrum ducimus dignissimos inventore mollitia assumenda laboriosam, necessitatibus quisquam suscipit itaque cum pariatur maiores temporibus aspernatur tempora nemo dolorem eveniet distinctio repudiandae optio. Rem error, odit provident atque quasi odio. Amet accusantium maiores velit. Quisquam vero facere perspiciatis architecto illum unde commodi, maxime voluptatem alias eveniet voluptate itaque, consequatur rem recusandae quae saepe. Sed voluptates voluptatibus inventore optio perferendis eum nesciunt, quibusdam illo quos illum fugiat quam nobis impedit cumque cum at veniam ullam debitis laudantium dolorum alias quae, praesentium error! Impedit commodi molestias a. Voluptatum eveniet perspiciatis ducimus unde eos! Ab, quisquam consequuntur animi ex molestias consequatur! Nam repudiandae magnam voluptatem laboriosam perferendis id adipisci quaerat voluptas consequatur non, alias error odit nemo explicabo cumque! Recusandae deleniti nulla quae. Laudantium dolore quis sit quasi, totam nisi maxime exercitationem dolorem vero accusantium quae nam? Voluptates, temporibus accusantium, quae iure labore nemo at aliquid obcaecati magni animi provident ab voluptatem, commodi rerum excepturi expedita! Porro, rerum! Quia, pariatur ipsam neque explicabo voluptas rem quo rerum minima quod quae aliquid magni consequuntur perspiciatis dolor quam atque similique soluta omnis. Nam facilis praesentium qui, natus voluptatum corporis perferendis ut nihil asperiores sint repellendus tempora sit magnam obcaecati aliquam inventore culpa in esse autem eos. Laborum minus ad perspiciatis omnis eligendi est accusantium aspernatur repellat nam architecto optio, eius sapiente? Facilis esse neque minima labore vel? Omnis iusto esse voluptate ex dolore suscipit minus. Alias nisi reprehenderit saepe molestiae culpa nihil eveniet doloribus odit placeat voluptas ipsa, beatae magnam dolore! Ratione necessitatibus, iure esse soluta, quia ut, est at architecto incidunt nobis nam. Soluta magnam architecto id illo delectus. Commodi reprehenderit sapiente repellat, ipsam, nobis corrupti fuga cumque fugiat iusto ad delectus illum, eligendi provident placeat impedit incidunt est praesentium sit voluptatibus itaque nam sed officia! Asperiores ea labore impedit, expedita amet quae eos quo aliquam id nihil. Sit ducimus assumenda beatae? Officiis laudantium in, dolorum perspiciatis magnam a dolorem nostrum facilis laboriosam eaque cum, maxime, ad laborum exercitationem! Nemo commodi optio omnis odit quas consequatur ratione dolores ea possimus, culpa quis, cumque animi quisquam temporibus harum tempore, saepe incidunt tempora? Cupiditate, quod incidunt? Ut, nemo? Eveniet molestiae officia corrupti cumque. Quae sunt accusantium, vero sequi, inventore eveniet aut, itaque modi totam dolore tempora nemo! Optio magnam, cum numquam ad obcaecati aliquam odit labore incidunt quasi assumenda sapiente neque officiis minima ipsum repellendus similique et amet unde ve
          
        </div>
    */}

        {/* Mobile Menu Backdrop */}

        {showMenu && (
          <div
            className='fixed inset-0 bg-black/50 z-40 md:hidden'
            onClick={() => setShowMenu(false)}
          />
        )}

        {/* menu cart */}

        <nav className='hidden lg:block'>
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

          <form className='justify-center hidden md:block'>
            <div className='relative w-96 flex'>
              <input
                type='text'
                className={`w-full border px-4 py-2 rounded-[10px] focus:outline-none focus:ring-2 focus:ring-blue-400`}
                onChange={updateplaceofsearchbar} // ✅ fixed
                placeholder=''
                value={query}
              />
              {loadingSuggestions && (
                <div className='absolute top-full left-0 right-0 mt-1 bg-white text-gray-800 shadow-lg border border-gray-200 z-50 rounded-md overflow-hidden'>
                  <div className='px-4 py-2 text-center text-gray-500'>
                    <div className='inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500 mr-2'></div>
                    Loading suggestions...
                  </div>
                </div>
              )}
              {!loadingSuggestions && suggestions.length > 0 && (
                <ul className='absolute top-full left-0 right-0 mt-1 bg-white text-gray-800 shadow-lg border border-gray-200 z-50 rounded-md overflow-hidden'>
                  {suggestions.map((item, i) => (
                    <li
                      key={i}
                      className='px-4 py-2 hover:bg-blue-500 hover:text-white cursor-pointer transition-colors duration-200'
                      onClick={() => {
                        setQuery(item.name)
                        setSuggestions([])
                        setSearchTerm(item.name)
                        nav.push('/pages/products')
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
                onClick={() => {
                  if (!query) return alert('Please enter something to search')
                  setSearchTerm(query),
                    setSuggestions([]),
                    setsearchholdername([])
                  nav.push('/pages/products')
                }}
                className='absolute top-[50%] right-2 transform -translate-y-1/2 bg-black text-white p-2 rounded-md cursor-pointer'
              >
                <FaSearch />
              </div>
            </div>
          </form>

        <div className='flex items-center gap-2'>
          <button className='p-1 px-3 bg-black text-white rounded hidden sm:block relative'>
            Open Store Free <span style={{top:"-30%"}} className='font-bold rounded-[10px] px-1 text-[10px] absolute right-0 bg-[#ff0000b9]'>Soon</span>
          </button>
          <button
            onClick={() => setShowWishlist(true)}
            className='p-1 px-3 border hidden md:block border-black rounded hover:bg-black hover:text-white transition'
          >
            Wishlist
          </button>

          <i
            className='block md:hidden text-[20px]'
            onClick={() => setShowWishlist(true)}
          >
            <LuHeartHandshake />
          </i>

          <div
            className='relative cursor-pointer'
            onClick={() => setShowCart(true)}
          >
            <IoMdCart className='text-[20px] md:text-[26px]' />
            <p className='absolute top-0 left-full transform -translate-y-1/2 -translate-x-1/2 text-black text-[13px] font-bold'>
              {cartItems?.length || 0}
            </p>
          </div>

          <div className='relative cursor-pointer group'>
            <FaUserCircle className='text-[20px] md:text-[20px]' />
            <div className='absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200'>
              <Link
                href='/profile'
                className='block px-4 py-2 text-gray-800 hover:bg-gray-100'
              >
                Profile
              </Link>
              <Link
                href='/settings'
                className='block px-4 py-2 text-gray-800 hover:bg-gray-100'
              >
                Settings
              </Link>
              <Link
                href='/logout'
                className='block px-4 py-2 text-gray-800 hover:bg-gray-100'
              >
                Logout
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Cart Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:max-w-[420px] bg-gradient-to-br from-blue-50 via-white to-gray-100 p-6 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          showCart ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className='flex justify-between items-center p-5 border-b border-gray-200 bg-white rounded-t-lg'>
          <h2 className='text-xl font-bold text-gray-800'>
            Your Shopping Cart
          </h2>
          <button
            onClick={() => setShowCart(false)}
            className='p-2 hover:bg-gray-100 rounded-full transition-colors'
          >
            <X className='w-5 h-5 text-gray-600' />
          </button>
        </div>

        <div className='cart-panel text-sm h-[calc(100vh-120px)] overflow-y-auto py-4'>
          {cartItems.length === 0 ? (
            <div className='text-center py-12'>
              <div className='w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center'>
                <IoMdCart className='w-8 h-8 text-gray-400' />
              </div>
              <p className='text-gray-500 font-medium'>Your cart is empty</p>
              <p className='text-sm text-gray-400 mt-1'>
                Start shopping to add items
              </p>
            </div>
          ) : (
            <>
              {cartItems.map(item => (
                <div
                  key={item.id}
                  className='flex bg-white rounded-lg mb-4 p-4 relative shadow-sm border border-gray-100 hover:shadow-md transition-shadow'
                >
                  <img
                    src={item.img}
                    alt={item.name}
                    className='w-20 h-20 object-cover rounded-lg'
                  />
                  <div className='ml-4 flex-1'>
                    <h3 className='font-semibold text-gray-800 text-base'>
                      {item.name}
                    </h3>
                    <p className='text-sm text-gray-500 mb-2'>
                      Size: {item.size}
                    </p>
                    <p className='font-bold text-lg text-blue-600'>
                      ${item.price.toFixed(2)}
                    </p>
                  </div>
                  <div className='flex items-center gap-2 mt-2'>
                    <button
                      onClick={() => updateQty(item.id, 'dec')}
                      className='w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors'
                    >
                      <Minus size={14} />
                    </button>
                    <span className='font-medium text-gray-700 min-w-[20px] text-center'>
                      {item.qty || 1}
                    </span>
                    <button
                      onClick={() => updateQty(item.id, 'inc')}
                      className='w-8 h-8 bg-blue-500 hover:bg-blue-600 text-white rounded-full flex items-center justify-center transition-colors'
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className='absolute top-3 right-3 p-1 hover:bg-red-50 rounded-full transition-colors'
                  >
                    <Trash2
                      size={16}
                      className='text-red-400 hover:text-red-600'
                    />
                  </button>
                </div>
              ))}

              <div className='bg-white p-5 rounded-lg shadow-sm border border-gray-100 space-y-3'>
                <div className='flex justify-between text-gray-600'>
                  <span>Subtotal:</span>
                  <span className='font-medium'>
                    ${/* subTotal calculation */}
                  </span>
                </div>
                <div className='flex justify-between text-gray-600'>
                  <span>Discount:</span>
                  <span className='text-green-600 font-medium'>
                    -${/* discount calculation */}
                  </span>
                </div>
                <div className='flex justify-between text-lg font-bold text-gray-800 pt-3 border-t border-gray-200'>
                  <span>Total:</span>
                  <span>${/* total calculation */}</span>
                </div>
                <button className='w-full mt-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 rounded-lg text-base font-semibold shadow-md hover:shadow-lg transition-all'>
                  Proceed to Checkout
                </button>
              </div>
            </>
          )}
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
          {furnitureCategories.map((category, idx) => (
            <div
              key={idx}
              className=' hover:bg-gray-800 cursor-pointer z-40 relative group'
            >
              <h3 className='font-semibold mb-2 relative'>{category.name}</h3>
              <div className='hidden absolute top-full left-0 p-2 bg-black text-white group-hover:block w-max rounded-md shadow'>
                {category.children.map((subcat, subidx) => (
                  <p
                    key={subidx}
                    className='text-sm hover:bg-gray-700 px-2 py-1 rounded'
                  >
                    {subcat}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <form className=' w-full block md:hidden px-4'>
        <div className='relative flex '>
          <input
            type='text'
            className='px-4 py-1 rounded-[10px] focus:outline-none focus:ring-2 focus:ring-blue-400 w-full'
            onChange={updateplaceofsearchbar}
            placeholder='Type something...'
            value={query}
          />

          {loadingSuggestions && (
            <div className='absolute top-full left-0 right-0 mt-1 bg-white text-gray-800 shadow-lg border border-gray-200 z-50 rounded-md overflow-hidden'>
              <div className='px-4 py-2 text-center text-gray-500'>
                <div className='inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500 mr-2'></div>
                Loading suggestions...
              </div>
            </div>
          )}
          {!loadingSuggestions && suggestions.length > 0 && (
            <ul className='absolute top-full left-0 right-0 mt-1 bg-white text-gray-800 shadow-lg border border-gray-200 z-50 rounded-md overflow-hidden'>
              {suggestions.map((item, i) => (
                <li
                  key={i}
                  className='px-4 py-2 hover:bg-blue-500 hover:text-white cursor-pointer transition-colors duration-200'
                  onClick={() => {
                    setQuery(item.name)
                    setSuggestions([])
                    setSearchTerm(item.name)
                    nav.push('/pages/products')
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
            onClick={() => {
              if (!query) return alert('Please enter something to search')
              setSearchTerm(query), setSuggestions([]), setsearchholdername([])

              nav.push('/pages/products')
            }}
            className='absolute top-[50%] right-2 transform -translate-y-1/2 bg-black text-white p-1 rounded-md cursor-pointer'
          >
            <FaSearch />
          </div>
        </div>
      </form>
    </>
  )
}

export default Navbar
