// import { usePathname } from 'next/navigation'
// import Image from "next/image";
// import Link from 'next/link';
// const Header = () => {
//   const pathname = usePathname();
//   const sidebarLinkClass = (path: string) =>
//     `flex mb-0.5 items-center p-2 rounded-lg font-medium w-30 justify-center border border-white/30 hover:bg-[#1a6b5a] hover:text-white transition cursor-pointer ${
//     pathname === path ? "bg-[#1a6b5a] text-white" : ""}`;
  
//   // const sidebarLinkClassresponsive = (path: string) =>
//   //   `flex items-center justify-center p-2 mx-2 my-1 rounded-lg font-medium border border-white/30 hover:bg-[#1a6b5a] hover:text-white transition cursor-pointer w-full ${
//   //   pathname === path ? "bg-[#1a6b5a] text-white" : ""}`;

//   return (
//     <nav className="sticky top-0 z-50 w-full h-20 bg-gradient-to-r from-[#1d9e75] via-[#1a6b5a] to-[#0d3d30] text-white flex items-center justify-between px-8 shadow-md">
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
//           {/* <Link href="/"><button className="border border-white/30 px-6 py-2 rounded-lg hover:bg-[#1a6b5a] transition cursor-pointer">หน้าหลัก</button></Link>
//           <Link href="/login"><button className="border border-white/30 px-6 py-2 rounded-lg hover:bg-[#1a6b5a] transition cursor-pointer">เข้าสู่ระบบ</button></Link>
//           <Link href="/register"><button className="border border-white/30 px-6 py-2 rounded-lg hover:bg-[#1a6b5a] transition cursor-pointer">สมัครตัวแทน</button></Link> */}
//           <Link href="/"><button className={sidebarLinkClass("/")}>หน้าหลัก</button></Link>
//           <Link href="/login"><button className={sidebarLinkClass("/login")}>เข้าสู่ระบบ</button></Link>
//           <Link href="/register"><button className={sidebarLinkClass("/register")}>สมัครตัวแทน</button></Link>
//       </div>
//     </nav>
//   )
// }

// export default Header
"use client"
import { usePathname } from 'next/navigation'
import Image from "next/image";
import Link from 'next/link';
import { useState } from 'react'; // เพิ่ม useState สำหรับเปิด-ปิดเมนู
import { Menu, X } from 'lucide-react'; // อย่าลืม npm install lucide-react
import { ThemeProvider } from 'next-themes';
import ThemeToggle from '../drakmode/ThemeToggle';


const Header = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false); // State ควบคุมเมนูมือถือ

  const sidebarLinkClass = (path: string) =>
    `flex items-center p-2 rounded-lg font-medium justify-center border border-white/30 hover:bg-[#1a6b5a] hover:text-white transition cursor-pointer w-full md:w-30 ${
    pathname === path ? "bg-[#1a6b5a] text-white" : ""}`;

  return (
    <nav className="sticky top-0 z-50 w-full bg-gradient-to-r from-[#1d9e75] via-[#1a6b5a] to-[#0d3d30] text-white shadow-md">
      {/* Main Container */}
      <ThemeToggle/>
      <div className="flex items-center justify-between px-8 h-20">
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
            <p className="text-xs text-gray-300">Reseller Management System</p>
          </div>
        </div>
        
        {/* Desktop Menu - ซ่อนเมื่อจอเล็ก (hidden) และแสดงเมื่อ md ขึ้นไป (md:flex) */}
        <div className="hidden md:flex gap-4">
            <Link href="/"><button className={sidebarLinkClass("/")}>หน้าหลัก</button></Link>
            <Link href="/shop"><button className={sidebarLinkClass("/shop")}>ร้านค้า</button></Link>
            <Link href="/tracking"><button className={sidebarLinkClass("/tracking")}>ติดตามสถานะ</button></Link>
            <Link href="/login"><button className={sidebarLinkClass("/login")}>เข้าสู่ระบบ</button></Link>
            <Link href="/register"><button className={sidebarLinkClass("/register")}>สมัครตัวแทน</button></Link>
        </div>

        {/* Hamburger Button - แสดงเฉพาะจอเล็ก (md:hidden) */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer - แสดงผลเมื่อ isOpen เป็น true */}
      {isOpen && (
        <div className="md:hidden bg-[#0d3d30] border-t border-white/10 px-8 py-4 flex flex-col gap-2">
          <Link href="/" onClick={() => setIsOpen(false)}>
            <button className={sidebarLinkClass("/")}>หน้าหลัก</button>
          </Link>
          <Link href="/shop" onClick={() => setIsOpen(false)}>
            <button className={sidebarLinkClass("/shop")}>ร้านค้า</button>
          </Link>
          <Link href="/tracking"onClick={() => setIsOpen(false)}>
            <button className={sidebarLinkClass("/tracking")}>ติดตามสถานะ</button>
          </Link>
          <Link href="/login" onClick={() => setIsOpen(false)}>
            <button className={sidebarLinkClass("/login")}>เข้าสู่ระบบ</button>
          </Link>
          <Link href="/register" onClick={() => setIsOpen(false)}>
            <button className={sidebarLinkClass("/register")}>สมัครตัวแทน</button>
          </Link>
        </div>
      )}
    </nav>
  )
}

export default Header