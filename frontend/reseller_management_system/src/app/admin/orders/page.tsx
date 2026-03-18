"use client"
import HeaderAdmin from '@/app/components/layout/headeradmin'
import { ColumnDef } from "@tanstack/react-table";
import { useEffect, useState } from 'react'
import { DataTable } from '@/app/components/ui/datatable';
import Main from '@/app/components/layout/main';

interface orders {
  id: number,
  
}
const columns: ColumnDef<orders>[] = [
  { accessorKey: "name", header: "ชื่อ" },
  { accessorKey: "email", header: "อีเมล" },
  { accessorKey: "status", header: "สถานะ" },
];

const OrdersPage = () => {
  const [data, setData] = useState<orders[]>([]);
  const [loading, setLoading] = useState(true);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  useEffect(() => {
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

    fetchData();
  }, [API_URL]);

  return (
    <div className='min-h-screen bg-[#F5F3EE]'>
      <HeaderAdmin />
      <Main />
      <div className='px-8 py-7'>
        <DataTable columns={columns} data={data} loading={loading} />
      </div>
    </div>
  )
}

export default OrdersPage