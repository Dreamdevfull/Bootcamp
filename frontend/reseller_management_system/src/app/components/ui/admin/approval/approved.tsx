"use client"

type Props = {
  id: number;
  onSuccess?: () => void; // optional: บอก parent ให้ refetch
}

const ApprovedButton = ({ id, onSuccess }: Props) => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const handleClick = async () => {
    const res = await fetch(`${API_URL}/admin/resellers/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ status: "approved" }),
    });

    if (res.ok) {
      onSuccess?.();
    }
  };

  return (
    <button
      onClick={handleClick}
      className="text-[#ffffffff] border border-[] bg-[#0d3d30] hover:bg-[#0d3d30]/80 rounded-sm p-2 cursor-pointer"
    >
      อนุมัติ
    </button>
  );
};

export default ApprovedButton;