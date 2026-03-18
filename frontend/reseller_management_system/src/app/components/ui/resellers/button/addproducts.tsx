"use client"

type Props = {
  id: number;
  onSuccess?: () => void; // optional: บอก parent ให้ refetch
}

const AddProductsButton = ({ id, onSuccess }: Props) => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const handleClick = async () => {
    const res = await fetch(`${API_URL}/catalog/add/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    if (res.ok) {
      onSuccess?.();
    }
  };

  return (
    <button
      onClick={handleClick}
      className="text-[#412402] border border-[#000000] bg-[#ef9f27] hover:bg-[#BA7517] rounded-sm p-2 cursor-pointer w-full mt-2"
    >
      เพิ่มเข้าร้าน
    </button>
  );
};

export default AddProductsButton;