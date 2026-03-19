"use client"
import { ColumnDef } from '@tanstack/table-core';
import { OrderReseller as OrderResellerType } from '@/app/types/model';
import DetailOrderButton from '../ui/resellers/button/detailorder';

export const OrdersColumn: ColumnDef<OrderResellerType>[] = [
  // {
  //   id: "index",
  //   header: () => <div className="text-center">ลำดับ</div>,
  //   cell: ({ row, table }) => {
  //     const pageIndex = table.getState().pagination.pageIndex;
  //     const pageSize = table.getState().pagination.pageSize;
  //     const pageRowIndex = table.getRowModel().rows.findIndex(r => r.id === row.id);
  //     return (
  //       <div className="text-center">
  //         {pageIndex * pageSize + pageRowIndex + 1}
  //       </div>
  //     );
  //   },
  // },
  {
    accessorKey: "order_number",
    header: () => <div className='text-center'>เลขออเดอร์</div>,
    cell: ({ row }) => (
      <div className='text-center'>{row.getValue("order_number")}</div>
    ),
  },
  {
    accessorKey: "customer_name",
    header: () => <div>ชื่อลูกค้า</div>,
    cell: ({ row }) => (
      <div>{row.getValue("customer_name")}</div>
    ),
  },
  // {
  //   id: "order_items",
  //   header: () => <div>สินค้า(จำนวน)</div>,
  //   cell: ({ row }) => {
  //     const items = row.original.items
  //     const preview = items.slice(0, 2)
  //     const remaining = items.length - 2

  //     return (
  //       <div>
  //         {preview.map((item, index) => (
  //           <div key={index}>
  //             {item.product_name} ({item.quantity})
  //           </div>
  //         ))}
  //         {remaining > 0 && (
  //           <div className="text-xs text-gray-400">
  //             +{remaining} รายการ
  //           </div>
  //         )}
  //       </div>
  //     )
  //   },
  // },
  {
    id: "items",
    header: () => <div>สินค้า(จำนวน)</div>,
    cell: ({ row }) => {
      const items = row.original.items
      const preview = items.slice(0, 2)
      const remaining = items.length - 2

      return (
        <div>
          {/* {preview.map((item, index) => ( */}
            {/* <div key={index}>
              {item.items} ({item.quantity})
            </div> */}
            <h1>{items}</h1>
          {/* ))} */}
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
    accessorKey: "created_at",
    header: () => <div className="text-center">วันที่สั่งซื้อ</div>,
    cell: ({ row }) => {
      const parseThaiDate = (dateStr: string) => {
        const [datePart, timePart] = dateStr.split(" ");
        const [day, month, year] = datePart.split("/");
        return new Date(`${year}-${month}-${day}T${timePart}`);
      }
      return (
        <div className='text-center'>
          {parseThaiDate(row.getValue("created_at")).toLocaleDateString("th-TH", {
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
    accessorKey: "status",
    header: () => <div className="text-center">สถานะ</div>,
    cell: ({ row }) => {
      const status = row.getValue("status");

      let text = "";
      let color = "";

      if (status === "รอจัดส่ง") {
        text = "รอดำเนินการ";
        color = "text-[#633806] border border-[#FAC775] bg-[#FAEEDA] rounded-md px-2 py-1";
      } else if (status === "กำลังจัดส่ง") {
        text = "กำลังจัดส่ง";
        color = "text-[#633806] border border-[#FAC775] bg-[#FAEEDA] rounded-md px-2 py-1";
      } else if (status === "จัดส่งเสร็จสมบูรณ์") {
        text = "จัดส่งสำเร็จ";
        color = "text-[#085041] border border-[#9FE1CB] bg-[#E1F5EE] rounded-md px-2 py-1";
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
    header: () => <div className="text-center">จัดการ</div>,
    cell: ({ row }) => (
      <div className="flex items-center justify-center gap-2">
        <DetailOrderButton id={row.original.id} />
      </div>
    ),
  },
];