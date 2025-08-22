'use client'
import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Mousewheel } from 'swiper/modules'
// import my from '../assets/images/1369831.png'
import 'swiper/css'
import AOS from 'aos'
import 'aos/dist/aos.css'
import Marquee from 'react-fast-marquee'
import { RiFlashlightFill } from "react-icons/ri";
import Image from 'next/image'



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

    <section className="py-6 sm:py-8 md:py-10 lg:py-12 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 px-3 sm:px-4 md:px-6 lg:px-8">
      {/* Left Section - Content */}
      <div className="flex flex-col justify-center">
        <div className="max-w-xl mx-auto lg:mx-0 text-center lg:text-left" data-aos="fade-right">
          <h1 className="text-2xl xs:text-[28px] sm:text-3xl md:text-4xl lg:text-5xl xl:text-[52px] font-extrabold leading-tight text-gray-900">
            Designs that Speak.
            <br className="hidden xs:block" /> Spaces that Feel.
          </h1>
          <p className="mt-4 sm:mt-5 md:mt-6 text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed">
            Unique. Beautiful. Made for You — Shop Authentic Handcrafted Creations
            Today
          </p>
          <div className="mt-6 sm:mt-7 md:mt-8 flex flex-col xs:flex-row justify-center lg:justify-start gap-3 sm:gap-4">
            <button className="bg-black text-white px-4 py-2.5 sm:px-5 sm:py-3 md:px-6 md:py-3 rounded-md text-xs sm:text-sm font-semibold hover:opacity-90 transition whitespace-nowrap">
              OPEN STORE FREE
            </button>
            <button className="border border-gray-300 px-4 py-2.5 sm:px-5 sm:py-3 md:px-6 md:py-3 rounded-md text-xs sm:text-sm font-semibold hover:bg-black hover:text-white transition whitespace-nowrap">
              BUY NOW
            </button>
          </div>
        </div>
      </div>

      {/* Right Section - Marquee */}
      <div className="border rounded-3xl sm:rounded-[40px] lg:rounded-[50px] flex items-center overflow-hidden w-full cursor-grab">
    <div className="w-full space-y-4">
      <Marquee
        gradient={false}
        speed={30}
        direction="right"
        pauseOnHover={true}
        className="w-full"
      >
        <div className="flex items-center text-white space-x-4 sm:space-x-6 md:space-x-8">
          {[1, 2, 3, 4, 5, 6, 7].map((item) => (
            <Image
              key={item}
              src="https://w0.peakpx.com/wallpaper/727/599/HD-wallpaper-green-windows-11-logo-in-green-background-windows-11.jpg"
              alt={`Logo ${item}`}
              width={120}
              height={75}
              className="object-contain h-12 sm:h-14 md:h-16 lg:h-20 w-auto"
            />
          ))}
        </div>
      </Marquee>

      {/* Keep all your marquees, just apply the same responsive tweaks */}
      {/* ↓ Example for one more, you copy these classes to the rest ↓ */}
      <Marquee
        gradient={false}
        speed={35}
        direction="left"
        pauseOnHover={true}
        className="w-full"
      >
        <div className="flex items-center text-white space-x-4 sm:space-x-6 md:space-x-8">
          {[1, 2, 3, 4, 5, 6, 7].map((item) => (
            <Image
              key={item}
              src="https://w0.peakpx.com/wallpaper/727/599/HD-wallpaper-green-windows-11-logo-in-green-background-windows-11.jpg"
              alt={`Logo ${item}`}
              width={120}
              height={75}
              className="object-contain h-12 sm:h-14 md:h-16 lg:h-20 w-auto"
            />
          ))}
        </div>
      </Marquee>
         <Marquee
        gradient={false}
        speed={25}
        direction="right"
        pauseOnHover={true}
        className="w-full"
      >
        <div className="flex items-center text-white space-x-4 sm:space-x-6 md:space-x-8">
          {[1, 2, 3, 4, 5, 6, 7].map((item) => (
            <Image
              key={item}
              src="https://w0.peakpx.com/wallpaper/727/599/HD-wallpaper-green-windows-11-logo-in-green-background-windows-11.jpg"
              alt={`Logo ${item}`}
              width={120}
              height={75}
              className="object-contain h-12 sm:h-14 md:h-16 lg:h-20 w-auto"
            />
          ))}
        </div>
      </Marquee>
    </div>
  </div>
</section>


  )
}

export default Herohome
