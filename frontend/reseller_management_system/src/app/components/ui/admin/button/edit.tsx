// import React, { useState } from 'react'
// import PopEditProducts from '../../popup/popadmin/editproducts'

// const EditButton = () => {
//   const [open, setOpen] = useState(false)
//   // const handleEdit = () => {
//   //   return 
//   // }
//   return (
//     // <div>
//     //   <button onClick={handleEdit} className="border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-100 transition cursor-pointer">
//     //     แก้ไข
//     //   </button>
//     // </div>
//     <div>
//       <button
//         onClick={() => setOpen(true)}  
//         className="bg-[#1D9E75] text-white border border-gray-300 px-4 py-2 rounded-lg hover:bg-[#1A6B5A] transition cursor-pointer"
//       >
//         แก้ไข
//       </button>

      
//     </div>
//   )
// }

// export default EditButton

"use client"
import React, { useState } from 'react'
import PopEditProducts from '../../popup/popadmin/editproducts'

const EditButton = () => {
  const [open, setOpen] = useState(false)

  return (
    <div className="w-full md:w-auto">
      <button
        onClick={() => setOpen(true)}  
        className="
          /* 1. Layout: เต็มความกว้างในมือถือ, ปกติในคอม */
          w-full md:w-auto 
          flex items-center justify-center
          
          /* 2. Styling: Teal Design System */
          bg-[#1D9E75] text-white px-5 py-2 rounded-xl border border-transparent
          font-medium transition-all duration-200
          
          /* Hover & Active */
          hover:bg-[#1A6B5A] hover:shadow-md
          active:scale-95 cursor-pointer
          
          /* 3. Dark Mode Support */
          dark:bg-teal-600 dark:hover:bg-teal-500
          dark:border-teal-400/20
        "
      >
        แก้ไข
      </button>

      {/* Popup Section */}
      {/* {open && (
        <PopEditProducts 
          open={open} 
          onClose={() => setOpen(false)} 
        />
      )} */}
    </div>
  )
}

export default EditButton