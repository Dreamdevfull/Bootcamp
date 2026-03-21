"use client"
import React, { useEffect, useState, useCallback, useMemo} from 'react'
import HeaderReseller from '@/app/components/layout/headerReseller'
import Main from '@/app/components/layout/main'
import { ProductsColumn } from '@/app/components/columnsreseller/myproducts';
import { ShopProducts as ShopProductsType } from '@/app/types/model';
import { DataTable } from '@/app/components/ui/datatable';
import { FilterSearchAndDropdown } from '@/app/components/ui/filter';
import { useRouter } from 'next/navigation';

const Shoppage = () => {
  const [data, setData] = useState<ShopProductsType[]>([]);
  const [shopSlug, setShopSlug] = useState("")
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("all");
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/reseller/my-products`, {
        credentials: "include",
      });
      const result = await res.json();
      console.log("result:", result)
      console.log("fetchData result:", result.data);
      setData((result.data ?? []).sort((a: ShopProductsType, b: ShopProductsType) => b.id - a.id));
      setShopSlug(result.data?.[0]?.shop?.shop_slug ?? "")
    } catch {
      setData([]);
    } finally {
      setLoading(false);
    }
  }, [API_URL]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const filteredData = useMemo(() => {
    let result = [...data];

    
    if (searchTerm) {
      result = result.filter((item) =>
        item.product?.name?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    
    if (sortOrder === "lowToHigh") {
      result.sort((a, b) => a.selling_price - b.selling_price);
    } else if (sortOrder === "highToLow") {
      result.sort((a, b) => b.selling_price - a.selling_price);
    } else {
      
      result.sort((a, b) => b.id - a.id);
    }

    return result;
  }, [data, searchTerm, sortOrder]);

  const mockmain = {
    text1: "จัดการหน้าร้าน",
    text2: "สินค้าที่คุณกำลังขายในหน้าร้านคุณ",
    button: {
      label: "ดูหน้าร้านค้า",
      onClick: () => router.push(`/shop/${shopSlug}`),
    },
  };

  return (
    <div className="min-h-screen bg-[#F5F3EE] dark:bg-[#1a1a18]">
      <HeaderReseller />
      <Main main={mockmain} />
     <FilterSearchAndDropdown 
          onSearch={setSearchTerm}
          onSortPrice={setSortOrder}
          onFilterType={() => {}} 
        />
      <div className='px-8 py-1'>
       <DataTable 
          columns={ProductsColumn(fetchData)} 
          data={filteredData} 
          loading={loading} 
        />
      </div>
    </div>
  );
};

export default Shoppage;