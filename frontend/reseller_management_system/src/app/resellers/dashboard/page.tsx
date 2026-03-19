// "use client"

// import { useState } from "react"
// import Modal from "@/app/components/ui/popup/popadmin/test"
// import HeaderReseller from '@/app/components/layout/headerReseller'
// import PopCustomersOrder from "@/app/components/ui/popup/popcustomers/order"

// export default function Page() {
//   const [open, setOpen] = useState(false)

//   return (
//     <div className="min-h-screen bg-[#F5F3EE]">
//       <HeaderReseller />
//       <div className="p-2">
//         {/* ปุ่มเปิด popup */}
//         <button
//           onClick={() => setOpen(true)}
//           className="bg-[#0d3d30] text-white px-6 py-3 rounded-xl hover:bg-[#0d3d30]/90 transition"
//         >
//           เปิด Popup
//         </button>
//       </div>

//       {/* Modal */}
//       <PopCustomersOrder open={open} onClose={() => setOpen(false)}/>
//     </div>
//   )
// }

"use client"
import HeaderAdmin from '@/app/components/layout/headeradmin'
import { ShoppingCart, TrendingUp, Package, Clock, Users, UserCheck } from "lucide-react";
import { useEffect , useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts"
import { PieChart, Pie } from "recharts"


export default function DashboardPage() {
  
  // test
  const Linedata = [
    { date: "1/3", orders: 0 },
  ]
  const Piedata = [
  { name: "สำเร็จ", value: 400 },
  { name: "รอดำเนินการ", value: 80 },
  { name: "ยกเลิก", value: 20 },
  ]
  const COLORS = ["#9fe1cb", "#fac775", "#f7c1c1"]

  return (
    <div className='min-h-screen bg-[#F5F3EE]'>
      <HeaderAdmin />
      {/* <div className='text-[#0d3d30] text-[28px] font-semibold m-4'>Dashboard</div> */}
      <div className="flex items-center gap-3 mx-8 mt-6 mb-2">
        {/* <div className="w-1 h-8 bg-[#0d3d30] rounded-full" /> */}
        <h1 className="text-[#0d3d30] text-3xl font-bold tracking-tight">Dashboard</h1>
      </div>
      {/* กล่องรวมด้านบน */}
      <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mx-8">
        {/* ยอดขายรวม */}
        <div className="relative flex flex-col justify-between bg-white border border-gray-100 rounded-2xl p-5 shadow-sm overflow-hidden">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center mb-3">
            <TrendingUp size={18} className="text-emerald-600" />
          </div>
          <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-1">ยอดขายรวม</p>
          <p className="text-[22px] font-bold text-gray-800 leading-tight">฿123,000</p>
        </div>
        {/* กำไรรวม */}
        <div className="relative flex flex-col justify-between bg-white border border-gray-100 rounded-2xl p-5 shadow-sm overflow-hidden">
          <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center mb-3">
            <ShoppingCart size={18} className="text-blue-600" />
          </div>
          <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-1">กำไรรวม</p>
          <p className="text-[22px] font-bold text-gray-800 leading-tight">฿2,000</p>
        </div>
        {/* จำนวนออเดอร์ทั้งหมด */}
        <div className="relative flex flex-col justify-between bg-white border border-gray-100 rounded-2xl p-5 shadow-sm overflow-hidden">
          <div className="w-10 h-10 rounded-xl bg-violet-50 flex items-center justify-center mb-3">
            <Package size={18} className="text-violet-600" />
          </div>
          <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-1">จำนวนออเดอร์ทั้งหมด</p>
          <p className="text-[22px] font-bold text-gray-800 leading-tight">2,000</p>
        </div>
        {/* ออเดอร์รอดำเนินการ */}
        <div className="relative flex flex-col justify-between bg-white border border-gray-100 rounded-2xl p-5 shadow-sm overflow-hidden">
          <div className="flex items-start justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
              <Clock size={18} className="text-amber-600" />
            </div>
            <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-amber-50 text-amber-600">รอดำเนินการ</span>
          </div>
          <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-1">ออเดอร์รอดำเนินการ</p>
          <p className="text-[22px] font-bold text-gray-800 leading-tight">20</p>
        </div>
        {/* จำนวนตัวแทนทั้งหมด */}
        <div className="relative flex flex-col justify-between bg-white border border-gray-100 rounded-2xl p-5 shadow-sm overflow-hidden">
          <div className="w-10 h-10 rounded-xl bg-sky-50 flex items-center justify-center mb-3">
            <Users size={18} className="text-sky-600" />
          </div>
          <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-1">จำนวนตัวแทนทั้งหมด</p>
          <p className="text-[22px] font-bold text-gray-800 leading-tight">100</p>
        </div>
        {/* ตัวแทนที่รออนุมัติ */}
        <div className="relative flex flex-col justify-between bg-white border border-gray-100 rounded-2xl p-5 shadow-sm overflow-hidden">
          <div className="flex items-start justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center">
              <UserCheck size={18} className="text-rose-600" />
            </div>
            <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-rose-50 text-rose-500">รออนุมัติ</span>
          </div>
          <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-1">ตัวแทนที่รออนุมัติ</p>
          <p className="text-[22px] font-bold text-gray-800 leading-tight">3</p>
        </div>
      </section>
      {/* กราฟเส้น */}
      <section className='min-h-60 mx-8 my-6 px-6 py-4 bg-white border border-gray-100 rounded-2xl flex gap-3'>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={Linedata}>
            <CartesianGrid strokeDasharray="2 2" vertical={false} stroke="#f0f0f0" />
            <XAxis dataKey="date" tick={{ fontSize: 12 }} axisLine={true} tickLine={false} />
            <YAxis tick={{ fontSize: 12 }} axisLine={true} tickLine={false} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="orders"
              stroke="#0d3d30"
              strokeWidth={2}
              dot={{ r: 3, fill: "#0d3d30" }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
        <PieChart width={400} height={300}>
          <Pie
            data={Piedata}
            dataKey="value"      // ค่าที่ใช้คำนวณสัดส่วน
            nameKey="name"       // ชื่อแต่ละชิ้น
            cx="50%"             // จุดกึ่งกลาง X
            cy="50%"             // จุดกึ่งกลาง Y
            outerRadius={150}    // รัศมีวงนอก
          >
            {Piedata.map((_, index) => (
              <Cell key={index} fill={COLORS[index]} />  // สีแต่ละชิ้น
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </section>
    </div>

  )
}