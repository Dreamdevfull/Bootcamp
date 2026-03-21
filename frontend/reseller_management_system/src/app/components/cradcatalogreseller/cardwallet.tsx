// import React from 'react'
// import { Wallet } from '@/app/types/model'
// interface CardWalletProps {
//   data: Wallet | null
//   loading: boolean
// }

// const CardWallet = ({ data, loading }: CardWalletProps) => {
//   return (
//     <section className="grid grid-cols-2 gap-4 mx-8 mt-5">
//       {/* กำไรสะสมทั้งหมด */}
//       <div className="bg-[#1A6B5A] rounded-2xl p-6 text-white">
//         <p className="font-bold text-lg mb-2">กำไรสะสมทั้งหมด (Total Profit)</p>
//         <p className="text-[40px] font-bold leading-tight">฿{data?.total_profit || 0}</p>
//         <p className="text-[#9FE1CB] text-sm mt-3">รายได้จากส่วนต่างราคาขาย - ต้นทุน</p>
//       </div>

//       {/* สถานะยอดเงิน */}
//       <div className="bg-white border border-[#D3D1C7] rounded-2xl p-6">
//         <p className="font-bold text-[#2C2C2A] text-lg mb-4">สถานะยอดเงิน</p>
//         <div className="flex justify-between items-center py-3 border-b border-[#D3D1C7]">
//           <p className="text-[#888780]">รับยอดเข้าแล้ว</p>
//           <p className="font-bold text-[#085041]">฿{data?.received_amount || 0}</p>
//         </div>
//         <div className="flex justify-between items-center py-3">
//           <p className="text-[#888780]">รอดำเนินการ (รอจัดส่ง)</p>
//           <p className="font-bold text-[#633806]">฿{data?.pending_amount || 0}</p>
//         </div>
//       </div>
//     </section>
//   )
// }

// export default CardWallet;
import React from 'react'
import { Wallet } from '@/app/types/model'

interface CardWalletProps {
  data: Wallet | null
  loading: boolean
}

const CardWallet = ({ data, loading }: CardWalletProps) => {
  // Skeleton ตอนโหลดข้อมูล
  if (loading) {
    return (
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4 mx-4 sm:mx-8 mt-5">
        <div className="bg-[#1A6B5A]/20 animate-pulse rounded-2xl h-[180px] dark:bg-emerald-950"></div>
        <div className="bg-gray-100 animate-pulse rounded-2xl h-[180px] dark:bg-gray-800"></div>
      </section>
    )
  }

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-4 mx-4 sm:mx-8 mt-5">
      {/* กำไรสะสมทั้งหมด */}
      <div className="bg-[#1A6B5A] rounded-2xl p-6 text-white shadow-sm transition-transform active:scale-[0.98] dark:bg-emerald-900">
        <p className="font-bold text-base md:text-lg mb-2">กำไรสะสมทั้งหมด (Total Profit)</p>
        <p className="text-[32px] sm:text-[40px] font-bold leading-tight break-words">
          ฿{data?.total_profit?.toLocaleString() || 0}
        </p>
        <p className="text-[#9FE1CB] text-xs sm:text-sm mt-3 opacity-90 dark:text-emerald-300">
          รายได้จากส่วนต่างราคาขาย - ต้นทุน
        </p>
      </div>

      {/* สถานะยอดเงิน */}
      <div className="bg-white border border-[#D3D1C7] rounded-2xl p-6 shadow-sm dark:bg-gray-800 dark:border-gray-700">
        <p className="font-bold text-[#2C2C2A] text-lg mb-4 dark:text-gray-100">สถานะยอดเงิน</p>
        
        <div className="space-y-1">
          <div className="flex justify-between items-center py-3 border-b border-[#D3D1C7] dark:border-gray-700">
            <p className="text-[#888780] text-sm sm:text-base dark:text-gray-400">รับยอดเข้าแล้ว</p>
            <p className="font-bold text-[#085041] text-lg dark:text-emerald-400">
              ฿{data?.received_amount?.toLocaleString() || 0}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CardWallet;