// "use client"
// import HeaderReseller from '@/app/components/layout/headerReseller'
// import { ShoppingCart, TrendingUp, Package, Clock, Users, UserCheck } from "lucide-react";
// import { useEffect, useMemo, useState } from 'react';
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts"
// import { PieChart, Pie } from "recharts"
// import {  ShopStats } from "@/app/types/model";


// export default function DashboardPage() {
//   const [orders, setData] = useState<ShopStats[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [statusFilter, setStatusFilter] = useState("all");

//   const API_URL = process.env.NEXT_PUBLIC_API_URL;
//   const fetchData = async () => {
//     try {
//       const res = await fetch(`${API_URL}/reseller/dashboard`, {
//         credentials: "include",
//       });
//       const result = await res.json();
//       setData(result.data ?? []);
//     } catch {
//       setData([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, [API_URL]);

//   const totalOrders = orders.length;
//   const totalSales = orders.reduce((sum, order) => sum + (order.total_amount || 0), 0);
//   const totalProfit = orders.reduce((sum, order) => sum + (order.reseller_profit || 0), 0);
//   const pendingOrders = orders.filter(order => order.status === "pending").length;
//   const formatNum = (num: number) => num.toLocaleString('th-TH');


//   // 1. สร้าง Object เพื่อรวมยอดขายตามวันที่
//   const salesByDate = orders.reduce((acc: any, order) => {
//     // แปลงวันที่ "2026-03-17..." ให้กลายเป็น "17/3"
//     const dateObj = new Date(order.created_at);
//     const dayMonth = `${dateObj.getDate()}/${dateObj.getMonth() + 1}`;

//     // ถ้าวันนี้นับไปแล้วให้บวกเพิ่ม ถ้ายังไม่มีให้เริ่มที่ยอด total_amount
//     if (!acc[dayMonth]) {
//       acc[dayMonth] = 0;
//     }
//     acc[dayMonth] += Number(order.total_amount) || 0;

//     return acc;
//   }, {});

//   // 2. แปลง Object กลับเป็น Array รูปแบบที่ Recharts ต้องการ
//   // และเรียงลำดับตามวันที่ (Optional: ถ้าข้อมูลใน API ไม่ได้เรียงมา)
//   const Linedata = useMemo(() => {
//     if (!orders || orders.length === 0) return [];

//     // 1. จัดกลุ่มยอดขายตามวันที่ (YYYY-MM-DD)
//     const salesMap = orders.reduce((acc: any, order) => {
//       const dateKey = order.created_at.split('T')[0]; // ตัดมาแค่ 2026-03-17
//       if (!acc[dateKey]) acc[dateKey] = 0;
//       acc[dateKey] += Number(order.total_amount) || 0;
//       return acc;
//     }, {});

//     // 2. แปลงเป็น Array และ Sort ตามเวลาจริง
//     return Object.keys(salesMap)
//       .map(dateKey => {
//         const d = new Date(dateKey);
//         return {
//           rawDate: d,
//           date: `${d.getDate()}/${d.getMonth() + 1}`, // แสดงผลเป็น 17/3
//           sales: salesMap[dateKey]
//         };
//       })
//       .sort((a, b) => a.rawDate.getTime() - b.rawDate.getTime());
//   }, [orders]);


//   const Piedata = [
//     {
//       name: "สำเร็จ",
//       value: orders.filter(o => o.status === "completed").length
//     },
//     {
//       name: "รอดำเนินการ",
//       value: orders.filter(o => o.status === "pending").length
//     },
//     {
//       name: "ยกเลิก",
//       value: orders.filter(o => o.status === "cancelled").length
//     },
//   ]
//   const COLORS = ["#9fe1cb", "#fac775", "#f7c1c1"]

//   return (
//     <div className='min-h-screen bg-[#F5F3EE]'>
//       <HeaderReseller />
//       {/* <div className='text-[#0d3d30] text-[28px] font-semibold m-4'>Dashboard</div> */}
//       <div className="flex items-center gap-3 mx-8 mt-6 mb-2">
//         {/* <div className="w-1 h-8 bg-[#0d3d30] rounded-full" /> */}
//         <h1 className="text-[#0d3d30] text-3xl font-bold tracking-tight">Dashboard</h1>
//       </div>
//       {/* กล่องรวมด้านบน */}
//       <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mx-8">
//         {/* ยอดขายรวม */}
//         <div className="relative flex flex-col justify-between bg-white border border-gray-100 rounded-2xl p-5 shadow-sm overflow-hidden">
//           <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center mb-3">
//             <TrendingUp size={18} className="text-emerald-600" />
//           </div>
//           <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-1">ยอดขายรวม</p>
//           <p className="text-[22px] font-bold text-gray-800 leading-tight">฿{formatNum(totalSales)}</p>
//         </div>
//         {/* กำไรรวม */}
//         <div className="relative flex flex-col justify-between bg-white border border-gray-100 rounded-2xl p-5 shadow-sm overflow-hidden">
//           <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center mb-3">
//             <ShoppingCart size={18} className="text-blue-600" />
//           </div>
//           <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-1">กำไรรวม</p>
//           <p className="text-[22px] font-bold text-gray-800 leading-tight">฿{formatNum(totalProfit)}</p>
//         </div>
//         {/* จำนวนออเดอร์ทั้งหมด */}
//         <div className="relative flex flex-col justify-between bg-white border border-gray-100 rounded-2xl p-5 shadow-sm overflow-hidden">
//           <div className="w-10 h-10 rounded-xl bg-violet-50 flex items-center justify-center mb-3">
//             <Package size={18} className="text-violet-600" />
//           </div>
//           <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-1">จำนวนออเดอร์ทั้งหมด</p>
//           <p className="text-[22px] font-bold text-gray-800 leading-tight">฿{formatNum(totalOrders)}</p>
//         </div>
//         {/* ออเดอร์รอดำเนินการ */}
//         <div className="relative flex flex-col justify-between bg-white border border-gray-100 rounded-2xl p-5 shadow-sm overflow-hidden">
//           <div className="flex items-start justify-between mb-3">
//             <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
//               <Clock size={18} className="text-amber-600" />
//             </div>
//             <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-amber-50 text-amber-600">รอดำเนินการ</span>
//           </div>
//           <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-1">ออเดอร์รอดำเนินการ</p>
//           <p className="text-[22px] font-bold text-gray-800 leading-tight">฿{formatNum(pendingOrders)}</p>
//         </div>
//       </section>
//       {/* กราฟเส้น */}
//       <section className="mx-8 my-6 flex flex-col lg:flex-row gap-6">

//         {/* กล่องกราฟเส้น (ยอดขาย) */}
//         <div className="flex-1 bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
//           <div className="mb-4">
//             <h3 className="text-lg font-bold text-gray-800">กราฟแสดงยอดขายรายวัน</h3>
//             <p className="text-xs text-gray-400">ข้อมูลยอดขายรวมในแต่ละวัน (บาท)</p>
//           </div>
//           <div className="h-[300px] w-full">
//             <ResponsiveContainer width="100%" height="100%">
//               <LineChart data={Linedata}>
//                 <CartesianGrid strokeDasharray="2 2" vertical={false} stroke="#f0f0f0" />
//                 <XAxis dataKey="date" tick={{ fontSize: 12 }} axisLine={true} tickLine={false} />
//                 <YAxis
//                   tick={{ fontSize: 12 }}
//                   axisLine={true}
//                   tickLine={false}
//                   tickFormatter={(value) => `฿${value.toLocaleString()}`}
//                 />
//                 <Tooltip
//                   formatter={(value: any) => {
//                     if (value === undefined || value === null) return ["฿0", "ยอดขาย"];
//                     return [`฿${Number(value).toLocaleString()}`, "ยอดขาย"];
//                   }}
//                 />
//                 <Line
//                   type="monotone"
//                   dataKey="sales"
//                   stroke="#0d3d30"
//                   strokeWidth={2}
//                   dot={{ r: 4, fill: "#0d3d30" }}
//                   activeDot={{ r: 6 }}
//                 />
//               </LineChart>
//             </ResponsiveContainer>
//           </div>
//         </div>

//         {/* กล่องกราฟวงกลม (สถานะออเดอร์) */}
//         <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm w-full lg:w-[450px]">
//           <div className="mb-4">
//             <h3 className="text-lg font-bold text-gray-800">กราฟแสดงสถานะของออเดอร์ทั้งหมด</h3>
//             <p className="text-xs text-gray-400">สัดส่วนสถานะคำสั่งซื้อปัจจุบัน</p>
//           </div>
//           <div className="flex justify-center items-center h-[300px]">
//             <PieChart width={400} height={300}>
//               <Pie
//                 data={Piedata}
//                 dataKey="value"
//                 nameKey="name"
//                 cx="50%"
//                 cy="50%"
//                 outerRadius={100} // ปรับรัศมีลงเล็กน้อยเพื่อให้พอดีกล่อง
//                 label // เพิ่ม label เพื่อให้ดูง่ายขึ้นว่าชิ้นไหนคืออะไร
//               >
//                 {Piedata.map((_, index) => (
//                   <Cell key={index} fill={COLORS[index % COLORS.length]} />
//                 ))}
//               </Pie>
//               <Tooltip />
//             </PieChart>
//           </div>
//         </div>

//       </section>
//     </div>

//   )
// }
"use client"
import HeaderReseller from '@/app/components/layout/headerReseller'
import { ShoppingCart, TrendingUp, Package, Clock } from "lucide-react";
import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts"
import { PieChart, Pie } from "recharts"
import { ShopStats } from "@/app/types/model";

export default function DashboardPage() {
  const [stats, setStats] = useState<ShopStats["data"] | null>(null);
  const [loading, setLoading] = useState(true);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    fetch(`${API_URL}/reseller/dashboard`, {
      credentials: "include",
    })
      .then(res => res.json())
      .then((result: ShopStats) => {
        setStats(result.data);
      })
      .catch(() => setStats(null))
      .finally(() => setLoading(false));
  }, [API_URL]);

  const formatNum = (num: number) => num.toLocaleString('th-TH');

  const Piedata = [
    { name: "สำเร็จ", value: stats?.completed_orders ?? 0 },
    { name: "รอดำเนินการ", value: stats?.pending_orders ?? 0 },
    { name: "ยกเลิก", value: (stats?.total_orders ?? 0) - (stats?.completed_orders ?? 0) - (stats?.pending_orders ?? 0) },
  ];
  const COLORS = ["#9fe1cb", "#fac775", "#f7c1c1"];

  return (
    <div className='min-h-screen bg-[#F5F3EE]'>
      <HeaderReseller />
      <div className="flex items-center gap-3 mx-8 mt-6 mb-2">
        <h1 className="text-[#0d3d30] text-3xl font-bold tracking-tight">Dashboard</h1>
      </div>

      {/* กล่องรวมด้านบน */}
      <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mx-8">
        {/* ยอดขายรวม */}
        <div className="relative flex flex-col justify-between bg-white border border-gray-100 rounded-2xl p-5 shadow-sm overflow-hidden">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center mb-3">
            <TrendingUp size={18} className="text-emerald-600" />
          </div>
          <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-1">ยอดขายรวม</p>
          <p className="text-[22px] font-bold text-gray-800 leading-tight">฿{formatNum(stats?.total_sales ?? 0)}</p>
        </div>
        {/* กำไรรวม */}
        <div className="relative flex flex-col justify-between bg-white border border-gray-100 rounded-2xl p-5 shadow-sm overflow-hidden">
          <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center mb-3">
            <ShoppingCart size={18} className="text-blue-600" />
          </div>
          <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-1">กำไรรวม</p>
          <p className="text-[22px] font-bold text-gray-800 leading-tight">฿{formatNum(stats?.total_profit ?? 0)}</p>
        </div>
        {/* จำนวนออเดอร์ทั้งหมด */}
        <div className="relative flex flex-col justify-between bg-white border border-gray-100 rounded-2xl p-5 shadow-sm overflow-hidden">
          <div className="w-10 h-10 rounded-xl bg-violet-50 flex items-center justify-center mb-3">
            <Package size={18} className="text-violet-600" />
          </div>
          <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-1">จำนวนออเดอร์ทั้งหมด</p>
          <p className="text-[22px] font-bold text-gray-800 leading-tight">{formatNum(stats?.total_orders ?? 0)}</p>
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
          <p className="text-[22px] font-bold text-gray-800 leading-tight">{formatNum(stats?.pending_orders ?? 0)}</p>
        </div>
      </section>

      {/* กราฟ */}
      <section className="mx-8 my-6 flex flex-col lg:flex-row gap-6">
        {/* กราฟวงกลม */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm w-full lg:w-[450px]">
          <div className="mb-4">
            <h3 className="text-lg font-bold text-gray-800">กราฟแสดงสถานะของออเดอร์ทั้งหมด</h3>
            <p className="text-xs text-gray-400">สัดส่วนสถานะคำสั่งซื้อปัจจุบัน</p>
          </div>
          <div className="flex justify-center items-center h-[300px]">
            <PieChart width={400} height={300}>
              <Pie data={Piedata} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                {Piedata.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </div>
        </div>
      </section>
    </div>
  );
}