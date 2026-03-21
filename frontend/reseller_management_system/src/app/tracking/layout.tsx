// src/app/tracking/layout.tsx
"use client"

import { CartProvider } from "@/app/components/cradcustomer/cartcontext"

export default function TrackingLayout({ children }: { children: React.ReactNode }) {  // ✅ เพิ่ม default
  return (
    <CartProvider>
      {children}
    </CartProvider>
  )
}