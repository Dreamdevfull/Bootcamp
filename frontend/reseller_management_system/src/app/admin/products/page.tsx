"use client"
import HeaderAdmin from '@/app/components/layout/headeradmin'
import { useEffect, useState } from 'react';
import { DataTable } from '@/app/components/ui/datatable';
import { productColumns as columns } from '@/app/components/columns/productadmin';
import Main from '@/app/components/layout/main';

interface Product {
  id: number;
  name: string;
  description: string;
  Image: string;
  cost_price: number;
  min_price: number;
  stock: number;
  Create_at: string;
}

const ProductsPage = () => {
  const [data, setData] = useState<Product[]>([]);
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
      <Main />
      <div className='px-8 py-7'>
        <DataTable columns={columns} data={data} loading={loading}  />
      </div>
    </div>
  )
}

export default ProductsPage