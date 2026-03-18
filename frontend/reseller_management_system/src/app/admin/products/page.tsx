"use client"
import HeaderAdmin from '@/app/components/layout/headeradmin'
import { useEffect, useState } from 'react';
import { DataTable } from '@/app/components/ui/datatable';
import { productColumns as columns } from '@/app/components/columnsadmin/productadmin';
import Main from '@/app/components/layout/main';
import { Product as ProductType } from '@/app/types/model';

const mockmain = {
  text1: "จัดการสินค้า",
  text2: "เพิ่ม แก้ไข ลบ และกำหนดราคาสินค้าในระบบ"
}

const ProductsPage = () => {
  const [data, setData] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);
  
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  useEffect(() => {
    const fetchData = async () => {
      try {
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
    };

    fetchData();
  }, [API_URL]);
  return (
    <div className='min-h-screen bg-[#F5F3EE]'>
      <HeaderAdmin />
      <Main main={mockmain}/>
      <div className='px-8 py-7'>
        <DataTable columns={columns} data={data} loading={loading}  />
      </div>
    </div>
  )
}

export default ProductsPage