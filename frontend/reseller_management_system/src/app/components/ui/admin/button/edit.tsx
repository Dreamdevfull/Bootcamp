import React, { useState } from 'react'
import PopEditProducts from '../../popup/popadmin/editproducts'

const EditButton = () => {
  const [open, setOpen] = useState(false)
  // const handleEdit = () => {
  //   return 
  // }
  return (
    // <div>
    //   <button onClick={handleEdit} className="border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-100 transition cursor-pointer">
    //     แก้ไข
    //   </button>
    // </div>
    <div>
      <button
        onClick={() => setOpen(true)}  
        className="bg-[#1D9E75] text-white border border-gray-300 px-4 py-2 rounded-lg hover:bg-[#1A6B5A] transition cursor-pointer"
      >
        แก้ไข
      </button>

      
    </div>
  )
}

export default EditButton