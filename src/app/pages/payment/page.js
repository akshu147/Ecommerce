// CNCShowcaseFresh.jsx
'use client';
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaCogs, FaRulerCombined, FaIndustry, FaStar, FaBolt } from 'react-icons/fa';

const services = [
  { icon: <FaCogs size={30} />, title: "Precision Cutting", desc: "Ultra-accurate CNC cutting for all materials." },
  { icon: <FaRulerCombined size={30} />, title: "Custom Designs", desc: "Bring your ideas to life with CNC." },
  { icon: <FaIndustry size={30} />, title: "Industrial Solutions", desc: "High-volume CNC solutions." }
];

const gallery = [
  "/images/cnc1.jpg",
  "/images/cnc2.jpg",
  "/images/cnc3.jpg",
  "/images/cnc4.jpg",
  "/images/cnc5.jpg",
  "/images/cnc6.jpg"
];

const features = [
  { icon: <FaStar size={30} />, title: "High Quality" },
  { icon: <FaBolt size={30} />, title: "Fast Turnaround" },
  { icon: <FaCogs size={30} />, title: "Custom Solutions" },
  { icon: <FaRulerCombined size={30} />, title: "Precision" }
];

const CNCShowcaseFresh = () => {
  return (
    <section className="w-full bg-gray-500 text-white font-sans">

      {/* Hero Section - Split Screen */}
      <div className="flex flex-col md:flex-row items-center md:justify-between px-6 py-20 md:py-32">
        <div className="md:w-1/2 space-y-6">
          <motion.h1 initial={{x:-100, opacity:0}} animate={{x:0, opacity:1}} transition={{duration:1}} className="text-5xl md:text-6xl font-bold text-neon-blue">Next-Gen CNC Services</motion.h1>
          <motion.p initial={{x:-100, opacity:0}} animate={{x:0, opacity:1}} transition={{duration:1, delay:0.3}} className="text-gray-300 text-lg md:text-xl max-w-md">
            Modern CNC solutions for furniture, industrial projects, and custom designs.
          </motion.p>
          <motion.button whileHover={{scale:1.1}} className="px-8 py-4 bg-neon-blue text-black font-bold rounded-full shadow-lg">Get Started</motion.button>
        </div>
        <div className="md:w-1/2 mt-10 md:mt-0 relative w-full h-80 md:h-96">
          <Image src="/images/cnc-hero2.jpg" alt="CNC Machine" fill className="object-cover rounded-3xl shadow-2xl" />
        </div>
      </div>

      {/* Services Section - Staggered Cards */}
      <div className="py-20 relative">
        <h2 className="text-4xl md:text-5xl text-center font-bold text-neon-blue mb-16">Our Services</h2>
        <div className="flex flex-col md:flex-row justify-center items-start gap-10 px-6 md:px-20">
          {services.map((s,i) => (
            <motion.div
              key={i}
              whileHover={{scale:1.05, y:-10, boxShadow:"0 0 30px #00ffff"}}
              className={`bg-gray-800 p-8 rounded-3xl shadow-xl relative z-${i}`}
            >
              <div className="text-blue-400 mb-4">{s.icon}</div>
              <h3 className="text-2xl font-semibold mb-2">{s.title}</h3>
              <p className="text-gray-300">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Gallery Section - Masonry */}
      <div className="py-20">
        <h2 className="text-4xl md:text-5xl text-center font-bold text-neon-blue mb-12">Our Projects</h2>
        <div className="columns-1 md:columns-3 gap-4 px-6">
          {gallery.map((img,i) => (
            <motion.div key={i} whileHover={{scale:1.05}} className="mb-4 relative rounded-2xl overflow-hidden">
              <Image src={img} alt={`Project ${i}`} width={400} height={300} className="w-full rounded-2xl object-cover shadow-xl"/>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Features Section - Circular Icons */}
      <div className="py-20 bg-gray-800 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-neon-blue">Why Choose Us</h2>
        <div className="flex flex-wrap justify-center gap-10">
          {features.map((f,i)=>(
            <motion.div key={i} whileHover={{scale:1.1}} className="flex flex-col items-center gap-4">
              <div className="bg-gray-700 p-6 rounded-full shadow-lg text-blue-400">{f.icon}</div>
              <h3 className="text-xl font-semibold">{f.title}</h3>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24 bg-gradient-to-r from-blue-600 to-cyan-400 text-black text-center rounded-t-3xl">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">Start Your CNC Project Today</h2>
        <p className="text-lg mb-8">High-quality CNC services with fast turnaround and precision engineering.</p>
        <button className="px-10 py-4 font-bold rounded-full bg-black text-neon-blue hover:brightness-125 transition">Contact Us</button>
      </div>

      <style jsx>{`
        .text-neon-blue { color: #00ffff; }
        .bg-neon-blue { background-color: #00ffff; }
      `}</style>
    </section>
  );
};

export default CNCShowcaseFresh;
