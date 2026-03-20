"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

// 1. สร้าง Interface ของเราเอง
interface ProvidersProps {
  children: React.ReactNode
}

export function Providers({ children }: ProvidersProps) {
  // 2. ใช้การ Casting (as any) เฉพาะตัว Component เพื่อข้ามปัญหา Type ของ Library 
  // แต่วิธีนี้ปลอดภัยเพราะเราคุมค่าส่งเข้า (Props) ด้วย Interface ของเราเองด้านบนแล้ว
  const ThemeProvider = NextThemesProvider as any

  return (
    <ThemeProvider 
      attribute="class" 
      defaultTheme="system" 
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  )
}