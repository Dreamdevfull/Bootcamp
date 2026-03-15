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
        <div className='bg-[#f5f3ee] h-[90] p-6 m-3 shadow-md border border-gray-100'>
          <div className="relative w-full max-w-sm">
            {/* ไอคอนค้นหา (ใช้ Heroicons หรือ svg ทั่วไป) */}
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            {/* ช่องกรอกข้อมูล */}
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-full leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black-500 focus:border-black-500 sm:text-sm"
              placeholder="ค้นหาสินค้า..."
            />
          </div>
        </div>
      </div>
    </main>
  )
}

export default p