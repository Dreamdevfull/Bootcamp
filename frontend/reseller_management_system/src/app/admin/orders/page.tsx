"use client";
import HeaderAdmin from "@/app/components/layout/headeradmin";
import { ManageOrderAdmin as columns } from "@/app/components/columnsadmin/manageorderadmin";
import { useEffect, useState, useMemo } from "react";
import { DataTable } from "@/app/components/ui/datatable";
import Main from "@/app/components/layout/main";
import { Orders as OrdersType } from "@/app/types/model";
import { FilterSearchAndDropdown } from "@/app/components/ui/filter";

const mockmain = {
  text1: "จัดการออเดอร์",
  text2: "ตรวจสอบออเดอร์จากทุกร้านค้า และอัปเดตสถานะการจัดส่ง",
};

const OrdersPage = () => {
  const [data, setData] = useState<OrdersType[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

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

  const filteredOrders = useMemo(() => {
    return data.filter((order) => {
      const matchesSearch =
        order.order_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer_name.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || order.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [data, searchTerm, statusFilter]);

  return (
    <div className="min-h-screen bg-[#F5F3EE]">
      <HeaderAdmin />
      <Main main={mockmain} />

      <FilterSearchAndDropdown
        onSearch={setSearchTerm}
        onFilterType={setStatusFilter}
        onSortPrice={() => {}}
      />

      <div className="px-8 py-7">
        <DataTable columns={columns} data={filteredOrders} loading={loading} />
      </div>
    </div>
  );
};

export default OrdersPage;
