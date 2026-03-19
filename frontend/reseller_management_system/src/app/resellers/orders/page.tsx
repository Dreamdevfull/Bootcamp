"use client"
import { useEffect, useState } from 'react'
import { OrderReseller as OrderResellerType } from '@/app/types/model'
import HeaderReseller from '@/app/components/layout/headerReseller'
import Main from '@/app/components/layout/main'
import { DataTable } from '@/app/components/ui/datatable'
import { OrdersColumn as columns } from '@/app/components/columnsreseller/orders';

const mockmain = {
  text1: "ออเดอร์ของฉัน",
  text2: "รายการสั่งซื้อของลูกค้าที่ซื้อผ่านหน้าร้านของคุณเท่านั้น"
}

const OrdersPage = () => {
  const [data, setData] = useState<OrderResellerType[]>([]);
  const [loading, setLoading] = useState(true);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${API_URL}/reseller/orders`, {
          credentials: "include",
        });
        const result = await res.json();
        setData(result.data ?? []);;
      } catch {
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  })
  return (
    <div className="min-h-screen bg-[#F5F3EE]">
      <HeaderReseller/>
      <Main main={mockmain}/>
      <div className='px-8 py-7'>
        <DataTable columns={columns} data={data} loading={loading} />
      </div>
    </div>
  )
}

export default OrdersPage;