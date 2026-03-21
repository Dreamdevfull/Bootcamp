// "use client"
// import React from 'react'
// import Image from "next/image";
// import { usePathname } from 'next/navigation';
// import Link from 'next/link';

// const HeaderCustomers = () => {
//   const pathname = usePathname();
//   const shop_slug = pathname.split("/")[2] ?? ""
//   const sidebarLinkClass = (path: string) =>
//     `flex mb-0.5 items-center p-2 rounded-lg font-medium w-30 justify-center border border-white/30 hover:bg-[#1a6b5a] hover:text-white transition cursor-pointer ${
//     pathname === path ? "bg-[#1a6b5a] text-white" : ""}`;
//   return (
//     <nav className="w-full h-20 bg-gradient-to-r from-[#1d9e75] via-[#1a6b5a] to-[#0d3d30] text-white flex items-center justify-between px-8 shadow-md">
//       <div className="flex items-center gap-3">
//         <div className="w-10 h-10 bg-white/20 rounded-lg">
//           <Image
//             src="/bear.webp"
//             alt="TinyStore Logo"
//             width={40}
//             height={40}
//           />
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
//         <Link href={`/shop/${shop_slug}/basket`}>
//         <button type="button" className="flex items-center gap-2 bg-[#ef9f27] text-white border px-6 py-2 rounded-lg hover:bg-[#BA7517] transition cursor-pointer">
//           <span className="text-[18px]">🛒ตะกร้า (8) </span>
//         </button></Link>
//       </div>
//     </nav>
//   )
// }

// export default HeaderCustomers
"use client"
import React, { useState } from 'react'
import Image from "next/image";
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Menu, X } from 'lucide-react'; // อย่าลืมติดตั้ง lucide-react

const HeaderCustomers = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const shop_slug = pathname.split("/")[2] ?? ""

  const sidebarLinkClass = (path: string) =>
    `flex items-center p-2 rounded-lg font-medium transition cursor-pointer border border-white/30 
    hover:bg-[#1a6b5a] hover:text-white justify-center w-full md:w-30 
    ${pathname === path ? "bg-[#1a6b5a] text-white" : ""}`;

  return (
    <nav className="sticky top-0 z-50 w-full bg-gradient-to-r from-[#1d9e75] via-[#1a6b5a] to-[#0d3d30] text-white shadow-md">
      {/* Main Container */}
      <div className="flex items-center justify-between px-4 md:px-8 h-20">
        
        {/* Logo Section */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-lg overflow-hidden">
            <Image
              src="/bear.webp"
              alt="TinyStore Logo"
              width={40}
              height={40}
            />
          </div>
          <div>
            <h1 className="text-xl font-bold">TinyStore</h1>
            <p className="text-[10px] md:text-xs text-gray-300">Reseller Management System</p>
          </div>
        </div>

        {/* Desktop Menu (md ขึ้นไป) */}
        <div className="hidden md:flex items-center gap-4">
          <Link href={`/shop/${shop_slug}`}>
            <button className={sidebarLinkClass(`/shop/${shop_slug}`)}>หน้าร้าน</button>
          </Link>
          <Link href={`/shop/${shop_slug}/tracking`}>
            <button className={sidebarLinkClass(`/shop/${shop_slug}/tracking`)}>ติดตามสินค้า</button>
          </Link>
          <Link href={`/shop/${shop_slug}/basket`}>
            <button type="button" className="flex items-center gap-2 bg-[#ef9f27] text-white px-6 py-2 rounded-lg hover:bg-[#BA7517] transition cursor-pointer">
              <span className="text-[16px]">🛒ตะกร้า (8)</span>
            </button>
          </Link>
        </div>

        {/* Mobile Buttons (แสดงเฉพาะหน้าจอเล็ก) */}
        <div className="md:hidden flex items-center gap-3">
          {/* แสดงปุ่มตะกร้าขนาดเล็กในมือถือเพื่อให้กดง่าย */}
          <Link href={`/shop/${shop_slug}/basket`}>
            <button className="bg-[#ef9f27] p-2 rounded-lg text-white">
              🛒 (8)
            </button>
          </Link>
          <button onClick={() => setIsOpen(!isOpen)} className="p-1">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isOpen && (
        <div className="md:hidden bg-[#0d3d30] border-t border-white/10 px-4 py-4 flex flex-col gap-3">
          <Link href={`/shop/${shop_slug}`} onClick={() => setIsOpen(false)}>
            <button className={sidebarLinkClass(`/shop/${shop_slug}`)}>หน้าร้าน</button>
          </Link>
          <Link href={`/shop/${shop_slug}/tracking`} onClick={() => setIsOpen(false)}>
            <button className={sidebarLinkClass(`/shop/${shop_slug}/tracking`)}>ติดตามสินค้า</button>
          </Link>
        </div>
      )}
    </nav>
  )
}

export default HeaderCustomers