'use client';

import React, { useEffect, useState } from "react";
import { Heart, Bell, User, ShoppingCart, X } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { setuserdata } from "../redux/userdataslice/userdataslice";
import Checkiflogin from "./Checkiflogin";
import axios from "axios";

export default function Aside({ sidebarOpen, setSidebarOpen }) {
  const [isMounted, setIsMounted] = useState(false);
  const nav = useRouter();
  const dispatch = useDispatch();
  const userdatava = useSelector(state => state.userdata.value);

  const api = axios.create({
    baseURL: "http://localhost:4000/api",
    withCredentials: true,
  });

  const fetchUserData = async () => {
    try {
      const res = await api.get("/user/fetch-token-data");
      dispatch(setuserdata(res.data.user));
    } catch (err) {
      console.log(err.response);
      if (err.response?.status === 401) {
        try {
          await api.get("/user/refresh-token");
          const res2 = await api.get("/user/fetch-token-data");
          dispatch(setuserdata(res2.data.user));
        } catch {
          dispatch(setuserdata({}));
          nav.push("/login");
        }
      } else {
        dispatch(setuserdata({}));
      }
    }
  };

  useEffect(() => {
    setIsMounted(true);
    fetchUserData();
  }, []);

  if (!isMounted) return null; // prevent hydration errors

  return (
    <>
      <Checkiflogin />
      {/* Overlay for mobile when sidebar is open */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 h-full w-64 bg-slate-100 p-4 shadow-md z-50
          transform transition-transform duration-300
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 lg:static lg:h-auto lg:shadow-none
          rounded-2xl
        `}
      >
        {/* Close button for mobile */}
        <div className="flex justify-end mb-4 lg:hidden">
          <button onClick={() => setSidebarOpen(false)}>
            <X size={24} />
          </button>
        </div>

        {/* Profile */}
        <div className="flex items-center gap-3 mb-6">
          {/* <Image
            src={userdatava?.avatar || "/tommy-avatar.png"} // <-- static Tommy avatar added
            alt="User Avatar"
            width={50}
            height={50}
            className="rounded-full object-cover"
          /> */}
          <div>
            <p className="font-semibold">
              Account: {userdatava?.id || "Guest"}
            </p>
            <p className="text-sm text-gray-500">
              {userdatava?.email || "Not logged in"}
            </p>
            {!userdatava?.id && (
              <button
                onClick={() => nav.push("/login")}
                className="px-4 py-2 bg-blue-600 text-white rounded-md mt-1"
              >
                Login / Signup
              </button>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-3 border-l border-gray-200 pl-4 py-4">
          <button
            onClick={() => nav.push("/pages/account")}
            className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:bg-orange-100 hover:text-orange-600 rounded-md transition-all duration-200"
          >
            <User size={20} /> My Account
          </button>
          <button
            onClick={() => nav.push("/pages/wishlist")}
            className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:bg-pink-100 hover:text-pink-600 rounded-md transition-all duration-200"
          >
            <Heart size={20} /> Favorites
          </button>
          <button
            onClick={() => nav.push("/pages/orders")}
            className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:bg-blue-100 hover:text-blue-600 rounded-md transition-all duration-200"
          >
            <ShoppingCart size={20} /> Orders
          </button>
          <button
            onClick={() => nav.push("/pages/notification")}
            className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:bg-green-100 hover:text-green-600 rounded-md transition-all duration-200"
          >
            <Bell size={20} /> Notifications
          </button>
        </nav>
      </aside>
    </>
  );
}
