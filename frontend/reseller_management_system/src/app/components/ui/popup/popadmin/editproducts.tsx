"use client";

type PopEditProductsProps = {
  open: boolean
  onClose: () => void
}

export default function PopEditProducts({ open, onClose, }: PopEditProductsProps) {
  if (!open) return null

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/20 z-50 "
    >
      <div
        className="bg-white rounded-2xl p-6 w-[500px] shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ปุ่มปิด */}
        <div className="flex justify-between">
          <h2 className="text-[22px] font-bold text-gray-800 mt-2">แก้ไขสินค้า</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-xl font-bold cursor-pointer"
          >
            ✕
          </button>
        </div>
        {/* ข้อมูล */}
          <div>
            <label htmlFor="name" className="block text-[16px] text-[#000000] ml-1 mt-2">
              ชื่อสินค้า
            </label>
            <input
              id='name'
              type="text"
              placeholder="เช่น เสื้อเเขนยาวเด็ก"
              className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-black transition rounded-sm"
            />
            {/* สำหรับไฟล์รูป */}
            <div className="w-full my-1">
              <label htmlFor="image"
                     className="block border-2 border-dashed border-gray-300 p-8 text-center cursor-pointer rounded"
               >
               <p className="text-[#888780]">
                  คลิกเพื่อเลือกรูปภาพ (JPG, PNG)
               </p>
              </label>
              <input 
                 id="image"
                 type="file"
                 accept="image/png, image/jpeg"
                 className="hidden"
               />
            </div>
            <label htmlFor="description" className="block text-[16px] text-[#000000] ml-1">
              รายละเอียด
            </label>
            <input
              id='description'
              type="text"
              placeholder="เช่น สีดำ Size S"
              className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-black transition rounded-sm"
            />
            {/* ตั้งราคาต่างๆ */}
            <div className='flex gap-4'>
              <div className="mt-2">
                <label htmlFor="cost-price" className="block text-[16px] text-[#000000] ml-1">
                ราคาทุน
              </label>
              <input
                id='cost-price'
                type="number"
                placeholder="0.00"
                className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-black transition rounded-sm"
               />
              </div>
              <div className="mt-2">
                <label htmlFor="min-price" className="block text-[16px] text-[#000000] ml-1">
                ราคาขั้นต่ำ
              </label>
              <input
                id='min-price'
                type="number"
                placeholder="0.00"
                className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-black transition rounded-sm"
               />
              </div>
              <div className="mt-2">
                <label htmlFor="stock" className="block text-[16px] text-[#000000] ml-1">
                สต็อก
              </label>
              <input
                id='stock'
                type="number"
                placeholder="0"
                className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-black transition rounded-sm"
               />
              </div>
            </div>
            <div className="flex gap-2 mt-2">
              <button className="bg-white text-[#2C2C2A] px-4 py-2 rounded-sm w-full border border-[#D3D1C7] hover:bg-[#E1F5EE] transition cursor-pointer">
                ยกเลิก
              </button>
              <button className="bg-[#EF9F27] text-white px-4 py-2 rounded-sm w-full hover:bg-[#BA7517] transition cursor-pointer">
                ยืนยัน
              </button>
              </div>
          </div>
      </div>
    </div>
  )
}
