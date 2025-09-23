"use client"
import React, { useEffect } from 'react'
import AOS from "aos"
import "aos/dist/aos.css"
import Image from "next/image";


const Page = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, // animation duration
      once: true,     // animation only once
    });
  }, []);

  


  return (
    <>
    

      <div className="px-6 py-12 max-w-6xl mx-auto font-sans text-gray-800">
        {/* Hero / Header */}
        <div className="text-center mb-12" data-aos="fade-up">
          <h1 className="text-4xl md:text-5xl font-bold text-orange-500">About Us</h1>
          <p className="mt-4 text-lg text-gray-600">Learn more about our journey and what drives us.</p>
        </div>

        {/* Section: Company Overview */}
        <section className="mb-12 grid md:grid-cols-2 gap-8 items-center">
          <Image width={50} height={20} src="/about-image.jpg" alt="Our Store" className="w-full rounded-2xl shadow-md" data-aos="fade-right"/>
          <div data-aos="fade-left">
            <h2 className="text-2xl font-semibold mb-4">Who We Are</h2>
            <p className="text-gray-600">
              We are a team of passionate individuals delivering high-quality and stylish products
              to customers worldwide. Our mission is to make luxury and comfort accessible to all,
              without compromising on quality or sustainability.
            </p>
          </div>
        </section>

        {/* Section: Mission and Vision */}
        <section className="mb-12 bg-gray-100 p-6 md:p-10 rounded-2xl shadow-inner" data-aos="zoom-in">
          <h2 className="text-2xl font-semibold mb-4 text-center">Our Mission & Vision</h2>
          <div className="grid md:grid-cols-2 gap-6 text-gray-700">
            <div data-aos="fade-up" data-aos-delay="200">
              <h3 className="font-bold mb-2 text-orange-500">Mission</h3>
              <p>
                To redefine online shopping with unbeatable quality, fast delivery, and exceptional customer care.
              </p>
            </div>
            <div data-aos="fade-up" data-aos-delay="400">
              <h3 className="font-bold mb-2 text-orange-500">Vision</h3>
              <p>
                To be the most trusted and innovative eCommerce platform for modern customers worldwide.
              </p>
            </div>
          </div>
        </section>

        {/* Section: Why Choose Us */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-center" data-aos="fade-up">Why Choose Us?</h2>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition" data-aos="flip-left">
              <h4 className="font-bold text-lg mb-2 text-orange-500">Quality Products</h4>
              <p>All our products go through strict quality control to ensure only the best reaches you.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition" data-aos="flip-left" data-aos-delay="200">
              <h4 className="font-bold text-lg mb-2 text-orange-500">Fast Delivery</h4>
              <p>We offer reliable and fast shipping across the country with real-time tracking.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition" data-aos="flip-left" data-aos-delay="400">
              <h4 className="font-bold text-lg mb-2 text-orange-500">24/7 Support</h4>
              <p>Our customer support team is always ready to help you, any time of the day.</p>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default Page
