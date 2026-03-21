"use client"
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import HeaderReseller from '@/app/components/layout/headerReseller'
import Link from 'next/link'
import { OrderReseller as OrderType } from '@/app/types/model'

const TrackOrdersPage = () => {
  const { id } = useParams()
  const [order, setOrder] = useState<any | null>(null) // ใช้ any ชั่วคราวเพื่อเช็คค่า
  const [loading, setLoading] = useState(true)
  const API_URL = process.env.NEXT_PUBLIC_API_URL

  useEffect(() => {
    const fetchOrderDetail = async () => {
      try {
        const res = await fetch(`${API_URL}/reseller/orders/${id}`, {
          credentials: "include",
        })
        const result = await res.json()
        if (res.ok) {
          console.log("Data from Backend:", result.data); // 🚩 มึงเปิด F12 ดูตรงนี้!
          setOrder(result.data) 
        }
      } catch (err) {
        console.error("Fetch error:", err)
      } finally {
        setLoading(false)
      }
    }
    if (id) fetchOrderDetail()
  }, [id, API_URL])

  if (loading) return <div className="text-center py-20 font-bold text-[#1a6b5a]">กำลังโหลดข้อมูลออเดอร์...</div>
  if (!order) return <div className="text-center py-20 text-[#888780]">ไม่พบข้อมูลคำสั่งซื้อ (ID: {id})</div>

  return (
    <div className="min-h-screen bg-[#F5F3EE]">
      <HeaderReseller />
      
      <section className='bg-white rounded-sm p-8 mt-3 mx-10 shadow-sm border border-[#d3d1c7] flex flex-col'>
        <div className="mb-6">
          <Link href="/resellers/orders">
            <button className="bg-white text-[#2C2C2A] border border-[#D3D1C7] px-3 py-1 rounded hover:bg-[#E1F5EE] transition cursor-pointer">
              ← กลับ
            </button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
          <div className="bg-[#f5f3ee] p-6 rounded-lg shadow-sm border border-gray-200">
            <div className='text-[#888780] mb-2 text-sm'>หมายเลขคำสั่งซื้อ</div>
            <h1 className="font-bold text-lg">{order.order_number}</h1>
          </div>
          <div className="bg-[#f5f3ee] p-6 rounded-lg shadow-sm border border-gray-200">
            <div className='text-[#888780] mb-2 text-sm'>วันที่ทำรายการ</div>
            <h1 className="font-bold text-lg">{order.created_at}</h1>
          </div>
          <div className="bg-[#f5f3ee] p-6 rounded-lg shadow-sm border border-gray-200">
            <div className='text-[#888780] mb-2 text-sm'>สถานะการสั่งซื้อ</div>
            <h1 className={`font-bold text-lg ${order.status === 'จัดส่งเสร็จสมบูรณ์' ? 'text-[#1a6b5a]' : 'text-[#EF9F27]'}`}>
              {order.status}
            </h1>
          </div>
        </div>
      </section>

      <section className='bg-white rounded-sm mt-3 mx-10 mb-10 shadow-sm border border-[#d3d1c7] overflow-hidden'>
        <div className='border-b px-8 py-5 font-bold text-[#2C2C2A] bg-gray-50'>รายการสินค้า</div>
        
        {/* 🚩 เปลี่ยนจาก order.items เป็น order.items (ตาม json tag ใน Go) */}
        {order.items?.map((item: any, index: number) => (
          <div key={index} className="flex items-center gap-4 p-8 border-b last:border-b-0">
            <img 
              // 🚩 เช็คตัวสะกด image_url ให้ตรงกับ JSON
              src={item.image_url ? `${API_URL}${item.image_url}` : "/no-image.png"} 
              className="w-20 h-20 rounded-lg object-cover border" 
              alt={item.product_name}
            />
            <div className="flex-1">
              <p className="font-bold text-[#2C2C2A]">{item.product_name}</p>
              <p className="text-gray-400 text-sm">จำนวน x{item.quantity}</p>
              {/* 🚩 ใช้ item.price ให้ตรงกับ DTO */}
              <p className="text-xs text-gray-400">ราคาขายต่อชิ้น: ฿{(item.price || 0).toLocaleString()}</p>
            </div>
            
            <p className="text-lg font-bold text-[#1a6b5a]">฿{(item.price * item.quantity).toLocaleString()}</p>
          </div>
        ))}

        <div className='bg-[#F5F3EE] p-6 space-y-3'>
          <div className="flex justify-between items-center text-[#888780]">
            <p>ราคารวมทั้งหมด</p>
            <p className='text-xl font-bold text-black'>฿{(order.total_amount || 0).toLocaleString()}</p>
          </div>
          <div className="flex justify-between items-center text-[#1a6b5a] pt-2 border-t border-gray-200">
            <p className="font-medium">กำไรสุทธิที่คุณได้รับ</p>
            <p className='text-xl font-bold'>฿{(order.my_profit || 0).toLocaleString()}</p>
          </div>
        </div>

        <div className="p-8 border-t border-gray-100">
          <div className='font-bold text-[#2C2C2A] mb-4'>ที่อยู่ในการจัดส่ง</div>
          <div className="flex flex-col gap-1">
            <div className="flex gap-4 text-[#2C2C2A] font-medium">
              <p>{order.customer_name}</p>
              <p>{order.customer_phone}</p>
            </div>
            <p className='text-[#888780] leading-relaxed mt-2'>
              {order.shipping_address}
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default TrackOrdersPage