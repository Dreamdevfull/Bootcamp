import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import ButtonLogout from '../ui/button/logout'
import { usePathname } from 'next/navigation'
const HeaderReseller = () => {
  const pathname = usePathname();
  const sidebarLinkClass = (path: string) =>
    `flex mb-0.5 items-center p-2 rounded-lg font-medium w-30 justify-center border border-white/30 hover:bg-[#1a6b5a] hover:text-white transition cursor-pointer ${
    pathname === path ? "bg-[#1a6b5a] text-white" : ""}`;
  return (
    <nav className="sticky top-0 z-50 w-full h-20 bg-[#0d3d30] text-white flex items-center justify-between px-8 shadow-md">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-white/20 rounded-lg">
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
      
      <div className="flex gap-4">
        <Link href="/resellers/dashboard"><button className={sidebarLinkClass("/resellers/dashboard")}>แดชบอร์ด</button></Link>
        <Link href="/resellers/catalog"><button className={sidebarLinkClass("/resellers/catalog")}>สินค้าส่วนกลาง</button></Link>
        <Link href="/resellers/shop"><button className={sidebarLinkClass("/resellers/shop")}>จัดการหน้าร้าน</button></Link>
        <Link href="/resellers/orders"><button className={sidebarLinkClass("/resellers/orders")}>ออเดอร์ของฉัน</button></Link>
        <Link href="/resellers/wallet"><button className={sidebarLinkClass("/resellers/wallet")}>กระเป๋าเงิน</button></Link>
        <ButtonLogout />
      </div>
    </nav>
  )
}

export default HeaderReseller