// "use client"
// import Link from 'next/link';
// import Image from 'next/image';
// import ButtonLogout from '@/app/components/ui/admin/button/logout';
// import { usePathname } from 'next/navigation';

// const HeaderAdmin = () => {
//   const pathname = usePathname();
//     const sidebarLinkClass = (path: string) =>
//     `flex mb-0.5 items-center p-2 rounded-lg font-medium w-30 justify-center border border-white/30 hover:bg-[#1a6b5a] hover:text-white transition cursor-pointer ${
//     pathname === path ? "bg-[#1a6b5a] text-white" : ""}`;
  
//   return (
//     <nav className="sticky top-0 z-50 w-full h-20 bg-[#0d3d30] text-white flex items-center justify-between px-8 shadow-md">
//       <div className="flex items-center gap-3">
//         <div className="w-10 h-10 bg-white/20 rounded-lg">
//         <Image 
//           src="/bear.webp" 
//           alt="TinyStore Logo" 
//           width={40} 
//           height={40} 
//         />
//         </div>
//         <div>
//           <h1 className="text-xl font-bold">TinyStore</h1>
//           <p className="text-xs text-gray-300">Reseller Management System</p>
//         </div>
//       </div>
      
//       <div className="flex gap-4">
//         <Link href="/admin/dashboard"><button className={sidebarLinkClass("/admin/dashboard")}>แดชบอร์ด</button></Link>
//         <Link href="/admin/products"><button className={sidebarLinkClass("/admin/products")}>จัดการสินค้า</button></Link>
//         <Link href="/admin/resellers_manage"><button className={sidebarLinkClass("/admin/resellers_manage")}>อนุมัติตัวแทน</button></Link>
//         <Link href="/admin/orders"><button className={sidebarLinkClass("/admin/orders")}>จัดการออเดอร์</button></Link>
//         <ButtonLogout />
//       </div>
//     </nav>
//   )
// }

// export default HeaderAdmin

"use client"
import Link from 'next/link';
import Image from 'next/image';
import ButtonLogout from '@/app/components/ui/admin/button/logout';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X } from 'lucide-react'; // อย่าลืม npm install lucide-react

const HeaderAdmin = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const sidebarLinkClass = (path: string) =>
    `flex items-center p-2 rounded-lg font-medium transition cursor-pointer border border-white/30 
    hover:bg-[#1a6b5a] hover:text-white justify-center w-full md:w-32
    ${pathname === path ? "bg-[#1a6b5a] text-white" : "text-white/90"}`;

  return (
    <nav className="sticky top-0 z-50 w-full bg-[#0d3d30] text-white shadow-md">
      {/* Container หลัก */}
      <div className="max-w-[1440px] mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Section */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-lg overflow-hidden">
              <Image 
                src="/bear.webp" 
                alt="TinyStore Logo" 
                width={40} 
                height={40} 
                className="object-cover"
              />
            </div>
            <div className="hidden sm:block"> {/* ซ่อนสโลแกนในมือถือจอเล็กมากเพื่อประหยัดพื้นที่ */}
              <h1 className="text-xl font-bold leading-tight">TinyStore</h1>
              <p className="text-[10px] text-gray-300">Reseller Management System</p>
            </div>
          </div>

          {/* Desktop Navigation (แสดงบน md ขึ้นไป) */}
          <div className="hidden lg:flex items-center gap-3">
            <Link href="/admin/dashboard"><button className={sidebarLinkClass("/admin/dashboard")}>แดชบอร์ด</button></Link>
            <Link href="/admin/products"><button className={sidebarLinkClass("/admin/products")}>จัดการสินค้า</button></Link>
            <Link href="/admin/resellers_manage"><button className={sidebarLinkClass("/admin/resellers_manage")}>อนุมัติตัวแทน</button></Link>
            <Link href="/admin/orders"><button className={sidebarLinkClass("/admin/orders")}>จัดการออเดอร์</button></Link>
            <div className="ml-2">
              <ButtonLogout />
            </div>
          </div>

          {/* Mobile Menu Button (แสดงเฉพาะจอเล็ก) */}
          <div className="lg:hidden flex items-center gap-4">
             {/* แสดงปุ่ม Logout ไว้ข้างนอกเลยเพื่อให้ Admin ออกจากระบบได้ง่าย หรือจะเอาไว้ข้างใน Menu ก็ได้ */}
            <div className="sm:block hidden">
                 <ButtonLogout />
            </div>
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-white hover:bg-white/10 rounded-lg transition"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer (เมนูที่ไหลลงมา) */}
      <div className={`lg:hidden transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? "max-h-[500px] border-t border-white/10" : "max-h-0"}`}>
        <div className="px-4 py-4 space-y-2 bg-[#0d3d30]">
          <Link href="/admin/dashboard" onClick={() => setIsOpen(false)}>
            <button className={sidebarLinkClass("/admin/dashboard")}>แดชบอร์ด</button>
          </Link>
          <Link href="/admin/products" onClick={() => setIsOpen(false)}>
            <button className={sidebarLinkClass("/admin/products")}>จัดการสินค้า</button>
          </Link>
          <Link href="/admin/resellers_manage" onClick={() => setIsOpen(false)}>
            <button className={sidebarLinkClass("/admin/resellers_manage")}>อนุมัติตัวแทน</button>
          </Link>
          <Link href="/admin/orders" onClick={() => setIsOpen(false)}>
            <button className={sidebarLinkClass("/admin/orders")}>จัดการออเดอร์</button>
          </Link>
          <div className="pt-2 sm:hidden block"> {/* แสดงปุ่ม Logout ในเมนูสำหรับมือถือจอเล็ก */}
            <ButtonLogout />
          </div>
        </div>
      </div>
    </nav>
  )
}

export default HeaderAdmin;