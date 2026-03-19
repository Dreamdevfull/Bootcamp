"use client"
import { ColumnDef } from '@tanstack/table-core';
import EditButton from '@/app/components/ui/admin/button/edit';
import SoftDeleteButton from '@/app/components/ui/admin/button/softdelete';
import { Wallet as WalletType } from '@/app/types/model';

export const WalletColumn: ColumnDef<WalletType>[] = [
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
    accessorKey: "name",
    header: "สินค้า",
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        {row.original.Image ? (
          <img
            src={row.original.Image}
            alt={row.original.name}
            className="w-10 h-10 rounded-md object-cover"
          />
        ) : (
          <div className="w-10 h-10 rounded-md bg-gray-200 flex items-center justify-center text-xs text-gray-400">
            ไม่มีรูป
          </div>
            )}
          <span>{row.original.name}</span>
      </div>
    ),
  },
  {
    accessorKey: "cost_price",
    header: () => <div className="text-center">ราคาทุน</div>,
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("cost_price")}</div>
    ),
  },
  {
    accessorKey: "min_price",
    header: () => <div className="text-center">ราคาขายขั้นต่ำ</div>,
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("min_price")}</div>
    ),
  },
  {
    accessorKey: "stock",
    header: () => <div className="text-center">จํานวน</div>,
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("stock")}</div>
    ),
  },
];