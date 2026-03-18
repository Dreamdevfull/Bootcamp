"use client"

type Props = {
  id: number;
  onSuccess?: () => void; // optional: บอก parent ให้ refetch
}

const SoftDeleteButton = ({ id, onSuccess }: Props) => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const handleClick = async () => {
    const res = await fetch(`${API_URL}/admin/products/delete/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ deleted: true }),
    });

    if (res.ok) {
      onSuccess?.();
    }
  };

  return (
    <button
      onClick={handleClick}
      className="text-[#791f1f] rounded-lg hover:bg-[#fcebeb] transition cursor-pointer px-4 py-2"
    >
      ลบ
    </button>
  );
};

export default SoftDeleteButton;