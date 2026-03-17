"use client"
import React from 'react'


type Reseller = {
  id: number;
  name: string;
  status: string;
};

const RejectedButton = () => {
  const [resellers, setResellers] = React.useState<Reseller[]>([]);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const HandleClick = async (id: number, newStatus: string) => {
    const res = await fetch(`${API_URL}/admin/resellers/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json"},
      credentials: "include",
      body: JSON.stringify({ status: newStatus }),
    });
    if (res.ok) {
      setResellers(prev =>
        prev.map(r => (r.id === id ? { ...r, status: newStatus } : r))
      );
    }
  }
  return (
    <div>
      {resellers.map(r => (
          <>
            <button onClick={() => HandleClick(r.id, r.status === "active" ? "inactive" : "active")}>
              ปฏิเสธ
            </button>
          </>     
        ))}
    </div>
  )
}

export default RejectedButton