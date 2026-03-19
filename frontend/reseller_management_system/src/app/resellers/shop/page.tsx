"use client"
import React from 'react'
import HeaderReseller from '@/app/components/layout/headerReseller'
import Main from '@/app/components/layout/main'
// import ShopProductCrad from '@/app/components/cradcatalogreseller/shopproduct';
import { ProductsColumn } from '@/app/components/columnsreseller/myproducts';
import { useEffect, useState } from 'react';
import { ShopProducts as ShopProductsType } from '@/app/types/model';
import { DataTable } from '@/app/components/ui/datatable';

const mockmain = {
  text1: "จัดการหน้าร้าน",
  text2: "สินค้าที่คุณกำลังขายในหน้าร้านคุณ"
}

const Shoppage = () => {
  const [data, setData] = useState<ShopProductsType[]>([]);
    const [loading, setLoading] = useState(true);
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    useEffect(() => {
      const fetchData = async () => {
        try {
          const res = await fetch(`${API_URL}/reseller/my-products`, {
            credentials: "include",
          });
          const result = await res.json();
          setData(result.data ?? []);
        } catch {
          setData(data);
        } finally {
          setLoading(false);
        }
      };
  
      fetchData();
    },[]);
  return (
    <div className="min-h-screen bg-[#F5F3EE]">
      <HeaderReseller/>
      <Main main={mockmain}/>
      <div className='px-8 py-7'>
        {/* <ShopProductCrad data={data} loading={loading}/> */}
        <DataTable columns={ProductsColumn} data={data} loading={loading} />
      </div>
    </div>
  )
}

export default Shoppage;