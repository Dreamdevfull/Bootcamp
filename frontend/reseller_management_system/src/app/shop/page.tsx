"use client"
import React, { useEffect, useState } from 'react'
import Header from '@/app/components/layout/header'
import Image from "next/image"
import Link from 'next/link'
import { FilterSearchAndDropdown } from '../components/ui/search/filter'
import { PaginationCrad } from '../components/ui/paginationcrad'
import CradShop from "@/app/components/cradcustomer/cradshop"
import { Shop } from '../types/model'  // ✅ use Shop, not User
import { useRouter } from 'next/navigation'

const ShopPage = () => {
  const [data, setData] = useState<Shop[]>([])
  const [currentPage, setCurrentPage] = useState(0)
  const [pageSize, setPageSize] = useState(10)
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortOrder, setSortOrder] = useState("all")
  const [total, setTotal] = useState(0)

  const API_URL = process.env.NEXT_PUBLIC_API_URL

  useEffect(() => {
    fetch(`${API_URL}/shops`)
      .then(res => res.json())
      .then((result: { data: Shop[], total: number }) => {
        setData(result.data)
        setTotal(result.total)
      })
      .finally(() => setLoading(false))
  }, [])

  // Then use total from server instead of data.length
  const paginatedShops = data.slice(
    currentPage * pageSize,
    (currentPage + 1) * pageSize
  )

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5f3ee]">
      <p className="text-gray-400">กำลังโหลด...</p>
    </div>
  )

  return (
    <main className="bg-[#F5F3EE] dark:bg-[#1a1a18] min-h-screen flex flex-col">
      <Header />
      <div className="h-full py-4 bg-gradient-to-r from-[#0d3d30] via-[#1a6b5a] to-[#1d9e75] flex flex-col items-center justify-center gap-4">
        <div className="text-white flex items-center gap-2 w-fit border border-white/20 p-2 rounded-3xl bg-white/20">
          <Image src="/bear.webp" alt="TinyStore Logo" width={20} height={20} />
          สินค้าเด็กคุณภาพ ไม่ต้องมี มอก.
        </div>
        <h1 className="text-white text-center text-[50px] leading-tight">
          แพลตฟอร์มสำหรับ<br />ตัวแทนจำหน่ายสินค้าเด็ก
        </h1>
        <div className="flex items-center gap-4">
          <Link href="/register">
            <button className="text-white border border-white px-7 py-3 rounded-xl hover:bg-white/20 transition cursor-pointer">
              เริ่มต้นเป็นตัวแทน →
            </button>
          </Link>
          <Link href="/login">
            <button className="text-white border border-white px-7 py-3 rounded-xl hover:bg-white/20 transition font-medium cursor-pointer">
              เข้าสู่ระบบ
            </button>
          </Link>
        </div>
      </div>
      <section className='bg-white max-h-auto p-6 m-3 rounded-2xl shadow-md border border-gray-100'>
        <div className="mb-5">
          <FilterSearchAndDropdown
            onFilterType={(value) => setSortOrder(value)}
            onSearch={(value) => setSearchTerm(value)}
            onSortPrice={(value) => setSortOrder(value)}
          />
        </div>
        {data.length > 0 ? (
          <CradShop shops={paginatedShops} />
        ) : (
          <div className="text-center py-10 text-gray-400">ไม่มีร้านค้า</div>
        )}
        <PaginationCrad
          totalItems={total}  // ✅ from server, not data.length
          pageSize={pageSize}
          onPageSizeChange={(size) => { setPageSize(size); setCurrentPage(0) }}
          currentPage={currentPage}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </section>
    </main>
  )
}

export default ShopPage