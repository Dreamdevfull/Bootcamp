"use client"

import { useState } from "react"
import Modal from "@/app/components/ui/popup/popadmin/test"
import HeaderReseller from '@/app/components/layout/headerReseller'

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
      <Modal open={open} onClose={() => setOpen(false)}/>
    </div>
  )
}