import React from 'react'
import Link from 'next/link'

const FromRegister = () => {
  const classNamelabel = "text-sm font-medium text-[#2C2C2A]"
  const classNameinput = "flex h-9 w-full rounded-md border text-[#888780] bg-[#FFFFFF] px-3 py-2 text-sm placeholder:text-[#888780] focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50 border-[#D3D1C7] focus:ring-[#9FE1CB]"

  return (
    <form className="w-full max-w-md space-y-4 border bg-[#FFFFFF] rounded-lg p-6">
      <div className="space-y-1 text-center">
        <div className="text-xl font-bold tracking-tight text-[#BA7517]">
          สมัครตัวแทนจำหน่าย
        </div>
        <p className="text-sm text-[#888780]">
          กรอกข้อมูลเพื่อลงทะเบียนเปิดร้านค้าของคุณ
        </p>
      </div>

      <div className="space-y-3">
        <div>
          <label htmlFor="fullName" className={classNamelabel}>ชื่อ-นามสกุล</label>
          <input className={classNameinput} id="fullName" placeholder="นาย ตัวอย่าง นามสมมติ" required />
        </div>
        <div>
          <label htmlFor="email" className={classNamelabel}>อีเมล์</label>
          <input className={classNameinput} id="email" type="email" placeholder="example@email.com" required />
        </div>
        <div>
          <label htmlFor="phone" className={classNamelabel}>เบอร์โทรศัพท์</label>
          <input className={classNameinput} id="phone" type="tel" placeholder="080-000-0000" required />
        </div>

        <div className="p-3 bg-[#e1f5ee] rounded-lg space-y-3">
          <div>
            <label htmlFor="shopName" className={classNamelabel}>ชื่อร้าน</label>
            <input className={classNameinput} id="shopName" placeholder="เช่น มินนี่ช็อป" required />
          </div>
          <p className="text-xs text-[#0d3d30] font-mono bg-white p-2 rounded">
            URL หน้าร้านของคุณจะเป็น: <strong>/shop/ชื่อร้าน</strong>
          </p>
        </div>

        <div className="flex gap-3">
          <div className="flex-1">
            <label htmlFor="password" className={classNamelabel}>รหัสผ่าน</label>
            <input id="password" type="password" placeholder="••••••••" required className={classNameinput} />
          </div>
          <div className="flex-1">
            <label htmlFor="confirmPassword" className={classNamelabel}>ยืนยันรหัสผ่าน</label>
            <input id="confirmPassword" type="password" placeholder="••••••••" required className={classNameinput} />
          </div>
        </div>
      </div>

      <button type="submit" className="w-full bg-[#EF9F27] text-white hover:bg-[#BA7517] focus:outline-none focus:ring-2 focus:ring-[#BA7517] cursor-pointer rounded-md px-4 py-2 text-base">
        สมัครสมาชิก
      </button>

      <p className="text-center text-sm text-[#888780]">
        มีบัญชีอยู่แล้ว?{" "}
        <Link href="/reseller/login" className="text-[#BA7517] hover:underline">
          เข้าสู่ระบบ
        </Link>
      </p>
    </form>
  )
}

export default FromRegister