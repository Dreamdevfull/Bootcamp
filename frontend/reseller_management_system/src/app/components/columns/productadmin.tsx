import { ColumnDef } from '@tanstack/table-core';
import EditButton from '@/app/components/ui/button/edit';
import DeleteButton from '@/app/components/ui/button/delete';

interface Product {
  id: number;
  name: string;
  description: string;
  Image: string;
  cost_price: number;
  min_price: number;
  stock: number;
  Create_at: string;
}

export const productColumns: ColumnDef<Product>[] = [
  { accessorKey: "image", header: "รูปภาพ" },
  { accessorKey: "name", header: "ชื่อสินค้า" },
  // ... ที่เหลือเหมือนเดิม
];