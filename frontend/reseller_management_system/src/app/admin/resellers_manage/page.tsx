"use client"
import HeaderAdmin from '@/app/components/layout/headeradmin'
import Main from '@/app/components/layout/main'
import { DataTable } from '@/app/components/ui/datatable'
import { ResellersManage as columns } from '@/app/components/columnsadmin/resellersmanage';
import  { useEffect, useState } from 'react';
import { Approval as ApprovalType } from '@/app/types/model';
import { FilterSearchAndDropdown } from '@/app/components/ui/filter';

const mockmain = {
  text1: "อนุมัติตัวแทน",
  text2: "พิจารณาคำขอสมัครตัวแทนจำหน่าย"
}

const ResellersManagepage = () => {
  const [data, setData] = useState<ApprovalType[]>([]);
  const [loading, setLoading] = useState(true);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${API_URL}/admin/resellers`, {
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
      <FilterSearchAndDropdown/>
      <div className='px-8 py-7'>
        <DataTable columns={columns} data={data} loading={loading}  />
      </div>
    </div>
  )
}

export default ResellersManagepage;