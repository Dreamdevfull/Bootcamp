"use client"
import { Catalog as CatalogType } from '@/app/types/model'
import AddProducts from '../ui/popup/popresellers/addproducts'
import React, { useState, useMemo} from 'react'
import { FilterSearchAndDropdown } from '../ui/filter'
import { PaginationCrad } from '../ui/paginationcrad'
 
interface CatalogCardProps {
  data: CatalogType[]
  loading: boolean
}
 
function ActionCell({ id, name, image_url, cost_price, min_price }: {
  id: number;
  name: string;
  image_url: string;
  cost_price: number;
  min_price: number;
}) {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="flex items-center justify-center gap-2">
      <button
        onClick={() => setOpen(true)}
        className='text-[#ffffff] w-full border bg-[#1b9e75] hover:bg-[#1a6b5a] hover:text-[#FAEEDA] rounded-lg px-5 py-2 cursor-pointer transition'
      >
        เพิ่มสินค้าเข้าร้าน
      </button>
      <AddProducts
        key={open ? id : "closed"}
        id={id}
        open={open}
        onClose={() => setOpen(false)}
        image_url={image_url}
        cost_price={cost_price}
        name={name}
        min_price={min_price}
      />
    </div>
  );
}
 
const CatalogCrad = ({ data, loading }: CatalogCardProps) => {
  const [currentPage, setCurrentPage] = useState(0)
  const [pageSize, setPageSize] = useState(5)  
  const API_URL = process.env.NEXT_PUBLIC_API_URL
  const allProducts = data ?? []
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("all");
  
  const filteredProducts = useMemo(() => {
    let result = allProducts.filter((item) =>
      item.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (sortOrder === "lowToHigh") {
      result.sort((a, b) => a.min_price - b.min_price);
    } else if (sortOrder === "highToLow") {
      result.sort((a, b) => b.min_price - a.min_price);
    }

    return result;
  }, [allProducts, searchTerm, sortOrder]);

  const totalItems = filteredProducts.length
  const paginatedProducts = filteredProducts.slice(
  currentPage * pageSize,
  (currentPage + 1) * pageSize
)

  

  const truncateText = (text: string | null | undefined, maxLength: number) => {
    if (!text) return '-'; 
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
  };

  return (
    <main className='bg-[#f5f3ee] min-h-screen flex flex-col'>
      <section className='bg-white p-6 max-h-auto rounded-2xl shadow-md border border-gray-100'>
          {/* search bar */}
        <div className='mb-6'>
         <FilterSearchAndDropdown 
            onSearch={(value) => { setSearchTerm(value); setCurrentPage(0); }}
            onSortPrice={setSortOrder}
            onFilterType={() => {}} 
          />
        </div>
 
        {loading ? (
          <div className="text-center py-10 text-gray-400">กำลังโหลด...</div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-10 text-gray-400">ไม่มีสินค้าส่วนกลาง</div>
        ) : (
          <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5'>
            {paginatedProducts.map((item) => (
              <div
                key={item.id}
                className='bg-white p-4 border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition duration-200'
              >
                {item.image_url ? (
                  <img
                    src={API_URL + item.image_url}
                    alt={item.name}
                    className="w-full h-50 object-cover rounded-lg mb-3 border shadow-sm"
                  />
                ) : (
                  <div className="w-full h-50 bg-gray-200 rounded-lg mb-3 flex items-center justify-center text-gray-400">
                    ไม่มีรูป
                  </div>
                )}
 
                <div className="p-3 flex flex-col gap-2">
                  <p title={item.name} className="text-sm font-medium line-clamp-2">{truncateText(item.name ?? "-", 33)}</p>
 
                  <div className="flex justify-between items-center">
                    <span className="text-[#1a6b5a] font-semibold text-lg">
                      ฿{item.min_price}
                    </span>
                    <span className="text-xs text-gray-500">
                      เหลือ {item.stock}
                    </span>
                  </div>
 
                  {item.is_mine ? (
                    <button disabled className='text-[#1a6b5a] w-full border border-[#1a6b5a] bg-[#e6f4f0] rounded-lg px-5 py-2 cursor-not-allowed'>
                      ✓ เพิ่มแล้ว
                    </button>
                  ) : item.is_added ? (
                    <button disabled className='text-gray-400 w-full border bg-gray-100 rounded-lg px-5 py-2 cursor-not-allowed'>
                      ถูกร้านอื่นเพิ่มแล้ว
                    </button>
                  ) : (
                    <ActionCell
                      id={item.id}
                      name={item.name}
                      image_url={item.image_url}
                      cost_price={item.cost_price}
                      min_price={item.min_price}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
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
  )
}
 
export default CatalogCrad