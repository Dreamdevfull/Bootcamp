"use client"

import { useState } from "react";
import AddProducts from "../../popup/popresellers/addproducts";
type Props = {
  id: number
  onSuccess?: () => void
}

const AddProductsButton = ({ id, onSuccess }: Props) => {
  const [open, setOpen] = useState(false);
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
     <AddProducts
        open={open}
        onClose={() => setOpen(false)}
        id={id}
        onSuccess={onSuccess}
      />
    </>
  );
};

export default AddProductsButton;