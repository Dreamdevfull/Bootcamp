// "use client"
// import HeaderAdmin from '@/app/components/layout/headeradmin'
// import { ShoppingCart, TrendingUp, Package, Clock, Users, UserCheck } from "lucide-react";
// import { useCallback, useEffect, useMemo, useState } from 'react';
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts"
// import { PieChart, Pie } from "recharts"
// import { Orders } from '@/app/types/model';

// export default function DashboardPage() {
//   const [loading, setLoading] = useState(true);
//   const [orders, setOrders] = useState<Orders[]>([]);
//   const [resellers, setResellers] = useState<any[]>([]);


//   const API_URL = process.env.NEXT_PUBLIC_API_URL;

//   const fetchData = useCallback(async () => {
//     setLoading(true);
//     try {
//       const [resOrders, resResellers] = await Promise.all([
//         fetch(`${API_URL}/admin/orders`, { credentials: "include" }),
//         fetch(`${API_URL}/admin/resellers`, { credentials: "include" })
//       ]);

//       const dataOrders = await resOrders.json();
//       const dataResellers = await resResellers.json();

//       setOrders(dataOrders.data ?? []);
//       setResellers(dataResellers.data ?? []);
//     } catch (error) {
//       console.error("Fetch error:", error);
//     } finally {
//       setLoading(false);
//     }
//   }, [API_URL]);

//   useEffect(() => {
//     fetchData();
//   }, [fetchData]);

//   // ดึงค่าต่างๆ
//   const totalOrders = orders.length;
//   const totalSales = orders.reduce((sum, order) => sum + (order.total_amount || 0), 0);
//   const totalProfit = orders.reduce((sum, order) => sum + (order.reseller_profit || 0), 0);
//   const pendingOrders = orders.filter(order => order.status === "pending").length;
//   const allAgents = resellers.length;
//   const pendingResellers = resellers.filter(resellers => resellers.status === "pending").length;
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


//   // test
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
//       <HeaderAdmin />
//       {/* <div className='text-[#0d3d30] text-[28px] font-semibold m-4'>Dashboard</div> */}
//       <div className="flex items-center gap-3 mx-8 mt-6 mb-2">
//         {/* <div className="w-1 h-8 bg-[#0d3d30] rounded-full" /> */}
//         <h1 className="text-[#0d3d30] text-3xl font-bold tracking-tight">Dashboard</h1>
//       </div>
//       {/* กล่องรวมด้านบน */}
//       <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mx-8">
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
//           <p className="text-[22px] font-bold text-gray-800 leading-tight">{formatNum(totalOrders)}</p>
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
//           <p className="text-[22px] font-bold text-gray-800 leading-tight">{formatNum(pendingOrders)}</p>
//         </div>
//         {/* จำนวนตัวแทนทั้งหมด */}
//         <div className="relative flex flex-col justify-between bg-white border border-gray-100 rounded-2xl p-5 shadow-sm overflow-hidden">
//           <div className="w-10 h-10 rounded-xl bg-sky-50 flex items-center justify-center mb-3">
//             <Users size={18} className="text-sky-600" />
//           </div>
//           <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-1">จำนวนตัวแทนทั้งหมด</p>
//           <p className="text-[22px] font-bold text-gray-800 leading-tight">{formatNum(allAgents)}</p>
//         </div>
//         {/* ตัวแทนที่รออนุมัติ */}
//         <div className="relative flex flex-col justify-between bg-white border border-gray-100 rounded-2xl p-5 shadow-sm overflow-hidden">
//           <div className="flex items-start justify-between mb-3">
//             <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center">
//               <UserCheck size={18} className="text-rose-600" />
//             </div>
//             <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-rose-50 text-rose-500">รออนุมัติ</span>
//           </div>
//           <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-1">ตัวแทนที่รออนุมัติ</p>
//           <p className="text-[22px] font-bold text-gray-800 leading-tight">{formatNum(pendingResellers)}</p>
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
// import HeaderAdmin from '@/app/components/layout/headeradmin'
// import { ShoppingCart, TrendingUp, Package, Clock, Users, UserCheck } from "lucide-react";
// import { useCallback, useEffect, useMemo, useState } from 'react';
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from "recharts"
// import { Orders } from '@/app/types/model';

// export default function DashboardPage() {
//   const [loading, setLoading] = useState(true);
//   const [orders, setOrders] = useState<Orders[]>([]);
//   const [resellers, setResellers] = useState<any[]>([]);

//   const API_URL = process.env.NEXT_PUBLIC_API_URL;

//   const fetchData = useCallback(async () => {
//     setLoading(true);
//     try {
//       const [resOrders, resResellers] = await Promise.all([
//         fetch(`${API_URL}/admin/orders`, { credentials: "include" }),
//         fetch(`${API_URL}/admin/resellers`, { credentials: "include" })
//       ]);
//       const dataOrders = await resOrders.json();
//       const dataResellers = await resResellers.json();
//       setOrders(dataOrders.data ?? []);
//       setResellers(dataResellers.data ?? []);
//     } catch (error) {
//       console.error("Fetch error:", error);
//     } finally {
//       setLoading(false);
//     }
//   }, [API_URL]);

//   useEffect(() => {
//     fetchData();
//   }, [fetchData]);

//   const totalOrders = orders.length;
//   const totalSales = orders.reduce((sum, order) => sum + (order.total_amount || 0), 0);
//   const totalProfit = orders.reduce((sum, order) => sum + (order.reseller_profit || 0), 0);
//   const pendingOrders = orders.filter(order => order.status === "pending").length;
//   const allAgents = resellers.length;
//   const pendingResellers = resellers.filter(resellers => resellers.status === "pending").length;
//   const formatNum = (num: number) => num.toLocaleString('th-TH');

//   const Linedata = useMemo(() => {
//     if (!orders || orders.length === 0) return [];
//     const salesMap = orders.reduce((acc: any, order) => {
//       const dateKey = order.created_at.split('T')[0];
//       if (!acc[dateKey]) acc[dateKey] = 0;
//       acc[dateKey] += Number(order.total_amount) || 0;
//       return acc;
//     }, {});
//     return Object.keys(salesMap)
//       .map(dateKey => {
//         const d = new Date(dateKey);
//         return {
//           rawDate: d,
//           date: `${d.getDate()}/${d.getMonth() + 1}`,
//           sales: salesMap[dateKey]
//         };
//       })
//       .sort((a, b) => a.rawDate.getTime() - b.rawDate.getTime());
//   }, [orders]);

//   const Piedata = [
//     { name: "สำเร็จ", value: orders.filter(o => o.status === "completed").length },
//     { name: "รอดำเนินการ", value: orders.filter(o => o.status === "pending").length },
//     { name: "ยกเลิก", value: orders.filter(o => o.status === "cancelled").length },
//   ]
//   const COLORS = ["#9fe1cb", "#fac775", "#f7c1c1"]

//   return (
//     <div className='min-h-screen bg-[#F5F3EE] pb-10'>
//       <HeaderAdmin />

//       {/* Title Section - ปรับ Padding ให้เหมาะกับมือถือ */}
//       <div className="flex items-center gap-3 px-4 md:px-8 mt-6 mb-4">
//         <h1 className="text-[#0d3d30] text-2xl md:text-3xl font-bold tracking-tight">Dashboard</h1>
//       </div>

//       {/* สถิติ 6 กล่อง - ปรับ Grid ให้ยืดหยุ่น */}
//       <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 px-4 md:px-8">
//         {[
//           { title: "ยอดขายรวม", val: `฿${formatNum(totalSales)}`, icon: <TrendingUp size={18} className="text-emerald-600" />, bg: "bg-emerald-50" },
//           { title: "กำไรรวม", val: `฿${formatNum(totalProfit)}`, icon: <ShoppingCart size={18} className="text-blue-600" />, bg: "bg-blue-50" },
//           { title: "จำนวนออเดอร์", val: formatNum(totalOrders), icon: <Package size={18} className="text-violet-600" />, bg: "bg-violet-50" },
//           { title: "ออเดอร์รอ", val: formatNum(pendingOrders), icon: <Clock size={18} className="text-amber-600" />, bg: "bg-amber-50", badge: "รอดำเนินการ" },
//           { title: "ตัวแทนทั้งหมด", val: formatNum(allAgents), icon: <Users size={18} className="text-sky-600" />, bg: "bg-sky-50" },
//           { title: "ตัวแทนรออนุมัติ", val: formatNum(pendingResellers), icon: <UserCheck size={18} className="text-rose-600" />, bg: "bg-rose-50", badge: "รออนุมัติ" }
//         ].map((item, idx) => (
//           <div key={idx} className="relative flex flex-col justify-between bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
//             <div className="flex items-start justify-between mb-3">
//               <div className={`w-10 h-10 rounded-xl ${item.bg} flex items-center justify-center`}>
//                 {item.icon}
//               </div>
//               {item.badge && (
//                 <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${item.bg} ${item.bg.replace('bg-', 'text-').replace('-50', '-600')}`}>
//                   {item.badge}
//                 </span>
//               )}
//             </div>
//             <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wide mb-1">{item.title}</p>
//             <p className="text-xl md:text-[22px] font-bold text-gray-800 leading-tight">{item.val}</p>
//           </div>
//         ))}
//       </section>

//       {/* กราฟ - ปรับเป็นแนวตั้งในมือถือ แนวขวางในจอคอม */}
//       <section className="px-4 md:px-8 my-6 flex flex-col xl:flex-row gap-6">

//         {/* กราฟเส้น */}
//         <div className="flex-1 bg-white border border-gray-100 rounded-2xl p-4 md:p-6 shadow-sm overflow-hidden">
//           <div className="mb-6">
//             <h3 className="text-lg font-bold text-gray-800">กราฟแสดงยอดขายรายวัน</h3>
//             <p className="text-xs text-gray-400">ข้อมูลยอดขายรวมในแต่ละวัน (บาท)</p>
//           </div>
//           <div className="h-[250px] md:h-[300px] w-full">
//             <ResponsiveContainer width="100%" height="100%">
//               <LineChart data={Linedata}>
//                 <CartesianGrid strokeDasharray="2 2" vertical={false} stroke="#f0f0f0" />
//                 <XAxis dataKey="date" tick={{ fontSize: 10 }} axisLine={true} tickLine={false} />
//                 <YAxis
//                   tick={{ fontSize: 10 }}
//                   axisLine={true}
//                   tickLine={false}
//                   tickFormatter={(value) => `${value.toLocaleString()}`}
//                 />
//                 <Tooltip
//                   contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
//                   formatter={(value: any) => [`฿${Number(value).toLocaleString()}`, "ยอดขาย"]}
//                 />
//                 <Line
//                   type="monotone"
//                   dataKey="sales"
//                   stroke="#0d3d30"
//                   strokeWidth={3}
//                   dot={{ r: 4, fill: "#0d3d30", strokeWidth: 2, stroke: "#fff" }}
//                   activeDot={{ r: 6 }}
//                 />
//               </LineChart>
//             </ResponsiveContainer>
//           </div>
//         </div>

//         {/* กราฟวงกลม */}
//         <div className="bg-white border border-gray-100 rounded-2xl p-4 md:p-6 shadow-sm w-full xl:w-[400px]">
//           <div className="mb-4">
//             <h3 className="text-lg font-bold text-gray-800">สถานะออเดอร์ทั้งหมด</h3>
//             <p className="text-xs text-gray-400">สัดส่วนสถานะคำสั่งซื้อปัจจุบัน</p>
//           </div>
//           <div className="flex justify-center items-center h-[250px] md:h-[300px]">
//             <ResponsiveContainer width="100%" height="100%">
//               <PieChart>
//                 <Pie
//                   data={Piedata}
//                   dataKey="value"
//                   nameKey="name"
//                   cx="50%"
//                   cy="50%"
//                   outerRadius="80%"
//                   fontSize={8} 
//                   label={({ name, percent }) =>
//                     percent !== undefined
//                       ? `${name} ${(percent * 100).toFixed(0)}%`
//                       : name
//                   }
//                   labelLine={false}
//                 >
//                   {Piedata.map((_, index) => (
//                     <Cell key={index} fill={COLORS[index % COLORS.length]} stroke="white" strokeWidth={2} />
//                   ))}
//                 </Pie>
//                 <Tooltip />
//               </PieChart>
//             </ResponsiveContainer>
//           </div>
//         </div>

//       </section>
//     </div>
//   )
// }

// "use client"
// import HeaderAdmin from '@/app/components/layout/headeradmin'
// import { ShoppingCart, TrendingUp, Package, Clock, Users, UserCheck, Sun, Moon } from "lucide-react";
// import { useCallback, useEffect, useMemo, useState } from 'react';
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie, Legend } from "recharts"
// import { Orders } from '@/app/types/model';
// import { useTheme } from "next-themes";

// export default function DashboardPage() {
//   const { theme, setTheme } = useTheme();
//   const [mounted, setMounted] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [orders, setOrders] = useState<Orders[]>([]);
//   const [resellers, setResellers] = useState<any[]>([]);

//   const API_URL = process.env.NEXT_PUBLIC_API_URL;

//   // ป้องกัน Hydration error
//   useEffect(() => setMounted(true), []);

//   const fetchData = useCallback(async () => {
//     setLoading(true);
//     try {
//       const [resOrders, resResellers] = await Promise.all([
//         fetch(`${API_URL}/admin/orders`, { credentials: "include" }),
//         fetch(`${API_URL}/admin/resellers`, { credentials: "include" })
//       ]);
//       const dataOrders = await resOrders.json();
//       const dataResellers = await resResellers.json();
//       setOrders(dataOrders.data ?? []);
//       setResellers(dataResellers.data ?? []);
//     } catch (error) {
//       console.error("Fetch error:", error);
//     } finally {
//       setLoading(false);
//     }
//   }, [API_URL]);

//   useEffect(() => {
//     fetchData();
//   }, [fetchData]);

//   const formatNum = (num: number) => num.toLocaleString('th-TH');

//   const Linedata = useMemo(() => {
//     if (!orders || orders.length === 0) return [];
//     const salesMap = orders.reduce((acc: any, order) => {
//       const dateKey = order.created_at.split('T')[0];
//       if (!acc[dateKey]) acc[dateKey] = 0;
//       acc[dateKey] += Number(order.total_amount) || 0;
//       return acc;
//     }, {});
//     return Object.keys(salesMap)
//       .map(dateKey => {
//         const d = new Date(dateKey);
//         return {
//           rawDate: d,
//           date: `${d.getDate()}/${d.getMonth() + 1}`,
//           sales: salesMap[dateKey]
//         };
//       })
//       .sort((a, b) => a.rawDate.getTime() - b.rawDate.getTime());
//   }, [orders]);

//   const Piedata = [
//     { name: "สำเร็จ", value: orders.filter(o => o.status === "completed").length },
//     { name: "รอดำเนินการ", value: orders.filter(o => o.status === "pending").length },
//     { name: "ยกเลิก", value: orders.filter(o => o.status === "cancelled").length },
//   ];

//   // Teal-Amber Color Palette
//   const COLORS = ["#1a6b5a", "#ef9f27", "#f87171"];

//   if (!mounted) return null;

//   return (
//     <div className='min-h-screen bg-[#F5F3EE] dark:bg-[#0a1a16] transition-colors duration-300 pb-10'>
//       <HeaderAdmin />

//       {/* Header Section พร้อมปุ่มเปลี่ยนโหมด */}
//       <div className="flex items-center justify-between px-4 md:px-8 mt-6 mb-4">
//         <h1 className="text-[#0d3d30] dark:text-teal-400 text-2xl md:text-3xl font-bold tracking-tight">Dashboard</h1>
        
//         <button
//           onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
//           className="p-2.5 rounded-xl bg-white dark:bg-[#142621] border border-gray-200 dark:border-teal-900/30 shadow-sm hover:scale-105 transition-all text-[#1a6b5a] dark:text-teal-400"
//         >
//           {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
//         </button>
//       </div>

//       {/* สถิติ 6 กล่อง - Responsive Grid */}
//       <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 px-4 md:px-8">
//         {[
//           { title: "ยอดขายรวม", val: `฿${formatNum(orders.reduce((s, o) => s + (o.total_amount || 0), 0))}`, icon: <TrendingUp size={18} className="text-emerald-600 dark:text-emerald-400" />, bg: "bg-emerald-50 dark:bg-emerald-950/20" },
//           { title: "กำไรรวม", val: `฿${formatNum(orders.reduce((s, o) => s + (o.reseller_profit || 0), 0))}`, icon: <ShoppingCart size={18} className="text-blue-600 dark:text-blue-400" />, bg: "bg-blue-50 dark:bg-blue-950/20" },
//           { title: "จำนวนออเดอร์", val: formatNum(orders.length), icon: <Package size={18} className="text-violet-600 dark:text-violet-400" />, bg: "bg-violet-50 dark:bg-violet-950/20" },
//           { title: "ออเดอร์รอ", val: formatNum(orders.filter(o => o.status === "pending").length), icon: <Clock size={18} className="text-amber-600 dark:text-amber-400" />, bg: "bg-amber-50 dark:bg-amber-950/20", badge: "รอดำเนินการ" },
//           { title: "ตัวแทนทั้งหมด", val: formatNum(resellers.length), icon: <Users size={18} className="text-sky-600 dark:text-sky-400" />, bg: "bg-sky-50 dark:bg-sky-950/20" },
//           { title: "ตัวแทนรออนุมัติ", val: formatNum(resellers.filter(r => r.status === "pending").length), icon: <UserCheck size={18} className="text-rose-600 dark:text-rose-400" />, bg: "bg-rose-50 dark:bg-rose-950/20", badge: "รออนุมัติ" }
//         ].map((item, idx) => (
//           <div key={idx} className="bg-white dark:bg-[#142621] border border-gray-100 dark:border-teal-900/20 rounded-2xl p-5 shadow-sm transition-colors">
//             <div className="flex items-start justify-between mb-3">
//               <div className={`w-10 h-10 rounded-xl ${item.bg} flex items-center justify-center`}>{item.icon}</div>
//               {item.badge && <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${item.bg} text-gray-500 dark:text-teal-300`}>{item.badge}</span>}
//             </div>
//             <p className="text-[10px] text-gray-400 dark:text-teal-100/40 font-medium uppercase mb-1">{item.title}</p>
//             <p className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white"> {item.val}</p>
//           </div>
//         ))}
//       </section>

//       {/* กราฟ - Responsive Layout */}
//       <section className="px-4 md:px-8 my-6 flex flex-col xl:flex-row gap-6">
        
//         {/* กราฟเส้น - ยอดขายรายวัน */}
//         <div className="flex-1 bg-white dark:bg-[#142621] border border-gray-100 dark:border-teal-900/20 rounded-2xl p-4 md:p-6 shadow-sm transition-colors overflow-hidden">
//           <div className="mb-6">
//             <h3 className="text-lg font-bold text-gray-800 dark:text-white">ยอดขายรายวัน</h3>
//             <p className="text-xs text-gray-400 dark:text-teal-100/40">สถิติรายได้ย้อนหลัง</p>
//           </div>
//           <div className="h-[250px] md:h-[320px] w-full">
//             <ResponsiveContainer width="100%" height="100%">
//               <LineChart data={Linedata}>
//                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={theme === 'dark' ? '#1a2e29' : '#f0f0f0'} />
//                 <XAxis dataKey="date" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} stroke={theme === 'dark' ? '#55a694' : '#888'} />
//                 <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} stroke={theme === 'dark' ? '#55a694' : '#888'} tickFormatter={(v) => v.toLocaleString()} />
//                 <Tooltip 
//                    contentStyle={{ backgroundColor: theme === 'dark' ? '#142621' : '#fff', border: 'none', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
//                    itemStyle={{ color: theme === 'dark' ? '#5de4c7' : '#0d3d30' }}
//                 />
//                 <Line type="monotone" dataKey="sales" stroke={theme === 'dark' ? '#5de4c7' : '#0d3d30'} strokeWidth={3} dot={{ r: 4, fill: theme === 'dark' ? '#5de4c7' : '#0d3d30' }} />
//               </LineChart>
//             </ResponsiveContainer>
//           </div>
//         </div>

//         {/* กราฟวงกลม - แก้ Label ซ้อนด้วย Legend */}
//         <div className="bg-white dark:bg-[#142621] border border-gray-100 dark:border-teal-900/20 rounded-2xl p-4 md:p-6 shadow-sm w-full xl:w-[400px] transition-colors">
//           <div className="mb-4">
//             <h3 className="text-lg font-bold text-gray-800 dark:text-white">สถานะออเดอร์</h3>
//             <p className="text-xs text-gray-400 dark:text-teal-100/40">แบ่งตามความคืบหน้า</p>
//           </div>
//           <div className="h-[300px] flex flex-col justify-center">
//             <ResponsiveContainer width="100%" height="100%">
//               <PieChart>
//                 <Pie
//                   data={Piedata}
//                   dataKey="value"
//                   nameKey="name"
//                   cx="50%" cy="45%"
//                   innerRadius={60}
//                   outerRadius={85}
//                   paddingAngle={5}
//                   label={false} // ปิด Label ที่ซ้อนกัน
//                 >
//                   {Piedata.map((_, index) => (
//                     <Cell key={index} fill={COLORS[index % COLORS.length]} stroke={theme === 'dark' ? '#142621' : '#fff'} strokeWidth={2} />
//                   ))}
//                 </Pie>
//                 <Tooltip />
//                 <Legend 
//                   verticalAlign="bottom" 
//                   formatter={(value, entry: any) => (
//                     <span className="text-xs font-medium text-gray-600 dark:text-teal-200">
//                       {value} ({((entry.payload.percent || 0) * 100).toFixed(0)}%)
//                     </span>
//                   )}
//                 />
//               </PieChart>
//             </ResponsiveContainer>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }

"use client"
import HeaderAdmin from '@/app/components/layout/headeradmin'
import { ShoppingCart, TrendingUp, Package, Clock, Users, UserCheck } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts"
import { PieChart, Pie } from "recharts"
import { Orders } from '@/app/types/model';

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<Orders[]>([]);
  const [resellers, setResellers] = useState<any[]>([]);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [resOrders, resResellers] = await Promise.all([
        fetch(`${API_URL}/admin/orders`, { credentials: "include" }),
        fetch(`${API_URL}/admin/resellers`, { credentials: "include" })
      ]);
      const dataOrders = await resOrders.json();
      const dataResellers = await resResellers.json();
      setOrders(dataOrders.data ?? []);
      setResellers(dataResellers.data ?? []);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  }, [API_URL]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const totalOrders     = orders.length;
  const totalSales      = orders.reduce((sum, o) => sum + (o.total_amount || 0), 0);
  const totalProfit     = orders.reduce((sum, o) => sum + (o.reseller_profit || 0), 0);
  const pendingOrders   = orders.filter(o => o.status === "pending").length;
  const allAgents       = resellers.length;
  const pendingResellers = resellers.filter(r => r.status === "pending").length;
  const formatNum = (num: number) => num.toLocaleString('th-TH');

  const Linedata = useMemo(() => {
    if (!orders || orders.length === 0) return [];

    const salesMap = orders.reduce((acc: any, order) => {
      const raw = order.created_at;
      if (!raw) return acc;
      // รองรับทั้ง "21/03/2026 14:35" และ "2026-03-21T14:35"
      let dateKey: string;
      if (raw.includes('T')) {
        dateKey = raw.split('T')[0];
      } else {
        const parts = raw.split(' ')[0].split('/');
        if (parts.length !== 3) return acc;
        dateKey = `${parts[2]}-${parts[1]}-${parts[0]}`;
      }
      acc[dateKey] = (acc[dateKey] ?? 0) + (Number(order.total_amount) || 0);
      return acc;
    }, {});

    return Object.keys(salesMap)
      .sort()
      .map(dateKey => {
        const d = new Date(dateKey);
        return {
          date: `${d.getDate()}/${d.getMonth() + 1}`,
          sales: salesMap[dateKey],
        };
      });
  }, [orders]);

  const Piedata = [
    { name: "สำเร็จ",      value: orders.filter(o => o.status === "completed").length },
    { name: "รอดำเนินการ", value: orders.filter(o => o.status === "pending").length },
    { name: "ยกเลิก",      value: orders.filter(o => o.status === "cancelled").length },
  ];
  // ใช้สีที่คนตาบอดสีแยกแยะได้ (ฟ้า/ส้ม/แดง แทน เขียว/เหลือง/แดง)
  const COLORS = ["#2563eb", "#f97316", "#e11d48"];
  // pattern สำหรับ accessibility เพิ่มเติม
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
      <HeaderAdmin />

      <div className="flex items-center gap-3 mx-8 mt-6 mb-2">
        <h1 className="text-[#0d3d30] dark:text-emerald-400 text-3xl font-bold tracking-tight">
          Dashboard
        </h1>
      </div>

      {/* การ์ดด้านบน */}
      <section
        aria-label="สรุปข้อมูลภาพรวม"
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mx-8"
      >
        {/* ยอดขายรวม */}
        <div className="relative flex flex-col justify-between 
                        bg-white dark:bg-gray-800 
                        border-2 border-gray-100 dark:border-gray-700 
                        rounded-2xl p-5 shadow-sm overflow-hidden">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-900 
                          flex items-center justify-center mb-3">
            <TrendingUp size={18} className="text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
          </div>
          <p className="text-xs text-gray-400 dark:text-gray-500 font-medium uppercase tracking-wide mb-1">
            ยอดขายรวม
          </p>
          <p className="text-[22px] font-bold text-gray-800 dark:text-gray-100 leading-tight">
            ฿{formatNum(totalSales)}
          </p>
        </div>

        {/* กำไรรวม */}
        <div className="relative flex flex-col justify-between 
                        bg-white dark:bg-gray-800 
                        border-2 border-gray-100 dark:border-gray-700 
                        rounded-2xl p-5 shadow-sm overflow-hidden">
          <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900 
                          flex items-center justify-center mb-3">
            <ShoppingCart size={18} className="text-blue-600 dark:text-blue-400" aria-hidden="true" />
          </div>
          <p className="text-xs text-gray-400 dark:text-gray-500 font-medium uppercase tracking-wide mb-1">
            กำไรรวม
          </p>
          <p className="text-[22px] font-bold text-gray-800 dark:text-gray-100 leading-tight">
            ฿{formatNum(totalProfit)}
          </p>
        </div>

        {/* จำนวนออเดอร์ทั้งหมด */}
        <div className="relative flex flex-col justify-between 
                        bg-white dark:bg-gray-800 
                        border-2 border-gray-100 dark:border-gray-700 
                        rounded-2xl p-5 shadow-sm overflow-hidden">
          <div className="w-10 h-10 rounded-xl bg-violet-50 dark:bg-violet-900 
                          flex items-center justify-center mb-3">
            <Package size={18} className="text-violet-600 dark:text-violet-400" aria-hidden="true" />
          </div>
          <p className="text-xs text-gray-400 dark:text-gray-500 font-medium uppercase tracking-wide mb-1">
            จำนวนออเดอร์ทั้งหมด
          </p>
          <p className="text-[22px] font-bold text-gray-800 dark:text-gray-100 leading-tight">
            {formatNum(totalOrders)}
          </p>
        </div>

        {/* ออเดอร์รอดำเนินการ */}
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
              รอดำเนินการ
            </span>
          </div>
          <p className="text-xs text-gray-400 dark:text-gray-500 font-medium uppercase tracking-wide mb-1">
            ออเดอร์รอดำเนินการ
          </p>
          <p className="text-[22px] font-bold text-gray-800 dark:text-gray-100 leading-tight">
            {formatNum(pendingOrders)}
          </p>
        </div>

        {/* จำนวนตัวแทนทั้งหมด */}
        <div className="relative flex flex-col justify-between 
                        bg-white dark:bg-gray-800 
                        border-2 border-gray-100 dark:border-gray-700 
                        rounded-2xl p-5 shadow-sm overflow-hidden">
          <div className="w-10 h-10 rounded-xl bg-sky-50 dark:bg-sky-900 
                          flex items-center justify-center mb-3">
            <Users size={18} className="text-sky-600 dark:text-sky-400" aria-hidden="true" />
          </div>
          <p className="text-xs text-gray-400 dark:text-gray-500 font-medium uppercase tracking-wide mb-1">
            จำนวนตัวแทนทั้งหมด
          </p>
          <p className="text-[22px] font-bold text-gray-800 dark:text-gray-100 leading-tight">
            {formatNum(allAgents)}
          </p>
        </div>

        {/* ตัวแทนที่รออนุมัติ */}
        <div className="relative flex flex-col justify-between 
                        bg-white dark:bg-gray-800 
                        border-2 border-gray-100 dark:border-gray-700 
                        rounded-2xl p-5 shadow-sm overflow-hidden">
          <div className="flex items-start justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-900 flex items-center justify-center">
              <UserCheck size={18} className="text-rose-600 dark:text-rose-400" aria-hidden="true" />
            </div>
            <span className="text-[11px] font-medium px-2 py-0.5 rounded-full 
                             bg-rose-50 dark:bg-rose-900 
                             text-rose-600 dark:text-rose-400
                             border border-rose-200 dark:border-rose-700">
              รออนุมัติ
            </span>
          </div>
          <p className="text-xs text-gray-400 dark:text-gray-500 font-medium uppercase tracking-wide mb-1">
            ตัวแทนที่รออนุมัติ
          </p>
          <p className="text-[22px] font-bold text-gray-800 dark:text-gray-100 leading-tight">
            {formatNum(pendingResellers)}
          </p>
        </div>
      </section>

      {/* กราฟ */}
      <section className="mx-8 my-6 flex flex-col lg:flex-row gap-6">

        {/* กราฟเส้น */}
        <div className="flex-1 bg-white dark:bg-gray-800 
                        border-2 border-gray-100 dark:border-gray-700 
                        rounded-2xl p-6 shadow-sm">
          <div className="mb-4">
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">
              กราฟแสดงยอดขายรายวัน
            </h3>
            <p className="text-xs text-gray-400 dark:text-gray-500">
              ข้อมูลยอดขายรวมในแต่ละวัน (บาท)
            </p>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={Linedata}>
                <CartesianGrid strokeDasharray="2 2" vertical={false} stroke="#374151" />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 12, fill: "#9ca3af" }}
                  axisLine={{ stroke: "#4b5563" }}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 12, fill: "#9ca3af" }}
                  axisLine={{ stroke: "#4b5563" }}
                  tickLine={false}
                  tickFormatter={(value) => `฿${value.toLocaleString()}`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1f2937",
                    border: "1px solid #374151",
                    borderRadius: "8px",
                    color: "#f9fafb",
                  }}
                  formatter={(value: any) => {
                    if (value === undefined || value === null) return ["฿0", "ยอดขาย"];
                    return [`฿${Number(value).toLocaleString()}`, "ยอดขาย"];
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="sales"
                  stroke="#34d399"
                  strokeWidth={2}
                  dot={{ r: 4, fill: "#34d399" }}
                  activeDot={{ r: 6 }}
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
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">
              กราฟแสดงสถานะของออเดอร์ทั้งหมด
            </h3>
            <p className="text-xs text-gray-400 dark:text-gray-500">
              สัดส่วนสถานะคำสั่งซื้อปัจจุบัน
            </p>
          </div>
          <div className="flex flex-col items-center h-[300px]">
            <PieChart width={300} height={220}>
              <Pie
                data={Piedata}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={90}
              >
                {Piedata.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1f2937",
                  border: "1px solid #374151",
                  borderRadius: "8px",
                  color: "#f9fafb",
                }}
              />
            </PieChart>
            {/* Legend แบบ accessible แทน label บนกราฟ */}
            <div className="flex flex-wrap justify-center gap-3 mt-2">
              {Piedata.map((entry, index) => (
                <div key={index} className="flex items-center gap-1.5">
                  <span
                    className="text-base font-bold"
                    style={{ color: COLORS[index] }}
                    aria-hidden="true"
                  >
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