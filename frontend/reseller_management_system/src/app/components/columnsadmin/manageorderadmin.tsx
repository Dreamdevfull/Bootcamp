"use client"
import { ColumnDef } from '@tanstack/table-core';
import CompletedButton from '@/app/components/ui/admin/button/order/completedbutton';
import { Orders } from '@/app/types/model';

const truncateText = (text: string | null | undefined, maxLength: number) => {
    if (!text) return '-'; 
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
};

export const ManageOrderAdmin = (onSuccess: () => void): ColumnDef<Orders>[] => [
  {
    accessorKey: "create_at",
    header: () => <div className="bg-gray-50 dark:bg-teal-900/20 text-center ">เวลาสั่งซื้อ</div>,
    cell: ({ row }) => {
      const date = row.original.created_at;
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
    header: () => <div>เลขออเดอร์</div>,
    cell: ({ row }) => <div>{row.getValue("order_number")}</div>,
  },
  {
    accessorKey: "shop.shop_name",
    header: () => <div>ชื่อร้าน(ผู้ขาย)</div>,
    cell: ({ row }) => (
      <div title={row.original.shop.shop_name}>{truncateText(row.original.shop.shop_name ?? "-", 30)}</div>
    ),
  },
  {
    accessorKey: "customer_name",
    header: () => <div>ชื่อลูกค้า</div>,
    cell: ({ row }) => (
      <div title={row.getValue("customer_name")}>{truncateText(row.getValue("customer_name") ?? "-", 30)}</div>
    ),
  },
  {
    id: "order_items",
    header: () => <div>สินค้า(จำนวน)</div>,
    cell: ({ row }) => {
      const items = row.original.order_items
      const preview = items.slice(0, 2)
      const remaining = items.length - 2
      return (
        <div className="flex flex-col justify-start min-h-[50px] leading-tight">
          {preview.map((item, index) => (
            <div key={index} title={item.product_name}>
                {truncateText(item.product_name ?? "-", 30)} ({item.quantity})
            </div>
          ))}
          {remaining > 0 && <div className="text-xs text-gray-400">+{remaining} รายการ</div>}
        </div>
      )
    },
  },
  {
    accessorKey: "total_amount",
    header: () => <div className="text-center">ราคารวม</div>,
    cell: ({ row }) => <div className="text-center">{row.getValue("total_amount")}</div>,
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
        color = "text-[#633806] border border-[#fac775] bg-[#faeeda] rounded-md px-2 py-1 dark:text-amber-300 dark:border-amber-600 dark:bg-amber-950";
      } else if (status === "shipped") {
        text = "จัดส่งแล้ว";
        color = "text-emerald-700 dark:text-emerald-300 border-2 border-emerald-400 dark:border-emerald-600 bg-emerald-50 dark:bg-emerald-950 rounded-md px-2 py-1 font-medium";
      } else if (status === "completed") {
        text = "เสร็จสมบูรณ์";
        color = "text-emerald-700 dark:text-emerald-300 border-2 border-emerald-400 dark:border-emerald-600 bg-emerald-50 dark:bg-emerald-950 rounded-md px-2 py-1 font-medium";
      }

      return (
        <div className="text-center">
          <span className={color}>{text}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "actions",
    header: () => <div className="text-center">จัดการ</div>,
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      const orderId = row.original.id;

      // แสดงปุ่มจัดการเฉพาะเมื่อสถานะเป็น 'รอดำเนินการ' เท่านั้น 
      if (status === "pending") {
        return (
          <div className="flex justify-center">
            {/* เมื่อกดปุ่มนี้ Backend จะต้องบวกเงิน Wallet และเปลี่ยน status เป็น completed ทันที  */}
            <CompletedButton id={orderId} onSuccess={onSuccess} />
          </div>
        );
      }
      
      // หากสถานะเป็น 'จัดส่งแล้ว' หรือ 'เสร็จสมบูรณ์' ถือว่าจบงาน 
      return <div className="text-center text-gray-400 dark:text-gray-500 text-sm italic">จบงานแล้ว</div>;
    },
  },
];