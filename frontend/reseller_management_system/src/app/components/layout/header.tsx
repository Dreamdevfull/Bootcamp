import React from 'react'

const Header = () => {
  return (
    <nav className="w-full h-20 bg-[#0d3d30] text-white flex items-center justify-between px-8 shadow-md">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-white/20 rounded-lg"></div>
        <div>
          <h1 className="text-xl font-bold">TinyStore</h1>
          <p className="text-xs text-gray-300">Reseller Management System</p>
        </div>
      </div>
      
      <div className="flex gap-4">
        <button className="border border-white/30 px-6 py-2 rounded-lg hover:bg-white/10 transition">เข้าสู่ระบบ</button>
        <button className="border border-white/30 px-6 py-2 rounded-lg hover:bg-white/10 transition">สมัครตัวแทน</button>
      </div>
    </nav>
  )
}

export default Header