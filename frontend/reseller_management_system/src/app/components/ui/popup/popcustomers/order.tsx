"use client"

type PopCustomersOrderProps = {
    open: boolean
    onClose: () => void
}

export default function PopCustomersOrder({ open, onClose }: PopCustomersOrderProps) {
    if (!open) return null

    return (
        <div
            className="fixed inset-0 flex items-center justify-center bg-black/20 z-50"
        >
            {/* ตัวหุ้มด้านนอกสุด (Overlay) เพื่อให้ Content อยู่กลางจอ */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2C2C2A]/40">

                {/* ตัว Modal หลัก: กำหนด max-width เพื่อไม่ให้เต็มจอเกินไป */}
                <div
                    className="bg-white rounded-3xl w-full max-w-[500px] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header Section */}
                    <div className="px-6 py-5 border-b border-[#D3D1C7]/30 flex justify-between items-center">
                        <h2 className="text-xl font-bold text-[#2C2C2A]">ทำการสั่งซื้อ</h2>
                        <button
                            onClick={onClose}
                            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-[#888780] transition-colors"
                        >
                            ✕
                        </button>
                    </div>

                    <div className="p-6 max-h-[80vh] overflow-y-auto [&::-webkit-scrollbar]:hidden">
                        {/* Product List */}
                        <div className="space-y-4 mb-6 border p-3 rounded-lg">
                            <div className="flex justify-between text-[13px] font-medium text-[#888780] px-1">
                                <span>รายการสินค้า</span>
                                <span>ราคารวม</span>
                            </div>
                                <div className="divide-[#D3D1C7]/40">
                                    {/* Item 1 */}
                                    <div className="flex items-center gap-4 p-4 hover:bg-[#F9F9F8] transition-colors">
                                        <div className="w-14 h-14 bg-gray-100 rounded-xl flex-shrink-0 border border-gray-100" />
                                        <div className="flex-1 min-w-0">
                                            <h4 className="text-sm font-semibold text-[#2C2C2A] truncate">เสื้อยืดคอกลม</h4>
                                            <p className="text-xs text-[#888780] mt-0.5">สีดำ • Size M</p>
                                            <div className="flex items-center justify-between mt-1 sm:justify-start sm:gap-4">
                                                <p className="text-xs font-medium text-[#2C2C2A]">฿199 x 2</p>
                                                <span className="text-sm font-bold text-[#2C2C2A] sm:hidden">฿398</span>
                                            </div>
                                        </div>
                                        <div className="hidden sm:block text-sm font-bold text-[#2C2C2A]">฿398</div>
                                    </div>
                                </div>

                                {/* ส่วนสรุปยอดเล็กภายในกลุ่มสินค้า */}
                                <div className="bg-[#F9F9F8]/50 px-4 py-3 border-t border-[#D3D1C7]/50 flex justify-between items-center">
                                    <span className="text-xs text-[#888780]">รวมจำนวน 3 ชิ้น</span>
                                    <span className="text-sm font-bold text-[#2C2C2A]">฿557</span>
                                </div>
                            </div>

                            {/* Shipping Form */}
                            <div className="space-y-3 mb-6 border p-3 rounded-lg">
                                <label className="text-sm font-semibold text-[#2C2C2A] block ml-1">ข้อมูลจัดส่ง</label>
                                <div className="grid grid-cols-2 gap-3">
                                    <input
                                        type="text"
                                        placeholder="ชื่อ-นามสกุล"
                                        className="w-full px-4 py-2.5 text-sm border border-[#D3D1C7] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1D9E75] focus:border-transparent transition-all"
                                    />
                                    <input
                                        type="tel"
                                        placeholder="เบอร์โทรศัพท์"
                                        className="w-full px-4 py-2.5 text-sm border border-[#D3D1C7] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1D9E75] focus:border-transparent transition-all"
                                    />
                                </div>
                                <textarea
                                    placeholder="ที่อยู่จัดส่งโดยละเอียด"
                                    rows={3}
                                    className="w-full px-4 py-2.5 text-sm border border-[#D3D1C7] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1D9E75] focus:border-transparent transition-all resize-none"
                                />
                            </div>

                            {/* Price Summary */}
                            <div className="bg-[#F9F9F8] rounded-2xl p-4 border border-[#D3D1C7]/50 space-y-2">
                                <div className="flex justify-between text-sm text-[#888780]">
                                    <span>ยอดรวมสินค้า (3 ชิ้น)</span>
                                    <span>฿557</span>
                                </div>
                                <div className="flex justify-between items-center pt-2 border-t border-[#D3D1C7]/50">
                                    <span className="text-[#2C2C2A] font-bold">ยอดชำระสุทธิ</span>
                                    <span className="text-2xl font-black text-[#2C2C2A]">฿557</span>
                                </div>
                            </div>

                            {/* Checkout Button */}
                            <button
                                className="w-full mt-6 bg-[#EF9F27] hover:bg-[#BA7517] text-white py-4 rounded-2xl font-bold text-lg shadow-lg shadow-[#EF9F27]/20 active:scale-[0.98] transition-all"
                            >
                                ยืนยันการชำระเงิน
                            </button>

                            <p className="text-center text-[11px] text-[#888780] mt-4">
                                การคลิกปุ่ม "ยืนยันการชำระเงิน" แสดงว่าคุณยอมรับเงื่อนไขการบริการ
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            )
}