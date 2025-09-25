"use client"
import React, { useEffect, useState } from 'react'
import { Heart, Menu, X } from 'lucide-react'
import nookies from 'nookies'
import Aside from '../../componants/Aside'
import { setwishlist } from '@/app/redux/wishlistslice/wishlistslice'
import { useDispatch} from 'react-redux'


const Page = () => {
  // const wishlisitem = useSelector(state => state.wishlist.value)
  const dispatch = useDispatch()

  const [favorites, setFavorites] = useState([])
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  // Load wishlist from cookies
  useEffect(() => {
    const cookies = nookies.get()
    if (cookies.wishlist) {
      try {
        setFavorites(JSON.parse(cookies.wishlist))
        dispatch(setwishlist(JSON.parse(cookies.wishlist)))

      } catch (err) {
        console.log('Error parsing wishlist cookie:', err.message)
        dispatch(setwishlist([]))
      }
    }
  }, [dispatch])

  // Toggle wishlist
  const toggleWishlist = (product) => {
    let updated
    if (favorites.find(item => item.id === product.id)) {
      updated = favorites.filter(item => item.id !== product.id)
    } else {
      updated = [...favorites, product]
    }
    setFavorites(updated)
    nookies.set(null, 'wishlist', JSON.stringify(updated), {
      path: '/',
      maxAge: 60 * 60 * 24 * 365 * 10
    })
  }

  // Filtered products based on search
  const filteredFavorites = favorites.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <>
      {/* Mobile topbar */}
      <div className="lg:hidden flex justify-between items-center p-4 shadow bg-white sticky top-0 z-50">
        <h1 className="font-bold text-lg">Favorites</h1>
        <button onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <section className="flex mt-3 gap-6 p-4">
        {/* Sidebar */}
        <Aside sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Main Content */}
        <main className="rounded-2xl flex-1 p-4 lg:p-8 bg-slate-100">
          <h2 className="text-2xl font-bold mb-2">Favorites</h2>
          <p className="text-gray-500 mb-6">Find your saved items and get ready to order them.</p>

          {/* Search Bar */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search favorites..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full md:w-1/2 p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-400"
            />
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-2">
            {filteredFavorites.map(item => (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow p-2 flex flex-col hover:shadow-lg transition"
              >
                <h3 className="hidden md:block font-semibold text-sm mb-1">{item.title}</h3>
                <p className="text-orange-600 text-[12px] font-bold">{item.price}</p>
                <p className="hidden md:block text-xs text-gray-500 mb-2">{item.location}</p>
                <div className="flex items-center gap-1">
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <span key={i} className="hidden md:block text-yellow-400">★</span>
                  ))}
                </div>

                <div className="hidden md:block mt-auto">
                  <div className="flex justify-between items-center mt-2">
                    <button
                      onClick={() => toggleWishlist(item)}
                      className={`transition ${favorites.find(f => f.id === item.id) ? 'text-red-500' : 'text-gray-400'}`}
                    >
                      <Heart size={20} />
                    </button>
                    <button className="bg-orange-500 text-white px-4 py-1 rounded-full hover:bg-orange-600">
                      Buy
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </section>
    </>
  )
}

export default Page
