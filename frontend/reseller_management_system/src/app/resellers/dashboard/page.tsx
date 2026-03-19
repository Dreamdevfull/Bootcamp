"use client"

import { useState } from "react"
import Test from "@/app/components/ui/popup/popadmin/test"
import HeaderReseller from '@/app/components/layout/headerReseller'

export default function Page() {
  const [open, setOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[#F5F3EE]">
      <HeaderReseller />
      <div className="p-2">
        {/* ปุ่มเปิด popup */}
        <button
          onClick={() => setOpen(true)}
          className="bg-[#0d3d30] text-white px-6 py-3 rounded-xl hover:bg-[#0d3d30]/90 transition"
        >
          เปิด Popup
        </button>
      </div>

      {/* Modal */}
      <Test open={open} onClose={() => setOpen(false)}>
        <h2 className="text-lg font-bold text-gray-800 mb-2">ตั้งราคาสินค้า</h2>
        <div className="border border-[#888780] rounded-sm p-4">
          {/* ส่วนรูปภาพ */}
          <div className="h-50 w-full rounded-sm border">
            <img
              src="..."
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          {/* ส่วนเนื้อหา */}
          <div className="flex py-2 pl-1">
            <div className="mt-1 text-gray-900">เสื้อยืดคอกลม สีดำ
             <div className="text-xs text-gray-400">ต้นทุน</div>
             <div className="text-sm font-bold text-[#888780]">฿ 250.00</div>
            </div>
          </div>
        </div>
        <div className="border border-[#888780] rounded-sm p-2 mt-2 bg-[#9FE1CB]/20">
          <div className="text-[#888780] front-bold ml-2">ราคาขายของคุณ</div>
          <div className="text-[#888780] ml-1">(ต้องไม่ต่ำกว่า ฿150)</div>
          <input
            type="number"
            placeholder="150"
            className="w-full px-4 py-2 m border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0d3d30] transition"
          />
          <div className="border rounded-sm p-5 mt-2 ">
            <div className="text-[#888780]">กำไรต่อชิ้นที่คุณจะได้รับ:</div>
          </div>
        </div>
        <div className="flex gap-2 mt-2">
          <button className="bg-white text-black px-4 py-2 rounded-xl w-full hover:bg-[#0d3d30]/20 transition border cursor-pointer">
            ยกเลิก
          </button>
          <button className="bg-[#0d3d30] text-white px-4 py-2 rounded-xl w-full hover:bg-[#0d3d30]/90 transition border cursor-pointer">
            เพิ่มเข้าร้าน
          </button>
        </div>
      </Test>
    </div>
  )
}