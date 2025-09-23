'use client'
import React, { useEffect, useState } from 'react'
import { Heart, Bell, User, ShoppingCart } from 'lucide-react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import Image from 'next/image'
import { useSelector, useDispatch } from 'react-redux'
import { setuserdata } from '../redux/userdataslice/userdataslice'

const Aside = () => {
  const [isMounted, setIsMounted] = useState(false)
  const nav = useRouter()
  const dispatch = useDispatch()

  // Redux state se userdata laa rahe hain
  const userdatava = useSelector((state) => state.userdata.value)

  const api = axios.create({
    baseURL: 'http://localhost:4000/api',
    withCredentials: true,
  })

  const fetchUserData = () => {
    api
      .get('/user/fetch-token-data', { withCredentials: true })
      .then((res) => dispatch(setuserdata(res.data.user)))
      .catch((err) => {
        console.log(err.response)
        if (err.response?.status === 401) {
          api
            .get('/user/refresh-token', { withCredentials: true })
            .then(() =>
              api.get('/user/fetch-token-data', { withCredentials: true })
            )
            .then((res) => {
              dispatch(setuserdata(res.data.user))
              console.log(res, 'lakhos')
            })
            .catch(() => {
              dispatch(setuserdata({}))
              nav.push('/login')
            })
        } else {
          dispatch(setuserdata({}))
        }
      })
  }

  useEffect(() => {
    setIsMounted(true)
    fetchUserData()
  }, [])

  if (!isMounted) return null // prevent hydration error
  console.log(userdatava , "lasldfjalsfjlasdjflkasjfklsdjfklasjfklasjflkasdjfklsdj")

  return (
    <aside className='fixed rounded-2xl lg:static top-0 left-0 h-[100vh] w-64 bg-slate-100 shadow-md p-4 flex flex-col'>
      {/* Profile */}
      <div className='flex items-center gap-3 mb-6'>
        <Image
          src={userdatava?.avatar || '/default-avatar.png'} // fallback image
          alt='User Avatar'
          width={50}
          height={50}
          className='rounded-full object-cover'
        />

        <div>
          <p className='font-semibold'>Account: {userdatava?.id || 'Guest'}</p>
          <p className='text-sm text-gray-500'>
            {userdatava?.email || 'Not logged in'}
          </p>
          {!userdatava?.id && (
            <button
              onClick={() => nav.push('/login')}
              className='px-4 py-2 bg-blue-600 text-white rounded-md'
            >
              Login / Signup
            </button>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className='flex flex-col gap-3 border-l border-gray-200 pl-4 py-4'>
        <button
          onClick={() => nav.push('/pages/account')}
          className='flex items-center gap-2 px-3 py-2 text-gray-700 hover:bg-orange-100 hover:text-orange-600 rounded-md transition-all duration-200'
        >
          <User size={20} /> My Account
        </button>
        <button
          onClick={() => nav.push('/pages/wishlist')}
          className='flex items-center gap-2 px-3 py-2 text-gray-700 hover:bg-pink-100 hover:text-pink-600 rounded-md transition-all duration-200'
        >
          <Heart size={20} /> Favorites
        </button>
        <button
          onClick={() => nav.push('/pages/orders')}
          className='flex items-center gap-2 px-3 py-2 text-gray-700 hover:bg-blue-100 hover:text-blue-600 rounded-md transition-all duration-200'
        >
          <ShoppingCart size={20} /> Orders
        </button>
        <button
          onClick={() => nav.push('/pages/notification')}
          className='flex items-center gap-2 px-3 py-2 text-gray-700 hover:bg-green-100 hover:text-green-600 rounded-md transition-all duration-200'
        >
          <Bell size={20} /> Notifications
        </button>
      </nav>
    </aside>
  )
}

export default Aside
