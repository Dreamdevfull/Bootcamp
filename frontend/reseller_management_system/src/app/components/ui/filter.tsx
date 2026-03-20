// import React from 'react'
// interface FilterProps {
//     onSearch: (value: string) => void;
//     onSortPrice: (value: string) => void;
//     onFilterType: (value: string) => void;
// }

// export const FilterSearchAndDropdown = ({ onSearch, onSortPrice, onFilterType }: FilterProps) => {
//   return (
//       <div className='bg-[#f5f3ee] p-6 mx-2  border border-gray-100 flex justify-between items-center rounded-xl'>
//           {/* search bar */}
//           <div className="relative w-full max-w-sm">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//                   </svg>
//               </div>
//               <input
//                   type="text"
//                   className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-full leading-5 bg-white placeholder-gray-500 sm:text-sm"
//                   placeholder="ค้นหาสินค้า..."
//                   onChange={(e) => onSearch(e.target.value)}
//               />
//           </div>
//           <div className='ml-auto flex gap-4'>
//               {/* Dropdown ราคา */}
//               <div className="w-[220px]">
//                   <select
//                   onChange={(e) => onSortPrice(e.target.value)} className="block w-full pl-3 pr-10 py-2 text-base border border-black focus:outline-none focus:ring-black focus:border-black rounded-md">
//                       <option>ราคาทั้งหมด</option>
//                       <option>ราคาน้อยไปมาก</option>
//                       <option>ราคามากไปน้อย</option>
//                   </select>
//               </div>
//               {/* Dropdown ประเภทสินค้า */}
//               {/* <div className="w-[220px]">
                
//                   <select
//                   onChange={(e) => onFilterType(e.target.value)} className="block w-full pl-3 pr-10 py-2 text-base border border-black focus:outline-none focus:ring-black focus:border-black rounded-md">
//                       <option>ประเภทสินค้าทั้งหมด</option>
//                       <option>เสื้อผ้า</option>
//                       <option>ของเล่น</option>
//                   </select>
//               </div> */}
//           </div>
//       </div>
//   )
// }

// import React from 'react'

// interface FilterProps {
//     onSearch: (value: string) => void;
//     onSortPrice: (value: string) => void;
//     onFilterType: (value: string) => void;
// }

// export const FilterSearchAndDropdown = ({ onSearch, onSortPrice, onFilterType }: FilterProps) => {
//     return (
//         <div className='bg-white dark:bg-[#142621] p-4 mt-2 md:p-6 mx-4 md:mx-2 border border-gray-100 dark:border-teal-900/30 flex flex-col md:flex-row justify-between items-center rounded-2xl shadow-sm gap-4 transition-all duration-300'>
            
//             {/* 1. Search Bar: ขยายเต็มในมือถือ / จำกัดความกว้างในจอใหญ่ */}
//             <div className="relative w-full md:max-w-sm">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <svg className="h-5 w-5 text-gray-400 dark:text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//                     </svg>
//                 </div>
//                 <input
//                     type="text"
//                     className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 dark:border-teal-800/40 rounded-xl leading-5 bg-[#F9F9F7] dark:bg-[#0a1a16] text-gray-900 dark:text-teal-100 placeholder-gray-500 dark:placeholder-teal-800 focus:outline-none focus:ring-2 focus:ring-[#EF9F27] focus:border-transparent sm:text-sm transition-all"
//                     placeholder="ค้นหาสินค้า..."
//                     onChange={(e) => onSearch(e.target.value)}
//                 />
//             </div>

//             {/* 2. Controls Group: ปรับให้ Stack กันในมือถือ */}
//             <div className='flex flex-col sm:flex-row gap-3 w-full md:w-auto md:ml-auto'>
//                 {/* Dropdown ราคา */}
//                 <div className="relative w-full md:w-[220px]">
//                     <select
//                         onChange={(e) => onSortPrice(e.target.value)} 
//                         className="block w-full pl-4 pr-10 py-2.5 text-sm border border-gray-200 dark:border-teal-800/40 bg-[#F9F9F7] dark:bg-[#0a1a16] text-gray-700 dark:text-teal-100 focus:outline-none focus:ring-2 focus:ring-[#EF9F27] rounded-xl appearance-none cursor-pointer transition-all"
//                     >
//                         <option value="all">ราคาทั้งหมด</option>
//                         <option value="lowToHigh">ราคาน้อยไปมาก</option>
//                         <option value="highToLow">ราคามากไปน้อย</option>
//                     </select>
//                     {/* Arrow Icon สำหรับ Select */}
//                     <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400 dark:text-teal-700">
//                         <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
//                     </div>
//                 </div>

//                 {/* Dropdown ประเภทสินค้า (Uncomment ถ้าต้องการใช้) */}
//                 {/* <div className="relative w-full md:w-[220px]">
//                     <select
//                         onChange={(e) => onFilterType(e.target.value)} 
//                         className="block w-full pl-4 pr-10 py-2.5 text-sm border border-gray-200 dark:border-teal-800/40 bg-[#F9F9F7] dark:bg-[#0a1a16] text-gray-700 dark:text-teal-100 focus:outline-none focus:ring-2 focus:ring-[#EF9F27] rounded-xl appearance-none cursor-pointer"
//                     >
//                         <option value="all">ประเภทสินค้าทั้งหมด</option>
//                         ...
//                     </select>
//                 </div> 
//                 */}
//             </div>
//         </div>
//     )
// }
import React from 'react'

interface FilterProps {
    onSearch: (value: string) => void;
    onSortPrice: (value: string) => void;
    onFilterType: (value: string) => void;
}

export const FilterSearchAndDropdown = ({ onSearch, onSortPrice, onFilterType }: FilterProps) => {
    return (
        <div className='
            /* พื้นหลังและ Layout หลัก - ปรับเป็นแนวตั้งในมือถือ */
            bg-[#f5f3ee] dark:bg-[#142621] p-4 md:p-6 mx-2 
            border border-gray-100 dark:border-teal-900/30 
            flex flex-col md:flex-row justify-between items-center 
            rounded-2xl gap-4 transition-colors duration-300
        '>
            {/* 1. Search Bar - เต็มความกว้างในมือถือ */}
            <div className="relative w-full md:max-w-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400 dark:text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
                <input
                    type="text"
                    className="
                        block w-full pl-10 pr-3 py-2.5 
                        border border-gray-300 dark:border-teal-800/40 
                        rounded-full leading-5 bg-white dark:bg-[#0a1a16] 
                        text-gray-900 dark:text-teal-100 placeholder-gray-500 
                        focus:outline-none focus:ring-2 focus:ring-[#EF9F27] focus:border-transparent 
                        sm:text-sm transition-all
                    "
                    placeholder="ค้นหาสินค้า..."
                    onChange={(e) => onSearch(e.target.value)}
                />
            </div>

            {/* 2. Dropdown Container - ปรับให้กว้างเต็มในมือถือ */}
            <div className='w-full md:w-auto md:ml-auto flex flex-col sm:flex-row gap-4'>
                {/* Dropdown ราคา */}
                <div className="w-full md:w-[220px] relative">
                    <select
                        onChange={(e) => onSortPrice(e.target.value)} 
                        className="
                            block w-full pl-3 pr-10 py-2.5 text-base 
                            border border-[#0d3d30] dark:border-teal-700 
                            bg-white dark:bg-[#0a1a16] text-gray-700 dark:text-teal-100
                            focus:outline-none focus:ring-2 focus:ring-[#EF9F27] 
                            rounded-xl appearance-none cursor-pointer transition-all
                        "
                    >
                        <option value="">ราคาทั้งหมด</option>
                        <option value="lowToHigh">ราคาน้อยไปมาก</option>
                        <option value="highToLow">ราคามากไปน้อย</option>
                    </select>
                    {/* ไอคอนลูกศร Custom */}
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 dark:text-teal-600">
                        <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                            <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                        </svg>
                    </div>
                </div>

                {/* Dropdown ประเภทสินค้า (Comment ไว้เหมือนเดิม) */}
                {/* <div className="w-full md:w-[220px] relative">
                    <select
                        onChange={(e) => onFilterType(e.target.value)} 
                        className="block w-full pl-3 pr-10 py-2.5 text-base border border-[#0d3d30] focus:outline-none focus:ring-[#EF9F27] rounded-xl appearance-none cursor-pointer"
                    >
                        <option value="">ประเภทสินค้าทั้งหมด</option>
                        <option value="clothing">เสื้อผ้า</option>
                        <option value="toy">ของเล่น</option>
                    </select>
                </div> 
                */}
            </div>
        </div>
    )
}