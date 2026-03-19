  "use client"

  import Link from "next/link";

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
      <Link
      href={`/resellers/orders/track_orders/${id}`}
      onClick={handleClick}
      className="inline-block text-white border bg-[#1D9E75] hover:bg-[#1A6B5A] rounded-sm p-2 cursor-pointer mt-2"
    >
      รายละเอียด
    </Link>
    );
  };

  export default DetailOrderButton;