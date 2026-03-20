// app/shop/[shopId]/page.tsx
"use client"
import { useState, useEffect, use, useMemo } from "react"
import { Getshop } from "@/app/types/model"
import CradShopslug from "@/app/components/cradcustomer/cradshopslug"
import HeaderCustomers from "@/app/components/layout/headerCustomers"
import { FilterSearchAndDropdown } from "@/app/components/ui/filter"
import { PaginationCrad } from "@/app/components/ui/paginationcrad"
import { useRouter } from "next/navigation"

const ShopPage = ({ params }: { params: Promise<{ shop_slug: string }> }) => {
  const { shop_slug } = use(params);
  const [data, setData] = useState<Getshop | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("all");
  
  const API_URL = process.env.NEXT_PUBLIC_API_URL
  useEffect(() => {
    fetch(`${API_URL}/shop/${shop_slug}`)
      .then(res => res.json())
      .then((data: Getshop) => {
        setData(data)
      })
      .finally(() => setLoading(false))
  }, [shop_slug])

  

  const allProducts = data?.products ?? []
  const totalItems = allProducts.length
  const paginatedProducts = allProducts.slice(
    currentPage * pageSize,
    (currentPage + 1) * pageSize
  )
if (loading) return (
  <div className="min-h-screen flex items-center justify-center bg-[#f5f3ee]">
    <p className="text-gray-400">กำลังโหลด...</p>
  </div>
)
  return (
    <>
    {data?.shop_name ?(
      <main className='bg-[#f5f3ee] min-h-screen flex flex-col'>
        <HeaderCustomers />
        <section className='w-full h-[200px] bg-gradient-to-r from-[#0d3d30] via-[#1a6b5a] to-[#1d9e75]'>
          <h1 className='text-white text-center text-[40px] pt-8'>ยินดีต้องรับเข้าสู่ร้าน</h1>
          <p className='text-white text-center text-[40px] pt-2'>{data?.shop_name}</p>

        </section>
        <section className='bg-white max-h-auto p-6 m-3 rounded-2xl shadow-md border border-gray-100'>
          <div className="mb-5">
            <FilterSearchAndDropdown />
          </div>
          {data?.products && data.products.length > 0 ? (
            <CradShopslug products={paginatedProducts} shop_slug={shop_slug} />
          ) : (
            <div className="text-center py-10 text-gray-400">ไม่มีสินค้า</div>
          )}
          <PaginationCrad
            totalItems={totalItems}
            pageSize={pageSize}
            onPageSizeChange={(size) => { setPageSize(size); setCurrentPage(0) }}
            currentPage={currentPage}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </section>
      </main>
      ) : (
        <div className="min-h-screen bg-[#f5f3ee] flex flex-col items-center justify-center gap-4">
          <div className="text-6xl">🙈</div>
          <h1 className="text-2xl font-semibold text-[#1a6b5a]">ไม่พบร้านค้านี้</h1>
          <p className="text-gray-400 text-sm">ร้านค้านี้อาจไม่มีอยู่หรือถูกลบไปแล้ว</p>
          <button
            onClick={() => router.push("/")}
            className="mt-2 px-6 py-2 bg-[#1a6b5a] text-white rounded-lg hover:bg-[#0d3d30] transition cursor-pointer"
          >
            กลับหน้าเดิม
          </button>
        </div>
    )}
    </>
  )
}

export default ShopPage;