"use client"
import { ColumnDef } from '@tanstack/table-core';
import CompletedButton from '@/app/components/ui/admin/button/order/completedbutton';
import { Orders } from '@/app/types/model';


const truncateText = (text: string | null | undefined, maxLength: number) => {
    if (!text) return '-'; 
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
  };
const headerStyle = "bg-gray-50 dark:bg-teal-900/20 py-3 font-semibold text-gray-700 dark:text-teal-100";
export const ManageOrderAdmin=  (onSuccess: () => void): ColumnDef<Orders>[] => [
  {
    accessorKey: "create_at",
    header: () => <div className="bg-gray-50 dark:bg-teal-900/20 text-center ">เวลาสั่งซื้อ</div>,
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
    header: () => <div>เลขออเดอร์</div>,
    cell: ({ row }) => (
      <div>{row.getValue("order_number")}</div>
    ),
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
  // {
  //   id: "order_items",
  //   header: () => <div className="text-center">สินค้า(จำนวน)</div>,
  //   cell: ({ row }) => (
  //     <div className="text-center">
  //     {row.original.order_items.map((item, index) => (
  //       <div key={index}>
  //         {item.product_name} ({item.quantity})
  //       </div>
  //     ))}
  //   </div>
  //   ),
  // },
  {
    id: "order_items",
    header: () => <div >สินค้า(จำนวน)</div>,
    cell: ({ row }) => {
      const items = row.original.order_items
      const preview = items.slice(0, 2)
      const remaining = items.length - 2

      return (
        <div className="flex flex-col justify-start min-h-[50px] leading-tight">
          {preview.map((item, index) => (
            <div key={index}
              title={item.product_name}>{truncateText(item.product_name ?? "-", 30)} ({item.quantity})
            </div>
          ))}
          {remaining > 0 && (
            <div className="text-xs text-gray-400">
              +{remaining} รายการ
            </div>
          )}
        </div>
      )
    },
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
        text = "รอการชําระเงิน";
        color = "text-[#633806] border border-[#fac775] bg-[#faeeda] rounded-md px-2 py-1";
      } else if (status === "completed") {
        text = "จัดส่งสำเร็จ";
        color = "text-[#085041] border border-[#9fe1cb] bg-[#e1f5ee] rounded-md px-2 py-1";
      } else if (status === "shipped") {
        text = "รอจัดส่ง";
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
    accessorKey: "actions",
    header: () => <div className="text-center">จัดการ</div>,
    cell: ({ row }) => {
      const status = row.getValue("status") as string;

      if (status === "pending") {
        return(
          <div className="text-xs text-amber-600 font-medium italic">
            รอการชําระเงิน
          </div>
        )
      }
      else if (status === "shipped") {
        return (
          <div className="flex gap-2 justify-center">
            <CompletedButton id={row.original.id} onSuccess={onSuccess}/>
          </div>
        );
      } else if (status === "completed") {
        return (
          <div className="flex justify-center text-[#085041]/70">
            จัดส่งสำเร็จ
          </div>
        );
      } else {
        return null;
      }

    },
  },
];