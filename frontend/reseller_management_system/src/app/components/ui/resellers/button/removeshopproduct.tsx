"use client"

type Props = {
  id: number;
  onSuccess?: () => void; // optional: บอก parent ให้ refetch
}

const RemoveShopProductButton = ({ id, onSuccess }: Props) => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const handleClick = async () => {
    const res = await fetch(`${API_URL}/reseller/my-shop/products/${id}`, {
      method: "DELETE",
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
      className="text-[#791F1F] border border-[#F7C1C1] rounded-lg bg-[#FCEBEB] hover:bg-[#F7C1C1] transition cursor-pointer px-4 py-2"
    >
      นำออก
    </button>
  );
};

export default RemoveShopProductButton;