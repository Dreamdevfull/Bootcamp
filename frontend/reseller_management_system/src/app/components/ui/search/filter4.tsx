// "use client";

// import React, { useState, useEffect } from "react";

// interface FilterProps {
//   onSearch: (value: string) => void;
//   onSortPrice: (value: string) => void;
//   onFilterType: (value: string) => void;
// }

// export const FilterSearchAndDropdown = ({
//   onSearch,
//   onSortPrice,
//   onFilterType,
// }: FilterProps) => {

//   const [mounted, setMounted] = useState(false);

//   useEffect(() => {
//     setMounted(true);
//   }, []);


//   if (!mounted) {
//     return <div className="p-6 mx-2 min-h-[80px]"></div>; 
//   }

//   return (
//     <div className="bg-[#f5f3ee] dark:bg-[#142621] p-4 md:p-6 mx-2 border border-gray-100 dark:border-teal-900/30 flex flex-col md:flex-row justify-between items-center rounded-2xl gap-4 transition-colors duration-300">


//       <div className="relative w-full md:max-w-sm">
//         <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//           <svg
//             className="h-5 w-5 text-gray-400 dark:text-teal-600"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
//             />
//           </svg>
//         </div>
//         <input
//           type="text"
//           className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 dark:border-teal-800/40 rounded-full leading-5 bg-white dark:bg-[#0a1a16] text-gray-900 dark:text-teal-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#EF9F27] focus:border-transparent sm:text-sm transition-all"
//           placeholder="ค้นหาสินค้า..."
//           onChange={(e) => onSearch(e.target.value)}
//         />
//       </div>


//       <div className="w-full md:w-auto md:ml-auto flex flex-col sm:flex-row gap-4">

//         <div className="w-full md:w-[220px] relative">
//           <select
//             onChange={(e) => onSortPrice(e.target.value)}
//             className="block w-full pl-3 pr-10 py-2.5 text-base border border-[#0d3d30] dark:border-teal-700 bg-white dark:bg-[#0a1a16] text-gray-700 dark:text-teal-100 focus:outline-none focus:ring-2 focus:ring-[#EF9F27] rounded-xl appearance-none cursor-pointer transition-all"
//           >
//             <option value="">ราคาทั้งหมด</option>
//             <option value="lowToHigh">ราคาน้อยไปมาก</option>
//             <option value="highToLow">ราคามากไปน้อย</option>
//           </select>
//           <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 dark:text-teal-600">
//             <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
//               <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
//             </svg>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
"use client";

import React, { useState, useEffect , useMemo} from "react";

interface FilterProps {
  onSearch: (value: string) => void;
  onSortPrice: (value: string) => void;
  onFilterType: (value: string) => void;
}

export const FilterSearchAndDropdown4 = ({
  onSearch,
  onSortPrice,
  onFilterType,
}: FilterProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="px-8 min-h-[72px]"></div>;
  }

  return (
    <div className="px-8 py-3">
      <div className="bg-white dark:bg-gray-800
                      border-2 border-gray-200 dark:border-gray-600
                      flex flex-col md:flex-row justify-between items-center 
                      rounded-2xl gap-4 p-4
                      shadow-sm transition-colors duration-200">

        {/* ช่องค้นหา */}
        <div className="relative w-full md:max-w-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg
              className="h-5 w-5 text-gray-400 dark:text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <input
            type="search"
            aria-label="ค้นหาเลขออเดอร์"
            className="block w-full pl-10 pr-3 py-2.5
                       border-2 border-gray-300 dark:border-gray-600
                       rounded-full
                       bg-white dark:bg-gray-900
                       text-gray-900 dark:text-gray-100
                       placeholder-gray-400 dark:placeholder-gray-500
                       focus:outline-none focus:ring-2
                       focus:ring-amber-400 dark:focus:ring-amber-500
                       focus:border-transparent
                       text-sm transition-all"
            placeholder="ค้นหาเลขออเดอร์และชื่อลูกค้า"
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>

        {/* Dropdowns */}
        <div className="w-full md:w-auto md:ml-auto flex flex-col sm:flex-row gap-3">

          {/* เรียงราคา */}
          <div className="w-full md:w-[200px] relative">
            <select
              onChange={(e) => onSortPrice(e.target.value)}
              aria-label="เรียงตามราคา"
              className="block w-full pl-3 pr-10 py-2.5 text-sm
                         border-2 border-gray-300 dark:border-gray-600
                         bg-white dark:bg-gray-900
                         text-gray-700 dark:text-gray-100
                         focus:outline-none focus:ring-2
                         focus:ring-amber-400 dark:focus:ring-amber-500
                         rounded-xl appearance-none cursor-pointer transition-all"
            >
              <option value="">ราคาทั้งหมด</option>
              <option value="lowToHigh">ราคาน้อย → มาก</option>
              <option value="highToLow">ราคามาก → น้อย</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400 dark:text-gray-500">
              <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20" aria-hidden="true">
                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
              </svg>
            </div>
          </div>

          {/* กรองสถานะ */}
          <div className="w-full md:w-[200px] relative">
            <select
              onChange={(e) => onFilterType(e.target.value)}
              aria-label="กรองตามสถานะ"
              className="block w-full pl-3 pr-10 py-2.5 text-sm
                         border-2 border-gray-300 dark:border-gray-600
                         bg-white dark:bg-gray-900
                         text-gray-700 dark:text-gray-100
                         focus:outline-none focus:ring-2
                         focus:ring-amber-400 dark:focus:ring-amber-500
                         rounded-xl appearance-none cursor-pointer transition-all"
            >
              <option value="all">สถานะทั้งหมด</option>
              <option value="pending">⏳ รอดำเนินการ</option>
              {/* <option value="shopped">🚚 กำลังจัดส่ง</option> */}
              <option value="completed">✅ เสร็จสมบูรณ์</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400 dark:text-gray-500">
              <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20" aria-hidden="true">
                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
              </svg>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};