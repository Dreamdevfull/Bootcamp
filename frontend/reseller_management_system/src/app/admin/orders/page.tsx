"use client"
import HeaderAdmin from '@/app/components/layout/headeradmin'
import { ColumnDef } from "@tanstack/react-table";
import { useEffect, useState } from 'react'
import { DataTable } from '@/app/components/ui/datatable';

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
    <div>
      <HeaderAdmin />
      <div className='p-5'>
        <DataTable columns={columns} data={data} loading={loading} />
      </div>
    </div>
  )
}

export default OrdersPage