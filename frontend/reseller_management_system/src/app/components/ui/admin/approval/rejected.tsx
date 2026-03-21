"use client"

type Props = {
  id: number;
  onSuccess?: () => void; // optional: บอก parent ให้ refetch
}

const RejectedButton = ({ id, onSuccess }: Props) => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const handleClick = async () => {
    const res = await fetch(`${API_URL}/admin/resellers/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ status: "rejected" }),
    });

    if (res.ok) {
      onSuccess?.();
    }
  };

  return (
    <button
      onClick={handleClick}
      className="text-[#791f1f] border border-[#791f1f] hover:bg-[#fcebeb] rounded-sm p-2 cursor-pointer dark:text-rose-400 dark:border-rose-500 dark:hover:bg-rose-950"
    >
      ปฏิเสธ
    </button>
  );
};

export default RejectedButton;