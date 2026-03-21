"use client";
import { useEffect, useState, useMemo } from "react";
import { OrderReseller as OrderResellerType } from "@/app/types/model";
import HeaderReseller from "@/app/components/layout/headerReseller";
import Main from "@/app/components/layout/main";
import { DataTable } from "@/app/components/ui/datatable";
import { OrdersColumn as columns } from "@/app/components/columnsreseller/orders";
import { FilterSearchAndDropdown } from "@/app/components/ui/search/filter";

const mockmain = {
  text1: "ออเดอร์ของฉัน",
  text2: "รายการสั่งซื้อของลูกค้าที่ซื้อผ่านหน้าร้านของคุณเท่านั้น",
};

const OrdersPage = () => {
  const [data, setData] = useState<OrderResellerType[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priceSort, setPriceSort] = useState("all");

  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${API_URL}/reseller/orders`, {
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
  }, []);

  const filteredOrders = useMemo(() => {
    let result = [...data].filter((order) => {
      const matchesSearch =
        order.order_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer_name.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || order.status === statusFilter;

      
      return matchesSearch && matchesStatus;
    });
    
    if (priceSort === "lowToHigh") {
        result.sort((a, b) => Number(a.total_amount) - Number(b.total_amount));
      } else if (priceSort === "highToLow") {
        result.sort((a, b) => Number(b.total_amount) - Number(a.total_amount));
      }

      return result


  }, [data, searchTerm, statusFilter, priceSort]);

  return (
    <div className="min-h-screen bg-[#F5F3EE]">
      <HeaderReseller />
      <Main main={mockmain} />

      <FilterSearchAndDropdown
        onSearch={setSearchTerm}
        onFilterType={setStatusFilter}
        onSortPrice={setPriceSort}
      />

      <div className="px-8 py-1">
        <DataTable columns={columns} data={filteredOrders} loading={loading} />
      </div>
    </div>
  );
};

export default OrdersPage;
