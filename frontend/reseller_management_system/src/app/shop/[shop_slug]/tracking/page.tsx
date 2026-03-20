import React from 'react'
import HeaderCustomers from '@/app/components/layout/headerCustomers'

const TrackkingPage = () => {
  return (
    <div>
      <HeaderCustomers />
      {/* <div className='border m-2'>
        <span>ตรวจสอบสถานะออเดอร์</span>
        <div className='flex gap-2'>
          <input
          placeholder='กรอกเลขออเดอร์ เช่น ORD-20240315-002'
          className='w-full border p-5'
          />
          <div className='border p-6'>ค้นหา</div>
        </div>
        <div className='text-[12px] text-gray-500'>ลองพิมพ์: ORD-20240315-001 หรือ ORD-20240315-002</div>
      </div> */}
      <div className="bg-[#F5F3EE] p-6 mx-8 mt-5 font-sans border rounded-lg">
        <div className="text-[#2C2C2A] text-[18px] mb-2 font-semibold">
          ตรวจสอบสถานะออเดอร์
        </div>

        <div className="flex gap-2 items-stretch">
          <input
            type="text"
            placeholder="กรอกเลขออเดอร์ เช่น ORD-20240315-001"
            className="flex-grow placeholder:text-[#888780] px-5 py-3 rounded-xl border border-gray-400 outline-none focus:ring-2 focus:ring-[#1D9E75] transition-all"
          />
          <button className="bg-[#EF9F27] hover:bg-[#BA7517] text-white font-bold px-8 py-3 rounded-xl transition-colors shadow-sm active:scale-95">
            ค้นหา
          </button>
        </div>
        <div className="text-[#888780] text-[14px] mt-2 font-medium">
          ลองพิมพ์: <span className="hover:text-[#1A6B5A] cursor-pointer">ORD-20240315-002</span> หรือ <span className="hover:text-[#1A6B5A] cursor-pointer">ORD-20240315-003</span>
        </div>
      </div>
    </div>
  )
}

export default TrackkingPage