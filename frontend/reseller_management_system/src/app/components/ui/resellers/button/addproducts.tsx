"use client"

import { useState } from "react";
import AddProducts from "../../popup/popresellers/addproducts";
type Props = {
  id: number
  onSuccess?: () => void
}

const AddProductsButton = ({ id, onSuccess }: Props) => {
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<{
    image_url: string;
    cost_price: number;
    min_price: number;
  } | null>(null);

  const handleSuccess = () => {
    setSelectedItem(null);
    setOpen(false);
    onSuccess?.();
  }
  // const API_URL = process.env.NEXT_PUBLIC_API_URL;
  // const handleClick = async () => {
  //   const res = await fetch(`${API_URL}/catalog/add/${id}`, {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     credentials: "include",
  //   });

  //   if (res.ok) {
  //     onSuccess?.();
  //   }
  // };

  return (
    <>
    <button
      onClick={() => setOpen(true)}
      className="text-white border bg-[#EF9F27] hover:bg-[#BA7517] rounded-sm p-2 cursor-pointer w-full mt-2"
    >
      เพิ่มเข้าร้าน
    </button>
    {selectedItem && (
     <AddProducts
        open={open}
        onClose={() => setOpen(false)}
        id={id}
        image_url={selectedItem.image_url}
        cost_price={selectedItem.cost_price}
        min_price={selectedItem.min_price}
        onSuccess={handleSuccess}
      />
    )}
    </>
  );
};

export default AddProductsButton;