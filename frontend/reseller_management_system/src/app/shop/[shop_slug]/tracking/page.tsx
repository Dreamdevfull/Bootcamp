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
    <div className="min-h-screen bg-[#F5F3EE] dark:bg-[#1a1a18]">
      <HeaderCustomers />

      <div className="max-w-2xl mx-auto px-4 py-8">

        {/* Search Box */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border-2 border-gray-200 dark:border-gray-700 mb-4 transition-colors duration-200">
          <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-1">ติดตามสถานะออเดอร์</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">กรอกเลขออเดอร์เพื่อตรวจสอบสถานะ</p>
          <div className="flex gap-2">
            <input
              type="text"
              value={orderNumber}
              onChange={(e) => setOrderNumber(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              placeholder="เช่น ORD-1234567890"
              className="flex-1 px-4 py-2.5 text-sm border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 focus:border-transparent transition-all text-gray-800 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 bg-white dark:bg-gray-800"
            />
            <button
              onClick={() => handleSearch()}
              disabled={loading}
              className="bg-emerald-700 dark:bg-emerald-800 hover:bg-emerald-900 dark:hover:bg-emerald-900 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition cursor-pointer disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2"
            >
              {loading ? "กำลังค้นหา..." : "ค้นหา"}
            </button>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-rose-50 dark:bg-rose-950 border-2 border-rose-300 dark:border-rose-700 text-rose-700 dark:text-rose-300 rounded-xl px-5 py-4 text-sm mb-4">
            ⚠ {error}
          </div>
        )}

        {/* Result */}
        {result && (
          <>
            {/* Found Banner */}
            <div className="bg-emerald-50 dark:bg-emerald-950 border-2 border-emerald-300 dark:border-emerald-700 text-emerald-700 dark:text-emerald-300 rounded-xl px-5 py-3 flex items-center gap-2 mb-4">
              <span className="text-lg">✓</span>
              <div>
                <p className="font-semibold text-sm">พบออเดอร์แล้ว</p>
                <p className="text-xs">#{result.order_number}</p>
              </div>
            </div>

            {/* Progress */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border-2 border-gray-200 dark:border-gray-700 mb-4 transition-colors duration-200">
              <div className="flex items-center justify-between relative">
                <div className="absolute top-5 left-5 right-0 h-0.5 bg-gray-200 dark:bg-gray-700 z-0" />
                <div
                  className="absolute top-5 left-5 h-0.5 bg-emerald-700 dark:bg-emerald-500 z-0 transition-all"
                  style={{ width: `${(currentStep / (statusSteps.length - 1)) * 90}%` }}
                />
                {statusSteps.map((step, idx) => (
                  <div key={step} className="flex flex-col items-center gap-2 z-10">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition ${idx < currentStep
                      ? "bg-emerald-700 dark:bg-emerald-800 border-emerald-700 dark:border-emerald-600 text-white"
                      : idx === currentStep
                        ? "bg-emerald-600 dark:bg-emerald-700 border-emerald-600 dark:border-emerald-500 text-white ring-4 ring-emerald-200 dark:ring-emerald-800"
                        : "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400"
                      }`}>
                      {idx === 0 && "📦"}
                      {idx === 1 && "🚚"}
                      {idx === 2 && "✓"}
                    </div>
                    <p className={`text-xs font-medium ${idx < currentStep
                      ? "text-emerald-700 dark:text-emerald-400"
                      : idx === currentStep
                        ? "text-emerald-600 dark:text-emerald-300 font-bold"
                        : "text-gray-500 dark:text-gray-400"
                      }`}>
                      {statusLabel[step]}
                    </p>
                  </div>
                ))}
              </div>

              {/* Legend */}
              <div className="flex gap-4 mt-6 text-xs text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-700 dark:bg-emerald-500 inline-block" aria-hidden="true" /> ดำเนินแล้ว
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400 inline-block ring-2 ring-emerald-200 dark:ring-emerald-700" aria-hidden="true" /> สถานะปัจจุบัน
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-600 inline-block" aria-hidden="true" /> รอดำเนินการ
                </div>
              </div>
            </div>

            {/* Order Info */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border-2 border-gray-200 dark:border-gray-700 mb-4 transition-colors duration-200">
              <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-4">ข้อมูลออเดอร์</h3>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">เลขออเดอร์</p>
                  <p className="font-bold text-gray-800 dark:text-gray-100">#{result.order_number}</p>
                </div>
                <span className={`text-xs font-medium px-3 py-1 rounded-full border-2 ${statusColor[result.status] ?? "bg-[#F5F3EE] dark:bg-gray-700 text-gray-500 dark:text-gray-400 border-gray-300 dark:border-gray-600"}`}>
                  {statusLabel[result.status] ?? result.status}
                </span>
              </div>
            </div>

            {/* Items */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border-2 border-gray-200 dark:border-gray-700 mb-4 transition-colors duration-200">
              <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-4">รายการสินค้า</h3>
              <div className="space-y-3">
                {result.items?.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center text-sm border-b-2 border-gray-100 dark:border-gray-700 pb-3 last:border-0 last:pb-0">
                    <div>
                      <p className="text-gray-800 dark:text-gray-100 font-medium">{item.product_name}</p>
                      <p className="text-gray-500 dark:text-gray-400 text-xs">x{item.quantity}</p>
                    </div>
                    <p className="font-semibold text-gray-800 dark:text-gray-100">฿{item.selling_price * item.quantity}</p>
                  </div>
                ))}
              </div>
              <div className="border-t-2 border-gray-200 dark:border-gray-700 mt-4 pt-3 flex justify-between font-bold text-gray-800 dark:text-gray-100">
                <span>รวมทั้งหมด</span>
                <span>฿{result.total_amount}</span>
              </div>
            </div>

            {/* Shipping */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border-2 border-gray-200 dark:border-gray-700 transition-colors duration-200">
              <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-3">ที่อยู่ในการจัดส่ง</h3>
              <p className="text-sm font-medium text-gray-800 dark:text-gray-100">{result.customer_name}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{result.shipping_address}</p>
            </div>
          </>
        )}

        {/* ยังไม่ได้ค้นหา */}
        {!searched && !result && (
          <div className="text-center py-10 text-gray-500 dark:text-gray-400 text-sm">
            กรอกเลขออเดอร์เพื่อติดตามสถานะ
          </div>
        )}

      </div>
    </div>
  )
}

export default TrackingPage