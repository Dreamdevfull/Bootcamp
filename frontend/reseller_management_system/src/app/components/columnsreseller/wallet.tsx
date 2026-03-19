"use client"
import { ColumnDef } from '@tanstack/table-core';
import { Wallet as WalletType } from '@/app/types/model';

export const WalletColumn: ColumnDef<WalletType["history"][number]>[] = [
  {
    id: "index",
    header: () => <div className="text-center">ลำดับ</div>,
    cell: ({ row, table }) => {
      const pageIndex = table.getState().pagination.pageIndex;
      const pageSize = table.getState().pagination.pageSize;
      const pageRowIndex = table.getRowModel().rows.findIndex(r => r.id === row.id);
      return (
        <div className="text-center">
          {pageIndex * pageSize + pageRowIndex + 1}
        </div>
      );
    },
  },
  {
    accessorKey: "create_at",
    header: () => <div className="text-center">เวลาสั่งซื้อ</div>,
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
    accessorKey: "description",
    header: () => <div className="text-center">รายละเอียด</div>,
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("description")}</div>
    ),
  },
  {
    accessorKey: "total_profit",
    header: () => <div className="text-center">จำนวนเงิน (กำไร)</div>,
    cell: ({ row }) => (
      <div className="text-center text-[#1a6b5a]">
        + ฿{row.original.amount}
      </div>
    ),
  },
];