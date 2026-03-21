// "use client"
// import { useCart } from "@/app/components/cradcustomer/cartcontext"
// import { usePathname, useRouter } from "next/navigation"
// import Link from "next/link"
// import Image from "next/image"

// const HeaderCustomers = () => {
//   const pathname = usePathname()
//   const router = useRouter()
//   const shop_slug = pathname.split("/")[2] ?? ""
//   const { totalItems } = useCart()  // ✅ ดึง totalItems

//   const sidebarLinkClass = (path: string) =>
//     `flex mb-0.5 items-center p-2 rounded-lg font-medium w-30 justify-center border border-white/30 hover:bg-[#1a6b5a] hover:text-white transition cursor-pointer ${
//       pathname === path ? "bg-[#1a6b5a] text-white" : ""}`

//   return (
//     <nav className="w-full h-20 bg-gradient-to-r from-[#1d9e75] via-[#1a6b5a] to-[#0d3d30] text-white flex items-center justify-between px-8 shadow-md">
//       <div className="flex items-center gap-3">
//         <div className="w-10 h-10 bg-white/20 rounded-lg">
//           <Image src="/bear.webp" alt="TinyStore Logo" width={40} height={40} />
//         </div>
//         <div>
//           <h1 className="text-xl font-bold">TinyStore</h1>
//           <p className="text-xs text-gray-300">Reseller Management System</p>
//         </div>
//       </div>

//       <div className="flex gap-4">
//         <Link href={`/shop/${shop_slug}`}>
//           <button className={sidebarLinkClass(`/shop/${shop_slug}`)}>หน้าร้าน</button>
//         </Link>
//         <Link href={`/shop/${shop_slug}/tracking`}>
//           <button className={sidebarLinkClass(`/shop/${shop_slug}/tracking`)}>ติดตามสินค้า</button>
//         </Link>
//         <button
//           onClick={() => router.push(`/shop/${shop_slug}/basket`)}
//           className="flex items-center gap-2 bg-[#EF9F27] text-black border border-black px-6 py-2 rounded-lg hover:bg-[#BA7517] transition cursor-pointer relative"
//         >
//           🛒
//           <span className="text-[18px]">ตะกร้า (
//             <span className={
//               totalItems === 0 ? "text-black" : totalItems >= 1 ? "text-red-500" : "text-red" }>
//                 {totalItems}
//             </span>)
//           </span>
//         </button>
//       </div>
//     </nav>
//   )
// }

// export default HeaderCustomers
"use client"
import { useState } from "react" // เพิ่ม useState
import { useCart } from "@/app/components/cradcustomer/cartcontext"
import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"

const HeaderCustomers = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false) // จัดการสถานะเมนูมือถือ
  const pathname = usePathname()
  const router = useRouter()
  const shop_slug = pathname.split("/")[2] ?? ""
  const { totalItems } = useCart()

  const sidebarLinkClass = (path: string) =>
    `flex items-center p-2 rounded-lg font-medium transition cursor-pointer border border-white/30 hover:bg-[#1a6b5a] hover:text-white ${
      pathname === path ? "bg-[#1a6b5a] text-white" : ""
    }`

  return (
    <nav className="relative w-full h-20 bg-gradient-to-r from-[#1d9e75] via-[#1a6b5a] to-[#0d3d30] text-white flex items-center justify-between px-4 md:px-8 shadow-md">
      {/* Logo Section */}
      <div className="flex items-center gap-3 z-20">
        <div className="w-10 h-10 bg-white/20 rounded-lg shrink-0">
          <Image src="/bear.webp" alt="TinyStore Logo" width={40} height={40} />
        </div>
        <div className="hidden xs:block">
          <h1 className="text-lg md:text-xl font-bold leading-tight">TinyStore</h1>
          <p className="text-[10px] md:text-xs text-gray-300">Reseller Management System</p>
        </div>
      </div>

      {/* Desktop Menu (ซ่อนบนมือถือ) */}
      <div className="hidden md:flex gap-4 items-center">
        <Link href={`/shop/${shop_slug}`}>
          <button className={`${sidebarLinkClass(`/shop/${shop_slug}`)} w-30 justify-center`}>หน้าร้าน</button>
        </Link>
        <Link href={`/shop/${shop_slug}/tracking`}>
          <button className={`${sidebarLinkClass(`/shop/${shop_slug}/tracking`)} w-30 justify-center`}>ติดตามสินค้า</button>
        </Link>
      </div>

      {/* Cart & Mobile Toggle */}
      <div className="flex items-center gap-2 z-20">
        <button
          onClick={() => router.push(`/shop/${shop_slug}/basket`)}
          className="flex items-center gap-2 bg-[#EF9F27] text-black border border-black px-3 md:px-6 py-2 rounded-lg hover:bg-[#BA7517] transition cursor-pointer relative text-sm md:text-base"
        >
          🛒
          <span className="font-bold">
            ตะกร้า (
            <span className={totalItems === 0 ? "text-black" : "text-red-600 font-extrabold"}>
              {totalItems}
            </span>)
          </span>
        </button>

        {/* Hamburger Button (แสดงเฉพาะมือถือ) */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 bg-white/10 rounded-lg hover:bg-white/20 transition"
        >
          {isMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu Dropdown (แสดงเมื่อกด Hamburger) */}
      {isMenuOpen && (
        <div className="absolute top-20 left-0 w-full bg-[#0d3d30] border-t border-white/10 p-4 flex flex-col gap-3 md:hidden z-10 shadow-xl animate-in fade-in slide-in-from-top-2">
          <Link href={`/shop/${shop_slug}`} onClick={() => setIsMenuOpen(false)}>
            <button className={`${sidebarLinkClass(`/shop/${shop_slug}`)} w-full justify-start`}>
              หน้าร้าน
            </button>
          </Link>
          <Link href={`/shop/${shop_slug}/tracking`} onClick={() => setIsMenuOpen(false)}>
            <button className={`${sidebarLinkClass(`/shop/${shop_slug}/tracking`)} w-full justify-start`}>
              ติดตามสินค้า
            </button>
          </Link>
        </div>
      )}
    </nav>
  )
}

export default HeaderCustomers