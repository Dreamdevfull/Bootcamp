"use client"
import { ColumnDef } from '@tanstack/table-core';
// import EditButton from '@/app/components/ui/admin/button/edit';
import SoftDeleteButton from '@/app/components/ui/admin/button/softdelete';
import PopEditProducts from '../ui/popup/popadmin/editproducts';
import { Product as ProductType } from '@/app/types/model';
import React from 'react';

function ActionCell({ id, name, image_url, description, cost_price, min_price, stock }: {
  id: number;
  name: string;
  image_url: string;
  description: string;
  cost_price: number;
  min_price: number;
  stock: number;
}) {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="flex items-center justify-center gap-2">
      <button onClick={() => setOpen(true)} className='text-[#ffffff] border bg-[#1b9e75] hover:bg-[#1a6b5a] hover:text-[#FAEEDA] rounded-lg px-5 py-2 cursor-pointer transition'>
        แก้ไข
      </button>
      <PopEditProducts id={id}
        open={open}
        onClose={() => setOpen(false)}
        image_url={image_url}
        description={description}
        cost_price={cost_price}
        name={name}
        min_price={min_price}
        stock={stock} />
    </div>
  );
}

const API_URL = process.env.NEXT_PUBLIC_API_URL

export const productColumns: ColumnDef<ProductType>[] = [
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
        {row.original.image_url ? (
          <img
            src={API_URL + row.original.image_url}
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
  {
    id: "actions",
    header: () => <div className="text-center">จัดการ</div>,
    cell: ({ row }) => (
      <div className="flex items-center justify-center gap-2">
        <ActionCell id={row.original.id} name={row.original.name} image_url={row.original.image_url} description={row.original.description} cost_price={row.original.cost_price} min_price={row.original.min_price} stock={row.original.stock} />
        <SoftDeleteButton id={row.original.id} />
      </div>
    ),
  },
];