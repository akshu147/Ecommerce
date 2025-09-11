"use client"
import React, { useState } from 'react';
import { Heart, Bell, User, ShoppingCart, Menu, X } from 'lucide-react';
import Navbar from '../../componants/Navbar';
import Aside from '../../componants/Aside';

const FavoritesPage = () => {
  const [favorites] = useState([
    { id: 1, name: 'Meja Tamu / Samping Minimalist', price: 'Rp. 3.829.000', location: 'Kab. Sidoarjo', rating: 4, img: 'https://via.placeholder.com/150' },
    { id: 2, name: 'Meja Tamu Minimalist', price: 'Rp. 48.500', location: 'Kab. Jakarta Selatan', rating: 3, img: 'https://via.placeholder.com/150' },
    { id: 3, name: 'RISATOR Keranjang', price: 'Rp. 164.000', location: 'Kab. Sidoarjo', rating: 5, img: 'https://via.placeholder.com/150' }
  ]);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <Navbar />

      {/* Mobile Top Bar */}
      <div className='lg:hidden flex justify-between items-center p-4 shadow bg-white sticky top-0 z-50'>
        <h1 className='font-bold text-lg'>Favorites</h1>
        <button onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <section className='flex mt-3 gap-6 p-4'>
        {/* Sidebar */}
        <Aside />

        {/* Main Content */}
        <main className='rounded-2xl flex-1 p-4 lg:p-8 bg-slate-100'>
          <h2 className='text-2xl font-bold mb-2'>Orders</h2>
          <p className='text-gray-500 mb-6'>Find your saved items and get ready to order them.</p>

          {/* Search Bar */}
          <div className='mb-6'>
            <input
              type='text'
              placeholder='Search favorites...'
              className='w-full md:w-1/2 p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-400'
            />
          </div>

          {/* Product Grid */}
          <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-2'>
            {favorites.map(item => (
              <div
                key={item.id}
                className='bg-white rounded-xl shadow p-2 flex flex-col hover:shadow-lg transition'
              >
                <img
                  src={item.img}
                  alt={item.name}
                  className='w-full h-40 object-cover rounded-md mb-1 border'
                />
                <h3 className='hidden md:block font-semibold text-sm mb-1'>{item.name}</h3>
                <p className='text-orange-600 text-[12px] font-bold'>{item.price}</p>
                <p className='hidden md:block text-xs text-gray-500 mb-2'>{item.location}</p>
                <div className='flex items-center gap-1'>
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <span key={i} className='hidden md:block text-yellow-400'>★</span>
                  ))}
                </div>
                <div className='hidden md:block'>
                  <div className='flex justify-between items-center mt-auto'>
                    <button className='text-red-500'>
                      <Heart size={20} />
                    </button>
                    <button className='bg-orange-500 text-white px-4 py-1 rounded-full hover:bg-orange-600'>
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
  );
};

export default FavoritesPage;
