"use client"
import { ColumnDef } from '@tanstack/table-core';
import EditButton from '@/app/components/ui/button/edit';
import SoftDeleteButton from '@/app/components/ui/button/softdelete';

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

export const ManageOrderAdmin: ColumnDef<Orders>[] = [
  {
    accessorKey: "create_at",
    header: () => <div className="text-center">เวลาสั่งซื้อ</div>,
    cell: ({ row }) => {
      const date = row.original.created_at;
      console.log(date);
      return (
        <div className='text-center'>
          {new Date(date).toLocaleDateString("th-TH", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      );
    },
  },
  
  {
    accessorKey: "order_number",
    header: () => <div className="text-center">เลขออเดอร์</div>,
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("order_number")}</div>
    ),
  },
  {
    accessorKey: "shop_id",
    header: () => <div className="text-center">ชื่อร้าน(ผู้ขาย)</div>,
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("shop_id")}</div>
    ),
  },
  {
    accessorKey: "customer_name",
    header: () => <div className="text-center">ชื่อลูกค้า</div>,
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("customer_name")}</div>
    ),
  },
  {
    accessorKey: "products_name",
    header: () => <div className="text-center">สินค้า(จำนวน)</div>,
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("products_name")}</div>
    ),
  },
  {
    accessorKey: "total_amount",
    header: () => <div className="text-center">ราคารวม</div>,
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("total_amount")}</div>
    ),
  },
  {
    accessorKey: "status",
    header: () => <div className="text-center">สถานะ</div>,
    cell: ({ row }) => {
      const status = row.getValue("status");

      let text = "";
      let color = "";

      if (status === "pending") {
        text = "รอดำเนินการ";
        color = "text-[#633806] border border-[#fac775] bg-[#faeeda] rounded-md px-2 py-1";
      } else if (status === "completed") {
        text = "จัดส่งสำเร็จ";
        color = "text-[#085041] border border-[#9fe1cb] bg-[#e1f5ee] rounded-md px-2 py-1";
      } else if (status === "shipped") {
        text = "กําลังจัดส่ง";
        color = "text-[#791f1f] border border-[#f7c1c1] bg-[#fcebeb] rounded-md px-2 py-1";
      } else if (status === "awaiting_payment") {
        text = "รอชําระเงิน";
        color = "text-[#791f1f] border border-[#f7c1c1] bg-[#fcebeb] rounded-md px-2 py-1";
      }

      return (
        <div className="text-center">
          <span className={color}>{text}</span>
        </div>
      );
    },
  },
  {
    id: "actions",
    header: () => <div className="text-center">การจัดส่ง</div>,
    cell: ({ row }) => (
      <div className="flex items-center justify-center gap-2">
        <EditButton />
        <SoftDeleteButton id={row.original.id} />
      </div>
    ),
  },
];