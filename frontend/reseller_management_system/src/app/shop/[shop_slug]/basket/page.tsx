"use client"
import React from 'react';
import { Trash2, Plus, Minus, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const CartPage = () => {
    const pathname = usePathname();
    const shop_slug = pathname.split("/")[2] ?? ""
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Header คุมโทน Teal จากหน้าร้าน */}
      <header className="bg-[#065f46] text-white p-6 shadow-md">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            🧸 TinyStore
          </h1>
          <Link href={`/shop/${shop_slug}`}>
          <div className='border p-2 rounded-sm'>
            <button className="text-teal-100 hover:text-white flex items-center gap-1 transition">
            <ChevronLeft size={20} /> กลับไปหน้าร้าน
          </button>
          </div></Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* 1. รายการสินค้า (Left Column) */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">ตะกร้าสินค้าของคุณ (3 รายการ)</h2>
            
            {/* Card รายการสินค้า */}
            {[1, 2].map((item) => (
              <div key={item} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex gap-4 items-center">
                <div className="w-24 h-24 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                  <div className="w-full h-full bg-[#f3f4f6] flex items-center justify-center text-gray-400">
                    {/* Placeholder สำหรับรูปสินค้า */}
                    Image
                  </div>
                </div>
                
                <div className="flex-grow">
                  <h3 className="font-bold text-gray-800">ชื่อสินค้า test {item}</h3>
                  <p className="text-sm text-gray-500 italic">description...</p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-[#0d9488] font-bold text-lg">฿120.00</span>
                    
                    {/* ตัวปรับจำนวนสินค้า คุมโทน Teal */}
                    <div className="flex items-center border border-teal-200 rounded-lg overflow-hidden">
                      <button className="p-1 hover:bg-teal-50 text-teal-600"><Minus size={16} /></button>
                      <span className="px-3 font-medium text-gray-700">1</span>
                      <button className="p-1 hover:bg-teal-50 text-teal-600"><Plus size={16} /></button>
                    </div>
                  </div>
                </div>

                <button className="text-red-400 hover:text-red-600 p-2 transition">
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
          </div>

          {/* 2. สรุปคำสั่งซื้อ (Right Column) */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-lg border-t-4 border-[#f59e0b]"> {/* ขอบบนสี Amber */}
              <h2 className="text-xl font-bold text-gray-800 mb-6">สรุปคำสั่งซื้อ</h2>
              
              <div className="space-y-4 text-gray-600 border-b pb-6">
                <div className="flex justify-between">
                  <span>ราคารวม</span>
                  <span>฿240.00</span>
                </div>
                <div className="flex justify-between">
                  <span>ค่าจัดส่ง</span>
                  <span className="text-green-600">ฟรี</span>
                </div>
              </div>

              <div className="flex justify-between py-6">
                <span className="text-lg font-bold">ยอดสุทธิ</span>
                <span className="text-2xl font-bold text-[#0d9488]">฿240.00</span>
              </div>

              {/* ปุ่มชำระเงินสี Amber ตาม Design System */}
              <button className="w-full bg-[#f59e0b] hover:bg-[#d97706] text-white font-bold py-4 rounded-xl shadow-lg transition duration-200 transform hover:scale-[1.02]">
                ชำระเงิน
              </button>
              
              <p className="text-center text-xs text-gray-400 mt-4">
                ตรวจสอบรายการสินค้าให้ถูกต้องก่อนชำระเงิน
              </p>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default CartPage;