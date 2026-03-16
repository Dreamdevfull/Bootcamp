import Link from 'next/link';
import Image from 'next/image';
import ButtonLogout from '../ui/buttonlogout';

const HeaderAdmin = () => {
  
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
        <Link href="/admin/dashboard"><button className="border border-white/30 px-6 py-2 rounded-lg hover:bg-[#1a6b5a] transition cursor-pointer">แดชบอร์ด</button></Link>
        <Link href="/admin/products"><button className="border border-white/30 px-6 py-2 rounded-lg hover:bg-[#1a6b5a] transition cursor-pointer">จัดการสินค้า</button></Link>
        <Link href="/admin/reseller_approval"><button className="border border-white/30 px-6 py-2 rounded-lg hover:bg-[#1a6b5a] transition cursor-pointer">อนุมัติตัวแทน</button></Link>
        <Link href="/admin/orders"><button className="border border-white/30 px-6 py-2 rounded-lg hover:bg-[#1a6b5a] transition cursor-pointer">จัดการออเดอร์</button></Link>
        <ButtonLogout />
      </div>
    </nav>
  )
}

export default HeaderAdmin