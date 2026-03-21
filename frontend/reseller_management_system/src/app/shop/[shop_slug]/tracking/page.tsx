"use client"
import { useState, useEffect, use } from "react"
import { useSearchParams } from "next/navigation"
import HeaderCustomers from "@/app/components/layout/headerCustomers"
import Link from "next/link"

type TrackingResult = {
  order_number: string
  status: string
  customer_name: string
  shipping_address: string
  total_amount: number
  items: {
    product_name: string
    selling_price: number
    quantity: number
  }[]
}

const statusSteps = ["pending", "shipped", "completed"]
const statusLabel: Record<string, string> = {
  pending: "รอดำเนินการ",
  shipped: "จัดส่งแล้ว",
  completed: "เสร็จสิ้น",
}
const statusColor: Record<string, string> = {
  pending: "bg-[#FAEEDA] text-[#633806] border-[#FAC775]",
  shipped: "bg-[#E1F5EE] text-[#085041] border-[#9FE1CB]",
  completed: "bg-[#E1F5EE] text-[#085041] border-[#9FE1CB]",
}

const TrackingPage = () => {
  const searchParams = useSearchParams()
  const [orderNumber, setOrderNumber] = useState(searchParams.get("order") ?? "")
  const [result, setResult] = useState<TrackingResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [searched, setSearched] = useState(false)
  const API_URL = process.env.NEXT_PUBLIC_API_URL

  const handleSearch = async (value?: string) => {
    const query = value ?? orderNumber
    if (!query.trim()) return
    setLoading(true)
    setError("")
    setResult(null)
    setSearched(true)
    try {
      const res = await fetch(`${API_URL}/track-order?order_number=${query.trim()}`, {
        method: "GET",
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.message || "ไม่พบออเดอร์นี้")
        return
      }
      setResult(data)
    } catch {
      setError("เกิดข้อผิดพลาด กรุณาลองใหม่")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const order = searchParams.get("order")
    if (order) {
      setOrderNumber(order)
      handleSearch(order)
    }
  }, [])

  const currentStep = result ? statusSteps.indexOf(result.status) : -1

  return (
    <div className="min-h-screen bg-[#F5F3EE]">
      <HeaderCustomers />

      <div className="max-w-2xl mx-auto px-4 py-8">

        {/* Search Box */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#D3D1C7] mb-4">
          <h2 className="text-lg font-bold text-[#2C2C2A] mb-1">ติดตามสถานะออเดอร์</h2>
          <p className="text-sm text-[#888780] mb-4">กรอกเลขออเดอร์เพื่อตรวจสอบสถานะ</p>
          <div className="flex gap-2">
            <input
              type="text"
              value={orderNumber}
              onChange={(e) => setOrderNumber(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              placeholder="เช่น ORD-1234567890"
              className="flex-1 px-4 py-2.5 text-sm border border-[#D3D1C7] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1D9E75] focus:border-transparent transition-all text-[#2C2C2A] placeholder:text-[#888780]"
            />
            <button
              onClick={() => handleSearch()}
              disabled={loading}
              className="bg-[#1A6B5A] hover:bg-[#0D3D30] text-white px-5 py-2.5 rounded-xl text-sm font-medium transition cursor-pointer disabled:opacity-50"
            >
              {loading ? "กำลังค้นหา..." : "ค้นหา"}
            </button>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-[#FCEBEB] border border-[#F7C1C1] text-[#791F1F] rounded-xl px-5 py-4 text-sm mb-4">
            ⚠ {error}
          </div>
        )}

        {/* Result */}
        {result && (
          <>
            {/* Found Banner */}
            <div className="bg-[#E1F5EE] border border-[#9FE1CB] text-[#085041] rounded-xl px-5 py-3 flex items-center gap-2 mb-4">
              <span className="text-lg">✓</span>
              <div>
                <p className="font-semibold text-sm">พบออเดอร์แล้ว</p>
                <p className="text-xs">#{result.order_number}</p>
              </div>
            </div>

            {/* Progress */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#D3D1C7] mb-4">
              <div className="flex items-center justify-between relative">
                {/* เส้น background */}
                <div className="absolute top-5 left-5 right-0 h-0.5 bg-[#D3D1C7] z-0" />
                {/* เส้น progress */}
                <div
                  className="absolute top-5 left-5 h-0.5 bg-[#1A6B5A] z-0 transition-all"
                  style={{ width: `${(currentStep / (statusSteps.length - 1)) * 90}%` }}
                />
                {statusSteps.map((step, idx) => (
                  <div key={step} className="flex flex-col items-center gap-2 z-10">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition ${
                      idx < currentStep
                        ? "bg-[#1A6B5A] border-[#1A6B5A] text-white"
                        : idx === currentStep
                        ? "bg-[#1D9E75] border-[#1D9E75] text-white ring-4 ring-[#9FE1CB]"
                        : "bg-white border-[#D3D1C7] text-[#888780]"
                    }`}>
                      {idx === 0 && "📦"}
                      {idx === 1 && "🚚"}
                      {idx === 2 && "✓"}
                    </div>
                    <p className={`text-xs font-medium ${
                      idx < currentStep
                        ? "text-[#1A6B5A]"
                        : idx === currentStep
                        ? "text-[#1D9E75] font-bold"
                        : "text-[#888780]"
                    }`}>
                      {statusLabel[step]}
                    </p>
                  </div>
                ))}
              </div>

              {/* Legend */}
              <div className="flex gap-4 mt-6 text-xs text-[#888780]">
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#1A6B5A] inline-block" /> ดำเนินแล้ว
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#1D9E75] inline-block ring-2 ring-[#9FE1CB]" /> สถานะปัจจุบัน
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#D3D1C7] inline-block" /> รอดำเนินการ
                </div>
              </div>
            </div>

            {/* Order Info */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#D3D1C7] mb-4">
              <h3 className="font-semibold text-[#2C2C2A] mb-4">ข้อมูลออเดอร์</h3>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-xs text-[#888780]">เลขออเดอร์</p>
                  <p className="font-bold text-[#2C2C2A]">#{result.order_number}</p>
                </div>
                <span className={`text-xs font-medium px-3 py-1 rounded-full border ${statusColor[result.status] ?? "bg-[#F5F3EE] text-[#888780] border-[#D3D1C7]"}`}>
                  {statusLabel[result.status] ?? result.status}
                </span>
              </div>
            </div>

            {/* Items */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#D3D1C7] mb-4">
              <h3 className="font-semibold text-[#2C2C2A] mb-4">รายการสินค้า</h3>
              <div className="space-y-3">
                {result.items?.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center text-sm border-b border-[#F5F3EE] pb-3 last:border-0 last:pb-0">
                    <div>
                      <p className="text-[#2C2C2A] font-medium">{item.product_name}</p>
                      <p className="text-[#888780] text-xs">x{item.quantity}</p>
                    </div>
                    <p className="font-semibold text-[#2C2C2A]">฿{item.selling_price * item.quantity}</p>
                  </div>
                ))}
              </div>
              <div className="border-t border-[#D3D1C7] mt-4 pt-3 flex justify-between font-bold text-[#2C2C2A]">
                <span>รวมทั้งหมด</span>
                <span>฿{result.total_amount}</span>
              </div>
            </div>

            {/* Shipping */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#D3D1C7]">
              <h3 className="font-semibold text-[#2C2C2A] mb-3">ที่อยู่ในการจัดส่ง</h3>
              <p className="text-sm font-medium text-[#2C2C2A]">{result.customer_name}</p>
              <p className="text-sm text-[#888780] mt-1">{result.shipping_address}</p>
            </div>
          </>
        )}

        {/* ยังไม่ได้ค้นหา */}
        {!searched && !result && (
          <div className="text-center py-10 text-[#888780] text-sm">
            กรอกเลขออเดอร์เพื่อติดตามสถานะ
          </div>
        )}

      </div>
    </div>
  )
}

export default TrackingPage