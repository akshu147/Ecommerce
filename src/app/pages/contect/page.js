"use client"
import React, { useEffect } from 'react'
import AOS from "aos"
import "aos/dist/aos.css"

import Head from "../../componants/Head"
import Navbar from "../../componants/Navbar"

const page = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <>
      <Head/>
      <Navbar/>

      <div className="px-6 py-12 max-w-6xl mx-auto font-sans text-gray-800">
        {/* Hero / Header */}
        <div className="text-center mb-12" data-aos="fade-up">
          <h1 className="text-4xl md:text-5xl font-bold text-orange-500">Contact Us</h1>
          <p className="mt-4 text-lg text-gray-600">
            Have questions or need support? We’d love to hear from you!
          </p>
        </div>

        {/* Section: Contact Form + Info */}
        <section className="grid md:grid-cols-2 gap-8 items-start">
          {/* Contact Form */}
          <form className="bg-white p-6 md:p-10 rounded-2xl shadow-md space-y-4" data-aos="fade-right">
            <h2 className="text-2xl font-semibold mb-4 text-orange-500">Get in Touch</h2>
            
            <div>
              <label className="block mb-1 font-medium">Name</label>
              <input 
                type="text" 
                className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-400 outline-none" 
                placeholder="Your Name" 
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Email</label>
              <input 
                type="email" 
                className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-400 outline-none" 
                placeholder="you@example.com" 
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Message</label>
              <textarea 
                rows="4" 
                className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-400 outline-none resize-none" 
                placeholder="Write your message..." 
              ></textarea>
            </div>

            <button 
              type="submit" 
              className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition"
            >
              Send Message
            </button>
          </form>

          {/* Contact Info */}
          <div className="space-y-6" data-aos="fade-left">
            <div className="bg-gray-100 p-6 rounded-xl shadow-inner">
              <h3 className="text-lg font-bold text-orange-500 mb-2">Our Office</h3>
              <p className="text-gray-600">123 Luxury Street, Jaipur, Rajasthan, India</p>
            </div>

            <div className="bg-gray-100 p-6 rounded-xl shadow-inner">
              <h3 className="text-lg font-bold text-orange-500 mb-2">Call Us</h3>
              <p className="text-gray-600">+91 98765 43210</p>
            </div>

            <div className="bg-gray-100 p-6 rounded-xl shadow-inner">
              <h3 className="text-lg font-bold text-orange-500 mb-2">Email</h3>
              <p className="text-gray-600">support@yourstore.com</p>
            </div>
          </div>
        </section>

        {/* Optional: Map */}
        <section className="mt-12" data-aos="zoom-in">
          <h2 className="text-2xl font-semibold mb-4 text-center">Find Us Here</h2>
          <div className="w-full h-72 rounded-2xl overflow-hidden shadow-md">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3558.918482643037!2d75.78727047459105!3d26.912433876654!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db421e1234567%3A0x123456789abcdef!2sJaipur!5e0!3m2!1sen!2sin!4v1234567890" 
              width="100%" 
              height="100%" 
              allowFullScreen="" 
              loading="lazy"
            ></iframe>
          </div>
        </section>
      </div>
    </>
  )
}

export default page
