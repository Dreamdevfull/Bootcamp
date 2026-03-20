// components/ui/ShopProductCard.tsx
"use client"
import { useState } from "react"
import { Getshop } from "@/app/types/model"

type Product = Getshop["products"][number]  // ดึง type product จาก Getshop

interface ShopProductCardProps {
  products: Product[]
}

const ShopProductCard = ({ products }: ShopProductCardProps) => {

  return (
    <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5'>
      {products.map((item) => (
        <ProductItem key={item.product_id} item={item} />
      ))}
    </div>
  )
}

// แยก component ย่อยเพื่อให้จัดการ state count แยกกันแต่ละสินค้า
function ProductItem({ item }: { item: Product }) {
  const [count, setCount] = useState(1)
  const API_URL = process.env.NEXT_PUBLIC_API_URL
  
  const truncateText = (text: string | null | undefined, maxLength: number) => {
    if (!text) return '-'; 
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
  };
  return (
    <div className='bg-white p-4 border border-gray-200 rounded-xl shadow-sm hover:shadow-md flex flex-col transition'>
      {item.image_url ? (
        <img src={API_URL + item.image_url} alt={item.product_name} className="w-full h-50 object-cover rounded-lg mb-3" />
      ) : (
        <div className="w-full h-50 bg-gray-200 rounded-lg mb-3 flex items-center justify-center text-gray-400">
          ไม่มีรูป
        </div>
      )}

      <p className="text-sm font-medium line-clamp-2" title={item.product_name}>{truncateText(item.product_name ?? "-", 30)}</p>
      <p className="text-[#888780] text-sm" title={item.description}>{truncateText(item.description ?? "-", 60)}</p>

      <div className="flex justify-between items-center mt-2">
        <span className="text-[#1a6b5a] font-semibold text-lg">฿{item.selling_price}</span>
        <span className="text-xs text-gray-500">เหลือ {item.stock}</span>
      </div>

      {/* ปุ่ม + - */}
      <div className='flex items-center justify-between mt-auto bg-[#f5f3ee] px-3 py-1 rounded-md'>
        <button
          className="bg-[#1a6b5a]/40 hover:bg-[#1a6b5a] text-white rounded w-7 h-7 transition disabled:opacity-40"
          onClick={() => setCount(c => Math.max(0, c - 1))}
          disabled={count === 1}
        >-</button>
        <span className='text-[#085041] font-medium'>{count}</span>
        <button
          className="bg-[#1a6b5a] hover:bg-[#1a6b5a]/40 text-white rounded w-7 h-7 transition disabled:opacity-40"
          onClick={() => setCount(c => Math.min(item.stock, c + 1))}
          disabled={count === item.stock} 
        >+</button>
      </div>

      <div className="flex gap-2 mt-3">
        <button className="flex-1 bg-[#e1f5ee] border border-[#1d9e75] text-[#085041] rounded-lg py-2 text-sm hover:bg-[#9FE1CB] cursor-pointer">
          🛒 เพิ่มลงตะกร้า
        </button>
        <button className="flex-1 bg-[#EF9F27] text-white rounded-lg py-2 text-sm hover:bg-[#BA7517] cursor-pointer">
          ซื้อสินค้า
        </button>
      </div>
    </div>
  )
}

export default ShopProductCard