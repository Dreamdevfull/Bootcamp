"use client"

type Props = {
  id: number;
  onSuccess?: () => void; // optional: บอก parent ให้ refetch
}

const EditShopProductButton = ({ id, onSuccess }: Props) => {
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
        className="text-[#412402] border border-[#BA7517] bg-[#1D9E75] hover:bg-[#BA7517] hover:text-[#FAEEDA] rounded-lg px-5 py-2 cursor-pointer mt-2 transition"
    >
      แก้ไข
    </button>
  );
};

export default EditShopProductButton;