'use client'
import React, { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import axios from 'axios'

const Page = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true })
  }, [])

  const addquery = async e => {
    e.preventDefault()

    const name = e.target.name.value.trim()
    const country = e.target.country.value.trim()
    const email = e.target.email.value.trim()
    const phone = e.target.phone.value.trim()
    const message = e.target.message.value.trim()

    // Regex validation
    const nameRegex = /^[a-zA-Z ]{2,50}$/
    const countryRegex = /^[a-zA-Z ]{2,50}$/
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const phoneRegex = /^[0-9]{10}$/
    const messageRegex = /^.{5,500}$/

    if (!nameRegex.test(name)) return alert('Enter a valid name (2-50 letters)')
    if (!countryRegex.test(country)) return alert('Enter a valid country name (2-50 letters)')
    if (!emailRegex.test(email)) return alert('Enter a valid email address')
    if (!phoneRegex.test(phone)) return alert('Enter a valid 10-digit phone number')
    if (!messageRegex.test(message)) return alert('Message should be 5-500 characters long')

    const data = { name, country, email, phone, message }

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/user/user-query`,
        data
      )
      console.log(response)
      alert('Thanks for reaching out! We will get back to you soon')
      e.target.reset()
    } catch (err) {
      console.log(err.message)
      alert('Error submitting the form. Try again!')
    }
  }

  return (
    <>
  

      <div className='px-6 py-12 max-w-6xl mx-auto font-sans text-gray-800'>
        {/* Hero */}
        <div className='text-center mb-12' data-aos='fade-up'>
          <h1 className='text-4xl md:text-5xl font-bold text-orange-500'>Contact Us</h1>
          <p className='mt-4 text-lg text-gray-600'>
            Have questions or need support? We’d love to hear from you!
          </p>
        </div>

        {/* Contact Form + Info */}
        <section className='grid md:grid-cols-2 gap-8 items-start'>
          {/* Form */}
          <form
            className='bg-white p-6 md:p-10 rounded-2xl shadow-md space-y-5'
            data-aos='fade-right'
            onSubmit={addquery}
          >
            <h2 className='text-2xl font-semibold mb-4 text-orange-500'>Get in Touch</h2>

            {/* Name */}
            <div>
              <label className='block mb-1 font-medium'>Name</label>
              <input
                type='text'
                name='name'
                className='w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-400 outline-none transition'
                placeholder='Your Name'
                required
              />
            </div>

            {/* Country */}
            <div>
              <label className='block mb-1 font-medium'>Country</label>
              <input
                type='text'
                name='country'
                className='w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-400 outline-none transition'
                placeholder='Country'
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className='block mb-1 font-medium'>Email</label>
              <input
                type='email'
                name='email'
                className='w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-400 outline-none transition'
                placeholder='you@example.com'
                required
              />
            </div>

            {/* Phone */}
            <div>
              <label htmlFor='phone' className='block mb-1 font-medium'>Phone Number</label>
              <input
                type='tel'
                id='phone'
                name='phone'
                className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 transition'
                placeholder='Enter 10-digit number'
                required
              />
              <p className='text-xs text-gray-400 mt-1'>Enter 10-digit number without spaces or symbols</p>
            </div>

            {/* Message */}
            <div>
              <label className='block mb-1 font-medium'>Message</label>
              <textarea
                name='message'
                rows='5'
                className='w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-400 outline-none resize-none transition'
                placeholder='Write your message...'
                required
              ></textarea>
            </div>

            {/* Submit */}
            <button
              type='submit'
              className='w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition'
            >
              Send Message
            </button>
          </form>

          {/* Contact Info */}
          <div className='space-y-6' data-aos='fade-left'>
            <div className='bg-gray-100 p-6 rounded-xl shadow-inner'>
              <h3 className='text-lg font-bold text-orange-500 mb-2'>Our Office</h3>
              <p className='text-gray-600'>123 Luxury Street, Jaipur, Rajasthan, India</p>
            </div>

            <div className='bg-gray-100 p-6 rounded-xl shadow-inner'>
              <h3 className='text-lg font-bold text-orange-500 mb-2'>Call Us</h3>
              <p className='text-gray-600'>+91 98765 43210</p>
            </div>

            <div className='bg-gray-100 p-6 rounded-xl shadow-inner'>
              <h3 className='text-lg font-bold text-orange-500 mb-2'>Email</h3>
              <p className='text-gray-600'>support@yourstore.com</p>
            </div>
          </div>
        </section>

        {/* Map */}
        <section className='mt-12' data-aos='zoom-in'>
          <h2 className='text-2xl font-semibold mb-4 text-center'>Find Us Here</h2>
          <div className='w-full h-72 rounded-2xl overflow-hidden shadow-md'>
            <iframe
              src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3558.918482643037!2d75.78727047459105!3d26.912433876654!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db421e1234567%3A0x123456789abcdef!2sJaipur!5e0!3m2!1sen!2sin!4v1234567890'
              width='100%'
              height='100%'
              style={{ border: 0 }}
              allowFullScreen
              loading='lazy'
            ></iframe>
          </div>
        </section>
      </div>
    </>
  )
}

export default Page
