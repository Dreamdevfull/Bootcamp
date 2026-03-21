// "use client"
// import { Catalog as CatalogType } from '@/app/types/model';
// import HeaderReseller from '@/app/components/layout/headerReseller'
// import Main from '@/app/components/layout/main'
// import CatalogCrad from '@/app/components/cradcatalogreseller/catalog';
// import { useEffect, useState } from 'react';

// const mockmain = {
//   text1: "สินค้าส่วนกลาง",
//   text2: "เลือกสินค้าจากระบบ เพื่อนำไปวางขายในหน้าร้านของคุณ"
// }

// const CatalogPage = () => {
//   const [data, setData] = useState<CatalogType[]>([]);
//   const [loading, setLoading] = useState(true);
//   const API_URL = process.env.NEXT_PUBLIC_API_URL;
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await fetch(`${API_URL}/reseller/catalog`, {
//           credentials: "include",
//         });
//         const result = await res.json();
//         setData(result.data ?? []);
//       } catch {
//         setData(data);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   },[]);
//   return (
//     <div className="min-h-screen bg-[#F5F3EE]">
//       <HeaderReseller/>
//       <Main main={mockmain}/>
//       <div className='px-8 py-5'>
//         <CatalogCrad data={data} loading={loading}/>
//       </div>
//     </div>
//   )
// }

// export default CatalogPage

"use client"
import { Catalog as CatalogType } from '@/app/types/model';
import HeaderReseller from '@/app/components/layout/headerReseller'
import Main from '@/app/components/layout/main'
import CatalogCrad from '@/app/components/cradcatalogreseller/catalog';
import { useEffect, useState, useCallback } from 'react'; 

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

      const res = await fetch(`${API_URL}/reseller/catalog`, {
        credentials: "include",
      });
      const result = await res.json();
      setData(result.data ?? []);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  }, [API_URL]);

  
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="min-h-screen bg-[#F5F3EE]">
      <HeaderReseller/>
      <Main main={mockmain}/>
      <div className='px-8 py-5'>
        <CatalogCrad 
          data={data} 
          loading={loading} 
          onSuccess={fetchData} 
        />
      </div>
    </div>
  )
}

export default CatalogPage