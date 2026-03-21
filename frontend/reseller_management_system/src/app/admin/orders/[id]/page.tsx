// "use client"
// import { useEffect, useState } from 'react'
// import { useParams } from 'next/navigation'
// import HeaderAdmin from '@/app/components/layout/headeradmin'
// import Link from 'next/link'
// import { OrderReseller as OrderType } from '@/app/types/model'

// const OrdersPage = () => {
//   const { id } = useParams()
//   const [order, setOrder] = useState<OrderType>()
//   const [loading, setLoading] = useState(true)
//   const API_URL = process.env.NEXT_PUBLIC_API_URL

//   useEffect(() => {
//     const fetchOrderDetail = async () => {
//       try {
//         const res = await fetch(`${API_URL}/admin/orders/${id}`, {
//           method: "GET",
//           credentials: "include",
//         })
//         const result = await res.json()
//         if (res.ok) setOrder(result.data)
//       } catch (err) {
//         console.error("Fetch error:", err)
//       } finally {
//         setLoading(false)
//       }
//     }
//     if (id) fetchOrderDetail()
//   }, [id, API_URL])

//   const STEPS = ["รอดำเนินการ", "กำลังจัดส่ง", "จัดส่งเสร็จสมบูรณ์"];
//   const currentStep = STEPS.indexOf(order?.status ?? "");

//   if (loading) return (
//     <div className="text-center py-20 font-bold text-emerald-700 dark:text-emerald-400"
//          aria-live="polite">
//       กำลังโหลดข้อมูลออเดอร์...
//     </div>
//   )
//   if (!order) return (
//     <div className="text-center py-20 text-gray-500 dark:text-gray-400"
//          aria-live="polite">
//       ไม่พบข้อมูลคำสั่งซื้อ (ID: {id})
//     </div>
//   )

//   return (
//     <div className="min-h-screen bg-[#F5F3EE] dark:bg-[#1a1a18] transition-colors duration-200">
//       <HeaderAdmin />

//       {/* Progress Section */}
//       <section className="bg-white dark:bg-gray-800 rounded-sm p-8 mt-3 mx-10 shadow-sm border-2 border-gray-200 dark:border-gray-700 flex flex-col">
//         <div className="mb-6">
//           <Link href="/resellers/orders">
//             <button className="bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200
//                                border-2 border-gray-200 dark:border-gray-600
//                                px-3 py-1 rounded
//                                hover:bg-emerald-50 dark:hover:bg-emerald-950
//                                transition cursor-pointer
//                                focus:outline-none focus:ring-2 focus:ring-emerald-400">
//               ← กลับ
//             </button>
//           </Link>
//         </div>

//         <div className="flex items-center justify-between relative">
//           {/* เส้น background */}
//           <div className="absolute top-center left-5 right-2 h-4 bg-gray-200 dark:bg-gray-700 z-0" />
//           {/* เส้น progress */}
//           <div
//             className="absolute top-center left-8 h-4 bg-emerald-700 dark:bg-emerald-500 z-0 transition-all"
//             style={{ width: `${(currentStep / (STEPS.length - 1)) * 90}%` }}
//           />
//           {STEPS.map((step, idx) => (
//             <div key={step} className="flex flex-col items-center gap-2 z-10">
//               <div className={`w-35 h-35 rounded-full flex items-center justify-center border-2 transition ${
//                 idx < currentStep
//                   ? "bg-emerald-700 dark:bg-emerald-800 border-emerald-700 dark:border-emerald-600 text-white"
//                   : idx === currentStep
//                   ? "bg-emerald-600 dark:bg-emerald-700 border-emerald-600 dark:border-emerald-500 text-white ring-4 ring-emerald-200 dark:ring-emerald-800"
//                   : "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400"
//               }`}>
//                 <span className='text-[90px]' aria-hidden="true">{idx === 0 && "📦"}</span>
//                 <span className='text-[90px]' aria-hidden="true">{idx === 1 && "🚚"}</span>
//                 <span className='text-[90px]' aria-hidden="true">{idx === 2 && "✓"}</span>
//               </div>
//               <p className={`text-xs font-medium ${
//                 idx < currentStep
//                   ? "text-emerald-700 dark:text-emerald-400"
//                   : idx === currentStep
//                   ? "text-emerald-600 dark:text-emerald-300 font-bold"
//                   : "text-gray-500 dark:text-gray-400"
//               }`}>
//                 {step}
//               </p>
//             </div>
//           ))}
//         </div>

//         {/* Legend */}
//         <div className="flex gap-4 mt-6 text-xs text-gray-500 dark:text-gray-400">
//           <div className="flex items-center gap-1">
//             <span className="w-2 h-2 rounded-full bg-emerald-700 dark:bg-emerald-500 inline-block" aria-hidden="true" /> ดำเนินแล้ว
//           </div>
//           <div className="flex items-center gap-1">
//             <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400 inline-block ring-2 ring-emerald-200 dark:ring-emerald-700" aria-hidden="true" /> สถานะปัจจุบัน
//           </div>
//           <div className="flex items-center gap-1">
//             <span className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-600 inline-block" aria-hidden="true" /> รอดำเนินการ
//           </div>
//         </div>

//         {/* Info Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full mt-5">
//           <div className="bg-[#f5f3ee] dark:bg-gray-700 p-6 rounded-lg shadow-sm border-2 border-gray-200 dark:border-gray-600">
//             <div className="text-gray-500 dark:text-gray-400 mb-2 text-sm">หมายเลขคำสั่งซื้อ</div>
//             <h2 className="font-bold text-lg text-gray-800 dark:text-gray-100">{order.order_number}</h2>
//           </div>
//           <div className="bg-[#f5f3ee] dark:bg-gray-700 p-6 rounded-lg shadow-sm border-2 border-gray-200 dark:border-gray-600">
//             <div className="text-gray-500 dark:text-gray-400 mb-2 text-sm">วันที่ทำรายการ</div>
//             <h2 className="font-bold text-lg text-gray-800 dark:text-gray-100">{order.created_at}</h2>
//           </div>
//           <div className="bg-[#f5f3ee] dark:bg-gray-700 p-6 rounded-lg shadow-sm border-2 border-gray-200 dark:border-gray-600">
//             <div className="text-gray-500 dark:text-gray-400 mb-2 text-sm">สถานะการสั่งซื้อ</div>
//             <h2 className={`font-bold text-lg ${
//               order.status === 'จัดส่งเสร็จสมบูรณ์'
//                 ? 'text-emerald-700 dark:text-emerald-400'
//                 : 'text-amber-500 dark:text-amber-400'
//             }`}>
//               {order.status}
//             </h2>
//           </div>
//         </div>
//       </section>

//       {/* Order Items Section */}
//       <section className="bg-white dark:bg-gray-800 rounded-sm mt-3 mx-10 mb-10 shadow-sm border-2 border-gray-200 dark:border-gray-700 overflow-hidden transition-colors duration-200">
//         <div className="border-b-2 border-gray-200 dark:border-gray-700 px-8 py-5 font-bold text-gray-800 dark:text-gray-100 bg-gray-50 dark:bg-gray-900">
//           รายการสินค้า
//         </div>

//         {order.items?.map((item: any, index: number) => (
//           <div key={index} className="flex items-center gap-4 p-8 border-b-2 border-gray-100 dark:border-gray-700 last:border-b-0">
//             <img
//               src={item.image_url ? `${API_URL}${item.image_url}` : "/no-image.png"}
//               className="w-20 h-20 rounded-lg object-cover border-2 border-gray-200 dark:border-gray-700"
//               alt={item.product_name}
//             />
//             <div className="flex-1">
//               <p className="font-bold text-gray-800 dark:text-gray-100">{item.product_name}</p>
//               <p className="text-gray-400 dark:text-gray-500 text-sm">จำนวน x{item.quantity}</p>
//               <p className="text-xs text-gray-400 dark:text-gray-500">ราคาขายต่อชิ้น: ฿{(item.price || 0).toLocaleString()}</p>
//             </div>
//             <p className="text-lg font-bold text-emerald-700 dark:text-emerald-400">
//               ฿{(item.price * item.quantity).toLocaleString()}
//             </p>
//           </div>
//         ))}

//         <div className="bg-[#F5F3EE] dark:bg-gray-700 p-6 space-y-3">
//           <div className="flex justify-between items-center text-gray-500 dark:text-gray-400">
//             <p>ราคารวมทั้งหมด</p>
//             <p className="text-xl font-bold text-gray-800 dark:text-gray-100">
//               ฿{(order.total_amount || 0).toLocaleString()}
//             </p>
//           </div>
//           <div className="flex justify-between items-center text-emerald-700 dark:text-emerald-400 pt-2 border-t-2 border-gray-200 dark:border-gray-600">
//             <p className="font-medium">กำไรสุทธิที่คุณได้รับ</p>
//             <p className="text-xl font-bold">฿{(order.my_profit || 0).toLocaleString()}</p>
//           </div>
//         </div>

//         <div className="p-8 border-t-2 border-gray-100 dark:border-gray-700">
//           <div className="font-bold text-gray-800 dark:text-gray-100 mb-4">ที่อยู่ในการจัดส่ง</div>
//           <div className="flex flex-col gap-1">
//             <div className="flex gap-4 text-gray-800 dark:text-gray-100 font-medium">
//               <p>{order.customer_name}</p>
//               <p>{order.customer_phone}</p>
//             </div>
//             <p className="text-gray-500 dark:text-gray-400 leading-relaxed mt-2">
//               {order.shipping_address}
//             </p>
//           </div>
//         </div>
//       </section>
//     </div>
//   )
// }

// export default OrdersPage
"use client"
import { useEffect, useRef, useState } from 'react'
import { useParams } from 'next/navigation'
import HeaderAdmin from '@/app/components/layout/headeradmin'
import Link from 'next/link'
import { OrderReseller as OrderType } from '@/app/types/model'

const STEPS = ["รอดำเนินการ", "กำลังจัดส่ง", "จัดส่งเสร็จสมบูรณ์"]

const OrdersPage = () => {
  const { id } = useParams()
  const [order, setOrder] = useState<OrderType>()
  const [loading, setLoading] = useState(true)
  const API_URL = process.env.NEXT_PUBLIC_API_URL

  const stepRefs = useRef<(HTMLDivElement | null)[]>([])
  const containerRef = useRef<HTMLDivElement>(null)
  const [trackStyle, setTrackStyle] = useState({ left: 0, width: 0 })
  const [fillWidth, setFillWidth] = useState(0)

  const currentStep = STEPS.indexOf(order?.status ?? "")

  useEffect(() => {
    const fetchOrderDetail = async () => {
      try {
        const res = await fetch(`${API_URL}/admin/orders/${id}`, {
          method: "GET",
          credentials: "include",
        })
        const result = await res.json()
        if (res.ok) setOrder(result.data)
      } catch (err) {
        console.error("Fetch error:", err)
      } finally {
        setLoading(false)
      }
    }
    if (id) fetchOrderDetail()
  }, [id, API_URL])

  useEffect(() => {
    const updateTrack = () => {
      const first = stepRefs.current[0]
      const last = stepRefs.current[STEPS.length - 1]
      const curr = stepRefs.current[currentStep]
      const container = containerRef.current
      if (!first || !last || !curr || !container) return

      const containerLeft = container.getBoundingClientRect().left
      const firstCenter = first.getBoundingClientRect().left + first.offsetWidth / 2 - containerLeft
      const lastCenter = last.getBoundingClientRect().left + last.offsetWidth / 2 - containerLeft
      const currCenter = curr.getBoundingClientRect().left + curr.offsetWidth / 2 - containerLeft

      setTrackStyle({ left: firstCenter, width: lastCenter - firstCenter })
      setFillWidth(currCenter - firstCenter)
    }

    updateTrack()
    window.addEventListener("resize", updateTrack)
    return () => window.removeEventListener("resize", updateTrack)
  }, [currentStep, order])

  if (loading) return (
    <div className="text-center py-20 font-bold text-emerald-700 dark:text-emerald-400" aria-live="polite">
      กำลังโหลดข้อมูลออเดอร์...
    </div>
  )

  if (!order) return (
    <div className="text-center py-20 text-gray-500 dark:text-gray-400" aria-live="polite">
      ไม่พบข้อมูลคำสั่งซื้อ (ID: {id})
    </div>
  )

  return (
    <div className="min-h-screen bg-[#F5F3EE] dark:bg-[#1a1a18] transition-colors duration-200">
      <HeaderAdmin />

      {/* Progress Section */}
      <section className="bg-white dark:bg-gray-800 rounded-sm p-4 sm:p-8 mt-3 mx-2 sm:mx-6 lg:mx-10 shadow-sm border-2 border-gray-200 dark:border-gray-700 flex flex-col">
        <div className="mb-6">
          <Link href="/resellers/orders">
            <button className="bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200
                               border-2 border-gray-200 dark:border-gray-600
                               px-3 py-1 rounded
                               hover:bg-emerald-50 dark:hover:bg-emerald-950
                               transition cursor-pointer
                               focus:outline-none focus:ring-2 focus:ring-emerald-400">
              ← กลับ
            </button>
          </Link>
        </div>

        {/* Stepper */}
        <div ref={containerRef} className="relative flex items-start justify-between px-2 sm:px-4 pt-6 pb-2">
          {/* เส้น background */}
          <div
            className="absolute top-[2rem] sm:top-[2.5rem] md:top-[2.75rem] h-[3px] sm:h-1 md:h-[5px] rounded-full bg-gray-200 dark:bg-gray-700"
            style={{ left: trackStyle.left, width: trackStyle.width }}
          />
          {/* เส้น progress */}
          <div
            className="absolute top-[2rem] sm:top-[2.5rem] md:top-[2.75rem] h-[3px] sm:h-1 md:h-[5px] rounded-full bg-emerald-600 dark:bg-emerald-500 transition-all duration-500"
            style={{ left: trackStyle.left, width: fillWidth }}
          />

          {STEPS.map((step, idx) => (
            <div key={step} className="relative z-10 flex flex-1 flex-col items-center gap-1 sm:gap-2">
              <div
                ref={(el) => { stepRefs.current[idx] = el }}
                className={`
                  flex h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12
                  flex-shrink-0 items-center justify-center rounded-full border-2
                  text-base sm:text-xl md:text-2xl transition-all
                  ${idx < currentStep
                    ? "border-emerald-700 bg-emerald-700 text-white dark:border-emerald-600 dark:bg-emerald-800"
                    : idx === currentStep
                      ? "border-emerald-500 bg-emerald-600 text-white ring-2 sm:ring-4 ring-emerald-200 dark:border-emerald-500 dark:bg-emerald-700 dark:ring-emerald-800"
                      : "border-gray-300 bg-white text-gray-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400"
                  }
                `}
              >
                <span aria-hidden="true">
                  {idx === 0 && "📦"}
                  {idx === 1 && "🚚"}
                  {idx === 2 && "✓"}
                </span>
              </div>
              <p className={`
                text-center text-[0.6rem] sm:text-xs font-medium leading-tight
                max-w-[4rem] sm:max-w-[6rem] md:max-w-[7rem]
                ${idx < currentStep
                  ? "text-emerald-700 dark:text-emerald-400"
                  : idx === currentStep
                    ? "font-bold text-emerald-600 dark:text-emerald-300"
                    : "text-gray-500 dark:text-gray-400"
                }
              `}>
                {step}
              </p>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mt-6 text-xs text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-700 dark:bg-emerald-500 inline-block" aria-hidden="true" /> ดำเนินแล้ว
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400 inline-block ring-2 ring-emerald-200 dark:ring-emerald-700" aria-hidden="true" /> สถานะปัจจุบัน
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-600 inline-block" aria-hidden="true" /> รอดำเนินการ
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full mt-5">
          <div className="bg-[#f5f3ee] dark:bg-gray-700 p-4 sm:p-6 rounded-lg shadow-sm border-2 border-gray-200 dark:border-gray-600">
            <div className="text-gray-500 dark:text-gray-400 mb-2 text-sm">หมายเลขคำสั่งซื้อ</div>
            <h2 className="font-bold text-base sm:text-lg text-gray-800 dark:text-gray-100">{order.order_number}</h2>
          </div>
          <div className="bg-[#f5f3ee] dark:bg-gray-700 p-4 sm:p-6 rounded-lg shadow-sm border-2 border-gray-200 dark:border-gray-600">
            <div className="text-gray-500 dark:text-gray-400 mb-2 text-sm">วันที่ทำรายการ</div>
            <h2 className="font-bold text-base sm:text-lg text-gray-800 dark:text-gray-100">{order.created_at}</h2>
          </div>
          <div className="bg-[#f5f3ee] dark:bg-gray-700 p-4 sm:p-6 rounded-lg shadow-sm border-2 border-gray-200 dark:border-gray-600 sm:col-span-2 md:col-span-1">
            <div className="text-gray-500 dark:text-gray-400 mb-2 text-sm">สถานะการสั่งซื้อ</div>
            <h2 className={`font-bold text-base sm:text-lg ${
              order.status === 'จัดส่งเสร็จสมบูรณ์'
                ? 'text-emerald-700 dark:text-emerald-400'
                : 'text-amber-500 dark:text-amber-400'
            }`}>
              {order.status}
            </h2>
          </div>
        </div>
      </section>

      {/* Order Items Section */}
      <section className="bg-white dark:bg-gray-800 rounded-sm mt-3 mx-2 sm:mx-6 lg:mx-10 mb-10 shadow-sm border-2 border-gray-200 dark:border-gray-700 overflow-hidden transition-colors duration-200">
        <div className="border-b-2 border-gray-200 dark:border-gray-700 px-4 sm:px-8 py-5 font-bold text-gray-800 dark:text-gray-100 bg-gray-50 dark:bg-gray-900">
          รายการสินค้า
        </div>

        {order.items?.map((item: any, index: number) => (
          <div key={index} className="flex items-center gap-3 sm:gap-4 p-4 sm:p-8 border-b-2 border-gray-100 dark:border-gray-700 last:border-b-0">
            <img
              src={item.image_url ? `${API_URL}${item.image_url}` : "/no-image.png"}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg object-cover border-2 border-gray-200 dark:border-gray-700 flex-shrink-0"
              alt={item.product_name}
            />
            <div className="flex-1 min-w-0">
              <p className="font-bold text-gray-800 dark:text-gray-100 truncate">{item.product_name}</p>
              <p className="text-gray-400 dark:text-gray-500 text-sm">จำนวน x{item.quantity}</p>
              <p className="text-xs text-gray-400 dark:text-gray-500">ราคาขายต่อชิ้น: ฿{(item.price || 0).toLocaleString()}</p>
            </div>
            <p className="text-base sm:text-lg font-bold text-emerald-700 dark:text-emerald-400 flex-shrink-0">
              ฿{(item.price * item.quantity).toLocaleString()}
            </p>
          </div>
        ))}

        <div className="bg-[#F5F3EE] dark:bg-gray-700 p-4 sm:p-6 space-y-3">
          <div className="flex justify-between items-center text-gray-500 dark:text-gray-400">
            <p>ราคารวมทั้งหมด</p>
            <p className="text-lg sm:text-xl font-bold text-gray-800 dark:text-gray-100">
              ฿{(order.total_amount || 0).toLocaleString()}
            </p>
          </div>
          <div className="flex justify-between items-center text-emerald-700 dark:text-emerald-400 pt-2 border-t-2 border-gray-200 dark:border-gray-600">
            <p className="font-medium">กำไรสุทธิที่คุณได้รับ</p>
            <p className="text-lg sm:text-xl font-bold">฿{(order.my_profit || 0).toLocaleString()}</p>
          </div>
        </div>

        <div className="p-4 sm:p-8 border-t-2 border-gray-100 dark:border-gray-700">
          <div className="font-bold text-gray-800 dark:text-gray-100 mb-4">ที่อยู่ในการจัดส่ง</div>
          <div className="flex flex-col gap-1">
            <div className="flex flex-wrap gap-2 sm:gap-4 text-gray-800 dark:text-gray-100 font-medium">
              <p>{order.customer_name}</p>
              <p>{order.customer_phone}</p>
            </div>
            <p className="text-gray-500 dark:text-gray-400 leading-relaxed mt-2">
              {order.shipping_address}
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default OrdersPage