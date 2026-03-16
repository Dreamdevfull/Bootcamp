"use client"
import Header from '@/app/components/layout/header'
import FromLogin from '@/app/components/ui/fromlogin'
import { Suspense } from "react";

const LoginPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#F5F3EE]">
      <Header/>
      <Suspense fallback={<div>Loading...</div>}>
        <FromLogin/>
      </Suspense>
    </div>
    )
}

export default LoginPage