"use client"
import { Shop } from "@/app/types/model"
import { useRouter } from "next/navigation"
import { Store } from "lucide-react"  // ✅ import store icon
import Image from "next/image";

interface ShopCardProps {
  shops: Shop[]
}

const ShopCard = ({ shops }: ShopCardProps) => {
  return (
    <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 items-stretch'>
      {shops.map((item) => (
        <ShopItem key={item.id} item={item} />
      ))}
    </div>
  )
}

function ShopItem({ item }: { item: Shop }) {
  const Router = useRouter()
  const handleClick = () => Router.push(`/shop/${item.shop_slug}`)

  const truncateText = (text: string | null | undefined, maxLength: number) => {
    if (!text) return '-'
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text
  }

  return (
    <div className='bg-white p-4 border border-[#D3D1C7] rounded-xl shadow-sm hover:shadow-md flex flex-col h-full transition duration-200'>

      {/* Shop icon */}
      <div className="relative w-full h-50 mb-3">
        <div className="w-full h-full bg-[#F5F3EE] rounded-lg flex items-center justify-center">
          <Image 
            src="/shop.jpg" 
            alt="TinyStore Logo"
            className="rounded-lg"
            width={160} 
            height={160} 
          />
          {/* <Store size={48} className="text-[#1A6B5A]" />  ✅ store icon */}
        </div>
      </div>

      {/* ชื่อร้านค้า */}
      <p className="text-sm font-medium line-clamp-2 text-[#2C2C2A]" title={item.shop_name}>
        {truncateText(item.shop_name, 30)}
      </p>

      {/* ชื่อเจ้าของร้าน */}
      <p className="text-[#888780] text-sm">
        {truncateText(item.user?.name ?? "-", 40)}
      </p>

      {/* slug */}
      <p className="text-xs text-[#aaa] mt-1">
        @{item.shop_slug}
      </p>

      {/* ปุ่มไปยังร้านค้า */}
      <div className="flex gap-2 mt-auto pt-3">
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