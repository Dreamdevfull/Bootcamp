"use client"
import { useState } from "react";
import AddProducts from "../../popup/popresellers/addproducts";

type Props = {
  id: number
  name: string
  image_url: string
  cost_price: number
  min_price: number
  onSuccess?: () => void
}


const AddProductsButton = ({ 
  id, 
  name, 
  image_url, 
  cost_price, 
  min_price, 
  onSuccess 
}: Props) => {
  
  const [open, setOpen] = useState(false);

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
        name={name}
        image_url={image_url}
        cost_price={cost_price}
        min_price={min_price}
        onSuccess={onSuccess || (() => {})}
      />
  
    </>
  );
};

export default AddProductsButton;