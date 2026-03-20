import React from 'react'
interface FilterProps {
    onSearch: (value: string) => void;
    onSortPrice: (value: string) => void;
    onFilterType: (value: string) => void;
}

export const FilterSearchAndDropdown = ({ onSearch, onSortPrice, onFilterType }: FilterProps) => {
  return (
      <div className='bg-[#f5f3ee] p-6 mx-2  border border-gray-100 flex justify-between items-center rounded-xl'>
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
                  onChange={(e) => onSearch(e.target.value)}
              />
          </div>
          <div className='ml-auto flex gap-4'>
              {/* Dropdown ราคา */}
              <div className="w-[220px]">
                  <select
                  onChange={(e) => onSortPrice(e.target.value)} className="block w-full pl-3 pr-10 py-2 text-base border border-black focus:outline-none focus:ring-black focus:border-black rounded-md">
                      <option>ราคาทั้งหมด</option>
                      <option>ราคาน้อยไปมาก</option>
                      <option>ราคามากไปน้อย</option>
                  </select>
              </div>
              {/* Dropdown ประเภทสินค้า */}
              <div className="w-[220px]">
                
                  <select
                  onChange={(e) => onFilterType(e.target.value)} className="block w-full pl-3 pr-10 py-2 text-base border border-black focus:outline-none focus:ring-black focus:border-black rounded-md">
                      <option>ประเภทสินค้าทั้งหมด</option>
                      <option>เสื้อผ้า</option>
                      <option>ของเล่น</option>
                  </select>
              </div>
          </div>
      </div>
  )
}
