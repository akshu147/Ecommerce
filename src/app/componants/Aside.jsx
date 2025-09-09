"use client"
import React, { useState } from 'react'
import {
  Heart,
  Bell,
  User,
  ShoppingCart,
} from "lucide-react";
import { useRouter } from 'next/navigation';

const Aside = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const nav = useRouter();

  return (
    <aside
      className={`fixed rounded-2xl lg:static top-0 left-0 h-[100vh] w-64 bg-slate-100 shadow-md p-4 flex flex-col transform transition-transform duration-300 z-40 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}
    >
      {/* Profile Section */}
      <div className='flex items-center gap-3 mb-6'>
        <div className='w-12 h-12 rounded-full bg-pink-200' />
        <div>
          <p className='font-semibold'>mr start</p>
          <p className='text-sm text-gray-500'>labina@email.com</p>
          <button className='text-xs text-orange-500'>Edit Profile</button>
        </div>
      </div>

      {/* Navigation */}
      <nav className='flex flex-col gap-4'>
        <button
          className='flex items-center gap-2 text-gray-700 hover:text-orange-500'
          onClick={() => nav.push("/pages/account")}
        >
          <User size={18} /> My Account
        </button>

        <button
          className='flex items-center gap-2 text-orange-500 font-semibold'
          onClick={() => {
            nav.push("/pages/wishlist");
          }}
        >
          <Heart size={18} /> Favorites
        </button>

        <button
          className='flex items-center gap-2 text-gray-700 hover:text-orange-500'
          onClick={() => nav.push("/pages/orders")}
        >
          <ShoppingCart size={18} /> Orders
        </button>

        <button
          className='flex items-center gap-2 text-gray-700 hover:text-orange-500'
          onClick={() => nav.push("/pages/notification")}
        >
          <Bell size={18} /> Notifications
        </button>
      </nav>
    </aside>
  );
};

export default Aside;
