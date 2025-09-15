'use client'
import React, { useEffect, useState } from 'react'
import { Heart, Bell, User, ShoppingCart } from 'lucide-react'
import { useRouter } from 'next/navigation'
import nookies from 'nookies'
import axios from 'axios'

const Aside = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [userdata, setuserdata] = useState({})
  const nav = useRouter()

  const getuserdata = async () => {
    try {
      console.log('success')
      const token = nookies.get('accestoken')
      console.log(token.accestoken, 'data')

      if (token) {
        const responce = await axios.get(
          `http://localhost:4000/api/user/fetch-token-data`,
          {
            headers: {
              Authorization: `Bearer ${token.accestoken}`
            }
          }
        )

        setuserdata(responce.data.user)
      }
    } catch (err) {
      if (err.response && err.response.status === 401) {
        alert('Unauthorized! Please login again.')
      } else {
        alert('Something went wrong!')
      }
    }
  }

  useEffect(() => {
    getuserdata()
  }, [])
  console.log(userdata)

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
          <div className='flex justify-between gap-4'>
            <p className='font-semibold'>Account</p>
            <p className='text-sm font-medium text-gray-600 rounded-md'>
              ID: {userdata.id || ''}
            </p>
          </div>

          <p className='text-sm text-gray-500'>{userdata.email || ''}</p>
          {userdata ? (
            // Edit Profile button with tooltip
            <div className='relative group inline-block'>
              <button className='px-3 py-1 text-xs font-semibold text-orange-500 border border-orange-500 rounded-md hover:bg-orange-500 hover:text-white transition'>
                Edit Profile
              </button>

              {/* Tooltip */}
              <div className='absolute left-full -translate-x-1/2 mt-2 w-56 bg-black text-white text-xs rounded-lg p-3 opacity-0 group-hover:opacity-100 transform scale-90 group-hover:scale-100 transition-all pointer-events-none shadow-lg'>
                <ul className='list-disc pl-4 space-y-1'>
                  <li>Update your name & email</li>
                  <li>Change profile picture</li>
                  <li>Reset your password</li>
                  <li>Edit contact details</li>
                </ul>
              </div>
            </div>
          ) : (
            // Sign Up button (no tooltip)
            <button className='px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition'>
              Sign Up
            </button>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className='flex flex-col gap-4'>
        <button
          className='flex items-center gap-2 text-gray-700 hover:text-orange-500'
          onClick={() => nav.push('/pages/account')}
        >
          <User size={18} /> My Account
        </button>

        <button
          className='flex items-center gap-2 text-orange-500 font-semibold'
          onClick={() => {
            nav.push('/pages/wishlist')
          }}
        >
          <Heart size={18} /> Favorites
        </button>

        <button
          className='flex items-center gap-2 text-gray-700 hover:text-orange-500'
          onClick={() => nav.push('/pages/orders')}
        >
          <ShoppingCart size={18} /> Orders
        </button>

        <button
          className='flex items-center gap-2 text-gray-700 hover:text-orange-500'
          onClick={() => nav.push('/pages/notification')}
        >
          <Bell size={18} /> Notifications
        </button>
      </nav>
    </aside>
  )
}

export default Aside
