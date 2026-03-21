// "use client"
// import { useTheme } from "next-themes"

// export function ThemeToggle() {
//   const { resolvedTheme, setTheme } = useTheme()

//   return (
//     <button
//       onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
//       className="self-end mr-4 mt-2 text-sm px-3 py-1 rounded-full border border-[#D3D1C7] dark:border-[#444441] text-[#2C2C2A] dark:text-white hover:bg-black/5 dark:hover:bg-white/10 transition"
//     >
//       {resolvedTheme === "dark" ? "☀️ Light" : "🌙 Dark"}
//     </button>
//   )
// }
// src/app/components/ui/ThemeToggle.tsx
"use client"
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="fixed bottom-6 right-6 z-50 
                 p-3 rounded-full shadow-lg 
                 bg-white dark:bg-gray-800 
                 border border-gray-200 dark:border-gray-700
                 hover:scale-110 transition-all duration-200"
    >
      {theme === "dark" 
        ? <Sun size={20} className="text-yellow-400" /> 
        : <Moon size={20} className="text-gray-700" />
      }
    </button>
  );
}