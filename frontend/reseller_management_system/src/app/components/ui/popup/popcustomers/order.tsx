"use client"

import { useState } from "react"
import Swal from "sweetalert2"

type PopCustomersOrderProps = {
  open: boolean
  onClose: () => void
  product: {
    product_id: number
    product_name: string
    selling_price: number
    image_url: string
    stock: number
    description: string
  }
  quantity: number
  shop_slug: string
}

export default function PopCustomersOrder({ open, onClose, product, quantity, shop_slug }: PopCustomersOrderProps) {
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")
  const [localQuantity, setLocalQuantity] = useState(quantity)
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const handleConfirmOrder = async () => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    try {

      const checkoutRes = await fetch(`${API_URL}/shop/${shop_slug}/checkout`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: [
            {
              product_id: product.product_id,
              quantity: quantity,
            }
          ],
          customer_name: name,
          customer_phone: phone,
          shipping_address: address,
        }),
      })
      const checkoutResult = await checkoutRes.json()
      if (!checkoutRes.ok) {
        alert(checkoutResult.message || "เกิดข้อผิดพลาด")
        return
      }

      const order_id = checkoutResult.order_id


      const paymentRes = await fetch(`${API_URL}/shop/${shop_slug}/payment/${order_id}`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      })
      const paymentResult = await paymentRes.json()
      if (!paymentRes.ok) {
        alert(paymentResult.message || "ชำระเงินไม่สำเร็จ")
        return
      }

      onClose()

      await Swal.fire({
        html: `
          <div style="display:flex; flex-direction:column; align-items:center; gap:8px">
            <div style="background:#1a6b5a; border-radius:50%; width:70px; height:70px; display:flex; align-items:center; justify-content:center">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
              </svg>
            </div>
            <h2 style="font-size:26px; font-weight:bold; margin:0">สั่งซื้อสำเร็จ</h2>
            <p style="color:#888; font-size:14px; margin:0">ขอบคุณที่ใช้บริการ<br/>ร้านจะดำเนินการจัดส่งให้เร็วที่สุด</p>
            <div style="background:#f5f3ee; border-radius:12px; padding:16px; width:100%; margin-top:8px; text-align:center">
              <p style="color:#888; font-size:13px; margin:0 0 4px 0">เลขออเดอร์</p>
              <p style="font-size:20px; font-weight:bold; margin:0">${paymentResult.order_number}</p>
              <p style="color:#aaa; font-size:12px; margin:4px 0 0 0">เก็บเลขนี้ไว้ติดตามสถานะ</p>
            </div>
          </div>
        `,
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: true,
        confirmButtonText: "ติดตามออเดอร์",
        confirmButtonColor: "#EF9F27",
        showDenyButton: true,
        denyButtonText: "กลับไปช้อปต่อ",
        denyButtonColor: "#ffffff",
        customClass: {
          denyButton: "swal-deny-custom"
        },
        reverseButtons: true,
      })
    } catch {
      alert("เกิดข้อผิดพลาด กรุณาลองใหม่")
    }
  }
  const isFormValid = name.trim() !== "" && /^[0-9]{10}$/.test(phone) && address.trim() !== ""

  const truncateText = (text: string | null | undefined, maxLength: number) => {
    if (!text) return '-';
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
  };
  if (!open) return null

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/20 z-50"
    >
      {/* ตัวหุ้มด้านนอกสุด (Overlay) เพื่อให้ Content อยู่กลางจอ */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2C2C2A]/40">

        {/* ตัว Modal หลัก: กำหนด max-width เพื่อไม่ให้เต็มจอเกินไป */}
        <div
          className="bg-white rounded-3xl w-full max-w-[500px] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header Section */}
          <div className="px-6 py-5 border-b border-[#D3D1C7]/30 flex justify-between items-center">
            <h2 className="text-xl font-bold text-[#2C2C2A]">ทำการสั่งซื้อ</h2>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-[#888780] transition-colors"
            >
              ✕
            </button>
          </div>

          <div className="px-6 py-2 max-h-[80vh] overflow-y-auto [&::-webkit-scrollbar]:hidden">
            {/* Product List */}
            <div className="space-y-3 mb-2 border p-3 rounded-lg">
              <div className="flex justify-between text-[13px] font-medium text-[#888780] px-1">
                <span>รายการสินค้า</span>
                <span>ราคารวม</span>
              </div>
              <div className="divide-[#D3D1C7]/40">
                {/* Item 1 */}
                <div className="flex items-center gap-4 p-4 bg-[#F9F9F8] transition-colors">

                  <img src={`${API_URL}${product.image_url}`} alt="" className="w-14 h-14 bg-gray-100 rounded-xl flex-shrink-0 border border-gray-700" />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-[#2C2C2A] truncate" title={product.product_name}>{product.product_name}</h4>
                    <p className="text-xs text-[#888780] mt-0.5" title={product.description}>{truncateText(product.description, 100)}</p>
                    <div className="flex items-center justify-between mt-1 sm:justify-start sm:gap-4">
                      <p className="text-xs font-medium text-[#2C2C2A]">฿{product.selling_price} x {quantity}</p>
                    </div>
                  </div>
                  <div className="hidden sm:block text-sm font-bold text-[#2C2C2A]">฿{product.selling_price * quantity}</div>
                  <div className="flex flex-col items-end gap-1">
                    
                    <div className="flex items-center gap-2 bg-[#f5f3ee] px-3 py-1 rounded-md">
                      <button
                        onClick={() => setLocalQuantity(q => Math.max(1, q - 1))}
                        disabled={localQuantity === 1}
                        className="bg-[#1a6b5a]/40 hover:bg-[#1a6b5a] text-white rounded w-6 h-6 text-sm transition disabled:opacity-40"
                      >-</button>
                      <span className="text-[#085041] font-medium w-5 text-center">{localQuantity}</span>
                      <button
                        onClick={() => setLocalQuantity(q => Math.min(product.stock, q + 1))}
                        disabled={localQuantity === product.stock}
                        className="bg-[#1a6b5a] hover:bg-[#1a6b5a]/40 text-white rounded w-6 h-6 text-sm transition disabled:opacity-40"
                      >+</button>
                    </div>
                    <span className="text-xs text-gray-400">เหลือ {product.stock} ชิ้น</span>
                    <span className="text-sm font-bold text-[#2C2C2A]">฿{product.selling_price * localQuantity}</span>
                  </div>
                </div>
              </div>


              {/* ส่วนสรุปยอดเล็กภายในกลุ่มสินค้า */}
              {/* <div className="bg-[#F9F9F8]/50 px-4 py-3 border-t border-[#D3D1C7]/50 flex justify-between items-center">
                <span className="text-xs text-[#888780]">รวมจำนวน {quantity} รายการ</span>
                <span className="text-sm font-bold text-[#2C2C2A]">฿{product.selling_price * quantity}</span>
              </div> */}
            </div>

            {/* Shipping Form */}
            {/* Shipping Form */}
            <div className="space-y-3 mb-2 border p-3 rounded-lg">
              <label className="text-sm font-semibold text-[#2C2C2A] block ml-1">ข้อมูลจัดส่ง</label>
              <div className="grid grid-cols-2 gap-3">

                {/* ชื่อ */}
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-medium text-[#2C2C2A]">
                    ชื่อ-นามสกุล <span className="text-[#c0392b]">*</span>
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="ชื่อ-นามสกุล"
                    className="w-full px-4 py-2.5 text-sm border border-[#D3D1C7] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1D9E75] focus:border-transparent transition-all placeholder:text-[13px]"
                  />
                </div>

                {/* เบอร์โทร */}
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-medium text-[#2C2C2A]">
                    เบอร์โทรศัพท์ <span className="text-[#c0392b]">*</span>
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => {
                      const val = e.target.value.replace(/[^0-9]/g, "")
                      if (val.length <= 10) setPhone(val)
                    }}
                    placeholder="เบอร์โทรศัพท์ (10 หลัก)"
                    className={`w-full px-4 py-2.5 text-sm border rounded-xl focus:outline-none focus:ring-2 focus:border-transparent transition-all placeholder:text-[13px] ${phone.length > 0 && phone.length < 10
                        ? "border-[#c0392b] focus:ring-[#c0392b] bg-[#fff5f5]"  // ✅ แดงเมื่อไม่ครบ
                        : phone.length === 10
                          ? "border-[#1D9E75] focus:ring-[#1D9E75] bg-[#f0faf6]"  // ✅ เขียวเมื่อครบ
                          : "border-[#D3D1C7] focus:ring-[#1D9E75]"               // ✅ ปกติ
                      }`}
                  />
                  {/* ข้อความเตือน */}
                  {phone.length > 0 && phone.length < 10 && (
                    <p className="text-xs text-[#c0392b] flex items-center gap-1">
                      <span>⚠</span> กรอกเบอร์ให้ครบ 10 หลัก ({phone.length}/10)
                    </p>
                  )}
                  {phone.length === 10 && (
                    <p className="text-xs text-[#1D9E75] flex items-center gap-1">
                      <span>✓</span> เบอร์โทรถูกต้อง
                    </p>
                  )}
                </div>

              </div>

              {/* ที่อยู่ */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-[#2C2C2A]">
                  ที่อยู่จัดส่ง <span className="text-[#c0392b]">*</span>
                </label>
                <textarea
                  placeholder="บ้านเลขที่, ซอย, หมู่, ถนน, แขวง/ตำบล, เขต/อำเภอ, จังหวัด, รหัสไปรษณีย์"
                  onChange={(e) => setAddress(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2.5 text-sm border border-[#D3D1C7] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1D9E75] focus:border-transparent transition-all resize-none placeholder:text-[13px]"
                />
              </div>
            </div>

            {/* Price Summary */}
            <div className="bg-[#F9F9F8] rounded-2xl p-4 border border-[#D3D1C7]/50 space-y-2">
              <div className="flex justify-between text-sm text-[#888780]">
                <span>ยอดรวมสินค้า ({quantity} รายการ)</span>
                <span>฿{product.selling_price * quantity}</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-[#D3D1C7]/50">
                <span className="text-[#2C2C2A] font-bold">ยอดชำระสุทธิ</span>
                <span className="text-2xl font-black text-[#2C2C2A]">฿{product.selling_price * quantity}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              disabled={!isFormValid}
              onClick={handleConfirmOrder}
              className="w-full mt-2 bg-[#EF9F27] hover:bg-[#BA7517] text-white py-4 rounded-2xl font-bold text-[17px] shadow-lg shadow-[#EF9F27]/20 active:scale-[0.98] transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100"
            >
              ยืนยันการชำระเงิน
            </button>

            <p className="text-center text-[11px] text-[#888780] mt-2">
              การคลิกปุ่ม ยืนยันการชำระเงิน แสดงว่าคุณยอมรับเงื่อนไขการบริการ
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}