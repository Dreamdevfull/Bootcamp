// import React from 'react'
// import Image from 'next/image'
// import Link from 'next/link'
// import ButtonLogout from '../ui/admin/button/logout'
// import { usePathname } from 'next/navigation'
// const HeaderReseller = () => {
//   const pathname = usePathname();
//   const sidebarLinkClass = (path: string) =>
//     `flex mb-0.5 items-center p-2 rounded-lg font-medium w-30 justify-center border border-white/30 hover:bg-[#1a6b5a] hover:text-white transition cursor-pointer ${
//     pathname === path ? "bg-[#1a6b5a] text-white" : ""}`;
//   return (
//     <nav className="sticky top-0 z-50 w-full h-20 bg-[#0d3d30] text-white flex items-center justify-between px-8 shadow-md">
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
//         <Link href="/resellers/dashboard"><button className={sidebarLinkClass("/resellers/dashboard")}>แดชบอร์ด</button></Link>
//         <Link href="/resellers/catalog"><button className={sidebarLinkClass("/resellers/catalog")}>สินค้าส่วนกลาง</button></Link>
//         <Link href="/resellers/shop"><button className={sidebarLinkClass("/resellers/shop")}>จัดการหน้าร้าน</button></Link>
//         <Link href="/resellers/orders"><button className={sidebarLinkClass("/resellers/orders")}>ออเดอร์ของฉัน</button></Link>
//         <Link href="/resellers/wallet"><button className={sidebarLinkClass("/resellers/wallet")}>กระเป๋าเงิน</button></Link>
//         <ButtonLogout />
//       </div>
//     </nav>
//   )
// }

// export default HeaderReseller
"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import ButtonLogout from '../ui/admin/button/logout'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react' // อย่าลืมติดตั้ง lucide-react

const HeaderReseller = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const sidebarLinkClass = (path: string) =>
    `flex items-center p-2 rounded-lg font-medium transition cursor-pointer border border-white/30 
    hover:bg-[#1a6b5a] hover:text-white justify-center w-full lg:w-30
    ${pathname === path ? "bg-[#1a6b5a] text-white" : ""}`;

  return (
    <nav className="sticky top-0 z-50 w-full bg-[#0d3d30] text-white shadow-md">
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
          <div className="hidden sm:block">
            <h1 className="text-xl font-bold">TinyStore</h1>
            <p className="text-[10px] text-gray-300">Reseller Management System</p>
          </div>
        </div>
        
        {/* Desktop Menu (แสดงผลบนจอ LG ขึ้นไปเพราะเมนูเยอะ) */}
        <div className="hidden lg:flex items-center gap-3">
          <Link href="/resellers/dashboard"><button className={sidebarLinkClass("/resellers/dashboard")}>แดชบอร์ด</button></Link>
          <Link href="/resellers/catalog"><button className={sidebarLinkClass("/resellers/catalog")}>สินค้าส่วนกลาง</button></Link>
          <Link href="/resellers/shop"><button className={sidebarLinkClass("/resellers/shop")}>จัดการหน้าร้าน</button></Link>
          <Link href="/resellers/orders"><button className={sidebarLinkClass("/resellers/orders")}>ออเดอร์ของฉัน</button></Link>
          <Link href="/resellers/wallet"><button className={sidebarLinkClass("/resellers/wallet")}>กระเป๋าเงิน</button></Link>
          <div className="ml-2">
            <ButtonLogout />
          </div>
        </div>

        {/* Mobile/Tablet Menu Button (แสดงบนจอที่เล็กกว่า LG) */}
        <div className="lg:hidden flex items-center gap-4">
          <div className="hidden md:block">
            <ButtonLogout />
          </div>
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="p-2 rounded-md hover:bg-white/10 transition"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Sidebar Drawer */}
      <div className={`lg:hidden transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? "max-h-[500px] border-t border-white/10" : "max-h-0"}`}>
        <div className="px-6 py-4 flex flex-col gap-2 bg-[#0d3d30]">
          <Link href="/resellers/dashboard" onClick={() => setIsOpen(false)}>
            <button className={sidebarLinkClass("/resellers/dashboard")}>แดชบอร์ด</button>
          </Link>
          <Link href="/resellers/catalog" onClick={() => setIsOpen(false)}>
            <button className={sidebarLinkClass("/resellers/catalog")}>สินค้าส่วนกลาง</button>
          </Link>
          <Link href="/resellers/shop" onClick={() => setIsOpen(false)}>
            <button className={sidebarLinkClass("/resellers/shop")}>จัดการหน้าร้าน</button>
          </Link>
          <Link href="/resellers/orders" onClick={() => setIsOpen(false)}>
            <button className={sidebarLinkClass("/resellers/orders")}>ออเดอร์ของฉัน</button>
          </Link>
          <Link href="/resellers/wallet" onClick={() => setIsOpen(false)}>
            <button className={sidebarLinkClass("/resellers/wallet")}>กระเป๋าเงิน</button>
          </Link>
          <div className="pt-2 md:hidden">
            <ButtonLogout />
          </div>
        </div>
      </div>
    </nav>
  )
}

export default HeaderReseller