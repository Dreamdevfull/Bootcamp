"use client";
import HeaderAdmin from "@/app/components/layout/headeradmin";
import { useEffect, useState, useCallback, useMemo } from "react";
import { DataTable } from "@/app/components/ui/datatable";
import {
  productColumns as columns,
  productColumns,
} from "@/app/components/columnsadmin/productadmin";
import Main from "@/app/components/layout/main";
import { Product as ProductType } from "@/app/types/model";
import PopAddProducts from "@/app/components/ui/popup/popadmin/addproducts";
import { FilterSearchAndDropdown } from "@/app/components/ui/search/filter";

const ProductsPage = () => {
  const [data, setData] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  const mockmain = {
    text1: "จัดการสินค้า",
    text2: "เพิ่ม แก้ไข ลบ และกำหนดราคาสินค้าในระบบ",
    button: {
      label: "+ เพิ่มสินค้า",
      onClick: () => setOpen(true),
    },
  };

  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const res = await fetch(`${API_URL}/admin/products`, {
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

  //   fetchData();
  // }, [API_URL]);

  // 1. แยก fetchData ออกมาให้เรียกซ้ำได้
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/admin/products`, {
        credentials: "include",
      });
      const result = await res.json();
      setData(result.data ?? []);
    } catch {
      setData([]);
    } finally {
      setLoading(false);
    }
  }, [API_URL]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const filteredProducts = useMemo(() => {
    const result = data.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    if (typeFilter !== "all") {
    }

    
    if (sortOrder === "lowToHigh") {
      result.sort((a, b) => a.min_price - b.min_price);
    } else if (sortOrder === "highToLow") {
      result.sort((a, b) => b.min_price - a.min_price);
    }

    return result;
  }, [data, searchTerm, sortOrder, typeFilter]);

  const columns = productColumns(fetchData);

  return (
    <div className="min-h-screen bg-[#F5F3EE] dark:bg-gray-950 transition-colors duration-200">
      <HeaderAdmin />
      <Main main={mockmain} />

      <FilterSearchAndDropdown
        onSearch={setSearchTerm}
        onSortPrice={setSortOrder}
        onFilterType={setTypeFilter}
      />

      <div className="px-8 py-7">
        <DataTable
          columns={columns}
          data={filteredProducts}
          loading={loading}
        />

        <PopAddProducts
          open={open}
          onClose={() => setOpen(false)}
          onSuccess={() => {
            fetchData();
            setOpen(false);
          }}
        />
      </div>
    </div>
  );
};

export default ProductsPage;


//darkmode + responsive
// "use client";
// import HeaderAdmin from "@/app/components/layout/headeradmin";
// import { useEffect, useState, useCallback, useMemo } from "react";
// import { DataTable } from "@/app/components/ui/datatable";
// // ✅ แก้ไข: Import แค่ productColumns มาตัวเดียวพอ ไม่ต้องใช้ as columns ตรงนี้
// import { productColumns } from "@/app/components/columnsadmin/productadmin";
// import Main from "@/app/components/layout/main";
// import { Product as ProductType } from "@/app/types/model";
// import PopAddProducts from "@/app/components/ui/popup/popadmin/addproducts";
// import { FilterSearchAndDropdown } from "@/app/components/ui/filter";
// import { useTheme } from "next-themes";
// import { Sun, Moon } from "lucide-react";

// const ProductsPage = () => {
//   const { theme, setTheme } = useTheme();
//   const [mounted, setMounted] = useState(false);
//   const [data, setData] = useState<ProductType[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [open, setOpen] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [sortOrder, setSortOrder] = useState("all");
//   const [typeFilter, setTypeFilter] = useState("all");

//   const mockmain = {
//     text1: "จัดการสินค้า",
//     text2: "เพิ่ม แก้ไข ลบ และกำหนดราคาสินค้าในระบบ",
//     button: {
//       label: "+ เพิ่มสินค้า",
//       onClick: () => setOpen(true),
//     },
//   };

//   const API_URL = process.env.NEXT_PUBLIC_API_URL;

//   useEffect(() => setMounted(true), []);

//   const fetchData = useCallback(async () => {
//     try {
//       setLoading(true);
//       const res = await fetch(`${API_URL}/admin/products`, {
//         credentials: "include",
//       });
//       const result = await res.json();
//       setData(result.data ?? []);
//     } catch {
//       setData([]);
//     } finally {
//       setLoading(false);
//     }
//   }, [API_URL]);

//   useEffect(() => {
//     fetchData();
//   }, [fetchData]);

//   const filteredProducts = useMemo(() => {
//     // ใช้ spread operator เพื่อ clone array ป้องกันบั๊กตอน sort
//     let result = [...data].filter((item) =>
//       item.name.toLowerCase().includes(searchTerm.toLowerCase()),
//     );

//     if (sortOrder === "lowToHigh") {
//       result.sort((a, b) => a.min_price - b.min_price);
//     } else if (sortOrder === "highToLow") {
//       result.sort((a, b) => b.min_price - a.min_price);
//     }

//     return result;
//   }, [data, searchTerm, sortOrder]);

//   // ✅ เรียกใช้ columns ตรงนี้ที่เดียว
//   const columns = productColumns(fetchData);

//   if (!mounted) return null;

//   return (
//     <div className="min-h-screen bg-[#F5F3EE] dark:bg-[#0a1a16] transition-colors duration-300">
//       <HeaderAdmin />
      
//       <div className="relative">
//         <Main main={mockmain} />
//         <div className="absolute top-4 right-4 md:right-8">
//           <button
//             onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
//             className="p-2.5 rounded-xl bg-white dark:bg-[#142621] border border-gray-200 dark:border-teal-900/30 shadow-md hover:scale-105 transition-all text-[#1a6b5a] dark:text-teal-400"
//           >
//             {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
//           </button>
//         </div>
//       </div>

//       <div className="max-w-[1600px] mx-auto px-4 md:px-8">
//         <FilterSearchAndDropdown
//           onSearch={setSearchTerm}
//           onSortPrice={setSortOrder}
//           onFilterType={setTypeFilter}
//         />

//         <div className="py-5 md:py-7">
//           <div className="bg-white dark:bg-[#142621] border border-gray-100 dark:border-teal-900/20 rounded-2xl shadow-sm overflow-hidden">
//             <DataTable
//               columns={columns}
//               data={filteredProducts}
//               loading={loading}
//             />
//           </div>
//         </div>
//       </div>

//       <PopAddProducts
//         open={open}
//         onClose={() => setOpen(false)}
//         onSuccess={() => {
//           fetchData();
//           setOpen(false);
//         }}
//       />
//     </div>
//   );
// };

// // ✅ มั่นใจว่ามีบรรทัดนี้ และชื่อตรงกับชื่อฟังก์ชันข้างบน
// export default ProductsPage;