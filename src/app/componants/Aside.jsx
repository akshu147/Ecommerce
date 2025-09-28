"use client"
import React, { useEffect, useState } from "react"
import { Heart, Bell, User, ShoppingCart, X } from "lucide-react"
import { useRouter } from "next/navigation"
import axios from "axios"
import Image from "next/image"
import { useSelector, useDispatch } from "react-redux"
import { setuserdata } from "../redux/userdataslice/userdataslice"
import Checkiflogin from "./Checkiflogin"

export default function Aside({ sidebarOpen, setSidebarOpen }) {
  const [isMounted, setIsMounted] = useState(false)
  const nav = useRouter()
  const dispatch = useDispatch()
  const userdatava = useSelector((state) => state.userdata.value)

  const api = axios.create({
    baseURL: "http://localhost:4000/api",
    withCredentials: true,
  })

  const fetchUserData = async () => {
    try {
      const res = await api.get("/user/fetch-token-data")
      dispatch(setuserdata(res.data.user))
    } catch (err) {
      console.log(err.response)
      if (err.response?.status === 401) {
        try {
          await api.get("/user/refresh-token")
          const res2 = await api.get("/user/fetch-token-data")
          dispatch(setuserdata(res2.data.user))
        } catch {
          dispatch(setuserdata({}))
          nav.push("/login")
        }
      } else {
        dispatch(setuserdata({}))
      }
    }
  }

  useEffect(() => {
    setIsMounted(true)
    fetchUserData()
  }, [])

  if (!isMounted) return null // prevent hydration errors

  return (
    <>
      <Checkiflogin />

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-slate-100 shadow-md p-4 flex flex-col
          transform transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        {/* Mobile Close Button */}
        <div className="lg:hidden flex justify-end mb-4">
          <button onClick={() => setSidebarOpen(false)}>
            <X size={24} />
          </button>
        </div>

        {/* Profile */}
        <div className="flex items-center gap-3 mb-6">
          <Image
            src={userdatava?.avatar || "/default-avatar.png"}
            alt="User Avatar"
            width={50}
            height={50}
            className="rounded-full object-cover"
          />
          <div className="flex-1">
            <p className="font-semibold">
              Account: {userdatava?.id || "Guest"}
            </p>
            <p className="text-sm text-gray-500">
              {userdatava?.email || "Not logged in"}
            </p>
            {!userdatava?.id && (
              <button
                onClick={() => nav.push("/login")}
                className="px-3 py-1 mt-1 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition"
              >
                Login / Signup
              </button>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-3 border-l border-gray-200 pl-3 py-2">
          <button
            onClick={() => nav.push("/pages/account")}
            className="flex items-center gap-2 px-2 py-2 text-gray-700 hover:bg-orange-100 hover:text-orange-600 rounded-md transition-all duration-200 text-sm"
          >
            <User size={20} /> My Account
          </button>
          <button
            onClick={() => nav.push("/pages/wishlist")}
            className="flex items-center gap-2 px-2 py-2 text-gray-700 hover:bg-pink-100 hover:text-pink-600 rounded-md transition-all duration-200 text-sm"
          >
            <Heart size={20} /> Favorites
          </button>
          <button
            onClick={() => nav.push("/pages/orders")}
            className="flex items-center gap-2 px-2 py-2 text-gray-700 hover:bg-blue-100 hover:text-blue-600 rounded-md transition-all duration-200 text-sm"
          >
            <ShoppingCart size={20} /> Orders
          </button>
          <button
            onClick={() => nav.push("/pages/notification")}
            className="flex items-center gap-2 px-2 py-2 text-gray-700 hover:bg-green-100 hover:text-green-600 rounded-md transition-all duration-200 text-sm"
          >
            <Bell size={20} /> Notifications
          </button>
        </nav>
      </aside>
    </>
  )
}
