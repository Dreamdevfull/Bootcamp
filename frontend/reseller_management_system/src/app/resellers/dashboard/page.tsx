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
// "use client"
// import HeaderReseller from '@/app/components/layout/headerReseller'
// import { ShoppingCart, TrendingUp, Package, Clock } from "lucide-react";
// import { useEffect, useMemo, useState } from 'react';
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts"
// import { PieChart, Pie } from "recharts"
// import { OrderReseller } from "@/app/types/model";

// export default function DashboardPage() {
//   const [orders, setOrders] = useState<OrderReseller[]>([]);
//   const [loading, setLoading] = useState(true);

//   const API_URL = process.env.NEXT_PUBLIC_API_URL;

//   useEffect(() => {
//     fetch(`${API_URL}/reseller/orders`, { credentials: "include" })
//       .then(res => res.json())
//       .then(result => {
//         const ordersData: OrderReseller[] = Array.isArray(result?.data)
//           ? result.data
//           : Array.isArray(result)
//             ? result
//             : [];
//         setOrders(ordersData);
//       })
//       .finally(() => setLoading(false));
//   }, [API_URL]);

//   const formatNum = (num: number) => num.toLocaleString('th-TH');

//   // การ์ดด้านบน — คำนวณจาก orders
//   const totalSales = orders.reduce((sum, o) => sum + (Number(o.total_amount) || 0), 0);
//   const totalProfit = orders
//     .filter(o => o.status === "จัดส่งเสร็จสมบูรณ์")
//     .reduce((sum, o) => sum + (Number(o.my_profit) || 0), 0);
//   // const totalProfit   = orders.reduce((sum, o) => sum + (Number(o.my_profit) || 0), 0);
//   const totalOrders = orders.length;
//   const pendingOrders = orders.filter(o => o.status === "กำลังจัดส่ง").length;

//   // กราฟเส้น — แปลง "21/03/2026 14:35" → "2026-03-21"
//   const Linedata = useMemo(() => {
//     if (orders.length === 0) return [];

//     const salesMap = orders.reduce((acc: Record<string, number>, o) => {
//       const raw = o.created_at;
//       if (!raw) return acc;

//       // format: "21/03/2026 14:35"
//       const parts = raw.split(' ')[0].split('/'); // ["21", "03", "2026"]
//       if (parts.length !== 3) return acc;
//       const dateKey = `${parts[2]}-${parts[1]}-${parts[0]}`; // "2026-03-21"

//       acc[dateKey] = (acc[dateKey] ?? 0) + (Number(o.total_amount) || 0);
//       return acc;
//     }, {});

//     return Object.keys(salesMap)
//       .sort()
//       .map(dateKey => {
//         const d = new Date(dateKey);
//         return {
//           date: `${d.getDate()}/${d.getMonth() + 1}`,
//           sales: salesMap[dateKey],
//         };
//       });
//   }, [orders]);

//   // กราฟวงกลม
//   const Piedata = [
//     { name: "สำเร็จ", value: orders.filter(o => o.status === "จัดส่งเสร็จสมบูรณ์").length },
//     { name: "กำลังจัดส่ง", value: orders.filter(o => o.status === "กำลังจัดส่ง").length },
//     { name: "รอดำเนินการ", value: orders.filter(o => o.status === "รอจัดส่ง").length },
//   ];
//   const COLORS = ["#9fe1cb", "#fac775", "#f7c1c1"];

//   if (loading) return (
//     <div className="min-h-screen bg-[#F5F3EE] flex items-center justify-center text-gray-400">
//       กำลังโหลด...
//     </div>
//   );

//   return (
//     <div className='min-h-screen bg-[#F5F3EE]'>
//       <HeaderReseller />
//       <div className="flex items-center gap-3 mx-8 mt-6 mb-2">
//         <h1 className="text-[#0d3d30] text-3xl font-bold tracking-tight">Dashboard</h1>
//       </div>

//       {/* การ์ดด้านบน */}
//       <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mx-8">
//         <div className="relative flex flex-col justify-between bg-white border border-gray-100 rounded-2xl p-5 shadow-sm overflow-hidden">
//           <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center mb-3">
//             <TrendingUp size={18} className="text-emerald-600" />
//           </div>
//           <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-1">ยอดขายรวม</p>
//           <p className="text-[22px] font-bold text-gray-800 leading-tight">฿{formatNum(totalSales)}</p>
//         </div>

//         <div className="relative flex flex-col justify-between bg-white border border-gray-100 rounded-2xl p-5 shadow-sm overflow-hidden">
//           <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center mb-3">
//             <ShoppingCart size={18} className="text-blue-600" />
//           </div>
//           <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-1">กำไรรวม</p>
//           <p className="text-[22px] font-bold text-gray-800 leading-tight">฿{formatNum(totalProfit)}</p>
//         </div>

//         <div className="relative flex flex-col justify-between bg-white border border-gray-100 rounded-2xl p-5 shadow-sm overflow-hidden">
//           <div className="w-10 h-10 rounded-xl bg-violet-50 flex items-center justify-center mb-3">
//             <Package size={18} className="text-violet-600" />
//           </div>
//           <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-1">จำนวนออเดอร์ทั้งหมด</p>
//           <p className="text-[22px] font-bold text-gray-800 leading-tight">{formatNum(totalOrders)}</p>
//         </div>

//         <div className="relative flex flex-col justify-between bg-white border border-gray-100 rounded-2xl p-5 shadow-sm overflow-hidden">
//           <div className="flex items-start justify-between mb-3">
//             <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
//               <Clock size={18} className="text-amber-600" />
//             </div>
//             <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-amber-50 text-amber-600">ออเดอร์ที่กำลังจัดส่ง</span>
//           </div>
//           <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-1">ออเดอร์ที่กำลังจัดส่ง</p>
//           <p className="text-[22px] font-bold text-gray-800 leading-tight">{formatNum(pendingOrders)}</p>
//         </div>
//       </section>

//       {/* กราฟ */}
//       <section className="mx-8 my-6 flex flex-col lg:flex-row gap-6">
//         {/* กราฟเส้น */}
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
//                   formatter={(value: any) => [`฿${Number(value).toLocaleString()}`, "ยอดขาย"]}
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

//         {/* กราฟวงกลม */}
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
//                 outerRadius={100}
//                 label
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
//   );
// }
"use client"
import HeaderReseller from '@/app/components/layout/headerReseller'
import { ShoppingCart, TrendingUp, Package, Clock } from "lucide-react";
import { useEffect, useMemo, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts"
import { PieChart, Pie } from "recharts"
import { OrderReseller } from "@/app/types/model";

export default function DashboardPage() {
  const [orders, setOrders] = useState<OrderReseller[]>([]);
  const [loading, setLoading] = useState(true);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    fetch(`${API_URL}/reseller/orders`, { credentials: "include" })
      .then(res => res.json())
      .then(result => {
        const ordersData: OrderReseller[] = Array.isArray(result?.data)
          ? result.data
          : Array.isArray(result)
            ? result
            : [];
        setOrders(ordersData);
      })
      .finally(() => setLoading(false));
  }, [API_URL]);

  const formatNum = (num: number) => num.toLocaleString('th-TH');

  const totalSales    = orders.reduce((sum, o) => sum + (Number(o.total_amount) || 0), 0);
  const totalProfit   = orders.filter(o => o.status === "จัดส่งเสร็จสมบูรณ์").reduce((sum, o) => sum + (Number(o.my_profit) || 0), 0);
  const totalOrders   = orders.length;
  const pendingOrders = orders.filter(o => o.status === "รอจัดส่ง").length;

  const Linedata = useMemo(() => {
    if (orders.length === 0) return [];
    const salesMap = orders.reduce((acc: Record<string, number>, o) => {
      const raw = o.created_at;
      if (!raw) return acc;
      const parts = raw.split(' ')[0].split('/');
      if (parts.length !== 3) return acc;
      const dateKey = `${parts[2]}-${parts[1]}-${parts[0]}`;
      acc[dateKey] = (acc[dateKey] ?? 0) + (Number(o.total_amount) || 0);
      return acc;
    }, {});
    return Object.keys(salesMap).sort().map(dateKey => {
      const d = new Date(dateKey);
      return { date: `${d.getDate()}/${d.getMonth() + 1}`, sales: salesMap[dateKey] };
    });
  }, [orders]);

  const Piedata = [
    { name: "✅ สำเร็จ",       value: orders.filter(o => o.status === "จัดส่งเสร็จสมบูรณ์").length },
    // { name: "🚚 กำลังจัดส่ง", value: orders.filter(o => o.status === "กำลังจัดส่ง").length },
    { name: "⏳ รอจัดส่ง",  value: orders.filter(o => o.status === "รอจัดส่ง").length },
  ];
  // สีที่คนตาบอดสีแยกแยะได้ (ฟ้า/ส้ม/ม่วง)
  const COLORS  = ["#2563eb", "#f97316", "#7c3aed"];
  const PATTERNS = ["●", "■", "▲"];

  if (loading) return (
    <div className="min-h-screen bg-[#F5F3EE] dark:bg-gray-950 
                    flex items-center justify-center 
                    text-gray-400 dark:text-gray-500"
         aria-live="polite">
      กำลังโหลด...
    </div>
  );

  return (
    <div className='min-h-screen bg-[#F5F3EE] dark:bg-[#1a1a18] transition-colors duration-200'>
      <HeaderReseller />
      <div className="flex items-center gap-3 mx-8 mt-6 mb-2">
        <h1 className="text-[#0d3d30] dark:text-emerald-400 text-3xl font-bold tracking-tight">
          Dashboard
        </h1>
      </div>

      {/* การ์ดด้านบน */}
      <section
        aria-label="สรุปข้อมูลภาพรวม"
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mx-8"
      >
        {/* ยอดขายรวม */}
        <div className="relative flex flex-col justify-between
                        bg-white dark:bg-gray-800
                        border-2 border-gray-100 dark:border-gray-700
                        rounded-2xl p-5 shadow-sm overflow-hidden">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-900 flex items-center justify-center mb-3">
            <TrendingUp size={18} className="text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
          </div>
          <p className="text-xs text-gray-400 dark:text-gray-500 font-medium uppercase tracking-wide mb-1">ยอดขายรวม</p>
          <p className="text-[22px] font-bold text-gray-800 dark:text-gray-100 leading-tight">฿{formatNum(totalSales)}</p>
        </div>

        {/* กำไรรวม */}
        <div className="relative flex flex-col justify-between
                        bg-white dark:bg-gray-800
                        border-2 border-gray-100 dark:border-gray-700
                        rounded-2xl p-5 shadow-sm overflow-hidden">
          <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900 flex items-center justify-center mb-3">
            <ShoppingCart size={18} className="text-blue-600 dark:text-blue-400" aria-hidden="true" />
          </div>
          <p className="text-xs text-gray-400 dark:text-gray-500 font-medium uppercase tracking-wide mb-1">กำไรรวม</p>
          <p className="text-[22px] font-bold text-gray-800 dark:text-gray-100 leading-tight">฿{formatNum(totalProfit)}</p>
        </div>

        {/* จำนวนออเดอร์ทั้งหมด */}
        <div className="relative flex flex-col justify-between
                        bg-white dark:bg-gray-800
                        border-2 border-gray-100 dark:border-gray-700
                        rounded-2xl p-5 shadow-sm overflow-hidden">
          <div className="w-10 h-10 rounded-xl bg-violet-50 dark:bg-violet-900 flex items-center justify-center mb-3">
            <Package size={18} className="text-violet-600 dark:text-violet-400" aria-hidden="true" />
          </div>
          <p className="text-xs text-gray-400 dark:text-gray-500 font-medium uppercase tracking-wide mb-1">จำนวนออเดอร์ทั้งหมด</p>
          <p className="text-[22px] font-bold text-gray-800 dark:text-gray-100 leading-tight">{formatNum(totalOrders)}</p>
        </div>

        {/* ออเดอร์ที่กำลังจัดส่ง */}
        <div className="relative flex flex-col justify-between
                        bg-white dark:bg-gray-800
                        border-2 border-gray-100 dark:border-gray-700
                        rounded-2xl p-5 shadow-sm overflow-hidden">
          <div className="flex items-start justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-900 flex items-center justify-center">
              <Clock size={18} className="text-amber-600 dark:text-amber-400" aria-hidden="true" />
            </div>
            <span className="text-[11px] font-medium px-2 py-0.5 rounded-full
                             bg-amber-50 dark:bg-amber-900
                             text-amber-600 dark:text-amber-400
                             border border-amber-200 dark:border-amber-700">
              กำลังจัดส่ง
            </span>
          </div>
          <p className="text-xs text-gray-400 dark:text-gray-500 font-medium uppercase tracking-wide mb-1">ออเดอร์ที่กำลังจัดส่ง</p>
          <p className="text-[22px] font-bold text-gray-800 dark:text-gray-100 leading-tight">{formatNum(pendingOrders)}</p>
        </div>
      </section>

      {/* กราฟ */}
      <section className="mx-8 my-6 flex flex-col lg:flex-row gap-6">

        {/* กราฟเส้น */}
        <div className="flex-1 bg-white dark:bg-gray-800
                        border-2 border-gray-100 dark:border-gray-700
                        rounded-2xl p-6 shadow-sm">
          <div className="mb-4">
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">กราฟแสดงยอดขายรายวัน</h3>
            <p className="text-xs text-gray-400 dark:text-gray-500">ข้อมูลยอดขายรวมในแต่ละวัน (บาท)</p>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={Linedata}>
                <CartesianGrid strokeDasharray="2 2" vertical={false} stroke="#374151" />
                <XAxis dataKey="date" tick={{ fontSize: 12, fill: "#9ca3af" }} axisLine={{ stroke: "#4b5563" }} tickLine={false} />
                <YAxis
                  tick={{ fontSize: 12, fill: "#9ca3af" }}
                  axisLine={{ stroke: "#4b5563" }}
                  tickLine={false}
                  tickFormatter={(value) => `฿${value.toLocaleString()}`}
                />
                <Tooltip
                  contentStyle={{ backgroundColor: "#1f2937", border: "1px solid #374151", borderRadius: "8px", color: "#f9fafb" }}
                  formatter={(value: any) => [`฿${Number(value).toLocaleString()}`, "ยอดขาย"]}
                />
                <Line
                  type="monotone" dataKey="sales"
                  stroke="#34d399" strokeWidth={2}
                  dot={{ r: 4, fill: "#34d399" }} activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* กราฟวงกลม */}
        <div className="bg-white dark:bg-gray-800
                        border-2 border-gray-100 dark:border-gray-700
                        rounded-2xl p-6 shadow-sm w-full lg:w-[450px]">
          <div className="mb-4">
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">กราฟแสดงสถานะของออเดอร์ทั้งหมด</h3>
            <p className="text-xs text-gray-400 dark:text-gray-500">สัดส่วนสถานะคำสั่งซื้อปัจจุบัน</p>
          </div>
          <div className="flex flex-col items-center h-[300px]">
            <PieChart width={300} height={220}>
              <Pie data={Piedata} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90}>
                {Piedata.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ backgroundColor: "#1f2937", border: "1px solid #374151", borderRadius: "8px", color: "#f9fafb" }}
              />
            </PieChart>
            {/* Legend accessible */}
            <div className="flex flex-wrap justify-center gap-3 mt-2">
              {Piedata.map((entry, index) => (
                <div key={index} className="flex items-center gap-1.5">
                  <span className="text-base font-bold" style={{ color: COLORS[index] }} aria-hidden="true">
                    {PATTERNS[index]}
                  </span>
                  <span className="text-sm text-gray-600 dark:text-gray-300 font-medium">
                    {entry.name} ({entry.value})
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}