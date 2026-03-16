import React from 'react'
import HeaderCustomers from '@/app/components/layout/headerCustomers'

const p = () => {
  return (
    <main className='bg-[#f5f3ee] min-h-screen flex flex-col'>
      <HeaderCustomers />
      <div className='w-full h-[275px] bg-gradient-to-r from-[#0d3d30] to-[#1d9e75]'>
        <h1 className='text-white text-center text-[60px] pt-8'>ShopName</h1>
        <p className='text-white text-center text-[25px] pt-2'>คำอธิบายของแต่ละร้าน</p>

      </div>
      <div className='bg-white h-[780px] p-6 m-3 rounded-2xl shadow-md border border-gray-100'>
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
              <option value="" hidden disabled selected>ราคา</option>
              <option>น้อยกว่า 200 บาท</option>
              <option>มากกว่า 200 บาท</option>
              <option>ราคาทั้งหมด</option>
            </select>
          </div>
          {/* Dropdown ประเภทสินค้า */}
          <div className="w-[220px]">
            <select className="block w-full pl-3 pr-10 py-2 text-base border border-black focus:outline-none focus:ring-black focus:border-black rounded-md">
              <option value="" hidden disabled selected>ประเภทสินค้าทั้งหมด</option>
              <option>เสื้อผ้า</option>
              <option>ของเล่น</option>
              <option>สินค้าทั้งหมด</option>
            </select>
          </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default p