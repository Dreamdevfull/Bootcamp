import React from 'react'
import Header from './components/layout/header'
import Image from "next/image"
import Link from 'next/link'
const Home = () => {

  return (
    <main className="bg-[#F5F3EE] dark:bg-[#1a1a18] min-h-screen flex flex-col">
      <Header />
      <div className="h-full py-4 bg-gradient-to-r from-[#0d3d30] via-[#1a6b5a] to-[#1d9e75] flex flex-col items-center justify-center gap-4">
        <div className="text-white flex items-center gap-2 w-fit border border-white/20 p-2 rounded-3xl bg-white/20">
          <Image src="/bear.webp" alt="TinyStore Logo" width={20} height={20} />
          สินค้าเด็กคุณภาพ ไม่ต้องมี มอก.
        </div>
        <h1 className="text-white text-center text-[50px] leading-tight">
          แพลตฟอร์มสำหรับ<br />ตัวแทนจำหน่ายสินค้าเด็ก
        </h1>
        <div className="flex items-center gap-4">
          <Link href="/register">
            <button className="text-white border border-white px-7 py-3 rounded-xl hover:bg-white/20 transition cursor-pointer">
              เริ่มต้นเป็นตัวแทน →
            </button>
          </Link>
          <Link href="/login">
            <button className="text-white border border-white px-7 py-3 rounded-xl hover:bg-white/20 transition font-medium cursor-pointer">
              เข้าสู่ระบบ
            </button>
          </Link>
        </div>
      </div>

      <section className="max-w-5xl mx-auto w-full px-6 py-4 text-center">
        <h2 className="text-xl mb-2 text-[#2C2C2A] dark:text-white">สินค้าที่ขายในแพลตฟอร์ม</h2>
        <p className="text-[#888780] dark:text-[#B4B2A9] mb-7">
          เสื้อผ้า กระเป๋า เครื่องเขียน ของตกแต่ง — ไม่ต้องมีใบรับรองใดๆ
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {[
            { icon: "👕", label: "เสื้อผ้าเด็ก" },
            { icon: "🎒", label: "กระเป๋านักเรียน" },
            { icon: "✏️", label: "เครื่องเขียน" },
            { icon: "🪆", label: "ของตกแต่งห้อง" },
            { icon: "📚", label: "หนังสือนิทาน" },
            { icon: "🛏️", label: "ผ้าห่มเด็ก" },
          ].map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-2 border border-[#1d9e75] text-[#0d3d30] dark:text-[#9FE1CB] px-5 py-2 rounded-full text-sm font-medium hover:bg-[#1d9e75]/10 transition cursor-pointer"
            >
              <span>{item.icon}</span> {item.label}
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-5xl mx-auto w-full px-6 py-3">
        <div className="bg-white dark:bg-[#2C2C2A] rounded-2xl p-8 shadow-sm flex flex-col gap-6">
          <h2 className="text-xl text-center mb-2 text-[#2C2C2A] dark:text-white">เริ่มต้นง่ายๆ 3 ขั้นตอน</h2>
          {[
            { n: 1, title: "สมัครตัวแทน", sub: "กรอกข้อมูลและรอ Admin อนุมัติ" },
            { n: 2, title: "เลือกสินค้าและตั้งราคา", sub: "เลือกสินค้าจาก catalogue แล้วตั้งราคาขายเอง" },
            { n: 3, title: "แชร์ลิงก์ร้านและรับกำไร", sub: "ลูกค้าสั่งซื้อผ่านร้านคุณ กำไรเข้า Wallet อัตโนมัติ" },
          ].map((step) => (
            <div key={step.n} className="flex items-start gap-4">
              <div className="bg-[#1A6B5A] text-white w-10 h-10 rounded-full flex items-center justify-center font-bold shrink-0">
                {step.n}
              </div>
              <div>
                <p className="text-[#2C2C2A] dark:text-white">{step.title}</p>
                <p className="text-[#888780] dark:text-[#B4B2A9] text-sm">{step.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-5xl mx-auto w-full px-6 py-3">
        <div className="bg-gradient-to-r from-[#0d3d30] via-[#1a6b5a] to-[#1d9e75] rounded-2xl p-8 shadow-sm flex flex-col items-center gap-4">
          <h2 className="text-white text-xl font-bold text-center">พร้อมเริ่มต้นแล้วรึยัง?</h2>
          <p className="text-white/80 text-center text-sm">สมัครฟรี ไม่มีค่าใช้จ่าย เริ่มขายได้ทันทีหลังอนุมัติ</p>
          <div className="flex items-center gap-4 mt-2">
            <Link href="/register">
              <button className="text-white border border-white px-7 py-3 rounded-xl hover:bg-white/20 transition font-medium cursor-pointer">
                สมัครเป็นตัวแทน →
              </button>
            </Link>
            <Link href="/login">
              <button className="text-white border border-white px-7 py-3 rounded-xl hover:bg-white/30 transition font-medium cursor-pointer">
                มีบัญชีแล้ว เข้าสู่ระบบ
              </button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Home