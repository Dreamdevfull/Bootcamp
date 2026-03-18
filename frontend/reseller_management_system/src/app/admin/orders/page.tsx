"use client"
import HeaderAdmin from '@/app/components/layout/headeradmin'
import { ManageOrderAdmin as columns } from "@/app/components/columns/manageorderadmin";
import { useEffect, useState } from 'react'
import { DataTable } from '@/app/components/ui/datatable';
import Main from '@/app/components/layout/main';

interface Orders {
  id: number;
  order_number: string;
  shop_id: number;
  customer_name: string;
  customer_phone: string;          
  shipping_address: string;
  total_amount: number;
  reseller_profit: number;
  status: string;
  created_at: string;
  order_items: {
    id: number;
    order_id: number;
    products_id: number;
    products_name: string;
    cost_price: number;
    selling_price: number;
    quantity: number;
  }
}

const OrdersPage = () => {
  const [data, setData] = useState<Orders[]>([]);
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