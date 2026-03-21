// import React from 'react'

// interface mainType {
//   main:{
//     text1: string
//     text2: string
//     button?: {          
//       label: string
//       onClick: () => void
//     }
//   }
// }
// const Main = ({main} : mainType) => {
//   return (
//     <main className='space-y-6 mx-7.5 mt-5'>
//       <div className='bg-white p-6 rounded-lg shadow-sm border border-[#d3d1c7]'>
//         <div className='flex items-center justify-between'>
//           <div>
//             <h1 className='text-3xl font-bold text-[#0d3d30]'>{main.text1}</h1>
//             <p className='text-md text-[#888780] mt-1'>{main.text2}</p>
//           </div>
//           {main.button && (
//             <button
//               onClick={main.button.onClick}
//               className='bg-[#EF9F27] text-white px-7 py-3 mr-3 rounded-sm text-sm hover:bg-[#BA7517] transition cursor-pointer'
//             >
//               {main.button.label}
//             </button>
//           )}
//         </div>
//       </div>
//     </main>
//   )
// }

// export default Main

import React from 'react'

interface mainType {
  main: {
    text1: string
    text2: string
    button?: {          
      label: string
      onClick: () => void
    }
  }
}

const Main = ({ main }: mainType) => {
  return (
    // ปรับ Margin ให้ยืดหยุ่นตามขนาดจอ
    <main className='space-y-6 mx-4 md:mx-8 mt-5'>
      <div className='bg-white dark:bg-[#142621] p-5 md:p-8 rounded-2xl shadow-sm border border-[#d3d1c7] dark:border-teal-900/20 transition-colors duration-300'>
        {/* ใช้ flex-col ในมือถือ และ md:flex-row ในจอคอม */}
        <div className='flex flex-col md:flex-row md:items-center justify-between gap-4'>
          <div className='space-y-1'>
            <h1 className='text-2xl md:text-3xl font-bold text-[#0d3d30] dark:text-teal-400'>
              {main.text1}
            </h1>
            <p className='text-sm md:text-md text-[#888780] dark:text-teal-100/50 leading-relaxed'>
              {main.text2}
            </p>
          </div>

          {main.button && (
            <button
              onClick={main.button.onClick}
              // ในมือถือ w-full (เต็มจอ) และ md:w-auto (เท่าเนื้อหา) ในจอคอม
              className='w-full md:w-auto bg-[#EF9F27] text-white px-8 py-3.5 rounded-xl text-sm font-semibold hover:bg-[#BA7517] active:scale-95 transition-all cursor-pointer shadow-sm'
            >
              {main.button.label}
            </button>
          )}
        </div>
      </div>
    </main>
  )
}

export default Main