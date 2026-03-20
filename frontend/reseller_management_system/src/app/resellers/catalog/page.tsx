"use client"
import { Catalog as CatalogType } from '@/app/types/model';
import HeaderReseller from '@/app/components/layout/headerReseller'
import Main from '@/app/components/layout/main'
import CatalogCrad from '@/app/components/cradcatalogreseller/catalog';
import { useCallback, useEffect, useState } from 'react';

const mockmain = {
  text1: "สินค้าส่วนกลาง",
  text2: "เลือกสินค้าจากระบบ เพื่อนำไปวางขายในหน้าร้านของคุณ"
}

const CatalogPage = () => {
  const [data, setData] = useState<CatalogType[]>([]);
  const [loading, setLoading] = useState(true);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const fetchData = useCallback(async () => {
    try {
      setLoading(true); // เซ็ต loading ทุกครั้งที่ดึงใหม่
      const res = await fetch(`${API_URL}/reseller/catalog`, {
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

  // 2. เรียกใช้ครั้งแรกตอนโหลดหน้า
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const res = await fetch(`${API_URL}/reseller/catalog`, {
  //         credentials: "include",
  //       });
  //       const result = await res.json();
  //       setData(result.data ?? []);
  //     } catch {
  //       setData(data);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // },[]);
  return (
    <div className="min-h-screen bg-[#F5F3EE]">
      <HeaderReseller/>
      <Main main={mockmain}/>
      <div className='px-8 py-5'>
        <CatalogCrad data={data} loading={loading} fetchCatalog={fetchData}/>
      </div>
    </div>
  )
}

export default CatalogPage