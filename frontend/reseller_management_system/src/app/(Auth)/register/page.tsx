import { Input } from '@/app/components/ui/input';
import Link from 'next/link';
import React from 'react'

const RegisterPage = () => {
    const classNamelabel = "text-sm font-medium text-[#2C2C2A]"
    const classNameinput = "flex h-10 w-full rounded-md border text-[#888780] bg-[#FFFFFF] px-3 py-2 text-sm placeholder:text-[#888780] focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50 border-[#D3D1C7] focus:ring-[#9FE1CB]"
    const success = false
  if (success) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F5F3EE] p-4">
        {/* <Card className="w-full max-w-md text-center">
          <CardHeader>
            <div className="mx-auto w-16 h-16 bg-[var(--color-status-success-bg)] border-2 border-[var(--color-status-success-border)] rounded-full flex items-center justify-center mb-4">
              <svg
                className="w-8 h-8 text-[var(--color-status-success-text)]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <CardTitle className="text-2xl font-bold tracking-tight text-[var(--color-status-success-text)]">
              สมัครสมาชิกสำเร็จ!
            </CardTitle>
          </CardHeader>
          <CardContent className="text-[var(--color-neutral-text)]">
            <p>
              กรุณารอการอนุมัติจากผู้ดูแลระบบ (Admin) เมื่อได้รับการอนุมัติแล้ว
              คุณจะสามารถเข้าสู่ระบบและจัดการหน้าร้านได้
            </p>
          </CardContent>
          <CardFooter>
            <Button
              variant="outline"
              fullWidth
              onClick={() => router.push("/reseller/login")}
            >
              กลับไปหน้าเข้าสู่ระบบ
            </Button>
          </CardFooter>
        </Card> */}
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F5F3EE] p-4 py-12">
      <div className="w-full max-w-lg">
        <form action="" className="w-full max-w-lg space-y-6 border border-[] bg-[#FFFFFF] rounded-lg p-6">
          <div className="space-y-1 text-center">
          <div className="text-2xl font-bold tracking-tight text-[#BA7517]">
            สมัครตัวแทนจำหน่าย
          </div>
          <p className="text-sm text-[#888780]">
            กรอกข้อมูลเพื่อลงทะเบียนเปิดร้านค้าของคุณ
          </p>
        </div>
          <div className="space-y-4">
            <label htmlFor="fullName" className={classNamelabel}>ชื่อ-นามสกุล</label>
            <input className={classNameinput} id="fullName" placeholder="นาย ตัวอย่าง นามสมมติ" required/>
            <label htmlFor="email" className={classNamelabel}>อีเมล์</label>
            <input className={classNameinput} id="email" type="email" placeholder="example@email.com" required />
            <label htmlFor="phone" className={classNamelabel}>เบอร์โทรศัพท์</label>
            <input className={classNameinput} id="phone" type="tel" placeholder="080-000-0000" required/>
            <div className="p-4 bg-[#e1f5ee] rounded-lg border border-[] space-y-4">
              <label htmlFor="shopName" className={classNamelabel}>ชื่อร้าน</label>
              <input className={classNameinput} id="shopName" placeholder="เช่น มินนี่ช็อป" required/>
              <p className="text-xs text-[#0d3d30] font-mono bg-white p-2 rounded">
                URL หน้าร้านของคุณจะเป็น: <br />
                <strong>/shop/ชื่อร้าน</strong>
              </p>
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <label htmlFor="password">รหัสผ่าน</label>
                <input id="password" type="password" placeholder="••••••••" required className="w-full border rounded px-4 py-2 h-10 text-sm placeholder:text-[#888780] focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50 border-[#D3D1C7] focus:ring-[#9FE1CB]" />
                
              </div>
              
              <div className="flex-1">
                <label htmlFor="confirmPassword">ยืนยันรหัสผ่าน</label>
                <input id="confirmPassword" type="password" placeholder="••••••••" required className={classNameinput} />
              </div>
              
            </div>
          </div>
          <button type="submit" className="w-full bg-[#EF9F27] text-[#FFFFFF] hover:bg-[#BA7517] focus:outline-none focus:ring-2 focus:ring-[#BA7517] cursor-pointer rounded-md px-4 py-2 text-[21px]">
            สมัครสมาชิก
          </button>
          <p className="text-center text-sm text-[#888780]">
            มีบัญชีอยู่แล้ว?{" "}
            <Link href="/reseller/login" className="text-[#BA7517] hover:underline">
              เข้าสู่ระบบ
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default RegisterPage