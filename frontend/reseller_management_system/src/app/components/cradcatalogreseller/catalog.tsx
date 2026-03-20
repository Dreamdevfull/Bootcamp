"use client"
import { Catalog as CatalogType } from '@/app/types/model'
import AddProducts from '../ui/popup/popresellers/addproducts'
import React from 'react'
 
interface CatalogCardProps {
  data: CatalogType[]
  loading: boolean
  fetchCatalog: () => void
}
 
function ActionCell({ id, name, image_url, cost_price, min_price ,onSuccess}: {
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
        onSuccess={onSuccess}
        image_url={image_url}
        cost_price={cost_price}
        name={name}
        min_price={min_price}
      />
    </div>
  );
}
 
const CatalogCrad = ({ data, loading ,fetchCatalog}: CatalogCardProps) => {
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
            <div className="w-[220px]">
              <select className="block w-full pl-3 pr-10 py-2 text-base border border-black focus:outline-none focus:ring-black focus:border-black rounded-md">
                <option>ราคาทั้งหมด</option>
                <option>ราคาน้อยไปมาก</option>
                <option>ราคามากไปน้อย</option>
              </select>
            </div>
            <div className="w-[220px]">
              <select className="block w-full pl-3 pr-10 py-2 text-base border border-black focus:outline-none focus:ring-black focus:border-black rounded-md">
                <option>ประเภทสินค้าทั้งหมด</option>
                <option>เสื้อผ้า</option>
                <option>ของเล่น</option>
              </select>
            </div>
          </div>
        </div>
 
        {loading ? (
          <div className="text-center py-10 text-gray-400">กำลังโหลด...</div>
        ) : data.length === 0 ? (
          <div className="text-center py-10 text-gray-400">ไม่มีสินค้าส่วนกลาง</div>
        ) : (
          <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5'>
            {data.map((item) => (
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
                  <p className="text-sm font-medium line-clamp-2">{item.name}</p>
 
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
                      onSuccess={fetchCatalog}
                    />
                  )}
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