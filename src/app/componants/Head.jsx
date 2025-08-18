'use client'
import React from 'react'
import { GiGreenhouse } from 'react-icons/gi'
import Marquee from 'react-fast-marquee';
import { RiFlashlightFill } from "react-icons/ri";



const Head = () => {
  return (
    <>
      <div className='text-white w-full'>
        <div className='bg-[#262626] flex justify-between p-[10px_30px] items-center border-b-[1px] border-slate-600'>
          <div className='flex justify-center items-center gap-1 text-[18px]'>
            <i className='text-green-500'>
              <GiGreenhouse />
            </i>
            <b>Star </b> <span>industreis</span>
          </div>
          <div className='bg-[#82B440] p-[4px_15px] rounded-[5px]'>Sign up</div>
        </div>
        {/* same like marquee tag */}
      
      </div>
      

<Marquee gradient={false} speed={20}  pauseOnHover={true} className='w-full bg-black'>
  <div className='flex text-white-500 gap-[150px] text-white invisible h-0 md:visible md:h-auto'>
    <div className='flex items-center cursor-pointer hover:text-orange-400'><i className='text-orange-300'><RiFlashlightFill /></i>Promotions</div>
    <div className='flex items-center cursor-pointer hover:text-orange-400'><i className='text-orange-300'><RiFlashlightFill /></i>Shipping info</div>
    <div className='flex items-center cursor-pointer hover:text-orange-400'><i className='text-orange-300'><RiFlashlightFill /></i>Festive deals</div>
    <div className='flex items-center cursor-pointer hover:text-orange-400'><i className='text-orange-300'><RiFlashlightFill /></i>Announcements</div>
    <div className='flex items-center cursor-pointer hover:text-orange-400'><i className='text-orange-300'><RiFlashlightFill /></i>Discounts & coupons</div>
    <div className='flex items-center cursor-pointer hover:text-orange-400'><i className='text-orange-300'><RiFlashlightFill /></i>New arrivals</div>
    
  </div>
</Marquee>
       
      
    </>
  )
}

export default Head
