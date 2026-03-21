// import React from 'react'

// const AddButton = () => {
//   const handleEdit = () => {
//     return 
//   }
//   return (
//     <div>
//       <button onClick={handleEdit} className="border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-100 transition cursor-pointer">
//         เพิ่ม
//       </button>
//     </div>
//   )
// }

// export default AddButton

import React from 'react'

const AddButton = () => {
  const handleEdit = () => {
    // ใส่ Logic การทำงานตรงนี้
    return 
  }

  return (
    <div className="w-full md:w-auto">
      <button 
        onClick={handleEdit} 
        className="
          /* 1. Layout: เต็มความกว้างในมือถือ, ปกติในจอคอม */
          w-full md:w-auto 
          flex items-center justify-center gap-2
          
          /* 2. Styling: ใช้ Teal-Amber Design System */
          px-6 py-2.5 rounded-xl border font-medium transition-all duration-200
          
          /* Light Mode */
          bg-white border-[#d3d1c7] text-[#0d3d30] hover:bg-emerald-50 
          
          /* 3. Dark Mode Support */
          dark:bg-[#142621] dark:border-teal-900/40 dark:text-teal-400 
          dark:hover:bg-teal-950/40 dark:hover:border-teal-400/50
          
          /* Interaction */
          cursor-pointer active:scale-95
        "
      >
        <span>เพิ่ม</span>
      </button>
    </div>
  )
}

export default AddButton