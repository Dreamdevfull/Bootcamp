"use client"
import { Catalog as CatalogType } from '@/app/types/model'
import AddProducts from '../ui/popup/popresellers/addproducts'
import React, { useState, useMemo} from 'react'
import { FilterSearchAndDropdown1 } from '../ui/search/filter1'
import { PaginationCrad } from '../ui/paginationcrad'
 
interface CatalogCardProps {
  data: CatalogType[]
  loading: boolean
  onSuccess: () => void;
}
 
function ActionCell({ id, name, image_url, cost_price, min_price,onSuccess }: {
  id: number;
  name: string;
  image_url: string;
  cost_price: number;
  min_price: number;
  onSuccess: () => void;
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
        onSuccess={onSuccess}
      />
    </div>
  );
}
 
const CatalogCrad = ({ data, loading, onSuccess }: CatalogCardProps) => {
  const [currentPage, setCurrentPage] = useState(0)
  const [pageSize, setPageSize] = useState(10)  
  const API_URL = process.env.NEXT_PUBLIC_API_URL
  const allProducts = data ?? []
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("all");
  
  const filteredProducts = useMemo(() => {
    const result = allProducts.filter((item) =>
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
    <main className='bg-[#f5f3ee] dark:bg-gray-950 min-h-screen flex flex-col transition-colors duration-200'>
      <section className='bg-white dark:bg-gray-800 p-6 max-h-auto rounded-2xl shadow-md border-2 border-gray-100 dark:border-gray-700 transition-colors duration-200'>
          {/* search bar */}
        <div className='mb-6'>
         <FilterSearchAndDropdown1 
            onSearch={(value) => { setSearchTerm(value); setCurrentPage(0); }}
            onSortPrice={setSortOrder}
            onFilterType={() => {}} 
          />
        </div>
 
        {loading ? (
          <div className="text-center py-10 text-gray-400 dark:text-gray-500">กำลังโหลด...</div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-10 text-gray-400 dark:text-gray-500">ไม่มีสินค้าส่วนกลาง</div>
        ) : (
          <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5'>
            {paginatedProducts.map((item) => (
              <div
                key={item.id}
                className='bg-white dark:bg-gray-800 p-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition duration-200'
              >
                {item.image_url ? (
                  <img
                    src={API_URL + item.image_url}
                    alt={item.name}
                    className="w-full h-50 object-cover rounded-lg mb-3 border shadow-sm"
                  />
                ) : (
                  <div className="w-full h-50 bg-gray-200 dark:bg-gray-700 rounded-lg mb-3 flex items-center justify-center text-gray-400 dark:text-gray-500">
                    ไม่มีรูป
                  </div>
                )}
 
                <div className="p-3 flex flex-col gap-2">
                  <p title={item.name} className="text-sm font-medium line-clamp-2">{truncateText(item.name ?? "-", 33)}</p>
 
                  <div className="flex justify-between items-center">
                    <span className="text-[#1a6b5a] dark:text-emerald-400 font-semibold text-lg">
                      ฿{item.min_price}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      เหลือ {item.stock}
                    </span>
                  </div>
 
                  {item.is_mine ? (
                    <button disabled className='text-emerald-700 dark:text-emerald-400 w-full border-2 border-emerald-600 dark:border-emerald-700 bg-emerald-50 dark:bg-emerald-950 rounded-lg px-5 py-2 cursor-not-allowed'>
                      ✓ เพิ่มแล้ว
                    </button>
                  ) : item.is_added ? (
                    <button disabled className='text-gray-400 dark:text-gray-500 w-full border-2 border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 rounded-lg px-5 py-2 cursor-not-allowed'>
                      ถูกร้านอื่นเพิ่มแล้ว
                    </button>
                  ) : (
                    <ActionCell
                      id={item.id}
                      name={item.name}
                      image_url={item.image_url}
                      cost_price={item.cost_price}
                      min_price={item.min_price}
                      onSuccess={onSuccess}
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
// "use client"
// import { Catalog as CatalogType } from '@/app/types/model'
// import AddProducts from '../ui/popup/popresellers/addproducts'
// import React, { useState, useMemo } from 'react'
// import { FilterSearchAndDropdown } from '../ui/filter'
// import { PaginationCrad } from '../ui/paginationcrad'

// interface CatalogCardProps {
//   data: CatalogType[]
//   loading: boolean
// }

// function ActionCell({ id, name, image_url, cost_price, min_price }: {
//   id: number;
//   name: string;
//   image_url: string;
//   cost_price: number;
//   min_price: number;
// }) {
//   const [open, setOpen] = React.useState(false);
//   return (
//     <div className="w-full">
//       <button
//         onClick={() => setOpen(true)}
//         className='w-full bg-[#1b9e75] hover:bg-[#1a6b5a] text-white font-medium rounded-xl py-2.5 cursor-pointer transition-all active:scale-95 text-xs sm:text-sm'
//       >
//         เพิ่มสินค้าเข้าร้าน
//       </button>
//       <AddProducts
//         key={open ? id : "closed"}
//         id={id}
//         open={open}
//         onClose={() => setOpen(false)}
//         image_url={image_url}
//         cost_price={cost_price}
//         name={name}
//         min_price={min_price}
//       />
//     </div>
//   );
// }

// const CatalogCrad = ({ data, loading }: CatalogCardProps) => {
//   const [currentPage, setCurrentPage] = useState(0)
//   const [pageSize, setPageSize] = useState(10) // เพิ่ม default เล็กน้อยสำหรับหน้า card
//   const API_URL = process.env.NEXT_PUBLIC_API_URL
//   const allProducts = data ?? []
//   const [searchTerm, setSearchTerm] = useState("");
//   const [sortOrder, setSortOrder] = useState("all");

//   const filteredProducts = useMemo(() => {
//     let result = [...allProducts].filter((item) =>
//       item.name?.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     if (sortOrder === "lowToHigh") {
//       result.sort((a, b) => a.min_price - b.min_price);
//     } else if (sortOrder === "highToLow") {
//       result.sort((a, b) => b.min_price - a.min_price);
//     }

//     return result;
//   }, [allProducts, searchTerm, sortOrder]);

//   const totalItems = filteredProducts.length
//   const paginatedProducts = filteredProducts.slice(
//     currentPage * pageSize,
//     (currentPage + 1) * pageSize
//   )

//   const truncateText = (text: string | null | undefined, maxLength: number) => {
//     if (!text) return '-';
//     return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
//   };

//   return (
//     <main className='w-full transition-colors duration-300'>
//       <section className='bg-white dark:bg-[#142621] p-4 sm:p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-teal-900/20'>
        
//         {/* Search & Filter - Responsive Stack */}
//         <div className='mb-8'>
//           <FilterSearchAndDropdown
//             onSearch={(value) => { setSearchTerm(value); setCurrentPage(0); }}
//             onSortPrice={setSortOrder}
//             onFilterType={() => { }}
//           />
//         </div>

//         {loading ? (
//           <div className="text-center py-20 text-teal-600 dark:text-teal-400 font-medium animate-pulse">
//             กำลังโหลดข้อมูลสินค้า...
//           </div>
//         ) : filteredProducts.length === 0 ? (
//           <div className="text-center py-20 text-gray-400 dark:text-teal-900/50">
//             ไม่พบสินค้าที่คุณต้องการ
//           </div>
//         ) : (
//           /* Grid System: 2 cols on Mobile, 5 cols on Desktop */
//           <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-5 md:gap-6'>
//             {paginatedProducts.map((item) => (
//               <div
//                 key={item.id}
//                 className='group bg-white dark:bg-[#0a1a16] border border-gray-100 dark:border-teal-900/30 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col'
//               >
//                 {/* Image Section with Fixed Aspect Ratio */}
//                 <div className="relative aspect-square sm:aspect-[4/5] overflow-hidden bg-gray-50 dark:bg-teal-950/20">
//                   {item.image_url ? (
//                     <img
//                       src={API_URL + item.image_url}
//                       alt={item.name}
//                       className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
//                     />
//                   ) : (
//                     <div className="w-full h-full flex items-center justify-center text-gray-300 dark:text-teal-900/30 text-xs">
//                       ไม่มีรูปภาพ
//                     </div>
//                   )}
//                   {/* Stock Badge Overlay */}
//                   <div className="absolute top-2 right-2 bg-black/40 backdrop-blur-md text-white text-[10px] px-2 py-0.5 rounded-full">
//                     คลัง: {item.stock}
//                   </div>
//                 </div>

//                 {/* Info Section */}
//                 <div className="p-3 sm:p-4 flex flex-col flex-grow gap-2">
//                   <h3 title={item.name} className="text-xs sm:text-sm font-semibold text-gray-800 dark:text-teal-100 line-clamp-2 min-h-[2.5rem]">
//                     {truncateText(item.name ?? "-", 40)}
//                   </h3>

//                   <div className="mt-auto flex flex-col gap-3">
//                     <div className="flex items-center justify-between">
//                       <div className="flex items-baseline gap-0.5">
//                         <span className="text-[10px] text-teal-600 dark:text-teal-500 font-bold">฿</span>
//                         <span className="text-base sm:text-xl font-bold text-[#1a6b5a] dark:text-teal-400">
//                           {item.min_price.toLocaleString()}
//                         </span>
//                       </div>
//                     </div>

//                     {/* Action States */}
//                     {item.is_mine ? (
//                       <button disabled className='w-full py-2 bg-teal-50 dark:bg-teal-900/20 text-[#1a6b5a] dark:text-teal-400 border border-teal-100 dark:border-teal-800/50 rounded-xl text-xs font-medium cursor-not-allowed'>
//                         ✓ เพิ่มแล้ว
//                       </button>
//                     ) : item.is_added ? (
//                       <button disabled className='w-full py-2 bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 rounded-xl text-xs font-medium cursor-not-allowed'>
//                         ร้านอื่นเพิ่มแล้ว
//                       </button>
//                     ) : (
//                       <ActionCell
//                         id={item.id}
//                         name={item.name}
//                         image_url={item.image_url}
//                         cost_price={item.cost_price}
//                         min_price={item.min_price}
//                       />
//                     )}
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* Pagination Section */}
//         <div className='mt-10 border-t border-gray-100 dark:border-teal-900/10 pt-6'>
//           <PaginationCrad
//             totalItems={totalItems}
//             pageSize={pageSize}
//             onPageSizeChange={(size) => { setPageSize(size); setCurrentPage(0) }}
//             currentPage={currentPage}
//             onPageChange={(page) => setCurrentPage(page)}
//           />
//         </div>
//       </section>
//     </main>
//   )
// }

// export default CatalogCrad