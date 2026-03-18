"use client"
import React from 'react'
import HeaderReseller from '@/app/components/layout/headerReseller'

const track = () => {
  return (
    <div className="min-h-screen bg-[#F5F3EE]">
      <HeaderReseller />
      <section className='min-h-70 bg-white rounded-sm p-8 mt-3 mx-10 shadow-sm border border-[#d3d1c7] relative flex flex-col'>
        
        <div className="flex gap-4 w-full mt-auto min-h-20">
          <div className="flex-1 bg-[#f5f3ee] p-6 rounded-lg shadow-sm border border-gray-200">
            <div className='text-[#888780] mb-2'>หมายเลขคำสั่งซื้อ</div>
            <h1>TEST0-1234-5678</h1>
          </div>
          <div className="flex-1 bg-[#f5f3ee] p-6 rounded-lg shadow-sm border border-gray-200">
            <div className='text-[#888780] mb-2'>วันทีทำรายการ</div>
            <h1>17/03/2569</h1>
          </div>
          <div className="flex-1 bg-[#f5f3ee] p-6 rounded-lg shadow-sm border border-gray-200">
            <div className='text-[#888780] mb-2'>สถานะการสั่งซื้อ</div>
            <h1>จัดส่งแล้ว</h1>
          </div>
        </div>
      </section>
      <section className='min-h-80 bg-white rounded-sm mt-3 mx-10 shadow-sm border border-[#d3d1c7]'>
        <div className='border-b pl-8 py-5'>ออเดอร์สินค้า</div>
        <div className="flex items-center gap-4 p-8">
          <img src="..." className="w-16 h-16 rounded" />
          <div>
            <p>test1</p>
            <p className="text-gray-400 text-sm">descripsion</p>
            <p>x1</p>
          </div>
          <p className="ml-auto pr-12 text-[#1a6b5a]">฿120</p>
        </div>
        <div className='bg-[#F5F3EE]'>
          <div className="text-[#888780] pl-8 pt-4 pb-2 border-b flex justify-between">
          <p>ราคารวม</p>
          <p className='text-black pr-20'>฿120</p>
          </div>
          <div className="text-[#888780] pl-8 pt-4 pb-2 flex justify-between">
          <p>กำไร</p>
          <p className='text-black pr-20'>฿20</p>
          </div>
        </div>
        <div className='pl-8 pt-4'>ที่อยู่ในการจัดส่ง</div>
        <div className="flex gap-10 px-8 py-2 text-[#888780]">
          <p>นาย สมชาย รักชาติ</p>
          <p>(+66) 987654321</p>
        </div>
        <div className='px-8 py-2 text-[#888780]'>123 หมู่ 11 อำเภอเมือง จังหวัดพะเยา 56000</div>
      </section>
    </div>
  )
}

export default track