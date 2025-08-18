"use client";
import React from "react";
import { FaCheckCircle } from "react-icons/fa";

const Footer = () => {
  const time = new Date().getFullYear()
  return (
    <footer className="bg-[#1e2224] text-white py-16 px-4 text-center">
      <div className="max-w-5xl mx-auto space-y-6">
        <h2 className="text-3xl sm:text-4xl font-bold text-[#d3e0c4]">
          Shop Now – Limited Time Offers!
        </h2>

        <div className="flex flex-wrap justify-center gap-6 text-gray-300 text-base">
          <div className="flex items-center gap-2">
            <FaCheckCircle className="text-white" /> Free Shipping on all orders
          </div>
          <div className="flex items-center gap-2">
            <FaCheckCircle className="text-white" /> Easy 7-Day Return Policy
          </div>
          <div className="flex items-center gap-2">
            <FaCheckCircle className="text-white" /> 24/7 Customer Support
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mt-6">
          <button className="bg-white text-black font-medium px-6 py-2 rounded-full hover:bg-gray-200">
            START SHOPPING
          </button>
          <button className="border border-white px-6 py-2 rounded-full hover:bg-white hover:text-black">
            VIEW DEALS
          </button>
        </div>
      </div>

      <div className="mt-10 text-gray-400 text-sm">
        © {time} Aceno Store. All Rights Reserved. <br />
        Powered by <span className="text-white font-semibold">Akshay</span>
      </div>
    </footer>
  );
};

export default Footer;
