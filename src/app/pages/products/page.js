'use client'
import { useContext, useEffect, useState } from 'react'
import Head from '../../componants/Head'
import Navbar from '../../componants/Navbar'
import { GoHeartFill } from 'react-icons/go'
import axios from 'axios'
import { Mycontext } from '../../context/Authcontext'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

export default function Page () {
  const nav = useRouter()
  const { wishlistItems, setWishlistItems, setDummyData, dummydata } =
    useContext(Mycontext)

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedBrand, setSelectedBrand] = useState('')
  const [maxPrice, setMaxPrice] = useState(1000)
  const [categories, setCategories] = useState([])
  const brands = ['WoodCraft', 'FurniHouse', 'HomeLux', 'ComfortLine']
  // const [dummydata, setDummyData] = useState([])
  const [loading, setLoading] = useState(false)
  console.log(wishlistItems)

  // Fetch products
  const fetchDummyData = async () => {
    setLoading(true)
    try {
      const allProduct = await axios.get(
        'https://dummyjson.com/products?limit=100'
      )
      setDummyData(allProduct.data.products)

      const allCategories = [
        ...new Set(allProduct.data.products.map(p => p.category))
      ]
      setCategories(allCategories)
    } catch (err) {
      console.log('Error fetching data:', err)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchDummyData()
  }, [])

  useEffect(() => {
    const savedWishlist = JSON.parse(localStorage.getItem('wishlist')) || []
    setWishlistItems(savedWishlist)
  }, [setWishlistItems])

  const addToWishlist = product => {
    if (wishlistItems.some(item => item.id === product.id))
      return alert('Already in wishlist')
    if (!wishlistItems.some(item => item.id === product.id)) {
      const updated = [...wishlistItems, product]
      setWishlistItems(updated)
      localStorage.setItem('wishlist', JSON.stringify(updated))
    }
  }

  // Filtered products
  const allProductData = dummydata.filter(p => {
    const matchesSearch = p.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
    const matchesCategory =
      !selectedCategory ||
      p.category.toLowerCase() === selectedCategory.toLowerCase()
    const matchesBrand =
      !selectedBrand || p.brand?.toLowerCase() === selectedBrand.toLowerCase()
    const matchesPrice = p.price <= maxPrice
    return matchesSearch && matchesCategory && matchesBrand && matchesPrice
  })

  return (
    <>
      <Head />
      <Navbar />
      <div className='flex flex-col md:flex-row p-5 items-start justify-between'>
        {/* Sidebar */}
        <aside className='w-full md:w-1/5 p-4 bg-gray-100 rounded-xl space-y-6'>
          <input
            type='text'
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder='Search products...'
            className='w-full p-2 border rounded'
          />
          <div>
            <h2 className='font-bold mb-2'>Category</h2>
            {categories.map(cat => (
              <label key={cat} className='block cursor-pointer'>
                <input
                  type='radio'
                  className='mr-2'
                  checked={selectedCategory.toLowerCase() === cat.toLowerCase()}
                  onChange={() => setSelectedCategory(cat)}
                />
                {cat}
              </label>
            ))}
            <button
              className='mt-2 text-sm bg-black text-white p-[2px_5px] rounded-md font-bold'
              onClick={() => setSelectedCategory('')}
            >
              Clear Category
            </button>
          </div>
          <div>
            <h2 className='font-bold mb-2'>Brand</h2>
            {brands.map(brand => (
              <label key={brand} className='block cursor-pointer'>
                <input
                  type='radio'
                  name='brand'
                  className='mr-2'
                  checked={selectedBrand.toLowerCase() === brand.toLowerCase()}
                  onChange={() => setSelectedBrand(brand)}
                />
                {brand}
              </label>
            ))}
            <button
              className='mt-2 text-sm bg-black text-white p-[2px_5px] rounded-md font-bold'
              onClick={() => setSelectedBrand('')}
            >
              Clear Brand
            </button>
          </div>
          <div>
            <h2 className='font-bold mb-2'>Max Price: ${maxPrice}</h2>
            <input
              type='range'
              min='0'
              max='1000'
              value={maxPrice}
              onChange={e => setMaxPrice(+e.target.value)}
              className='w-full'
            />
          </div>
        </aside>

        {/* Products */}
        <main className='product-ui w-full grid grid-cols-3 sm:grid-cols-3 md:p-4 h-[100vh] lg:grid-cols-6 sm:gap-[3] md:gap-[4] lg:gap-[5] gap-2 overflow-y-auto'>
          {loading ? (
            <p className='col-span-full text-center text-gray-500'>
              Loading...
            </p>
          ) : allProductData.length ? (
            allProductData.map((product, index) => (
              <div
                key={index}
                className='border rounded-lg shadow relative transition-shadow md:p-4 duration-300 hover:shadow-xl border-blue-300'
              >
                <i
                  className='absolute top-2 right-2 text-xl cursor-pointer'
                  onClick={() => addToWishlist(product)}
                >
                  <GoHeartFill
                    className={`w-[16px] ${
                      wishlistItems.some(item => item.id === product.id)
                        ? 'text-red-500'
                        : 'text-gray-400'
                    }`}
                  />
                </i>
                <Image
                  src={product.thumbnail}
                  width={10}
                  height={10}
                  alt={product.title}
                  unoptimized
                  className='w-full h-40 object-cover rounded transition-transform duration-300 hover:scale-110 border'
                />
                <div className='hidden md:block'>
                  <h3 className='font-semibold text-lg mt-2'>
                    {product.title}
                  </h3>
                  <p className='text-gray-500 mb-1'>{product.brand}</p>
                  <p className='font-bold text-xl'>rs{product.price}</p>

                  <button className='mt-2 w-full py-1 bg-black text-white rounded hover:bg-gray-700'>
                    <Link href={`/pages/detail/${product.id}?name=${encodeURIComponent(product.title)}&price=${product.price}&image=${encodeURIComponent(product.thumbnail)}&brand=${encodeURIComponent(product.brand || '')}&description=${encodeURIComponent(product.description || '')}`}>
                      View Details
                    </Link>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className='col-span-full text-center text-gray-500'>
              No products found.
            </p>
          )}
        </main>
      </div>
    </>
  )
}
