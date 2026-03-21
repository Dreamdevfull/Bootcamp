"use client"
import { useTheme } from "next-themes"

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()

  return (
    <button
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="self-end mr-4 mt-2 text-sm px-3 py-1 rounded-full border border-[#D3D1C7] dark:border-[#444441] text-[#2C2C2A] dark:text-white hover:bg-black/5 dark:hover:bg-white/10 transition"
    >
      {resolvedTheme === "dark" ? "☀️ Light" : "🌙 Dark"}
    </button>
  )
}