"use client"
import { Shop } from "@/app/types/model"  // ✅ use Shop type
import { useRouter } from "next/navigation"

interface ShopCardProps {
  shops: Shop[]  // ✅ Shop[], not User[]
}

const ShopCard = ({ shops }: ShopCardProps) => {  // ✅ removed shop_slug prop
  return (
    <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 items-stretch'>
      {shops.map((item) => (
        <ShopItem key={item.id} item={item} />  // ✅ each shop has its own slug
      ))}
    </div>
  )
}

function ShopItem({ item }: { item: Shop }) {
  const Router = useRouter()
  const handleClick = () => Router.push(`/shop/${item.shop_slug}`)  // ✅ use item's own slug

  const truncateText = (text: string | null | undefined, maxLength: number) => {
    if (!text) return '-'
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text
  }

  return (
    <div className='bg-white p-4 border border-[#D3D1C7] rounded-xl shadow-sm hover:shadow-md flex flex-col h-full transition duration-200'>

      {/* Shop avatar / placeholder */}
      <div className="relative w-full h-50 mb-3">
        <div className="w-full h-full bg-[#F5F3EE] rounded-lg flex items-center justify-center text-[#888780] text-2xl font-bold">
          {item.shop_name.charAt(0).toUpperCase()}  {/* ✅ show first letter as avatar */}
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