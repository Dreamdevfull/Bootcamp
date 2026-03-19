"use client"

type ModalProps = {
  open: boolean
  onClose: () => void
  children?: React.ReactNode
}

export default function Modal({ open, onClose, children }: ModalProps) {
  if (!open) return null

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/20 z-50 "
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl p-6 w-[500px] shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ปุ่มปิด */}
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-xl font-bold"
          >
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}
