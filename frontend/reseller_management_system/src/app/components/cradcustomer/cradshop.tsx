"use client"
import { Getshop } from "@/app/types/model"
import { useRouter } from "next/navigation"


type Product = Getshop["products"][number]

interface ShopProductCardProps {
  products: Product[]
  shop_slug: string
}

const ShopCard = ({ products, shop_slug }: ShopProductCardProps) => {
  return (
    <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 items-stretch'>
      {products.map((item) => (
        <ProductItem key={item.product_id} item={item} shop_slug={shop_slug} />
      ))}
    </div>
  )
}

function ProductItem({ item, shop_slug }: { item: Product, shop_slug: string }) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL
  const Router = useRouter()
  const handleClick = () => Router.push(`/shop/${shop_slug}`)

  const truncateText = (text: string | null | undefined, maxLength: number) => {
    if (!text) return '-'
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text
  }

  const outOfStock = item.stock === 0

  return (
    <div className='bg-white p-4 border border-[#D3D1C7] rounded-xl shadow-sm hover:shadow-md flex flex-col h-full transition duration-200'>

      {/* รูปสินค้า */}
      <div className="relative w-full h-50 mb-3">
        {item.image_url ? (
          <img
            src={API_URL + item.image_url}
            alt={item.product_name}
            className={`w-full h-full object-cover rounded-lg ${outOfStock ? "opacity-60" : ""}`}
          />
        ) : (
          <div className={`w-full h-full bg-[#F5F3EE] rounded-lg flex items-center justify-center text-[#888780] ${outOfStock ? "opacity-60" : ""}`}>
            ไม่มีรูป
          </div>
        )}

        {/* overlay สินค้าหมด */}
        {outOfStock && (
          <div className="absolute inset-0 bg-[#2C2C2A]/50 rounded-lg flex items-center justify-center">
            <span className="font-bold text-sm px-3 py-1 rounded-full bg-[#FCEBEB] text-[#791F1F] border border-[#F7C1C1]">
              สินค้าหมด
            </span>
          </div>
        )}
      </div>

      {/* ชื่อสินค้า */}
      <p className="text-sm font-medium line-clamp-2 text-[#2C2C2A]" title={item.product_name}>
        {truncateText(item.product_name ?? "-", 30)}
      </p>

      {/* คำอธิบาย */}
      <p className="text-[#888780] text-sm" title={item.description}>
        {truncateText(item.description ?? "-", 60)}
      </p>

      {/* ราคา + stock */}
      <div className="flex justify-between items-center mt-2">
        <span className="text-[#1A6B5A] font-semibold text-lg">฿{item.selling_price}</span>
        <span className={`text-xs ${outOfStock ? "text-[#791F1F]" : "text-[#888780]"}`}>
          {outOfStock ? "หมด" : `เหลือ ${item.stock}`}
        </span>
      </div>

      {/* ปุ่มซื้อ */}
      <div className="flex gap-2 mt-3">
        <button
          onClick={handleClick}
          className="flex-1 bg-[#EF9F27] text-white rounded-lg py-2 text-sm hover:bg-[#BA7517] cursor-pointer transition"
        >
          ไปยังร้านค้า
        </button>
      </div>
    </div>
  )
}

export default ShopCard