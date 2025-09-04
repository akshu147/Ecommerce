'use client'
import React, { useContext, useEffect, useMemo, useState } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import {
  FiSearch,
  FiUser,
  FiShoppingCart,
  FiHeart,
  FiTruck,
  FiShield,
  FiRefreshCcw,
  FiChevronRight
} from 'react-icons/fi'
import Image from 'next/image'
import { Mycontext } from '../context/Authcontext'
export default function HomePage () {
  const { dummydata } = useContext(Mycontext)
  console.log(dummydata, 'halo')
  // --- AOS ---
  useEffect(() => {
    AOS.init({ duration: 800, once: false, offset: 40, easing: 'ease-out' })
  }, [])

  // --- Sample Data (replace with API later) ---

  const categories = useMemo(
    () => [
      {
        name: 'Watches',
        img: 'https://images.unsplash.com/photo-1547996160-81dfa63595aa?q=80&w=800&auto=format&fit=crop'
      },
      {
        name: 'Headphones',
        img: 'https://images.unsplash.com/photo-1518441902113-c1d3b6ae2a59?q=80&w=800&auto=format&fit=crop'
      },
      {
        name: 'Smartphones',
        img: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=800&auto=format&fit=crop'
      },
      {
        name: 'Laptops',
        img: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=800&auto=format&fit=crop'
      },
      {
        name: 'Cameras',
        img: 'https://images.unsplash.com/photo-1516726817505-f5ed825624d8?q=80&w=800&auto=format&fit=crop'
      },
      {
        name: 'Gaming',
        img: 'https://images.unsplash.com/photo-1587202372775-98927b41542d?q=80&w=800&auto=format&fit=crop'
      }
    ],
    []
  )

  const products = useMemo(
    () => [
      {
        id: 1,
        title: 'Apple Watch Series 9',
        price: 399,
        rating: 4.7,
        img: 'https://images.unsplash.com/photo-1518441902113-c1d3b6ae2a59?q=80&w=800&auto=format&fit=crop',
        tag: 'Best Seller'
      },
      {
        id: 2,
        title: 'Samsung Galaxy Watch 6',
        price: 329,
        rating: 4.5,
        img: 'https://images.unsplash.com/photo-1516264664734-5f6b1b3d1c8e?q=80&w=800&auto=format&fit=crop',
        tag: 'Trending'
      },
      {
        id: 3,
        title: 'OnePlus Watch 2',
        price: 249,
        rating: 4.2,
        img: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=800&auto=format&fit=crop'
      },
      {
        id: 4,
        title: 'Garmin Venu 3',
        price: 429,
        rating: 4.6,
        img: 'https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=800&auto=format&fit=crop'
      },
      {
        id: 5,
        title: 'Fossil Gen 6',
        price: 219,
        rating: 4.1,
        img: 'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?q=80&w=800&auto=format&fit=crop'
      },
      {
        id: 6,
        title: 'Amazfit GTR 4',
        price: 179,
        rating: 4.3,
        img: 'https://images.unsplash.com/photo-1596461404969-9ae70bba03ac?q=80&w=800&auto=format&fit=crop'
      },
      {
        id: 7,
        title: 'Pixel Watch 2',
        price: 349,
        rating: 4.4,
        img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800&auto=format&fit=crop'
      },
      {
        id: 8,
        title: 'Huawei Watch GT 4',
        price: 289,
        rating: 4.2,
        img: 'https://images.unsplash.com/photo-1523206489230-c012c64b2b48?q=80&w=800&auto=format&fit=crop'
      }
    ],
    []
  )

  const [wishlist, setWishlist] = useState([])
  const toggleWishlist = id =>
    setWishlist(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    )

  return (
    <div className='min-h-screen bg-[#D1D7DB] text-gray-900 px-0  sm:px-1 md:px-3 lg:px-9'>
      {/* ========================== Hero ========================== */}
      <section className='relative overflow-hidden'>
        <div className='absolute inset-0' />
        <div className='container mx-auto px-4 py-10 md:py-16'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-10 items-center'>
            {/* left copy */}
            <div data-aos='fade-right'>
              <p className='mb-3 inline-flex items-center gap-2 text-sm font-medium text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full'>
                <FiTruck /> Free Shipping over $99
              </p>
              <h1 className='text-4xl md:text-6xl font-extrabold leading-tight tracking-tight'>
                Transform your home with elegance and{' '}
                <span className='text-emerald-600'>style</span>
              </h1>
              <p className='mt-5 text-gray-600 md:text-lg'>
                Los Angeles search engine marketing agency with years of
                experience doing SEO, website optimization and high‑converting
                storefronts.
              </p>
              <div className='mt-8 flex flex-wrap gap-3'>
                <button className='px-6 py-3 rounded-lg bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition'>
                  Explore More
                </button>
                <button className='px-6 py-3 rounded-lg border border-gray-300 font-semibold hover:bg-gray-100 transition'>
                  Shop Deals
                </button>
              </div>
              <div
                className='mt-6 flex items-center gap-3 text-sm text-gray-600'
                data-aos='fade-up'
                data-aos-delay='150'
              >
                <span className='text-yellow-500 text-lg'>★★★★★</span>
                <span>Rated 4.8/5 by 12k+ shoppers</span>
              </div>
            </div>

            {/* hero slider */}
            <div data-aos='fade-left' className='relative'>
              <span className='absolute -right-3 -top-3 z-10 bg-emerald-600 text-white text-xs font-semibold px-3 py-2 rounded-lg'>
                50% Discount
              </span>
              <div className='rounded-3xl overflow-hidden shadow-lg ring-1 ring-black/5 bg-white'>
                <Swiper
                  modules={[Autoplay, Navigation, Pagination]}
                  autoplay={{ delay: 3000, disableOnInteraction: false }}
                  pagination={{ clickable: true }}
                  navigation
                  loop
                  className='h-[360px] md:h-[480px]'
                >
                  {[
                    'https://images.unsplash.com/photo-1518441902113-c1d3b6ae2a59?q=80&w=1400&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1400&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=1400&auto=format&fit=crop'
                  ].map((src, i) => (
                    <SwiperSlide key={i}>
                      <Image
                        width={200}
                        height={200}
                        src={src}
                        alt={`hero-${i}`}
                        className='w-full h-full object-cover'
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================== Feature Badges ========================== */}
      <section className='container mx-auto px-4 py-10' data-aos='fade-up'>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
          <Feature
            icon={<FiTruck />}
            title='Fast Delivery'
            subtitle='2–5 business days'
          />
          <Feature
            icon={<FiShield />}
            title='Secure Payments'
            subtitle='100% protected'
          />
          <Feature
            icon={<FiRefreshCcw />}
            title='Easy Returns'
            subtitle='7‑day guarantee'
          />
          <Feature
            icon={<FiHeart />}
            title='Loved by 12k+'
            subtitle='Top rated products'
          />
        </div>
      </section>

      {/* ========================== Categories ========================== */}
      <section className='container mx-auto px-4 py-12 border-[6px]'>
        <div className='flex items-end justify-between mb-6'>
          <h2 className='text-2xl md:text-3xl font-bold'>Shop by Category</h2>
          <a
            href='#'
            className='text-emerald-700 hover:underline flex items-center gap-1'
          >
            View all <FiChevronRight />
          </a>
        </div>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4'>
          {categories.map((c, idx) => (
            <div
              key={idx}
              data-aos='zoom-in'
              className='group relative overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-black/5'
            >
              <img
                src={c.img}
                alt={c.name}
                className='h-36 w-full object-cover transition-transform duration-300 group-hover:scale-105'
              />
              <div className='absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent' />
              <div className='absolute bottom-2 left-2 text-white font-semibold'>
                {c.name}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================== Featured Grid ========================== */}
      <section className='container mx-auto px-4 py-12'>
        <div className='flex items-end justify-between mb-6'>
          <h2 className='text-2xl md:text-3xl font-bold'>Latest Smart Watch</h2>
          <a
            href='#'
            className='text-emerald-700 hover:underline flex items-center gap-1'
          >
            Browse more <FiChevronRight />
          </a>
        </div>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-5'>
          {products.map((p, idx) => (
            <article
              key={p.id}
              className='rounded-2xl bg-white p-3 shadow-sm ring-1 ring-black/5 hover:shadow-md transition'
              data-aos='fade-up'
              data-aos-delay={(idx % 4) * 100}
            >
              <div className='relative overflow-hidden rounded-xl'>
                {p.tag && (
                  <span className='absolute left-3 top-3 z-10 bg-emerald-600 text-white text-xs font-semibold px-2 py-1 rounded'>
                    {p.tag}
                  </span>
                )}
                <Image
                  width={100}
                  height={100}
                  src={p.img}
                  alt={p.title}
                  className='h-40 w-full object-cover'
                />
                <button
                  onClick={() => toggleWishlist(p.id)}
                  className={`absolute right-3 top-3 rounded-full bg-white/90 p-2 shadow ${
                    wishlist.includes(p.id) ? 'text-rose-500' : 'text-gray-700'
                  }`}
                  aria-label='wishlist'
                >
                  <FiHeart />
                </button>
              </div>
              <div className='mt-3 space-y-1'>
                <h3 className='font-semibold leading-snug line-clamp-1'>
                  {p.title}
                </h3>
                <p className='text-sm text-gray-500'>
                  ⭐ {p.rating} • Free returns
                </p>
                <div className='flex items-center justify-between pt-1'>
                  <p className='text-lg font-bold'>${p.price}</p>
                  <button className='px-3 py-1.5 rounded-lg bg-black text-white text-sm font-semibold hover:bg-gray-800'>
                    Buy Now
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ========================== Promo Banner ========================== */}
      <section className='container mx-auto px-4 py-12' data-aos='fade-up'>
        <div className='relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-600 to-emerald-500 text-white'>
          <div className='p-8 md:p-12 grid md:grid-cols-2 items-center gap-8'>
            <div>
              <p className='uppercase tracking-wider text-white/80 text-xs'>
                Limited Time
              </p>
              <h3 className='text-3xl md:text-4xl font-extrabold mt-1'>
                Summer Sale — Up to 50% Off
              </h3>
              <p className='mt-3 text-white/90'>
                Upgrade your tech with our hottest deals on smartwatches,
                headphones and more.
              </p>
              <div className='mt-6 flex gap-3'>
                <button className='bg-white text-emerald-700 px-5 py-2.5 rounded-lg font-semibold hover:bg-gray-100'>
                  Grab Deals
                </button>
                <button className='border border-white/70 px-5 py-2.5 rounded-lg font-semibold hover:bg-white/10'>
                  Learn More
                </button>
              </div>
            </div>
            <img
              src='https://images.unsplash.com/photo-1545239351-1141bd82e8a6?q=80&w=1200&auto=format&fit=crop'
              alt='promo'
              className='hidden md:block h-56 w-full object-cover rounded-2xl border-[4px] border-red-500'
            />
          </div>
        </div>
      </section>

      {/* ========================== Testimonials ========================== */}
      <section className='container mx-auto px-4 py-12'>
        <h2 className='text-2xl md:text-3xl font-bold mb-6'>
          What customers say
        </h2>
        <div className='grid md:grid-cols-3 gap-5'>
          {[1, 2, 3].map(i => (
            <div
              key={i}
              className='rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5'
              data-aos='fade-up'
              data-aos-delay={i * 100}
            >
              <p className='text-gray-700'>
                “Super fast delivery and the watch quality is amazing. Battery
                lasts all week!”
              </p>
              <div className='mt-4 flex items-center gap-3'>
                <Image
                  src={`https://i.pravatar.cc/80?img=${i + 10}`}
                  alt='avatar'
                  width={40}
                  height={40}
                  className='h-10 w-10 rounded-full object-cover'
                />
                <div>
                  <p className='font-semibold'>Alex Johnson</p>
                  <p className='text-xs text-gray-500'>Verified Buyer</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================== Newsletter ========================== */}
      <section className='container mx-auto px-4 py-12' data-aos='fade-up'>
        <div className='rounded-3xl bg-white p-8 md:p-10 shadow-sm ring-1 ring-black/5'>
          <div className='flex flex-col md:flex-row items-center gap-6'>
            <div className='flex-1'>
              <h3 className='text-2xl md:text-3xl font-extrabold'>
                Join our newsletter
              </h3>
              <p className='text-gray-600 mt-1'>
                Get product updates, exclusive offers and more—no spam.
              </p>
            </div>
            <form className='flex w-full md:w-auto gap-3'>
              <input
                type='email'
                placeholder='Enter your email'
                className='w-full md:w-80 px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500'
              />
              <button className='px-6 py-3 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700'>
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ========================== Footer ========================== */}
      <Footer />
    </div>
  )
}

// ========================= Sub Components =========================
function TopBar () {
  return (
    <div className='hidden md:block bg-black text-white'>
      <div className='container mx-auto px-4 py-2 flex items-center justify-between text-sm'>
        <p>Summer Sale: Up to 50% off selected items</p>
        <div className='flex items-center gap-6 opacity-90'>
          <p>Help</p>
          <p>Track Order</p>
          <p>Returns</p>
        </div>
      </div>
    </div>
  )
}

function Header () {
  return (
    <header className='sticky top-0 z-40 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b'>
      <div className='container mx-auto px-4'>
        <div className='flex h-16 items-center justify-between'>
          {/* brand */}
          <a href='#' className='text-2xl font-extrabold tracking-tight'>
            STARK
          </a>

          {/* search */}
          <div className='hidden md:flex items-center gap-2 flex-1 mx-6 max-w-2xl'>
            <div className='flex items-center gap-2 w-full rounded-xl border border-gray-300 px-3 py-2 focus-within:ring-2 focus-within:ring-emerald-500'>
              <FiSearch className='text-gray-500' />
              <input
                className='w-full outline-none'
                placeholder='Search products, categories…'
              />
            </div>
          </div>

          {/* actions */}
          <nav className='flex items-center gap-4 text-[22px]'>
            <a href='#' className='hover:text-emerald-600' title='Account'>
              <FiUser />
            </a>
            <a href='#' className='hover:text-emerald-600' title='Wishlist'>
              <FiHeart />
            </a>
            <a
              href='#'
              className='relative hover:text-emerald-600'
              title='Cart'
            >
              <FiShoppingCart />
              <span className='absolute -right-2 -top-2 text-[11px] bg-emerald-600 text-white w-5 h-5 rounded-full grid place-items-center'>
                2
              </span>
            </a>
          </nav>
        </div>

        {/* mobile search */}
        <div className='md:hidden pb-3'>
          <div className='flex items-center gap-2 rounded-xl border border-gray-300 px-3 py-2'>
            <FiSearch className='text-gray-500' />
            <input
              className='w-full outline-none'
              placeholder='Search products…'
            />
          </div>
        </div>
      </div>
    </header>
  )
}

function Feature ({ icon, title, subtitle }) {
  return (
    <div className='flex items-center gap-3 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5'>
      <div className='text-emerald-700 text-xl'>{icon}</div>
      <div>
        <p className='font-semibold'>{title}</p>
        <p className='text-sm text-gray-600'>{subtitle}</p>
      </div>
    </div>
  )
}

function Footer () {
  const year = new Date().getFullYear()
  return (
    <footer className='bg-[#1e2224] text-white mt-12 rounded-[10px]'>
      <div className='container mx-auto px-4 py-14 grid md:grid-cols-4 gap-10'>
        {/* Brand Info */}
        <div>
          <h3
            className="text-4xl font-extrabold bg-[url('https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')] 
             bg-clip-text text-transparent bg-cover bg-center"
          >
            FURNSTACK
          </h3>
          <p className='text-white/80 mt-3'>
            Premium-quality furniture for your home & office. Free shipping on
            orders over $199.
          </p>
        </div>

        {/* Shop Categories */}
        <div>
          <p className='font-semibold mb-3'>Shop</p>
          <ul className='space-y-2 text-white/80'>
            <li>
              <a href='#'>Living Room</a>
            </li>
            <li>
              <a href='#'>Bedroom</a>
            </li>
            <li>
              <a href='#'>Dining Room</a>
            </li>
            <li>
              <a href='#'>Office Furniture</a>
            </li>
            <li>
              <a href='#'>Outdoor & Garden</a>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <p className='font-semibold mb-3'>Support</p>
          <ul className='space-y-2 text-white/80'>
            <li>
              <a href='#'>Help Center</a>
            </li>
            <li>
              <a href='#'>Shipping & Delivery</a>
            </li>
            <li>
              <a href='#'>Returns & Exchanges</a>
            </li>
            <li>
              <a href='#'>Warranty & Assembly</a>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <p className='font-semibold mb-3'>Newsletter</p>
          <form className='flex gap-2'>
            <input
              className='w-full px-4 py-2 rounded-lg text-black'
              placeholder='Your email'
            />
            <button className='px-4 py-2 rounded-lg bg-white text-black font-semibold hover:bg-gray-200'>
              Subscribe
            </button>
          </form>
          <p className='text-white/60 mt-2 text-sm'>
            Get updates on new arrivals, exclusive offers, and furniture tips.
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className='border-t border-white/10'>
        <div className='container mx-auto px-4 py-6 text-sm text-white/70 flex flex-col md:flex-row items-center justify-between gap-2'>
          <p>© {new Date().getFullYear()} FURNISTAR. All rights reserved.</p>
          <p>Privacy • Terms • Cookies</p>
        </div>
      </div>
    </footer>
  )
}
