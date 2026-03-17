"use client"
import React from 'react'
import HeaderCustomers from '@/app/components/layout/headerCustomers'
import { useState } from "react"


const p = () => {
  const [count, setCount] = useState(1)

  return (
    <main className='bg-[#f5f3ee] min-h-screen flex flex-col'>
      <HeaderCustomers />
      <section className='w-full h-[275px] bg-gradient-to-r from-[#0d3d30] via-[#1a6b5a] to-[#1d9e75]'>
        <h1 className='text-white text-center text-[60px] pt-8'>ShopName</h1>
        <p className='text-white text-center text-[25px] pt-2'>คำอธิบายของแต่ละร้าน</p>

      </section>
      <section className='bg-white min-h-screen p-6 m-3 rounded-2xl shadow-md border border-gray-100'>
        <div className='bg-[#f5f3ee] h-auto p-6 m-3 shadow-md border border-gray-100 flex justify-between items-center rounded-xl'>

          {/* search bar */}
          <div className="relative w-full max-w-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-full leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black focus:border-black sm:text-sm"
              placeholder="ค้นหาสินค้า..."
            />
          </div>
          <div className='ml-auto flex gap-4'>
            {/* Dropdown ราคา */}
            <div className="w-[220px]">
              <select className="block w-full pl-3 pr-10 py-2 text-base border border-black focus:outline-none focus:ring-black focus:border-black rounded-md">
                <option>ราคาทั้งหมด</option>
                <option>น้อยกว่า 200 บาท</option>
                <option>มากกว่า 200 บาท</option>
              </select>
            </div>
            {/* Dropdown ประเภทสินค้า */}
            <div className="w-[220px]">
              <select className="block w-full pl-3 pr-10 py-2 text-base border border-black focus:outline-none focus:ring-black focus:border-black rounded-md">
                <option>ประเภทสินค้าทั้งหมด</option>
                <option>เสื้อผ้า</option>
                <option>ของเล่น</option>
              </select>
            </div>
          </div>
        </div>
        {/* สำหรับสั่งสินค้า  */}
        <div className='flex gap-2'>
          <div className='border border-gray-200 rounded-xl p-3 w-64 shadow-sm'>
            <img src="..." className="w-full h-50 object-cover rounded-lg mb-3" />
            <div className="flex justify-between">
              <p className="font-">Product Name</p>
              <p className="text-[#1a6b5a] text-[20px] pr-3">฿120</p>
            </div>
            <div className='flex justify-between'>
              <div className='text-[#888780] text-[15px]'>คำอธิบาย</div>
            </div>
            <div className='flex justify-between'>
              <div className='text-[#888780] text-[15px] mt-2'>เหลือ 3</div>
              {/* ปุ่มเพิ่ม-ลด */}
              <div className='border rounded-sm mr-2 bg-[#f5f3ee] px-4'> {/* กรอบปุ่ม */}
                <div className="flex items-center gap-3 m-1">
                  <button
                    className="bg-[#1a6b5a]/40 hover:bg-[#1a6b5a] text-white rounded-sm w-7 h-7 cursor-pointer"
                    onClick={() => setCount(Math.max(0, count - 1))}
                  >-</button>
                  <div className='text-[#085041]'>{count+1}</div>
                  <button
                    className="bg-[#1a6b5a] hover:bg-[#1a6b5a]/40 text-white rounded-sm w-7 h-7 cursor-pointer "
                    onClick={() => setCount(Math.max(0, count + 1))} //ไม่ให้เกินสต็อกเเก้ onClick={() => setCount(Math.min(สต็อก, count + 1))}
                  >+</button>
                </div>
              </div>
            </div>
            {/* ปุ่มข้างล่างสำหรับเพิ่มสินค้าเข้าตะกร้าหรือสั่งซื้อสินค้า */}
            <div className="flex gap-2 mt-3">
              <button className="flex-1 bg-[#e1f5ee] border border-[#1d9e75] text-[#085041] rounded-lg py-2 text-sm hover:bg-[#9FE1CB] hover:border-[#0F6E56] cursor-pointer">🛒 เพิ่มลงตะกร้า</button>
              <button className="flex-1 bg-[#ef9f27] text-[#412402] border border-black rounded-lg py-2 text-sm hover:bg-[#BA7517] cursor-pointer">ซื้อสินค้า</button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default p