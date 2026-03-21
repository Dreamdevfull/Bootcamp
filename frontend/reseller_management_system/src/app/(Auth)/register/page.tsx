'use client'
import Header from '@/app/components/layout/header'
import FromRegister from '@/app/components/ui/fromregister'
import { Suspense } from "react";

const RegisterPage = () => {
    
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
    <>
    <div className="min-h-screen bg-[#F5F3EE] dark:bg-[#1a1a18]">
      <Header/>
      <div className="flex w-full max-w-lg mx-auto mt-2">
        <Suspense fallback={<div>Loading...</div>}>
          <FromRegister />
        </Suspense>
      </div>
    </div>
    </>
  )
}

export default RegisterPage