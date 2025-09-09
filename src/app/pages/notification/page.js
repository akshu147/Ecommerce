"use client"
import React, { useState } from "react"
import { Heart, Bell, User, ShoppingCart, Menu, X } from "lucide-react"
import Navbar from "../../componants/Navbar"

const page = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Dummy notifications
  const notifications = [
    {
      id: 1,
      title: "Order Shipped",
      description: "Your order #12345 has been shipped.",
      time: "2h ago",
      read: false,
    },
    {
      id: 2,
      title: "Payment Successful",
      description: "You paid Rp. 3.829.000 for Meja Tamu.",
      time: "5h ago",
      read: true,
    },
    {
      id: 3,
      title: "Limited Offer",
      description: "Get 20% off on RISATOR Keranjang.",
      time: "1d ago",
      read: true,
    },
  ]

  return (
    <>
      <Navbar />
      {/* Mobile Topbar */}
      <div className="lg:hidden flex justify-between items-center p-4 shadow bg-white sticky top-0 z-50">
        <h1 className="font-bold text-lg">Notifications</h1>
        <button onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <section className="flex mt-3 gap-6 p-4">
        {/* Sidebar */}
        <aside
          className={`fixed rounded-2xl lg:static top-0 left-0 h-[100vh] w-64 bg-slate-100 shadow-md p-4 flex flex-col transform transition-transform duration-300 z-40 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }`}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-full bg-pink-200" />
            <div>
              <p className="font-semibold">mr start</p>
              <p className="text-sm text-gray-500">labina@email.com</p>
              <button className="text-xs text-orange-500">Edit Profile</button>
            </div>
          </div>

          <nav className="flex flex-col gap-4">
            <button className="flex items-center gap-2 text-gray-700 hover:text-orange-500">
              <User size={18} /> My Account
            </button>
            <button className="flex items-center gap-2 text-gray-700 hover:text-orange-500">
              <Heart size={18} /> Favorites
            </button>
            <button className="flex items-center gap-2 text-gray-700 hover:text-orange-500">
              <ShoppingCart size={18} /> Orders
            </button>
            <button className="flex items-center gap-2 text-orange-500 font-semibold">
              <Bell size={18} /> Notifications
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="rounded-2xl flex-1 p-4 lg:p-8 bg-slate-100">
          <h2 className="text-2xl font-bold mb-2">Notifications</h2>
          <p className="text-gray-500 mb-6">
            Stay updated with your latest orders and offers.
          </p>

          {notifications.length === 0 ? (
            <p className="text-center text-gray-500">You’re all caught up 🎉</p>
          ) : (
            <ul className="space-y-3">
              {notifications.map((n) => (
                <li
                  key={n.id}
                  className={`p-4 rounded-xl shadow bg-white border hover:shadow-md transition ${
                    !n.read ? "bg-blue-50" : "bg-white"
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold">{n.title}</p>
                      <p className="text-sm text-gray-600">{n.description}</p>
                    </div>
                    <span className="text-xs text-gray-400">{n.time}</span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </main>
      </section>
    </>
  )
}

export default page
