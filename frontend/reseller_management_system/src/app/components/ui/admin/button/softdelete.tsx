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
      className="bg-rose-50 dark:bg-rose-950
        text-rose-700 dark:text-rose-300
        border-2 border-rose-300 dark:border-rose-700
        rounded-lg hover:bg-rose-100 dark:hover:bg-rose-900
        transition cursor-pointer px-4 py-2
        focus:outline-none focus:ring-2 focus:ring-rose-400 focus:ring-offset-2"
    >
      ลบ
    </button>
  );
};

export default SoftDeleteButton;