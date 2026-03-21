"use client"
import HeaderAdmin from '@/app/components/layout/headeradmin'
import Main from '@/app/components/layout/main'
import { DataTable } from '@/app/components/ui/datatable'
import { getResellerColumns } from '@/app/components/columnsadmin/resellersmanage';
import { useCallback, useEffect, useState, useMemo } from 'react';
import { Approval as ApprovalType } from '@/app/types/model';
import { FilterSearchAndDropdown3 } from '@/app/components/ui/search/filter3';

const mockmain = {
  text1: "อนุมัติตัวแทน",
  text2: "พิจารณาคำขอสมัครตัวแทนจำหน่าย"
}

const ResellersManagepage = () => {
  const [data, setData] = useState<ApprovalType[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

 
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/admin/resellers`, {
        credentials: "include",
      });
      const result = await res.json();
      setData(result.data ?? []);
    } catch (err) {
      console.error("Fetch Error:", err);
      setData([]);
    } finally {
      setLoading(false);
    }
  }, [API_URL]);

  
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const matchesSearch = 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.address.toLowerCase().includes(searchTerm.toLowerCase());

      
      const matchesStatus = statusFilter === "all" || item.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [data, searchTerm, statusFilter]);

  
  const columns = getResellerColumns(fetchData);

  return (
    <div className='min-h-screen bg-[#F5F3EE] dark:bg-gray-950 transition-colors duration-200'>
      <HeaderAdmin />
      <Main main={mockmain}/>

      
      <FilterSearchAndDropdown3 
        onSearch={setSearchTerm} 
        onFilterType={setStatusFilter} 
        onSortPrice={() => {}} 
      />

      <div className='px-8 py-7'>
        <DataTable columns={columns} data={filteredData} loading={loading} />
      </div>
    </div>
  )
}

export default ResellersManagepage;