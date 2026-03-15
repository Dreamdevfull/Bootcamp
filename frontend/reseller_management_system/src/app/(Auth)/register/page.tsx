import { Input } from '@/app/components/ui/input';
import React from 'react'

const RegisterPage = () => {
    const success = false
  if (success) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[] p-4">
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
    <div className="flex min-h-screen items-center justify-center bg-[] p-4 py-12">
      {/* <Card className="w-full max-w-lg">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold tracking-tight text-[var(--color-accent-main)]">
            สมัครตัวแทนจำหน่าย
          </CardTitle>
          <p className="text-sm text-[var(--color-neutral-muted)]">
            กรอกข้อมูลเพื่อลงทะเบียนเปิดร้านค้าของคุณ
          </p>
        </CardHeader> */}
      <form action="" className="w-full max-w-lg space-y-6 border border-[] rounded-lg p-6">
        
        <div className="space-y-4">
          <Input id="fullName" label="ชื่อ-นามสกุล" placeholder="นาย ตัวอย่าง นามสมมติ" required value=""/>
          <Input id="email" type="email" label="อีเมล์" placeholder="example@email.com" required value="" />
          <Input id="phone" type="tel" label="เบอร์โทรศัพท์" placeholder="080-000-0000" required value=""
          />
          <div className="p-4 bg-[] rounded-lg border border-[] space-y-4">
            <Input id="shopName" label="ชื่อร้าน (Shop Name)" placeholder="เช่น มินนี่ช็อป" required value=""/>
            <p className="text-xs text-[] font-mono bg-white p-2 rounded">
              URL หน้าร้านของคุณจะเป็น: <br />
              <strong>/shop/ชื่อร้าน</strong>
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input id="password" type="password" label="รหัสผ่าน" placeholder="••••••••" required value="" />
            <Input id="confirmPassword" type="password"  label="ยืนยันรหัสผ่าน" placeholder="••••••••" required value="" />
          </div>
        </div>
      </form>
    </div>
  )
}

export default RegisterPage