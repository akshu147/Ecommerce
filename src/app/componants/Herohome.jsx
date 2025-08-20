'use client'
import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Mousewheel } from 'swiper/modules'
import my from '../assets/images/1369831.png'
import 'swiper/css'
import AOS from 'aos'
import 'aos/dist/aos.css'

const Herohome = () => {
  const [showcasestyle, setshowcasestyle] = useState('vertical')

  const changedirection = () => {
    const direction = window.innerWidth <= 500 ? 'horizontal' : 'vertical'
    setshowcasestyle(direction)
  }

  useEffect(() => {
    changedirection()
    window.addEventListener('resize', changedirection)

    // init aos
    AOS.init({ duration: 1200, once: true })

    return () => {
      window.removeEventListener('resize', changedirection)
    }
  }, [])

  const images = [
    'https://w0.peakpx.com/wallpaper/112/562/HD-wallpaper-lord-shiva-artwork-others.jpg',
    'https://w0.peakpx.com/wallpaper/112/562/HD-wallpaper-lord-shiva-artwork-others.jpg',
    'https://w0.peakpx.com/wallpaper/112/562/HD-wallpaper-lord-shiva-artwork-others.jpg',
    'https://w0.peakpx.com/wallpaper/112/562/HD-wallpaper-lord-shiva-artwork-others.jpg'
  ]

  return (
    <section className='py-10 px-2 sm:px-3 md:px-4 lg:px-8'>
      <div className='container px-2 mx-auto flex flex-col lg:flex-row items-center justify-between gap-10'>
        {/* Left Section */}
        <div className='max-w-xl' data-aos="fade-right">
          <h1 className='text-[30px] sm:text-[32px] md:text-[40px] lg:text-[50px] font-extrabold leading-tight text-gray-900'>
            Designs that Speak.
            <br /> Spaces that Feel.
          </h1>
          <p className='mt-6 text-gray-600 text-lg'>
            Unique. Beautiful. Made for You — Shop Authentic Handcrafted
            Creations Today
          </p>
          <div className='mt-8 flex gap-4'>
            <button className='bg-black text-white px-6 py-3 rounded-md text-sm font-semibold hover:opacity-90 transition'>
              OPEN STORE FREE
            </button>
            <button className='border px-6 py-3 rounded-md text-sm font-semibold hover:bg-black hover:text-white transition'>
              BUY NOW
            </button>
          </div>
        </div>

        {/* Right Section */}
       
      </div>
    </section>
  )
}

export default Herohome
