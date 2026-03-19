// "use client"
// import { ColumnDef } from '@tanstack/table-core';
// import EditButton from '@/app/components/ui/admin/button/edit';
// import SoftDeleteButton from '@/app/components/ui/admin/button/softdelete';

// interface Catalog {
//   id: number
//   name: string
//   description: string
//   image_url: string
//   cost_price: number
//   min_price: number
//   stock: number
//   Create_at: string
// }

// export const CatalogColumn: ColumnDef<Catalog>[] = [
//   {
//     id: "index",
//     header: () => <div className="text-center">ลำดับ</div>,
//     cell: ({ row, table }) => {
//       const pageIndex = table.getState().pagination.pageIndex;
//       const pageSize = table.getState().pagination.pageSize;
//       const pageRowIndex = table.getRowModel().rows.findIndex(r => r.id === row.id);
//       return (
//         <div className="text-center">
//           {pageIndex * pageSize + pageRowIndex + 1}
//         </div>
//       );
//     },
//   },
//   {
//     accessorKey: "name",
//     header: "สินค้า",
//     cell: ({ row }) => (
//       <div className="flex items-center gap-3">
//         {row.original.image_url ? (
//           <img
//             src={row.original.image_url}
//             alt={row.original.name}
//             className="w-10 h-10 rounded-md object-cover"
//           />
//         ) : (
//           <div className="w-10 h-10 rounded-md bg-gray-200 flex items-center justify-center text-xs text-gray-400">
//             ไม่มีรูป
//           </div>
//             )}
//           <span>{row.original.name}</span>
//       </div>
//     ),
//   },
//   {
//     accessorKey: "product.cost_price",
//     header: () => <div className="text-center">ราคาทุน</div>,
//     cell: ({ row }) => (
//       <div className="text-center">{row.original.cost_price}</div>
//     ),
//   },
//   {
//     accessorKey: "product.min_price",
//     header: () => <div className="text-center">ราคาขายขั้นต่ำ</div>,
//     cell: ({ row }) => (
//       <div className="text-center">{row.original.min_price}</div>
//     ),
//   },
//   {
//     accessorKey: "stock",
//     header: () => <div className="text-center">สต๊อก</div>,
//     cell: ({ row }) => (
//       <div className="text-center">{row.getValue("stock")}</div>
//     ),
//   },
//   {
//     id: "actions",
//     header: () => <div className="text-center">จัดการ</div>,
//     cell: ({ row }) => (
//       <div className="flex items-center justify-center gap-2">
//         <EditButton />
//         <SoftDeleteButton id={row.original.id} />
//       </div>
//     ),
//   },
// ];


"use client"
import { Catalog as CatalogType } from '@/app/types/model'
import AddProductsButton from '../ui/resellers/button/addproducts'

interface CatalogCardProps  {
  data: CatalogType[]
  loading: boolean
}

const CatalogCrad = ({ data, loading }: CatalogCardProps ) => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL
  return (
    <main className='bg-[#f5f3ee] min-h-screen flex flex-col'>
      <section className='bg-white p-6 min-h-screen rounded-2xl shadow-md border border-gray-100'>
        <div className='bg-[#f5f3ee] p-6 mb-6 shadow-md border border-gray-100 flex justify-between items-center rounded-xl'>

          {/* search bar */}
          <div className="relative w-full max-w-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-full leading-5 bg-white placeholder-gray-500 sm:text-sm"
              placeholder="ค้นหาสินค้า..."
            />
          </div>
          <div className='ml-auto flex gap-4'>
            {/* Dropdown ราคา */}
            <div className="w-[220px]">
              <select className="block w-full pl-3 pr-10 py-2 text-base border border-black focus:outline-none focus:ring-black focus:border-black rounded-md">
                <option>ราคาทั้งหมด</option>
                <option>ราคาน้อยไปมาก</option>
                <option>ราคามากไปน้อย</option>
              </select>
            </div>
            {/* Dropdown ประเภทสินค้า */}
            <div className="w-[220px]">
              <select className="block w-full pl-3 pr-10 py-2 text-base border border-black focus:outline-none focus:ring-black focus:border-black rounded-md">
                <option>ประเภทสินค้าทั้งหมด</option>
                <option>เสื้อผ้า</option>
                <option>ของเล่น</option>
              </select>
            </div>
          </div>
        </div>
        {/* สำหรับสั่งสินค้า  */}
        {loading ? (
          <div className="text-center py-10 text-gray-400">กำลังโหลด...</div>
        ) : (
          <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5'>
            {data.map((item) => (
              <div
                key={item.id}
                className='bg-white p-4 border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition duration-200'
              >
                {/* image */}
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

                {/* content */}
                <div className="p-3 flex flex-col gap-2">
                  <p className="text-sm font-medium line-clamp-2">
                    {item.name}
                  </p>

                  <div className="flex justify-between items-center">
                    <span className="text-[#1a6b5a] font-semibold text-lg">
                      ฿{item.min_price}
                    </span>
                    <span className="text-xs text-gray-500">
                      เหลือ {item.stock}
                    </span>
                  </div>

                  {/* button */}
                  <AddProductsButton id={item.id}/>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}

export default CatalogCrad