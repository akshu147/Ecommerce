'use client'
import React, { useEffect, useState } from 'react'
import Head from './componants/Head'
import Navbar from './componants/Navbar'
import Herohome from './componants/Herohome'
import Content from './componants/Content'

const Page = () => {
  const [bottombar, setbottombar] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercentage = (scrollTop / scrollHeight) * 100;
      setbottombar(scrollPercentage);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <Head />
      <Navbar />
      <Herohome />
      <Content />

      {/* Scroll Progress Bar */}
      <div
        style={{ width: `${bottombar}%` }}
        className="fixed bottom-0 left-0 bg-orange-500 h-[5px] z-50 transition-[width] duration-150"
      ></div>
    </>
  );
};

export default Page;
