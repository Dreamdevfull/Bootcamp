// "use client";
// import HeaderAdmin from "@/app/components/layout/headeradmin";
// import { ManageOrderAdmin as manageOrderColumns } from "@/app/components/columnsadmin/manageorderadmin";
// import { useEffect, useState, useMemo } from "react";
// import { DataTable } from "@/app/components/ui/datatable";
// import Main from "@/app/components/layout/main";
// import { Orders as OrdersType } from "@/app/types/model";
// import { FilterSearchAndDropdown4 } from "@/app/components/ui/search/filter4";

// const mockmain = {
//   text1: "จัดการออเดอร์",
//   text2: "ตรวจสอบออเดอร์จากทุกร้านค้า และอัปเดตสถานะการจัดส่ง",
// };

// const OrdersPage = () => {
//   const [data, setData] = useState<OrdersType[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [statusFilter, setStatusFilter] = useState("all");

//   const API_URL = process.env.NEXT_PUBLIC_API_URL;
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
//       const search = searchTerm.toLowerCase().trim();
//       const orderNumber = order.order_number?.toLowerCase() || "";
//       const customerName = order.customer_name?.toLowerCase() || "";

//       const matchesSearch = orderNumber.includes(search) || customerName.includes(search);

//       const matchesStatus = statusFilter === "all" || order.status === statusFilter;

//       return matchesSearch && matchesStatus;
//     });
//   }, [data, searchTerm, statusFilter]);

//   return (
//     <div className="min-h-screen bg-[#F5F3EE] dark:bg-[#1a1a18]">
//       <HeaderAdmin />
//       <Main main={mockmain} />

//       <FilterSearchAndDropdown4
//         onSearch={setSearchTerm}
//         onFilterType={setStatusFilter}
//         onSortPrice={() => {}}
//       />

//       <div className="px-8 py-7">
//         <DataTable columns={columns} data={filteredOrders} loading={loading} />
//       </div>
//     </div>
//   );
// };

// export default OrdersPage;

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

"use client";
import HeaderAdmin from "@/app/components/layout/headeradmin";
import { ManageOrderAdmin as manageOrderColumns } from "@/app/components/columnsadmin/manageorderadmin";
import { useEffect, useState, useMemo, useCallback } from "react";
import { DataTable } from "@/app/components/ui/datatable";
import Main from "@/app/components/layout/main";
import { Orders as OrdersType } from "@/app/types/model";
import { FilterSearchAndDropdown4 } from "@/app/components/ui/search/filter4";

const mockmain = {
  text1: "จัดการออเดอร์",
  text2: "ตรวจสอบออเดอร์จากทุกร้านค้า และอัปเดตสถานะการจัดส่ง",
};

const OrdersPage = () => {
  const [data, setData] = useState<OrdersType[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("");

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/admin/orders`, {
        credentials: "include",
      });
      const result = await res.json();

      const sortedData = (result.data ?? []).sort(
        (a: OrdersType, b: OrdersType) => b.id - a.id,
      );
      setData(sortedData);
    } catch (error) {
      console.error("Fetch orders error:", error);
      setData([]);
    } finally {
      setLoading(false);
    }
  }, [API_URL]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const columns = manageOrderColumns(fetchData);

  const filteredOrders = useMemo(() => {
    // กรองข้อมูล (Filter)
    let result = data.filter((order) => {
      const search = searchTerm.toLowerCase().trim();
      const orderNumber = order.order_number?.toLowerCase() || "";
      const customerName = order.customer_name?.toLowerCase() || "";
      const matchesSearch =
        orderNumber.includes(search) || customerName.includes(search);
      const matchesStatus =
        statusFilter === "all" || order.status === statusFilter;
      return matchesSearch && matchesStatus;
    });

    // เรียงลำดับข้อมูล (Sort) ตามที่เลือกจาก Dropdown
    if (sortOrder === "lowToHigh") {
      result.sort((a, b) => a.total_amount - b.total_amount);
    } else if (sortOrder === "highToLow") {
      result.sort((a, b) => b.total_amount - a.total_amount);
    } else {
      // ถ้าไม่ได้เลือก หรือเลือก 'ราคาทั้งหมด' ให้เรียงตาม ID ล่าสุด
      result.sort((a, b) => b.id - a.id);
    }

    return result;
  }, [data, searchTerm, statusFilter, sortOrder]);

  return (
    <div className="min-h-screen bg-[#F5F3EE] dark:bg-[#0a1a16] transition-colors duration-300">
      <HeaderAdmin />
      <Main main={mockmain} />

      <FilterSearchAndDropdown4
        onSearch={setSearchTerm}
        onFilterType={setStatusFilter}
        onSortPrice={setSortOrder}
      />

      <div className="px-8 py-7">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
          <DataTable
            columns={columns}
            data={filteredOrders}
            loading={loading}
          />

          {/* กรณีค้นหาแล้วไม่เจอข้อมูล */}
          {!loading && filteredOrders.length === 0 && (
            <div className="text-center py-20 text-gray-400">
              <p className="text-xl">🔍 ไม่พบข้อมูลออเดอร์ที่ค้นหา</p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setStatusFilter("all");
                }}
                className="mt-2 text-[#1a6b5a] underline cursor-pointer"
              >
                ล้างตัวกรองทั้งหมด
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;
