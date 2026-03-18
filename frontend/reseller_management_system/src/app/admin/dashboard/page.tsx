"use client"
import HeaderAdmin from '@/app/components/layout/headeradmin'
import Main from '@/app/components/layout/main'
import React from 'react'

const page = () => {
  return (
    <div className='max-h-screen bg-[#F5F3EE]'>
      <HeaderAdmin />
      <div className='text-[#0d3d30] text-[28px] font-semibold m-4'>Dashboard</div>
      <section className='flex gap-4 mx-4'>
        <div className='border border-[#737373] bg-white w-full rounded-xl'>
          <span className='block text-[#0d3d30] mx-5'>ยอดขายรวม</span>
          <span className='block text-[18px] font-semibold mx-5'>฿123,000</span>
          <span className='text-[#b4b4b4] text-[10px] mx-5'>+20% จากเดือนที่แล้ว</span>
        </div>
        <div className='border border-[#737373] bg-white w-full rounded-xl'>
          <span className='block text-[#0d3d30] mx-5 mb-5'>กำไรรวม</span>
        </div>
        <div className='border border-[#737373] bg-white w-full rounded-xl'>
          <span className='block text-[#0d3d30] mx-5 mb-5'>จำนวนออเดอร์ทั้งหมด</span>
        </div>
        <div className='border border-[#737373] bg-white w-full rounded-xl'>
          <span className='block text-[#0d3d30] mx-5 mb-5'>ออเดอร์รอดำเนินการ</span>
        </div>
        <div className='border border-[#737373] bg-white w-full rounded-xl'>
          <span className='block text-[#0d3d30] mx-5 mb-5'>จำนวนตัวแทนทั้งหมด</span>
        </div>
        <div className='border border-[#737373] bg-white w-full rounded-xl'>
          <span className='block text-[#0d3d30] mx-5 mb-5'>ตัวแทนที่รออนุมัติ</span>
        </div>
      </section>
      <section className='min-h-60 mx-4 my-2 border border-[#737373] bg-white rounded-xl'>
        <div></div>
      </section>
      <section className='flex justify-between gap-4 m-4'>
        <div className='border border-[#737373] bg-white w-full min-h-60 rounded-xl'></div>
        <div className='border border-[#737373] bg-white w-full min-h-60 rounded-xl'></div>
      </section>
    </div>
  )
}

export default page