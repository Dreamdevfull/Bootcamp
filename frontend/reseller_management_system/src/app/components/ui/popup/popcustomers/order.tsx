// "use client"

// import { useState } from "react"
// import Swal from "sweetalert2"
// import { useRouter } from "next/navigation"
// import { useCart, type CartItem } from "@/app/components/cradcustomer/cartcontext"

// type PopCustomersOrderProps = {
//   open: boolean
//   onClose: () => void
//   product: {
//     product_id: number
//     product_name: string
//     selling_price: number
//     image_url: string
//     stock: number
//     description: string
//   }
//   quantity: number
//   shop_slug: string
//   cartItems?: CartItem[]
// }

// export default function PopCustomersOrder({ open, onClose, product, quantity, shop_slug, cartItems }: PopCustomersOrderProps) {
//   const [name, setName] = useState("")
//   const [phone, setPhone] = useState("")
//   const [address, setAddress] = useState("")
//   const [localQuantity, setLocalQuantity] = useState(quantity)
//   const API_URL = process.env.NEXT_PUBLIC_API_URL
//   const router = useRouter()
//   const { clearCart } = useCart()

//   const totalPrice = cartItems
//     ? cartItems.reduce((sum, i) => sum + i.selling_price * i.quantity, 0)
//     : product.selling_price * localQuantity

//   const handleConfirmOrder = async () => {
//     const API_URL = process.env.NEXT_PUBLIC_API_URL
//     try {
//       const checkoutRes = await fetch(`${API_URL}/shop/${shop_slug}/checkout`, {
//         method: "POST",
//         credentials: "include",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           items: cartItems
//             ? cartItems.map(i => ({ product_id: i.product_id, quantity: i.quantity }))
//             : [{ product_id: product.product_id, quantity: localQuantity }],
//           customer_name: name,
//           customer_phone: phone,
//           shipping_address: address,
//         }),
//       })
//       const checkoutResult = await checkoutRes.json()
//       if (!checkoutRes.ok) {
//         Swal.fire({
//                 icon: 'warning',
//                 title: 'เกิดข้อผิดพลาด',
//                 text: 'เกิดข้อผิดพลาด',
//                 confirmButtonColor: '#EF9F27'
//               });
//               return;
      
//       }

//       const order_id = checkoutResult.order_id

//       const paymentRes = await fetch(`${API_URL}/shop/${shop_slug}/payment/${order_id}`, {
//         method: "POST",
//         credentials: "include",
//         headers: { "Content-Type": "application/json" },
//       })
//       const paymentResult = await paymentRes.json()
//       if (!paymentRes.ok) {
//         Swal.fire({
//                 icon: 'warning',
//                 title: 'ชำระเงินไม่สำเร็จ',
//                 text: 'ชำระเงินไม่สำเร็จ',
//                 confirmButtonColor: '#EF9F27'
//               });
//               return;
        
//       }

//       onClose()
//       clearCart() 
//       router.refresh()


//       await Swal.fire({
//         html: `
//           <div style="display:flex; flex-direction:column; align-items:center; gap:8px">
//             <div style="background:#1A6B5A; border-radius:50%; width:70px; height:70px; display:flex; align-items:center; justify-content:center">
//               <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3">
//                 <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
//               </svg>
//             </div>
//             <h2 style="font-size:26px; font-weight:bold; margin:0; color:#2C2C2A">สั่งซื้อสำเร็จ</h2>
//             <p style="color:#888780; font-size:14px; margin:0">ขอบคุณที่ใช้บริการ<br/>ร้านจะดำเนินการจัดส่งให้เร็วที่สุด</p>
//             <div style="background:#F5F3EE; border-radius:12px; padding:16px; width:100%; margin-top:8px; text-align:center; border:1px solid #D3D1C7">
//               <p style="color:#888780; font-size:13px; margin:0 0 4px 0">เลขออเดอร์</p>
//               <p style="font-size:20px; font-weight:bold; margin:0; color:#2C2C2A">${paymentResult.order_number}</p>
//               <p style="color:#888780; font-size:12px; margin:4px 0 0 0">เก็บเลขนี้ไว้ติดตามสถานะ</p>
//             </div>
//           </div>
//         `,
//         allowOutsideClick: false,
//         allowEscapeKey: false,
//         showConfirmButton: true,
//         confirmButtonText: "ติดตามออเดอร์",
//         confirmButtonColor: "#EF9F27",
//         showDenyButton: true,
//         denyButtonText: "กลับไปช้อปต่อ",
//         denyButtonColor: "#FFFFFF",
//         customClass: {
//           denyButton: "swal-deny-custom",
//           actions: "swal-actions-custom"
//         },
//       }).then((result) => {
//         if (result.isConfirmed) {
//           router.push(`/shop/${shop_slug}/tracking?order=${paymentResult.order_number}`)
//         }
//       })
//     } catch {
//       Swal.fire({
//                 icon: 'warning',
//                 title: 'เกิดข้อผิดพลาด กรุณาลองใหม่',
//                 text: 'เกิดข้อผิดพลาด กรุณาลองใหม่',
//                 confirmButtonColor: '#EF9F27'
//               });
//               return;
//     }
//   }

//   const isFormValid = name.trim() !== "" && /^[0-9]{10}$/.test(phone) && address.trim() !== ""

//   const truncateText = (text: string | null | undefined, maxLength: number) => {
//     if (!text) return "-"
//     return text.length > maxLength ? text.slice(0, maxLength) + "..." : text
//   }

//   if (!open) return null

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black/20 z-50">
//       <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2C2C2A]/40">
//         <div
//           className="bg-white rounded-3xl w-full max-w-[500px] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300"
//           onClick={(e) => e.stopPropagation()}
//         >
//           {/* Header */}
//           <div className="px-6 py-5 border-b border-[#D3D1C7] flex justify-between items-center">
//             <h2 className="text-xl font-bold text-[#2C2C2A]">ทำการสั่งซื้อ</h2>
//             <button
//               onClick={onClose}
//               className="text-gray-400 hover:text-gray-600 text-xl font-bold cursor-pointer"
//             >
//               ✕
//             </button>
//           </div>

//           <div className="px-6 py-2 max-h-[80vh] overflow-y-auto [&::-webkit-scrollbar]:hidden">

//             {/* Product List */}
//             <div className="space-y-2 mb-2 border border-[#D3D1C7] p-3 rounded-lg">
//               <div className="flex justify-between text-[13px] font-medium text-[#888780] px-1">
//                 <span>รายการสินค้า ({cartItems ? cartItems.length : 1} รายการ)</span>
//                 <span>ราคารวม</span>
//               </div>

//               {/* ✅ บอกใบ้ว่าเลื่อนได้ */}
//               {cartItems && cartItems.length > 2 && (
//                 <p className="text-xs text-[#888780] text-center flex items-center justify-center gap-1">
//                   <span>↕</span> เลื่อนดูสินค้าทั้งหมดได้
//                 </p>
//               )}

//               {/* ✅ scroll area + gradient */}
//               <div className="relative">
//                 <div className="max-h-[240px] overflow-y-auto space-y-2 pr-1
//                   [&::-webkit-scrollbar]:w-2
//                   [&::-webkit-scrollbar-track]:bg-[#F5F3EE]
//                   [&::-webkit-scrollbar-track]:rounded-full
//                   [&::-webkit-scrollbar-thumb]:bg-[#9FE1CB]
//                   [&::-webkit-scrollbar-thumb]:rounded-full
//                   [&::-webkit-scrollbar-thumb]:border-2
//                   [&::-webkit-scrollbar-thumb]:border-[#F5F3EE]
//                 ">
//                   {cartItems ? (
//                     cartItems.map((item, idx) => (
//                       <div key={idx} className="flex items-center gap-3 p-3 bg-[#F5F3EE] rounded-lg">
//                         <img
//                           src={`${API_URL}${item.image_url}`}
//                           alt=""
//                           className="w-12 h-12 bg-[#E1F5EE] rounded-xl flex-shrink-0 border border-[#D3D1C7] object-cover"
//                         />
//                         <div className="flex-1 min-w-0">
//                           <h4 className="text-sm font-semibold text-[#2C2C2A] truncate">{item.product_name}</h4>
//                           <p className="text-xs text-[#888780]">{truncateText(item.description, 40)}</p>
//                           <p className="text-xs text-[#888780] mt-0.5">฿{item.selling_price} / ชิ้น</p>
//                         </div>
//                         <div className="text-right flex-shrink-0">
//                           <p className="text-xs text-[#888780]">x{item.quantity}</p>
//                           <p className="text-sm font-bold text-[#2C2C2A]">฿{item.selling_price * item.quantity}</p>
//                         </div>
//                       </div>
//                     ))
//                   ) : (
//                     <div className="flex flex-col gap-3 p-3 bg-[#F5F3EE] rounded-lg">
//                       <div className="flex items-center gap-3">
//                         <img
//                           src={`${API_URL}${product.image_url}`}
//                           alt=""
//                           className="w-14 h-14 bg-[#E1F5EE] rounded-xl flex-shrink-0 border border-[#D3D1C7] object-cover"
//                         />
//                         <div className="flex-1 min-w-0">
//                           <h4 className="text-sm font-semibold text-[#2C2C2A] truncate">{product.product_name}</h4>
//                           <p className="text-xs text-[#888780] mt-0.5">{truncateText(product.description, 60)}</p>
//                           <p className="text-xs text-[#888780] mt-0.5">฿{product.selling_price} / ชิ้น • เหลือ {product.stock} ชิ้น</p>
//                         </div>
//                       </div>
//                       <div className="flex items-center justify-between border-t border-[#D3D1C7] pt-3">
//                         <div className="flex items-center gap-3 bg-white border border-[#D3D1C7] px-3 py-1.5 rounded-xl">
//                           <button
//                             onClick={() => setLocalQuantity(q => Math.max(1, q - 1))}
//                             disabled={localQuantity === 1}
//                             className="bg-[#1A6B5A]/20 hover:bg-[#1A6B5A] hover:text-white text-[#1A6B5A] rounded-lg w-7 h-7 text-lg font-bold transition disabled:opacity-30 cursor-pointer"
//                           >−</button>
//                           <span className="text-[#085041] font-bold text-base w-6 text-center">{localQuantity}</span>
//                           <button
//                             onClick={() => setLocalQuantity(q => Math.min(product.stock, q + 1))}
//                             disabled={localQuantity === product.stock}
//                             className="bg-[#1A6B5A] hover:bg-[#1A6B5A]/70 text-white rounded-lg w-7 h-7 text-lg font-bold transition disabled:opacity-30 cursor-pointer"
//                           >+</button>
//                         </div>
//                         <div className="text-right">
//                           <p className="text-xs text-[#888780]">ราคารวม</p>
//                           <p className="text-lg font-black text-[#2C2C2A]">฿{product.selling_price * localQuantity}</p>
//                         </div>
//                       </div>
//                     </div>
//                   )}
//                 </div>

//                 {/* ✅ gradient บอกใบ้ว่ายังมีด้านล่าง */}
//                 {cartItems && cartItems.length > 2 && (
//                   <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent pointer-events-none rounded-b-lg" />
//                 )}
//               </div>
//             </div>

//             {/* Shipping Form */}
//             <div className="space-y-3 mb-2 border border-[#D3D1C7] p-3 rounded-lg">
//               <label className="text-sm font-semibold text-[#2C2C2A] block ml-1">ข้อมูลจัดส่ง</label>
//               <div className="grid grid-cols-2 gap-3">
//                 <div className="flex flex-col gap-1">
//                   <label className="text-xs font-medium text-[#2C2C2A]">
//                     ชื่อ-นามสกุล <span className="text-[#791F1F]">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                     placeholder="ชื่อ-นามสกุล"
//                     className="w-full px-4 py-2.5 text-sm border border-[#D3D1C7] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1D9E75] focus:border-transparent transition-all placeholder:text-[#888780] text-[#2C2C2A]"
//                   />
//                 </div>
//                 <div className="flex flex-col gap-1">
//                   <label className="text-xs font-medium text-[#2C2C2A]">
//                     เบอร์โทรศัพท์ <span className="text-[#791F1F]">*</span>
//                   </label>
//                   <input
//                     type="tel"
//                     value={phone}
//                     onChange={(e) => {
//                       const val = e.target.value.replace(/[^0-9]/g, "")
//                       if (val.length <= 10) setPhone(val)
//                     }}
//                     placeholder="เบอร์โทรศัพท์ (10 หลัก)"
//                     className={`w-full px-4 py-2.5 text-sm border rounded-xl focus:outline-none focus:ring-2 focus:border-transparent transition-all placeholder:text-[#888780] text-[#2C2C2A] ${
//                       phone.length > 0 && phone.length < 10
//                         ? "border-[#F7C1C1] focus:ring-[#F7C1C1] bg-[#FCEBEB]"
//                         : phone.length === 10
//                         ? "border-[#9FE1CB] focus:ring-[#1D9E75] bg-[#E1F5EE]"
//                         : "border-[#D3D1C7] focus:ring-[#1D9E75]"
//                     }`}
//                   />
//                   {phone.length > 0 && phone.length < 10 && (
//                     <p className="text-xs text-[#791F1F] flex items-center gap-1">
//                       <span>⚠</span> กรอกเบอร์ให้ครบ 10 หลัก ({phone.length}/10)
//                     </p>
//                   )}
//                   {phone.length === 10 && (
//                     <p className="text-xs text-[#085041] flex items-center gap-1">
//                       <span>✓</span> เบอร์โทรถูกต้อง
//                     </p>
//                   )}
//                 </div>
//               </div>

//               <div className="flex flex-col gap-1">
//                 <label className="text-xs font-medium text-[#2C2C2A]">
//                   ที่อยู่จัดส่ง <span className="text-[#791F1F]">*</span>
//                 </label>
//                 <textarea
//                   placeholder="บ้านเลขที่, ซอย, หมู่, ถนน, แขวง/ตำบล, เขต/อำเภอ, จังหวัด, รหัสไปรษณีย์"
//                   value={address}
//                   onChange={(e) => setAddress(e.target.value)}
//                   rows={3}
//                   className="w-full px-4 py-2.5 text-sm border border-[#D3D1C7] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1D9E75] focus:border-transparent transition-all resize-none placeholder:text-[#888780] text-[#2C2C2A]"
//                 />
//               </div>

//               <p className="text-[11px] text-[#888780] ml-1">
//                 <span className="text-[#791F1F]">*</span> จำเป็นต้องกรอก
//               </p>
//             </div>

//             {/* Price Summary */}
//             <div className="bg-[#F5F3EE] rounded-2xl p-4 border border-[#D3D1C7] space-y-2">
//               <div className="flex justify-between text-sm text-[#888780]">
//                 <span>ยอดรวมสินค้า ({cartItems ? cartItems.reduce((s, i) => s + i.quantity, 0) : localQuantity} ชิ้น)</span>
//                 <span>฿{totalPrice.toLocaleString()}</span>
//               </div>
//               <div className="flex justify-between items-center pt-2 border-t border-[#D3D1C7]">
//                 <span className="text-[#2C2C2A] font-bold">ยอดชำระสุทธิ</span>
//                 <span className="text-2xl font-black text-[#2C2C2A]">฿{totalPrice.toLocaleString()}</span>
//               </div>
//             </div>

//             {/* Checkout Button */}
//             <button
//               disabled={!isFormValid}
//               onClick={handleConfirmOrder}
//               className="w-full mt-2 bg-[#EF9F27] hover:bg-[#BA7517] text-white py-4 rounded-2xl font-bold text-[17px] shadow-lg shadow-[#EF9F27]/20 active:scale-[0.98] transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100"
//             >
//               ยืนยันการชำระเงิน
//             </button>

//             <p className="text-center text-[11px] text-[#888780] mt-2 mb-2">
//               การคลิกปุ่ม ยืนยันการชำระเงิน แสดงว่าคุณยอมรับเงื่อนไขการบริการ
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }
"use client"

import { useState } from "react"
import Swal from "sweetalert2"
import { useRouter } from "next/navigation"
import { useCart, type CartItem } from "@/app/components/cradcustomer/cartcontext"

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
  cartItems?: CartItem[]
}

export default function PopCustomersOrder({ open, onClose, product, quantity, shop_slug, cartItems }: PopCustomersOrderProps) {
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")
  const [localQuantity, setLocalQuantity] = useState(quantity)
  const API_URL = process.env.NEXT_PUBLIC_API_URL
  const router = useRouter()
  const { clearCart } = useCart()

  const totalPrice = cartItems
    ? cartItems.reduce((sum, i) => sum + i.selling_price * i.quantity, 0)
    : product.selling_price * localQuantity

  const handleConfirmOrder = async () => {
    try {
      const checkoutRes = await fetch(`${API_URL}/shop/${shop_slug}/checkout`, {
        method: "POST", credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cartItems
            ? cartItems.map(i => ({ product_id: i.product_id, quantity: i.quantity }))
            : [{ product_id: product.product_id, quantity: localQuantity }],
          customer_name: name, customer_phone: phone, shipping_address: address,
        }),
      })
      const checkoutResult = await checkoutRes.json()
      if (!checkoutRes.ok) {
        Swal.fire({ icon: 'warning', title: 'เกิดข้อผิดพลาด', text: 'เกิดข้อผิดพลาด', confirmButtonColor: '#EF9F27' });
        return;
      }

      const order_id = checkoutResult.order_id
      const paymentRes = await fetch(`${API_URL}/shop/${shop_slug}/payment/${order_id}`, {
        method: "POST", credentials: "include",
        headers: { "Content-Type": "application/json" },
      })
      const paymentResult = await paymentRes.json()
      if (!paymentRes.ok) {
        Swal.fire({ icon: 'warning', title: 'ชำระเงินไม่สำเร็จ', text: 'ชำระเงินไม่สำเร็จ', confirmButtonColor: '#EF9F27' });
        return;
      }

      onClose(); clearCart(); router.refresh();

      await Swal.fire({
        html: `
          <div style="display:flex; flex-direction:column; align-items:center; gap:8px">
            <div style="background:#1A6B5A; border-radius:50%; width:70px; height:70px; display:flex; align-items:center; justify-content:center">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
              </svg>
            </div>
            <h2 style="font-size:26px; font-weight:bold; margin:0; color:#2C2C2A">สั่งซื้อสำเร็จ</h2>
            <p style="color:#888780; font-size:14px; margin:0">ขอบคุณที่ใช้บริการ<br/>ร้านจะดำเนินการจัดส่งให้เร็วที่สุด</p>
            <div style="background:#F5F3EE; border-radius:12px; padding:16px; width:100%; margin-top:8px; text-align:center; border:1px solid #D3D1C7">
              <p style="color:#888780; font-size:13px; margin:0 0 4px 0">เลขออเดอร์</p>
              <p style="font-size:20px; font-weight:bold; margin:0; color:#2C2C2A">${paymentResult.order_number}</p>
              <p style="color:#888780; font-size:12px; margin:4px 0 0 0">เก็บเลขนี้ไว้ติดตามสถานะ</p>
            </div>
          </div>
        `,
        allowOutsideClick: false, allowEscapeKey: false,
        showConfirmButton: true, confirmButtonText: "ติดตามออเดอร์", confirmButtonColor: "#EF9F27",
        showDenyButton: true, denyButtonText: "กลับไปช้อปต่อ", denyButtonColor: "#FFFFFF",
        customClass: { denyButton: "swal-deny-custom", actions: "swal-actions-custom" },
      }).then((result) => {
        if (result.isConfirmed) router.push(`/shop/${shop_slug}/tracking?order=${paymentResult.order_number}`)
      })
    } catch {
      Swal.fire({ icon: 'warning', title: 'เกิดข้อผิดพลาด กรุณาลองใหม่', text: 'เกิดข้อผิดพลาด กรุณาลองใหม่', confirmButtonColor: '#EF9F27' });
    }
  }

  const isFormValid = name.trim() !== "" && /^[0-9]{10}$/.test(phone) && address.trim() !== ""

  const truncateText = (text: string | null | undefined, maxLength: number) => {
    if (!text) return "-"
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text
  }

  if (!open) return null

  const inputClass = `
    w-full px-4 py-2.5 text-sm rounded-xl
    border-2 border-gray-300 dark:border-gray-600
    bg-white dark:bg-gray-800
    text-gray-800 dark:text-gray-100
    placeholder:text-gray-400 dark:placeholder:text-gray-500
    focus:outline-none focus:ring-2
    focus:ring-emerald-500 dark:focus:ring-emerald-400
    focus:border-transparent transition-all
  `

  const labelClass = "text-xs font-semibold text-gray-700 dark:text-gray-200"

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 dark:bg-black/60 z-50">
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="bg-white dark:bg-gray-900
                     rounded-3xl w-full max-w-[500px] shadow-2xl overflow-hidden
                     border-2 border-gray-100 dark:border-gray-700
                     animate-in fade-in zoom-in duration-300
                     transition-colors"
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-label="ทำการสั่งซื้อ"
        >
          {/* Header */}
          <div className="px-6 py-5 border-b-2 border-gray-100 dark:border-gray-700 flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">ทำการสั่งซื้อ</h2>
            <button
              onClick={onClose}
              aria-label="ปิด"
              className="text-gray-400 dark:text-gray-500 hover:text-gray-800 dark:hover:text-gray-100
                         text-xl font-bold cursor-pointer transition
                         focus:outline-none focus:ring-2 focus:ring-gray-400 rounded"
            >✕</button>
          </div>

          <div className="px-6 py-2 max-h-[80vh] overflow-y-auto [&::-webkit-scrollbar]:hidden">

            {/* Product List */}
            <div className="space-y-2 mb-2 border-2 border-gray-200 dark:border-gray-700 p-3 rounded-lg">
              <div className="flex justify-between text-[13px] font-medium text-gray-500 dark:text-gray-400 px-1">
                <span>รายการสินค้า ({cartItems ? cartItems.length : 1} รายการ)</span>
                <span>ราคารวม</span>
              </div>

              {cartItems && cartItems.length > 2 && (
                <p className="text-xs text-gray-400 dark:text-gray-500 text-center flex items-center justify-center gap-1">
                  <span aria-hidden="true">↕</span> เลื่อนดูสินค้าทั้งหมดได้
                </p>
              )}

              <div className="relative">
                <div className="max-h-[240px] overflow-y-auto space-y-2 pr-1
                  [&::-webkit-scrollbar]:w-2
                  [&::-webkit-scrollbar-track]:bg-gray-100
                  [&::-webkit-scrollbar-track]:rounded-full
                  [&::-webkit-scrollbar-thumb]:bg-emerald-300
                  [&::-webkit-scrollbar-thumb]:rounded-full
                  [&::-webkit-scrollbar-thumb]:border-2
                  [&::-webkit-scrollbar-thumb]:border-gray-100"
                >
                  {cartItems ? (
                    cartItems.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <img
                          src={`${API_URL}${item.image_url}`}
                          alt={item.product_name}
                          className="w-12 h-12 rounded-xl flex-shrink-0 border-2 border-gray-200 dark:border-gray-700 object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-100 truncate">{item.product_name}</h4>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{truncateText(item.description, 40)}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">฿{item.selling_price} / ชิ้น</p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className="text-xs text-gray-500 dark:text-gray-400">x{item.quantity}</p>
                          <p className="text-sm font-bold text-gray-800 dark:text-gray-100">฿{item.selling_price * item.quantity}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="flex flex-col gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="flex items-center gap-3">
                        <img
                          src={`${API_URL}${product.image_url}`}
                          alt={product.product_name}
                          className="w-14 h-14 rounded-xl flex-shrink-0 border-2 border-gray-200 dark:border-gray-700 object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-100 truncate">{product.product_name}</h4>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{truncateText(product.description, 60)}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">฿{product.selling_price} / ชิ้น • เหลือ {product.stock} ชิ้น</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between border-t-2 border-gray-200 dark:border-gray-700 pt-3">
                        <div className="flex items-center gap-3 bg-white dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 px-3 py-1.5 rounded-xl"
                             role="group" aria-label="จำนวนสินค้า">
                          <button
                            onClick={() => setLocalQuantity(q => Math.max(1, q - 1))}
                            disabled={localQuantity === 1}
                            aria-label="ลดจำนวน"
                            className="bg-emerald-100 dark:bg-emerald-900 hover:bg-emerald-700 dark:hover:bg-emerald-700
                                       hover:text-white text-emerald-700 dark:text-emerald-300
                                       rounded-lg w-7 h-7 text-lg font-bold transition disabled:opacity-30 cursor-pointer
                                       focus:outline-none focus:ring-2 focus:ring-emerald-400"
                          >−</button>
                          <span className="text-emerald-700 dark:text-emerald-400 font-bold text-base w-6 text-center"
                                aria-label={`จำนวน ${localQuantity} ชิ้น`}>
                            {localQuantity}
                          </span>
                          <button
                            onClick={() => setLocalQuantity(q => Math.min(product.stock, q + 1))}
                            disabled={localQuantity === product.stock}
                            aria-label="เพิ่มจำนวน"
                            className="bg-emerald-700 dark:bg-emerald-800 hover:bg-emerald-700/70 dark:hover:bg-emerald-700
                                       text-white rounded-lg w-7 h-7 text-lg font-bold transition disabled:opacity-30 cursor-pointer
                                       focus:outline-none focus:ring-2 focus:ring-emerald-400"
                          >+</button>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-gray-500 dark:text-gray-400">ราคารวม</p>
                          <p className="text-lg font-black text-gray-800 dark:text-gray-100">฿{product.selling_price * localQuantity}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {cartItems && cartItems.length > 2 && (
                  <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white dark:from-gray-900 to-transparent pointer-events-none rounded-b-lg" />
                )}
              </div>
            </div>

            {/* Shipping Form */}
            <div className="space-y-3 mb-2 border-2 border-gray-200 dark:border-gray-700 p-3 rounded-lg">
              <label className="text-sm font-semibold text-gray-800 dark:text-gray-100 block">ข้อมูลจัดส่ง</label>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className={labelClass}>
                    ชื่อ-นามสกุล <span className="text-red-500 dark:text-red-400" aria-label="จำเป็น">*</span>
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="ชื่อ-นามสกุล"
                    aria-required="true"
                    className={inputClass}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className={labelClass}>
                    เบอร์โทรศัพท์ <span className="text-red-500 dark:text-red-400" aria-label="จำเป็น">*</span>
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => {
                      const val = e.target.value.replace(/[^0-9]/g, "")
                      if (val.length <= 10) setPhone(val)
                    }}
                    placeholder="เบอร์โทรศัพท์ (10 หลัก)"
                    aria-required="true"
                    className={`w-full px-4 py-2.5 text-sm rounded-xl border-2 focus:outline-none focus:ring-2 focus:border-transparent transition-all
                      placeholder:text-gray-400 dark:placeholder:text-gray-500
                      ${phone.length > 0 && phone.length < 10
                        ? "border-rose-400 dark:border-rose-600 focus:ring-rose-400 bg-rose-50 dark:bg-rose-950 text-gray-800 dark:text-gray-100"
                        : phone.length === 10
                        ? "border-emerald-400 dark:border-emerald-600 focus:ring-emerald-400 bg-emerald-50 dark:bg-emerald-950 text-gray-800 dark:text-gray-100"
                        : "border-gray-300 dark:border-gray-600 focus:ring-emerald-500 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
                      }`}
                  />
                  {phone.length > 0 && phone.length < 10 && (
                    <p className="text-xs text-rose-600 dark:text-rose-400 flex items-center gap-1" role="alert">
                      <span aria-hidden="true">⚠</span> กรอกเบอร์ให้ครบ 10 หลัก ({phone.length}/10)
                    </p>
                  )}
                  {phone.length === 10 && (
                    <p className="text-xs text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                      <span aria-hidden="true">✓</span> เบอร์โทรถูกต้อง
                    </p>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className={labelClass}>
                  ที่อยู่จัดส่ง <span className="text-red-500 dark:text-red-400" aria-label="จำเป็น">*</span>
                </label>
                <textarea
                  placeholder="บ้านเลขที่, ซอย, หมู่, ถนน, แขวง/ตำบล, เขต/อำเภอ, จังหวัด, รหัสไปรษณีย์"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  rows={3}
                  aria-required="true"
                  className={`${inputClass} resize-none`}
                />
              </div>

              <p className="text-[11px] text-gray-500 dark:text-gray-400 ml-1">
                <span className="text-red-500 dark:text-red-400" aria-hidden="true">*</span> จำเป็นต้องกรอก
              </p>
            </div>

            {/* Price Summary */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-4 border-2 border-gray-200 dark:border-gray-700 space-y-2">
              <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                <span>ยอดรวมสินค้า ({cartItems ? cartItems.reduce((s, i) => s + i.quantity, 0) : localQuantity} ชิ้น)</span>
                <span>฿{totalPrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t-2 border-gray-200 dark:border-gray-700">
                <span className="text-gray-800 dark:text-gray-100 font-bold">ยอดชำระสุทธิ</span>
                <span className="text-2xl font-black text-gray-800 dark:text-gray-100">฿{totalPrice.toLocaleString()}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              disabled={!isFormValid}
              onClick={handleConfirmOrder}
              className="w-full mt-2 bg-amber-500 dark:bg-amber-600
                         hover:bg-amber-600 dark:hover:bg-amber-700
                         text-white py-4 rounded-2xl font-bold text-[17px]
                         shadow-lg active:scale-[0.98] transition-all cursor-pointer
                         disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100
                         focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2"
            >
              ยืนยันการชำระเงิน
            </button>

            <p className="text-center text-[11px] text-gray-500 dark:text-gray-400 mt-2 mb-2">
              การคลิกปุ่ม ยืนยันการชำระเงิน แสดงว่าคุณยอมรับเงื่อนไขการบริการ
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}