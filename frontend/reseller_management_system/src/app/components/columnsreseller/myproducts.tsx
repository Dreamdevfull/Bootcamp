"use client"
import { ColumnDef } from '@tanstack/table-core';
import { ShopProducts as MyProductsType } from '@/app/types/model';
// import EditShopProductButton from '../ui/resellers/button/editshopproduct';
import EditSellingpriceReseller from '@/app/components/ui/popup/popresellers/EditSellingpriceReseller';
import RemoveShopProductButton from '../ui/resellers/button/removeshopproduct';
import React from 'react';

function ActionCell({ id, image_url, cost_price, min_price, name, selling_price }: {
  id: number;
  image_url: string;
  cost_price: number;
  name: string;
  min_price: number;
  selling_price: number;
}) {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="flex items-center justify-center gap-2">
      <button onClick={() => setOpen(true)} className='text-white bg-[#1D9E75] border hover:bg-[#1A6B5A] hover:text-[#FAEEDA] rounded-lg px-5 py-2 cursor-pointer transition'>
        แก้ไข
      </button>
      <EditSellingpriceReseller id={id}
        open={open}
        onClose={() => setOpen(false)}
        image_url={image_url}
        cost_price={cost_price}
        name={name}
        min_price={min_price}
        selling_price={selling_price} />
    </div>
  );
}

const API_URL = process.env.NEXT_PUBLIC_API_URL

export const ProductsColumn: ColumnDef<MyProductsType>[] = [
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
        {row.original.product.image_url ? (
          <img
            src={API_URL +row.original.product.image_url}
            alt={row.original.product.name}
            className="w-10 h-10 rounded-md object-cover"
          />
        ) : (
          <div className="w-10 h-10 rounded-md bg-gray-200 flex items-center justify-center text-xs text-gray-400">
            ไม่มีรูป
          </div>
            )}
          <span>{row.original.product.name}</span>
      </div>
    ),
  },
  // {
  //   id: "items",
  //   header: () => <div>สินค้า(จำนวน)</div>,
  //   cell: ({ row }) => {
  //     const items = row.original.items
  //     const preview = items.slice(0, 2)
  //     const remaining = items.length - 2

  //     return (
  //       <div>
  //         {preview.map((item, index) => (
  //           <div key={index}>
  //             {item.items} ({item.quantity})
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
    accessorKey: "product.cost_price",
    header: () => <div className="text-center">ราคาทุน</div>,
    cell: ({ row }) => (
      <div className="text-center">{row.original.product?.cost_price}</div>
    ),
  },
  {
    accessorKey: "selling_price",
    header: () => <div className="text-center">ราคาขายของคุณ</div>,
    cell: ({ row }) => (
      <div className="text-center">{row.original.selling_price}</div>
    ),
  },
  {
    accessorKey: "profit_price",
    header: () => <div className="text-center">กำไรต่อชิ้น</div>,
    cell: ({ row }) => (
      <div className="text-center text-[#1a6b5a]">
        + ฿{row.original.selling_price - row.original.product.cost_price}
        <span className="text-xs text-gray-400 ml-1">
          ({Math.round((row.original.selling_price - row.original.product.cost_price) / row.original.product.cost_price * 100)}%)
        </span>
      </div>
    ),
  },
  
  {
    accessorKey: "product.stock",
    header: () => <div className="text-center">สต๊อก</div>,
    cell: ({ row }) => (
      <div className="text-center">{row.original.product.stock}</div>
    ),
  },
  {
    id: "actions",
    header: () => <div className="text-center">จัดการ</div>,
    cell: ({ row }) => (
     <div className="flex items-center justify-center gap-1">
      <ActionCell id={row.original.id} image_url={row.original.product.image_url} cost_price={row.original.product.cost_price} name={row.original.product.name} min_price={row.original.product.min_price} selling_price={row.original.selling_price} />
      <RemoveShopProductButton id={row.original.id} />
    </div>
      )
  }
];