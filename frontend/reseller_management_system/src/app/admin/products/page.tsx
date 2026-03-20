"use client"
import HeaderAdmin from '@/app/components/layout/headeradmin'
import { useEffect, useState , useCallback} from 'react';
import { DataTable } from '@/app/components/ui/datatable';
import { productColumns as columns, productColumns } from '@/app/components/columnsadmin/productadmin';
import Main from '@/app/components/layout/main';
import { Product as ProductType } from '@/app/types/model';
import PopAddProducts from '@/app/components/ui/popup/popadmin/addproducts';
import { FilterSearchAndDropdown } from '@/app/components/ui/filter';


const ProductsPage = () => {
  const [data, setData] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false)

  const mockmain = {
    text1: "จัดการสินค้า",
    text2: "เพิ่ม แก้ไข ลบ และกำหนดราคาสินค้าในระบบ",
    button: {
      label: "+ เพิ่มสินค้า",
      onClick: () => setOpen(true)
    },
  }

  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const res = await fetch(`${API_URL}/admin/products`, {
  //         credentials: "include",
  //       });
  //       const result = await res.json();
  //       setData(result.data ?? []);
  //     } catch {
  //       setData([]);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, [API_URL]);

  // 1. แยก fetchData ออกมาให้เรียกซ้ำได้
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
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
  }, [API_URL]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // 2. สร้าง columns โดยส่ง fetchData เข้าไป
  const columns = productColumns(fetchData);

  return (
    <div className='min-h-screen bg-[#F5F3EE]'>
      <HeaderAdmin />
      <Main main={mockmain} />
      <FilterSearchAndDropdown/>
      <div className='px-8 py-7'>
        <DataTable columns={columns} data={data} loading={loading}/>
        {/* <PopAddProducts open={open} onClose={() => setOpen(false)} onSuccess={function (): void {
          throw new Error('Function not implemented.');
        } }/> */}

        <PopAddProducts open={open} onClose={() => setOpen(false)} onSuccess={() => {
            fetchData(); // ดึงข้อมูลใหม่
            setOpen(false); // ปิด Popup
          }}/>
      </div>
    </div>
  )
}

export default ProductsPage