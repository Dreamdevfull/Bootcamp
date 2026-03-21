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
import { useEffect, useState } from 'react';

const mockmain = {
  text1: "สินค้าส่วนกลาง",
  text2: "เลือกสินค้าจากระบบ เพื่อนำไปวางขายในหน้าร้านของคุณ"
}

const CatalogPage = () => {
  const [data, setData] = useState<CatalogType[]>([]);
  const [loading, setLoading] = useState(true);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${API_URL}/reseller/catalog`, {
          credentials: "include",
        });
        const result = await res.json();
        setData(result.data ?? []);
      } catch {
        // แนะนำให้เซตเป็น array ว่างหากเกิด error เพื่อป้องกัน loop หรือ error อื่นๆ
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [API_URL]);

  return (
    // ปรับพื้นหลังให้รองรับ Dark Mode (Teal Dark)
    <div className="min-h-screen bg-[#F5F3EE] dark:bg-[#0a1a16] transition-colors duration-300">
      <HeaderReseller />
      
      {/* ส่วนหัวหน้าเว็บ */}
      <Main main={mockmain} />

      {/* Container สำหรับเนื้อหาหลัก */}
      <div className="max-w-[1600px] mx-auto">
        {/* - px-4 สำหรับมือถือ (เพื่อให้เห็นขอบเล็กน้อย) 
          - md:px-8 สำหรับจอ Tablet/PC 
          - py-4 ถึง py-8 เพื่อเว้นระยะบนล่างให้ดูโปร่ง
        */}
        <div className="px-4 md:px-8 py-4 md:py-8">
          <div className="w-full">
            <CatalogCrad data={data} loading={loading} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CatalogPage