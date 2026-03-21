// "use client"
// import { useCart, type CartItem } from "@/app/components/cradcustomer/cartcontext"
// import { Trash2, Plus, Minus, ChevronLeft, ShoppingBag, Package } from "lucide-react"
// import Link from "next/link"
// import { usePathname } from "next/navigation"
// import { useEffect, useState } from "react"
// import PopCustomersOrder from "@/app/components/ui/popup/popcustomers/order"

// const BasketPage = () => {
//   const pathname = usePathname()
//   const shop_slug = pathname.split("/")[2] ?? ""
//   const { items, removeFromCart, updateQuantity, totalItems, clearCart } = useCart()
//   const API_URL = process.env.NEXT_PUBLIC_API_URL
//   const total = items.reduce((sum: number, i: CartItem) => sum + i.selling_price * i.quantity, 0)
//   const [isOpen, setIsOpen] = useState(false)

//   useEffect(() => {
//     if (items.length === 0) return
//     const handleBeforeUnload = (e: BeforeUnloadEvent) => {
//       e.preventDefault()
//       e.returnValue = ""
//     }
//     window.addEventListener("beforeunload", handleBeforeUnload)
//     return () => window.removeEventListener("beforeunload", handleBeforeUnload)
//   }, [items])

//   return (
//     <div className="min-h-screen bg-[#F5F3EE] font-sans">
//       <header className="bg-gradient-to-r from-[#0D3D30] via-[#1A6B5A] to-[#1D9E75] text-white shadow-lg">
//         <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
//           <div className="flex items-center gap-3">
//             <span className="text-2xl">🧸</span>
//             <div>
//               <h1 className="text-xl font-bold leading-none">TinyStore</h1>
//               <p className="text-xs text-white/60 mt-0.5">ตะกร้าสินค้า</p>
//             </div>
//           </div>
//           <Link href={`/shop/${shop_slug}`}>
//             <button className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 px-4 py-2 rounded-xl text-sm transition cursor-pointer">
//               <ChevronLeft size={16} /> กลับไปหน้าร้าน
//             </button>
//           </Link>
//         </div>
//       </header>

//       {items.length > 0 && (
//         <div className="bg-[#FAEEDA] border-b border-[#FAC775] px-6 py-2">
//           <div className="max-w-6xl mx-auto flex items-center gap-2 text-[#633806] text-xs">
//             <span>⚠</span>
//             <span>หากรีเฟรชหรือปิดหน้านี้ รายการในตะกร้าจะหายทั้งหมด กรุณาชำระเงินให้เสร็จก่อน</span>
//           </div>
//         </div>
//       )}

//       <main className="max-w-6xl mx-auto px-4 py-8 md:px-8">
//         {items.length === 0 ? (
//           <div className="flex flex-col items-center justify-center py-32 gap-4">
//             <div className="w-24 h-24 bg-white rounded-full shadow-md flex items-center justify-center">
//               <ShoppingBag size={40} className="text-[#D3D1C7]" />
//             </div>
//             <h2 className="text-xl font-semibold text-[#2C2C2A]">ตะกร้าว่างเปล่า</h2>
//             <p className="text-[#888780] text-sm">เพิ่มสินค้าที่ต้องการแล้วกลับมาที่นี่</p>
//             <Link href={`/shop/${shop_slug}`}>
//               <button className="mt-2 px-8 py-3 bg-[#1A6B5A] text-white rounded-xl hover:bg-[#0D3D30] transition cursor-pointer font-medium shadow-md">
//                 ไปช้อปเลย →
//               </button>
//             </Link>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

//             {/* รายการสินค้า */}
//             <div className="lg:col-span-2 space-y-3">
//               <div className="flex items-center gap-2 mb-4">
//                 <ShoppingBag size={20} className="text-[#1A6B5A]" />
//                 <h2 className="text-lg font-bold text-[#2C2C2A]">รายการสินค้า</h2>
//                 <span className="ml-auto bg-[#1A6B5A] text-white text-xs font-bold px-2.5 py-1 rounded-full">
//                   {totalItems} ชิ้น
//                 </span>
//               </div>

//               {items.map((item) => (
//                 <div key={item.product_id} className="bg-white rounded-2xl p-4 shadow-sm border border-[#D3D1C7] hover:shadow-md transition duration-200">
//                   <div className="flex gap-4 items-start">
//                     <div className="flex-shrink-0">
//                       {item.image_url ? (
//                         <img src={`${API_URL}${item.image_url}`} alt={item.product_name}
//                           className="w-20 h-20 rounded-xl object-cover border border-[#D3D1C7]" />
//                       ) : (
//                         <div className="w-20 h-20 bg-[#F5F3EE] rounded-xl flex items-center justify-center border border-[#D3D1C7]">
//                           <Package size={24} className="text-[#D3D1C7]" />
//                         </div>
//                       )}
//                     </div>

//                     <div className="flex-grow min-w-0">
//                       <div className="flex justify-between items-start">
//                         <div className="flex-1 min-w-0 pr-2">
//                           <h3 className="font-bold text-[#2C2C2A] truncate">{item.product_name}</h3>
//                           <p className="text-xs text-[#888780] mt-0.5 line-clamp-1">{item.description}</p>
//                         </div>
//                         <button onClick={() => removeFromCart(item.product_id)}
//                           className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#FCEBEB] text-[#D3D1C7] hover:text-[#791F1F] transition cursor-pointer">
//                           <Trash2 size={16} />
//                         </button>
//                       </div>

//                       <div className="flex items-center justify-between mt-3">
//                         <div>
//                           <span className="text-[#1A6B5A] font-bold text-lg">฿{item.selling_price}</span>
//                           <span className="text-xs text-[#888780] ml-1">/ ชิ้น</span>
//                         </div>
//                         <div className="flex items-center gap-1 bg-[#F5F3EE] rounded-xl p-1">
//                           <button onClick={() => updateQuantity(item.product_id, Math.max(1, item.quantity - 1))}
//                             disabled={item.quantity === 1}
//                             className="w-7 h-7 flex items-center justify-center rounded-lg bg-[#1A6B5A] hover:bg-[#0D3D30] text-white shadow-sm transition cursor-pointer disabled:opacity-30">
//                             <Minus size={14} />
//                           </button>
//                           <span className="w-8 text-center font-bold text-[#2C2C2A] text-sm">{item.quantity}</span>
//                           <button onClick={() => updateQuantity(item.product_id, Math.min(item.stock, item.quantity + 1))}
//                             disabled={item.quantity === item.stock}
//                             className="w-7 h-7 flex items-center justify-center rounded-lg bg-[#1A6B5A] hover:bg-[#0D3D30] text-white shadow-sm transition cursor-pointer disabled:opacity-30">
//                             <Plus size={14} />
//                           </button>
//                         </div>
//                       </div>

//                       <div className="flex justify-between items-center mt-2 pt-2 border-t border-[#F5F3EE]">
//                         <span className="text-xs text-[#888780]">คงเหลือ {item.stock} ชิ้น</span>
//                         <span className="text-sm font-bold text-[#2C2C2A]">฿{(item.selling_price * item.quantity).toLocaleString()}</span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* สรุปคำสั่งซื้อ */}
//             <div className="lg:col-span-1">
//               <div className="bg-white rounded-2xl shadow-md border border-[#D3D1C7] overflow-hidden sticky top-4">
//                 <div className="bg-gradient-to-r from-[#EF9F27] to-[#BA7517] px-6 py-4">
//                   <h2 className="text-lg font-bold text-white">สรุปคำสั่งซื้อ</h2>
//                   <p className="text-white/70 text-xs mt-0.5">{totalItems} รายการ</p>
//                 </div>

//                 <div className="p-6 space-y-3">
//                   <div className="space-y-2 max-h-48 overflow-y-auto pr-1 [&::-webkit-scrollbar]:hidden">
//                     {items.map(item => (
//                       <div key={item.product_id} className="flex justify-between text-sm text-[#888780]">
//                         <span className="truncate max-w-[140px]">{item.product_name}</span>
//                         <span className="flex-shrink-0 ml-2">x{item.quantity} = ฿{(item.selling_price * item.quantity).toLocaleString()}</span>
//                       </div>
//                     ))}
//                   </div>

//                   <div className="border-t border-[#F5F3EE] pt-3">
//                     <div className="flex justify-between text-sm text-[#888780]">
//                       <span>ค่าจัดส่ง</span>
//                       <span className="text-[#085041] font-medium">ฟรี</span>
//                     </div>
//                   </div>

//                   <div className="bg-[#F5F3EE] rounded-xl p-4 flex justify-between items-center">
//                     <span className="font-bold text-[#2C2C2A]">ยอดสุทธิ</span>
//                     <span className="text-2xl font-black text-[#1A6B5A]">฿{total.toLocaleString()}</span>
//                   </div>

//                   {/* ✅ ปุ่มชำระเงินเปิด popup */}
//                   <button
//                     onClick={() => setIsOpen(true)}
//                     className="w-full bg-[#EF9F27] hover:bg-[#BA7517] text-white font-bold py-4 rounded-xl shadow-md transition cursor-pointer active:scale-[0.98] text-base"
//                   >
//                     ชำระเงิน →
//                   </button>

//                   <p className="text-center text-[11px] text-[#888780]">
//                     ตรวจสอบรายการก่อนกดชำระเงิน
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </main>

//       {/* ✅ Popup ชำระเงินรวม ส่ง items ทั้งหมด */}
//       {items.length > 0 && (
//         <PopCustomersOrder
//           open={isOpen}
//           onClose={() => setIsOpen(false)}
//           product={{
//             product_id: items[0].product_id,
//             product_name: `${items[0].product_name}${items.length > 1 ? ` และอีก ${items.length - 1} รายการ` : ""}`,
//             selling_price: total,
//             image_url: items[0].image_url,
//             stock: 999,
//             description: `รวม ${totalItems} ชิ้น`,
//           }}
//           quantity={1}
//           shop_slug={shop_slug}
//           cartItems={items} 
//         />
//       )}
//     </div>
//   )
// }

// export default BasketPage
"use client"
import { useCart, type CartItem } from "@/app/components/cradcustomer/cartcontext"
import { Trash2, Plus, Minus, ChevronLeft, ShoppingBag, Package } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import PopCustomersOrder from "@/app/components/ui/popup/popcustomers/order"

const BasketPage = () => {
  const pathname = usePathname()
  const shop_slug = pathname.split("/")[2] ?? ""
  const { items, removeFromCart, updateQuantity, totalItems, clearCart } = useCart()
  const API_URL = process.env.NEXT_PUBLIC_API_URL
  const total = items.reduce((sum: number, i: CartItem) => sum + i.selling_price * i.quantity, 0)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (items.length === 0) return
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault()
      e.returnValue = ""
    }
    window.addEventListener("beforeunload", handleBeforeUnload)
    return () => window.removeEventListener("beforeunload", handleBeforeUnload)
  }, [items])

  return (
    <div className="min-h-screen bg-[#F5F3EE] dark:bg-gray-950 font-sans transition-colors duration-200">

      {/* Header */}
      <header className="bg-gradient-to-r from-[#0D3D30] via-[#1A6B5A] to-[#1D9E75] dark:from-gray-900 dark:via-emerald-950 dark:to-emerald-900 text-white shadow-lg">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <span className="text-2xl" aria-hidden="true">🧸</span>
            <div>
              <h1 className="text-xl font-bold leading-none">TinyStore</h1>
              <p className="text-xs text-white/60 mt-0.5">ตะกร้าสินค้า</p>
            </div>
          </div>
          <Link href={`/shop/${shop_slug}`}>
            <button className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 px-4 py-2 rounded-xl text-sm transition cursor-pointer focus:outline-none focus:ring-2 focus:ring-white/40">
              <ChevronLeft size={16} aria-hidden="true" /> กลับไปหน้าร้าน
            </button>
          </Link>
        </div>
      </header>

      {/* แจ้งเตือน */}
      {items.length > 0 && (
        <div className="bg-amber-50 dark:bg-amber-950 border-b-2 border-amber-300 dark:border-amber-700 px-6 py-2"
             role="alert">
          <div className="max-w-6xl mx-auto flex items-center gap-2 text-amber-700 dark:text-amber-300 text-xs">
            <span aria-hidden="true">⚠</span>
            <span>หากรีเฟรชหรือปิดหน้านี้ รายการในตะกร้าจะหายทั้งหมด กรุณาชำระเงินให้เสร็จก่อน</span>
          </div>
        </div>
      )}

      <main className="max-w-6xl mx-auto px-4 py-8 md:px-8">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 gap-4">
            <div className="w-24 h-24 bg-white dark:bg-gray-800 rounded-full shadow-md flex items-center justify-center">
              <ShoppingBag size={40} className="text-gray-300 dark:text-gray-600" aria-hidden="true" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">ตะกร้าว่างเปล่า</h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm">เพิ่มสินค้าที่ต้องการแล้วกลับมาที่นี่</p>
            <Link href={`/shop/${shop_slug}`}>
              <button className="mt-2 px-8 py-3 bg-emerald-700 dark:bg-emerald-800 text-white rounded-xl hover:bg-emerald-900 transition cursor-pointer font-medium shadow-md focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2">
                ไปช้อปเลย →
              </button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* รายการสินค้า */}
            <div className="lg:col-span-2 space-y-3">
              <div className="flex items-center gap-2 mb-4">
                <ShoppingBag size={20} className="text-emerald-700 dark:text-emerald-400" aria-hidden="true" />
                <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">รายการสินค้า</h2>
                <span className="ml-auto bg-emerald-700 dark:bg-emerald-800 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                  {totalItems} ชิ้น
                </span>
              </div>

              {items.map((item) => (
                <div key={item.product_id}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm border-2 border-gray-200 dark:border-gray-700 hover:shadow-md transition duration-200">
                  <div className="flex gap-4 items-start">
                    <div className="flex-shrink-0">
                      {item.image_url ? (
                        <img src={`${API_URL}${item.image_url}`} alt={item.product_name}
                          className="w-20 h-20 rounded-xl object-cover border-2 border-gray-200 dark:border-gray-700" />
                      ) : (
                        <div className="w-20 h-20 bg-[#F5F3EE] dark:bg-gray-700 rounded-xl flex items-center justify-center border-2 border-gray-200 dark:border-gray-700">
                          <Package size={24} className="text-gray-300 dark:text-gray-500" aria-hidden="true" />
                        </div>
                      )}
                    </div>

                    <div className="flex-grow min-w-0">
                      <div className="flex justify-between items-start">
                        <div className="flex-1 min-w-0 pr-2">
                          <h3 className="font-bold text-gray-800 dark:text-gray-100 truncate">{item.product_name}</h3>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-1">{item.description}</p>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.product_id)}
                          aria-label={`ลบ ${item.product_name} ออกจากตะกร้า`}
                          className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950 text-gray-300 dark:text-gray-600 hover:text-rose-700 dark:hover:text-rose-400 transition cursor-pointer focus:outline-none focus:ring-2 focus:ring-rose-400">
                          <Trash2 size={16} aria-hidden="true" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between mt-3">
                        <div>
                          <span className="text-emerald-700 dark:text-emerald-400 font-bold text-lg">฿{item.selling_price}</span>
                          <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">/ ชิ้น</span>
                        </div>
                        <div className="flex items-center gap-1 bg-[#F5F3EE] dark:bg-gray-700 rounded-xl p-1"
                             role="group" aria-label="จำนวนสินค้า">
                          <button
                            onClick={() => updateQuantity(item.product_id, Math.max(1, item.quantity - 1))}
                            disabled={item.quantity === 1}
                            aria-label="ลดจำนวน"
                            className="w-7 h-7 flex items-center justify-center rounded-lg bg-emerald-700 dark:bg-emerald-800 hover:bg-emerald-900 text-white shadow-sm transition cursor-pointer disabled:opacity-30 focus:outline-none focus:ring-2 focus:ring-emerald-400">
                            <Minus size={14} aria-hidden="true" />
                          </button>
                          <span className="w-8 text-center font-bold text-gray-800 dark:text-gray-100 text-sm"
                                aria-label={`จำนวน ${item.quantity} ชิ้น`}>
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.product_id, Math.min(item.stock, item.quantity + 1))}
                            disabled={item.quantity === item.stock}
                            aria-label="เพิ่มจำนวน"
                            className="w-7 h-7 flex items-center justify-center rounded-lg bg-emerald-700 dark:bg-emerald-800 hover:bg-emerald-900 text-white shadow-sm transition cursor-pointer disabled:opacity-30 focus:outline-none focus:ring-2 focus:ring-emerald-400">
                            <Plus size={14} aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      <div className="flex justify-between items-center mt-2 pt-2 border-t-2 border-gray-100 dark:border-gray-700">
                        <span className="text-xs text-gray-500 dark:text-gray-400">คงเหลือ {item.stock} ชิ้น</span>
                        <span className="text-sm font-bold text-gray-800 dark:text-gray-100">฿{(item.selling_price * item.quantity).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* สรุปคำสั่งซื้อ */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md border-2 border-gray-200 dark:border-gray-700 overflow-hidden sticky top-4 transition-colors duration-200">
                <div className="bg-gradient-to-r from-amber-500 to-amber-600 dark:from-amber-700 dark:to-amber-800 px-6 py-4">
                  <h2 className="text-lg font-bold text-white">สรุปคำสั่งซื้อ</h2>
                  <p className="text-white/70 text-xs mt-0.5">{totalItems} รายการ</p>
                </div>

                <div className="p-6 space-y-3">
                  <div className="space-y-2 max-h-48 overflow-y-auto pr-1 [&::-webkit-scrollbar]:hidden">
                    {items.map(item => (
                      <div key={item.product_id} className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                        <span className="truncate max-w-[140px]">{item.product_name}</span>
                        <span className="flex-shrink-0 ml-2">x{item.quantity} = ฿{(item.selling_price * item.quantity).toLocaleString()}</span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t-2 border-gray-100 dark:border-gray-700 pt-3">
                    <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                      <span>ค่าจัดส่ง</span>
                      <span className="text-emerald-700 dark:text-emerald-400 font-medium">ฟรี</span>
                    </div>
                  </div>

                  <div className="bg-[#F5F3EE] dark:bg-gray-700 rounded-xl p-4 flex justify-between items-center">
                    <span className="font-bold text-gray-800 dark:text-gray-100">ยอดสุทธิ</span>
                    <span className="text-2xl font-black text-emerald-700 dark:text-emerald-400">฿{total.toLocaleString()}</span>
                  </div>

                  <button
                    onClick={() => setIsOpen(true)}
                    className="w-full bg-amber-500 dark:bg-amber-600 hover:bg-amber-600 dark:hover:bg-amber-700 text-white font-bold py-4 rounded-xl shadow-md transition cursor-pointer active:scale-[0.98] text-base focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2"
                  >
                    ชำระเงิน →
                  </button>

                  <p className="text-center text-[11px] text-gray-500 dark:text-gray-400">
                    ตรวจสอบรายการก่อนกดชำระเงิน
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {items.length > 0 && (
        <PopCustomersOrder
          open={isOpen}
          onClose={() => setIsOpen(false)}
          product={{
            product_id: items[0].product_id,
            product_name: `${items[0].product_name}${items.length > 1 ? ` และอีก ${items.length - 1} รายการ` : ""}`,
            selling_price: total,
            image_url: items[0].image_url,
            stock: 999,
            description: `รวม ${totalItems} ชิ้น`,
          }}
          quantity={1}
          shop_slug={shop_slug}
          cartItems={items}
        />
      )}
    </div>
  )
}

export default BasketPage