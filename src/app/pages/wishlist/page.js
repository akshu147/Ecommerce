"use client"
import React, { useEffect, useState } from "react"
import { Heart, Menu, X } from "lucide-react"
import Aside from "../../componants/Aside"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const Page = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [favorites, setFavorites] = useState([])

  // Load wishlist from localStorage
  useEffect(() => {
    const products = localStorage.getItem("wishlist")
    if (products) setFavorites(JSON.parse(products))
  }, [])

  // Toggle wishlist with toast
  const toggleWishlist = (product) => {
    let updated
    if (favorites.find((item) => item.id === product.id)) {
      updated = favorites.filter((item) => item.id !== product.id)
      toast.info("Removed from wishlist ❌")
    } else {
      updated = [...favorites, product]
      toast.success("Added to wishlist ❤️")
    }
    setFavorites(updated)
    localStorage.setItem("wishlist", JSON.stringify(updated))
  }

  // Filter products based on search
  const filteredFavorites = favorites.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <>
      {/* Mobile Topbar */}
      <div className="lg:hidden flex justify-between items-center p-4 shadow bg-white sticky top-0 z-50">
        <h1 className="font-bold text-lg">Favorites</h1>
        <button onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <section className="flex flex-col lg:flex-row mt-3 gap-4 lg:gap-6 p-4">
        {/* Sidebar */}
        <Aside sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Main Content */}
        <main className="rounded-2xl flex-1 p-4 lg:p-6 bg-slate-100">
          <h2 className="text-2xl font-bold mb-2">Favorites</h2>
          <p className="text-gray-500 mb-4 md:mb-6">
            Find your saved items and get ready to order them.
          </p>

          {/* Search Bar */}
          <div className="mb-4 md:mb-6 w-full md:w-1/2">
            <input
              type="text"
              placeholder="Search favorites..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-400"
            />
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
            {filteredFavorites.length === 0 ? (
              <p className="text-gray-500 col-span-full text-center">
                No favorites yet!
              </p>
            ) : (
              filteredFavorites.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl shadow p-2 flex flex-col hover:shadow-lg transition"
                >
                  <h3 className="font-semibold text-sm mb-1 truncate">
                    {item.title}
                  </h3>
                  <p className="text-orange-600 text-[12px] font-bold">
                    ₹{item.price}
                  </p>
                  <p className="text-xs text-gray-500 mb-2 truncate">
                    {item.location || "N/A"}
                  </p>
                  <div className="flex items-center gap-1 mb-2">
                    {Array.from({ length: item.rating || 0 }).map((_, i) => (
                      <span key={i} className="text-yellow-400 text-[10px]">
                        ★
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto flex justify-between items-center gap-2">
                    <button
                      onClick={() => toggleWishlist(item)}
                      className={`transition ${
                        favorites.find((f) => f.id === item.id)
                          ? "text-red-500"
                          : "text-gray-400"
                      }`}
                    >
                      <Heart size={20} />
                    </button>
                    <button className="flex-1 bg-orange-500 text-white px-2 py-1 rounded-full hover:bg-orange-600 text-sm">
                      Buy
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </main>
      </section>

      {/* Toastify */}
      <ToastContainer position="top-right" autoClose={2000} />
    </>
  )
}

export default Page
