"use client"

type Props = {
  id: number;
  onSuccess?: () => void; // optional: บอก parent ให้ refetch
}

const DetailOrderButton = ({ id, onSuccess }: Props) => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const handleClick = async () => {
    const res = await fetch(`${API_URL}/reseller/detailorder/${id}`, {
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
      className="text-[#412402] border border-[#000000] bg-[#ef9f27] hover:bg-[#BA7517] rounded-sm p-2 cursor-pointer mt-2"
    >
      รายละเอียด
    </button>
  );
};

export default DetailOrderButton;