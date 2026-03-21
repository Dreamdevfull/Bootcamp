"use client"
import { useState } from "react"
import { Getshop } from "@/app/types/model"
import PopCustomersOrder from "@/app/components/ui/popup/popcustomers/order"
import React from "react"
import { useCart } from "@/app/components/cradcustomer/cartcontext"


type Product = Getshop["products"][number]

interface ShopProductCardProps {
  products: Product[]
  shop_slug: string
}

const ShopProductCard = ({ products, shop_slug }: ShopProductCardProps) => {
  return (
    <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 items-stretch'>
      {products.map((item) => (
        <ProductItem key={item.product_id} item={item} shop_slug={shop_slug} />
      ))}
    </div>
  )
}

function ProductItem({ item, shop_slug }: { item: Product, shop_slug: string }) {
  const [count, setCount] = useState(1)
  const API_URL = process.env.NEXT_PUBLIC_API_URL
  const [isOpen, setIsOpen] = useState(false)
  const handleClose = () => setIsOpen(false)
  const { addToCart } = useCart()

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

      {/* ปุ่ม + - */}
      <div className={`flex items-center justify-between mt-auto bg-[#F5F3EE] px-3 py-1 rounded-md ${outOfStock ? "opacity-40" : ""}`}>
        <button
          className="w-7 h-7 flex items-center justify-center rounded bg-[#1A6B5A] hover:bg-[#0D3D30] text-white shadow-sm transition cursor-pointer disabled:opacity-30"
          onClick={() => setCount(c => Math.max(1, c - 1))}
          disabled={count === 1 || outOfStock}
        >-</button>
        <span className='text-[#085041] font-medium'>{count}</span>
        <button
          className="bg-[#1A6B5A] hover:bg-[#1A6B5A]/70 text-white rounded w-7 h-7 transition disabled:opacity-40"
          onClick={() => setCount(c => Math.min(item.stock, c + 1))}
          disabled={count === item.stock || outOfStock}
        >+</button>
      </div>

      {/* ปุ่มซื้อ */}
      <div className="flex gap-2 mt-3">
        {outOfStock ? (
          <div className="flex-1 bg-[#FCEBEB] border border-[#F7C1C1] text-[#791F1F] rounded-lg py-2 text-sm text-center font-medium">
            สินค้าหมด
          </div>
        ) : (
          <>
            <button
              onClick={() => addToCart({
                product_id: item.product_id,
                product_name: item.product_name,
                selling_price: item.selling_price,
                image_url: item.image_url,
                stock: item.stock,
                description: item.description,
              }, count)}
              className="flex-1 bg-[#E1F5EE] border border-[#9FE1CB] text-[#085041] rounded-lg py-2 text-sm hover:bg-[#9FE1CB] cursor-pointer transition"
            >
              🛒 เพิ่มลงตะกร้า
            </button>
            <button
              onClick={() => setIsOpen(true)}
              className="flex-1 bg-[#EF9F27] text-white rounded-lg py-2 text-sm hover:bg-[#BA7517] cursor-pointer transition"
            >
              ซื้อสินค้า
            </button>
          </>
        )}
      </div>

      {!outOfStock && (
        <PopCustomersOrder
          key={isOpen ? count : "closed"}
          open={isOpen}
          onClose={handleClose}
          product={{
            product_id: item.product_id,
            product_name: item.product_name,
            selling_price: item.selling_price,
            image_url: item.image_url,
            stock: item.stock,
            description: item.description
          }}
          quantity={count}
          shop_slug={shop_slug}
        />
      )}
    </div>
  )
}

export default ShopProductCard