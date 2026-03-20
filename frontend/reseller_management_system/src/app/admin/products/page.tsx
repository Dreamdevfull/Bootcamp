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
import { FilterSearchAndDropdown } from "@/app/components/ui/filter";

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
    let result = data.filter((item) =>
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
    <div className="min-h-screen bg-[#F5F3EE]">
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
