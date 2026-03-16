import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
const HeaderReseller = () => {
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
        <Link href="/Reseller/dashboard"><button className="border border-white/30 px-6 py-2 rounded-lg hover:bg-[#1a6b5a] transition cursor-pointer">แดชบอร์ด</button></Link>
        <Link href="/Reseller/products"><button className="border border-white/30 px-6 py-2 rounded-lg hover:bg-[#1a6b5a] transition cursor-pointer">สินค้าส่วนกลาง</button></Link>
        <Link href="/Reseller/catalog"><button className="border border-white/30 px-6 py-2 rounded-lg hover:bg-[#1a6b5a] transition cursor-pointer">จัดการหน้าร้าน</button></Link>
        <Link href="/Reseller/orders"><button className="border border-white/30 px-6 py-2 rounded-lg hover:bg-[#1a6b5a] transition cursor-pointer">ออเดอร์ของฉัน</button></Link>
        <Link href="/Reseller/wallet"><button className="border border-white/30 px-6 py-2 rounded-lg hover:bg-[#1a6b5a] transition cursor-pointer">กระเป๋าเงิน</button></Link>
      </div>
    </nav>
  )
}

export default HeaderReseller