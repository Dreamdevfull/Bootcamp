"use client";
import HeaderAdmin from "@/app/components/layout/headeradmin";
import { ManageOrderAdmin as manageOrderColumns } from "@/app/components/columnsadmin/manageorderadmin";
import { useEffect, useState, useMemo } from "react";
import { DataTable } from "@/app/components/ui/datatable";
import Main from "@/app/components/layout/main";
import { Orders as OrdersType } from "@/app/types/model";
import { FilterSearchAndDropdown } from "@/app/components/ui/filter";

const mockmain = {
  text1: "จัดการออเดอร์",
  text2: "ตรวจสอบออเดอร์จากทุกร้านค้า และอัปเดตสถานะการจัดส่ง",
};

const OrdersPage = () => {
  const [data, setData] = useState<OrdersType[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const fetchData = async () => {
    try {
      const res = await fetch(`${API_URL}/admin/orders`, {
        credentials: "include",
      });
      const result = await res.json();
      setData(result.data ?? []);
    } catch {
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [API_URL]);

  const columns = manageOrderColumns(fetchData);

  const filteredOrders = useMemo(() => {
    return data.filter((order) => {
      const matchesSearch =
        order.order_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer_name.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || order.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [data, searchTerm, statusFilter]);

  return (
    <div className="min-h-screen bg-[#F5F3EE] dark:bg-[#1a1a18]">
      <HeaderAdmin />
      <Main main={mockmain} />

      <FilterSearchAndDropdown
        onSearch={setSearchTerm}
        onFilterType={setStatusFilter}
        onSortPrice={() => {}}
      />

      <div className="px-8 py-7">
        <DataTable columns={columns} data={filteredOrders} loading={loading} />
      </div>
    </div>
  );
};

export default OrdersPage;


//darkmode + responsive
// "use client";
// import HeaderAdmin from "@/app/components/layout/headeradmin";
// import { ManageOrderAdmin as manageOrderColumns } from "@/app/components/columnsadmin/manageorderadmin";
// import { useEffect, useState, useMemo } from "react";
// import { DataTable } from "@/app/components/ui/datatable";
// import Main from "@/app/components/layout/main";
// import { Orders as OrdersType } from "@/app/types/model";
// import { FilterSearchAndDropdown } from "@/app/components/ui/filter";
// import { useTheme } from "next-themes";
// import { Sun, Moon } from "lucide-react";

// const mockmain = {
//   text1: "จัดการออเดอร์",
//   text2: "ตรวจสอบออเดอร์จากทุกร้านค้า และอัปเดตสถานะการจัดส่ง",
// };

// const OrdersPage = () => {
//   const { theme, setTheme } = useTheme();
//   const [mounted, setMounted] = useState(false);
//   const [data, setData] = useState<OrdersType[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [statusFilter, setStatusFilter] = useState("all");

//   const API_URL = process.env.NEXT_PUBLIC_API_URL;

//   // ป้องกัน Hydration Error
//   useEffect(() => setMounted(true), []);

//   const fetchData = async () => {
//     try {
//       const res = await fetch(`${API_URL}/admin/orders`, {
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

//   const columns = manageOrderColumns(fetchData);

//   const filteredOrders = useMemo(() => {
//     return data.filter((order) => {
//       const matchesSearch =
//         order.order_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         order.customer_name.toLowerCase().includes(searchTerm.toLowerCase());

//       const matchesStatus =
//         statusFilter === "all" || order.status === statusFilter;

//       return matchesSearch && matchesStatus;
//     });
//   }, [data, searchTerm, statusFilter]);

//   if (!mounted) return null;

//   return (
//     <div className="min-h-screen bg-[#F5F3EE] dark:bg-[#0a1a16] transition-colors duration-300">
//       <HeaderAdmin />
      
//       {/* Header Section พร้อมปุ่มสลับโหมด */}
//       <div className="relative">
//         <Main main={mockmain} />
        
//         {/* Floating Dark Mode Toggle - จัดตำแหน่งให้ดูดีทั้ง Mobile/Desktop */}
//         <div className="absolute top-4 right-4 md:right-8">
//           <button
//             onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
//             className="p-2.5 rounded-xl bg-white dark:bg-[#142621] border border-gray-200 dark:border-teal-900/30 shadow-md hover:scale-105 transition-all text-[#1a6b5a] dark:text-teal-400"
//           >
//             {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
//           </button>
//         </div>
//       </div>

//       <div className="max-w-[1600px] mx-auto">
//         {/* Filter Section - ปรับ Padding ตามขนาดจอ */}
//         <div className="px-4 md:px-8 mt-4">
//           <FilterSearchAndDropdown
//             onSearch={setSearchTerm}
//             onFilterType={setStatusFilter}
//             onSortPrice={() => {}}
//           />
//         </div>

//         {/* Table Section - ทำให้รองรับการ Scroll แนวนอนในมือถือ */}
//         <div className="px-4 md:px-8 py-5 md:py-7">
//           <div className="bg-white dark:bg-[#142621] border border-gray-100 dark:border-teal-900/20 rounded-2xl shadow-sm overflow-hidden transition-colors">
//             <DataTable 
//               columns={columns} 
//               data={filteredOrders} 
//               loading={loading} 
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OrdersPage;
