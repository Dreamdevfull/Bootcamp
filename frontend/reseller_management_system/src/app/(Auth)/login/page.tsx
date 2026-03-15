import React from 'react'

import Header from '@/app/components/layout/header'
const LoginPage = () => {
    return (
    <div className="min-h-screen bg-[#F5F3EE] ">
      <Header/>
      <div className="w-[503px] h-[472px] bg-white rounded-2xl shadow-md border border-gray-200 p-8">
        <h1 className='text-[#0d3d30] text-[24px] text-center'>ผู้ดูแลระบบ(Admin)</h1>
        <p className='text-[#000000] text-[16px] text-center mt-2'>เข้าสู่ระบบเพื่อจัดการระบบทั้งหมด</p>
        <div className="w-full">
          <label htmlFor="email" className="block text-[16px] text-[#000000] mb-1 mt-16">
              อีเมล (Email)
          </label>
          <input
            id="email"
            type="email"
            placeholder="admin@example.com"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0d3d30] transition"
          />
        </div>
        <div className="w-full">
          <label htmlFor="password" className="block text-[16px] text-[#000000] mb-1 mt-4">
            รหัสผ่าน (Password)
          </label>
          <input
            id="password"
            type="password"
            placeholder="*******"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0d3d30] transition"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-[#1a6b5a] hover:bg-[#1a5a4a] text-white text-[20px] font-bold py-3 rounded-lg transition-all duration-300 shadow-md mt-14 cursor-pointer"
        >
          เข้าสู่ระบบ
        </button>
      </div>
    </div>
    )
}

export default LoginPage