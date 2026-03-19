"use client"

type PopCustomersOrderProps = {
  open: boolean
  onClose: () => void
}

export default function PopCustomersOrder({ open, onClose }: PopCustomersOrderProps) {
  if (!open) return null

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/20 z-50"
    >
      <div
        className="bg-white rounded-2xl p-6 w-[500px] shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ปุ่มปิด */}
        <div className="flex justify-between">
          <h2 className="text-[22px] font-bold text-gray-800 mb-2">ตั้งราคาสินค้า</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-xl font-bold cursor-pointer"
          >
            ✕
          </button>
        </div>
        <div className="border border-[#737373]/30 rounded-sm p-4">
          {/* ส่วนรูปภาพ */}
          <div className="h-50 w-full">
            <img
              src="..."
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          {/* ส่วนเนื้อหา */}
          <div className="flex py-2 pl-1">
            <div className="text-[18px] mt-1 text-gray-900">เสื้อยืดคอกลม สีดำ
             <div className="text-[12px] text-gray-400">ต้นทุน</div>
             <div className="text-[20px] font-bold text-[#888780]">฿ 250.00</div>
            </div>
          </div>
        </div>
        <div className="border border-[#737373]/30 rounded-sm p-2 mt-2 bg-[#E1F5EE]/40">
          <div className="text-[#888780] front-bold ml-2">ราคาขายของคุณ</div>
          <div className="text-[#888780] ml-1 mb-1">(ต้องไม่ต่ำกว่า ฿150)</div>
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
          <button onClick={onClose} type="button" className="bg-white text-neutral-text px-4 py-2 rounded-sm w-full border border-[#D3D1C7] hover:bg-[#E1F5EE] transition cursor-pointer">
            ยกเลิก
          </button>
          <button type="submit" className="bg-[#EF9F27] text-white px-4 py-2 rounded-sm w-full hover:bg-[#BA7517] transition cursor-pointer">
            เพิ่มเข้าร้าน
          </button>
        </div>  
      </div>
    </div>
  )
}