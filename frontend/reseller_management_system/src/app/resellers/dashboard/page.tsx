"use client"

import { useState } from "react"
import Modal from "@/app/components/ui/popup/popadmin/test"
import HeaderReseller from '@/app/components/layout/headerReseller'
import PopCustomersOrder from "@/app/components/ui/popup/popcustomers/order"
import Link from "next/link"

export default function Page() {
  const [open, setOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[#F5F3EE]">
      <HeaderReseller />
      <div className="p-2">
        {/* ปุ่มเปิด popup */}
        <button
          onClick={() => setOpen(true)}
          className="bg-[#0d3d30] text-white px-6 py-3 rounded-xl hover:bg-[#0d3d30]/90 transition"
        >
          เปิด Popup
        </button>
      </div>

      {/* Modal */}
      <PopCustomersOrder open={open} onClose={() => setOpen(false)} />

      <Link href="/resellers/orders">
        <button className="text-[#888780] hover:bg-[#2C2C2A] border border-[#D3D1C7] px-4 py-2 rounded-lg">
          กลับ
        </button>
      </Link>
    </div>

  )
}