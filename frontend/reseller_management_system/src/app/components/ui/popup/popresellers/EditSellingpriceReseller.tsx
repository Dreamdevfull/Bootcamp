"use client"

import React from "react"

export default function EditSellingpriceReseller({ open, onClose, id, image_url, cost_price, min_price, name, selling_price,onSuccess }: {
  open: boolean;
  onClose: () => void;
  id: number;
  image_url: string;
  onSuccess: () => void;
  cost_price: number;
  name: string;
  min_price: number
  selling_price: number;
}) {
  const [price, setPrice] = React.useState<number>(selling_price);
  const API_URL = process.env.NEXT_PUBLIC_API_URL
  const handleSubmit = async () => {
    console.log({ id, selling_price: price })
    const res =await fetch(`${API_URL}/reseller/my-products/update-price`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ id, selling_price: price }),
    });
    if (res.ok) {
        onSuccess(); 
        onClose();   
      }else {
        alert("บันทึกไม่สำเร็จ กรุณาลองใหม่อีกครั้ง");

      }
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/20 z-50">
    <div
      className="bg-white rounded-2xl p-6 w-[500px] shadow-xl"
      onClick={(e) => e.stopPropagation()}
    >
      {/* header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-[#2C2C2A]">ตั้งราคาสินค้า</h2>
        <button onClick={onClose} className="text-[#888780] hover:text-[#2C2C2A] text-xl cursor-pointer transition">
          ✕
        </button>
      </div>

      {/* รูปและราคา */}
      <div className="border border-[#D3D1C7] rounded-lg p-4 mb-3">
        <div className="h-55 flex items-center justify-center w-full rounded-md overflow-hidden bg-[#F5F3EE] mb-3">
          {API_URL + image_url ? (
            <img src={`${API_URL}${image_url}`} alt={name} className="h-50 w-50 object-cover border shadow-md" />
          ) : (
            <div className="h-full w-full flex items-center justify-center text-xs text-[#888780]">
              ไม่มีรูป
            </div>
          )}
        </div>
        <p className="text-sm font-medium text-[#2C2C2A] mb-2">{name}</p>
        <div className="flex justify-between">
          <div>
            <p className="text-xs text-[#888780]">ต้นทุน</p>
            <p className="text-lg font-bold text-[#888780]">฿{cost_price}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-[#888780]">ราคาขายเดิม</p>
            <p className="text-lg font-bold text-[#888780]">฿{selling_price}</p>
          </div>
        </div>
      </div>

      {/* กรอกราคา */}
      <div className="border border-[#D3D1C7] rounded-lg p-3 bg-[#E1F5EE]/40 mb-3">
        <p className="text-sm text-[#888780] mb-1">
          ราคาขายของคุณ <span className="text-xs">(ต้องไม่ต่ำกว่า ฿{min_price})</span>
        </p>
        <input
          value={price || ""}
          onChange={(e) => setPrice(Number(e.target.value))}
          type="number"
          min={min_price}
          placeholder={min_price.toString()}
          className="w-full px-4 py-2 border border-[#D3D1C7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0D3D30] transition"
        />
        <div className="flex items-center mt-2 p-3 border border-[#D3D1C7] rounded-lg bg-white">
          <p className="text-sm text-[#888780]">กำไรต่อชิ้นที่คุณจะได้รับ: &nbsp;</p>
          {price >= min_price ? (
            <p className="text-lg font-bold text-[#1A6B5A]">
              +฿{price - cost_price}
              <span className="text-xs text-[#888780] ml-1">
                &nbsp;({Math.round((price - cost_price) / cost_price * 100)}%)
              </span>
            </p>
          ) : (
            <p className="text-sm text-[#888780]">—</p>
          )}
        </div>
      </div>

      {/* ปุ่ม */}
      <div className="flex gap-2">
        <button
          onClick={() => {
    onSuccess(); 
    onClose();
  }}
          
          type="button"
          className="w-full px-4 py-2 rounded-lg border border-[#D3D1C7] text-[#2C2C2A] hover:bg-[#E1F5EE] transition cursor-pointer"
        >
          ยกเลิก
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={price < min_price}
          className="w-full px-4 py-2 rounded-lg bg-[#EF9F27] text-white hover:bg-[#BA7517] transition cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
        >
          บันทึก
        </button>
      </div>
    </div>
  </div>
  )
}