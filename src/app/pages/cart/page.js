'use client'

import { useSelector, useDispatch } from 'react-redux'
import { removeFromCart, updateQuantity } from '@/app/redux/cartSlice/cartSlice'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

import Image from 'next/image'
export default function CartPage () {
  const cart = useSelector(state => state.cart)
  const dispatch = useDispatch()
  const router = useRouter()

  const handleRemove = id => dispatch(removeFromCart(id))
  const handleQuantityChange = (id, quantity) => {
    if (quantity > 0) dispatch(updateQuantity({ id, quantity }))
  }
  const handleCheckout = () => router.push('/pages/payment')

  // if (loading) return <div className="text-center py-16">Loading cart...</div>;

  if (!cart.items || cart.items.length === 0)
    return (
      <div className='text-center py-16'>
        <h1 className='text-2xl font-bold mb-2'>🛒 Your Cart is Empty</h1>
        <Link
          href='/pages/products'
          className='inline-block bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition'
        >
          Start Shopping
        </Link>
      </div>
    )

  const totalPrice = cart.items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  )
  const discount = 20
  const finalTotal = totalPrice - discount

  // Stepper
  const steps = ['Cart', 'Address', 'Payment', 'Confirmation']
  const activeStep = 1 // Current step

  return (
    <div className='max-w-6xl mx-auto px-4 py-8'>
      {/* Stepper */}
      <div className='flex items-center justify-between w-full max-w-md mx-auto'>
        {steps.map((step, index) => (
          <div key={index} className='flex items-center flex-1'>
            {/* Step Circle */}
            <div
              className={`w-6 h-6 flex items-center justify-center rounded-full text-white text-xs z-10
                ${
                  index < activeStep
                    ? 'bg-green-500'
                    : index === activeStep
                    ? 'bg-green-500 scale-110'
                    : 'bg-gray-300'
                }`}
            >
              {index + 1}
            </div>
            {/* Connector */}
            {index !== steps.length - 1 && (
              <div
                className={`flex-1 h-0.5 mx-2 ${
                  index < activeStep ? 'bg-green-500' : 'bg-gray-300'
                }`}
              ></div>
            )}
          </div>
        ))}
      </div>

      {/* Step Titles */}
      <div className='flex justify-between text-xs text-gray-500 font-medium max-w-md mx-auto mb-8'>
        {steps.map((step, idx) => (
          <span key={idx} className='text-center flex-1'>
            {step}
          </span>
        ))}
      </div>

      {/* Cart & Summary */}
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        {/* Cart Items */}
        <div className='lg:col-span-2 space-y-4'>
          {cart.items.map((item, index) => (
            <div
              key={index}
              className='flex flex-col sm:flex-row justify-between gap-4 p-4 border rounded-xl shadow-sm bg-white/70 backdrop-blur-sm hover:shadow-md transition'
            >
              <div className='flex gap-4'>
                <Image
                  height={112}
                  width={96}
                  src={item.image || '/placeholder.jpg'}
                  alt={item.title}
                  className='w-24 h-28 object-cover rounded-md border'
                />
                <div>
                  <h3 className='font-semibold text-gray-800 text-sm'>
                    {item.title}
                  </h3>
                  <p className='text-gray-400 text-sm line-through'>
                    ₹{item.price + 10}
                  </p>
                  <p className='text-black text-md font-bold'>₹{item.price}</p>
                  <p className='text-gray-500 text-sm mt-1'>Easy Returns</p>
                  <p className='text-sm mt-1'>
                    Size: {item.size || 'M'} • Qty: {item.quantity}
                  </p>
                </div>
              </div>

              <div className='flex flex-col justify-between items-end'>
                <button
                  onClick={() => handleRemove(item.id || item._id)}
                  className='text-red-500 text-xs hover:underline'
                >
                  ✕ REMOVE
                </button>
                <div className='flex items-center gap-2 mt-2'>
                  <button
                    onClick={() =>
                      handleQuantityChange(
                        item.id || item._id,
                        item.quantity - 1
                      )
                    }
                    className='w-6 h-6 flex items-center justify-center border rounded text-gray-600 hover:bg-gray-100'
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() =>
                      handleQuantityChange(
                        item.id || item._id,
                        item.quantity + 1
                      )
                    }
                    className='w-6 h-6 flex items-center justify-center border rounded text-gray-600 hover:bg-gray-100'
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          ))}
          <div className='text-sm text-gray-600 mt-2'>
            Sold by:{' '}
            <span className='font-medium text-black'>Prime Jackets</span> • Free
            Delivery
          </div>
        </div>

        {/* Order Summary */}
        <div className='bg-white/70 p-4 rounded-xl shadow-sm border backdrop-blur-sm'>
          <h2 className='font-semibold text-lg mb-4'>
            Price Details ({cart.items.length} Items)
          </h2>
          <div className='flex justify-between text-sm mb-2'>
            <span>Total Product Price</span>
            <span>₹{totalPrice}</span>
          </div>
          <div className='flex justify-between text-sm mb-2 text-green-600'>
            <span>Total Discounts</span>
            <span>- ₹{discount}</span>
          </div>
          <hr className='my-2' />
          <div className='flex justify-between font-semibold text-base mb-3'>
            <span>Order Total</span>
            <span>₹{finalTotal}</span>
          </div>
          <div className='bg-green-100 text-green-700 text-sm p-2 rounded mb-3'>
            🎉 Your discount is ₹{discount}
          </div>
          <p className='text-xs text-gray-500 mb-3'>
            Clicking Continue will not deduct any money
          </p>
          <button
            onClick={handleCheckout}
            className='w-full bg-purple-600 text-white text-sm py-2 rounded hover:bg-purple-700 transition'
          >
            Continue
          </button>

          {/* Safety Notice */}
          <div className='mt-4 text-xs text-gray-600 flex items-center gap-2'>
            <Image
              src='/safety-icon.png'
              alt='Safe'
              width={24}
              height={24}
              className='w-6 h-6'
            />
            <span>
              Your Safety, Our Priority – We ensure your package is safe at
              every point.
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
