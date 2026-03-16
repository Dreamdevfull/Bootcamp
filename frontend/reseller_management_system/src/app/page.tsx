"use client"
import React from 'react'
import Header from './components/layout/header'
import Image from "next/image";
import Link from 'next/link';

const Home = () => {
  return (
    <main className='bg-[#F5F3EE] min-h-screen flex flex-col'>
      <Header />
      <div className='h-full py-4 bg-gradient-to-r from-[#0d3d30] via-[#1a6b5a] to-[#1d9e75] flex flex-col items-center justify-center gap-4'>
        <div className='text-white flex items-center gap-2 w-fit border border-white/20 p-2 rounded-3xl bg-white/20'>
          <Image
            src="/bear.webp"
            alt="TinyStore Logo"
            width={20}
            height={20}
          />สินค้าเด็กคุณภาพ ไม่ต้องมี มอก.
        </div>
        <h1 className='text-white text-center text-[50px] leading-tight'>แพลตฟอร์มสำหรับ<br></br>ตัวแทนจำหน่ายสินค้าเด็ก</h1>
        <div className='flex items-center gap-4'>
          <Link href="/register"><button className='text-white border border-white px-7 py-3 rounded-xl hover:bg-white/20 transition cursor-pointer'>
            เริ่มต้นเป็นตัวแทน→
          </button></Link>
          <Link href="/login"><button className='text-white border border-white px-7 py-3 rounded-xl hover:bg-white/20 transition font-medium cursor-pointer'>
            เข้าสู่ระบบ
          </button></Link>
        </div>
        {/* <div className='flex items-center justify-center gap-8 mt-8'>

          <div className='text-center'>
            <p className='text-white text-4xl font-bold'>120+</p>
            <p className='text-white/70 text-sm'>ตัวแทนจำหน่าย</p>
          </div>

          <div className='w-px h-12 bg-white/30' />

          <div className='text-center'>
            <p className='text-white text-4xl font-bold'>500+</p>
            <p className='text-white/70 text-sm'>สินค้าในระบบ</p>
          </div>

          <div className='w-px h-12 bg-white/30' />

          <div className='text-center'>
            <p className='text-white text-4xl font-bold'>3,200+</p>
            <p className='text-white/70 text-sm'>ออเดอร์สำเร็จ</p>
          </div>
        </div> */}
      </div>
      <section className='max-w-5xl mx-auto w-full px-6 py-4 text-center'>
        <h2 className='text-xl mb-2'>สินค้าที่ขายในแพลตฟอร์ม</h2>
        <p className='text-[#888780] mb-7'>เสื้อผ้า กระเป๋า เครื่องเขียน ของตกแต่ง — ไม่ต้องมีใบรับรองใดๆ</p>
        <div className='flex flex-wrap justify-center gap-3'>

          <div className='flex items-center gap-2 border border-[#1d9e75] text-[#0d3d30] px-5 py-2 rounded-full text-sm font-medium hover:bg-[#1d9e75]/10 transition cursor-pointer'>
            <span>👕</span> เสื้อผ้าเด็ก
          </div>

          <div className='flex items-center gap-2 border border-[#1d9e75] text-[#0d3d30] px-5 py-2 rounded-full text-sm font-medium hover:bg-[#1d9e75]/10 transition cursor-pointer'>
            <span>🎒</span> กระเป๋านักเรียน
          </div>

          <div className='flex items-center gap-2 border border-[#1d9e75] text-[#0d3d30] px-5 py-2 rounded-full text-sm font-medium hover:bg-[#1d9e75]/10 transition cursor-pointer'>
            <span>✏️</span> เครื่องเขียน
          </div>

          <div className='flex items-center gap-2 border border-[#1d9e75] text-[#0d3d30] px-5 py-2 rounded-full text-sm font-medium hover:bg-[#1d9e75]/10 transition cursor-pointer'>
            <span>🪆</span> ของตกแต่งห้อง
          </div>

          <div className='flex items-center gap-2 border border-[#1d9e75] text-[#0d3d30] px-5 py-2 rounded-full text-sm font-medium hover:bg-[#1d9e75]/10 transition cursor-pointer'>
            <span>📚</span> หนังสือนิทาน
          </div>

          <div className='flex items-center gap-2 border border-[#1d9e75] text-[#0d3d30] px-5 py-2 rounded-full text-sm font-medium hover:bg-[#1d9e75]/10 transition cursor-pointer'>
            <span>🛏️</span> ผ้าห่มเด็ก
          </div>

        </div>
      </section>     
      <section className='max-w-5xl mx-auto w-full px-6 py-3'>
        <div className='bg-white rounded-2xl p-8 shadow-sm flex flex-col gap-6'>
          <h2 className='text-xl text-center mb-2'>เริ่มต้นง่ายๆ 3 ขั้นตอน</h2>
          <div className='flex items-start gap-4'>
            <div className='bg-[#1A6B5A] text-white w-10 h-10 rounded-full flex items-center justify-center font-bold shrink-0'>
              1
            </div>
            <div>
              <p>สมัครตัวแทน</p>
              <p className='text-gray-400 text-sm'>กรอกข้อมูลและรอ Admin อนุมัติ</p>
            </div>
          </div>

          <div className='flex items-start gap-4'>
            <div className='bg-[#1A6B5A] text-white w-10 h-10 rounded-full flex items-center justify-center font-bold shrink-0'>
              2
            </div>
            <div>
              <p>เลือกสินค้าและตั้งราคา</p>
              <p className='text-gray-400 text-sm'>เลือกสินค้าจาก catalogue แล้วตั้งราคาขายเอง</p>
            </div>
          </div>

          <div className='flex items-start gap-4'>
            <div className='bg-[#1A6B5A] text-white w-10 h-10 rounded-full flex items-center justify-center font-bold shrink-0'>
              3
            </div>
            <div>
              <p>แชร์ลิงก์ร้านและรับกำไร</p>
              <p className='text-gray-400 text-sm'>ลูกค้าสั่งซื้อผ่านร้านคุณ กำไรเข้า Wallet อัตโนมัติ</p>
            </div>
          </div>
        </div>
      </section>
      <section className='max-w-5xl mx-auto w-full px-6 py-3'>
        <div className='bg-gradient-to-r from-[#0d3d30] via-[#1a6b5a] to-[#1d9e75] rounded-2xl p-8 shadow-sm flex flex-col items-center gap-4'>
          <h2 className='text-white text-xl font-bold text-center'>พร้อมเริ่มต้นแล้วรึยัง?</h2>
          <p className='text-white/80 text-center text-sm'>สมัครฟรี ไม่มีค่าใช้จ่าย เริ่มขายได้ทันทีหลังอนุมัติ</p>

          <div className='flex items-center gap-4 mt-2'>
            <Link href="/register"><button className='text-white border border-white px-7 py-3 rounded-xl hover:bg-white/20 transition font-medium cursor-pointer'>
              สมัครเป็นตัวแทน →
            </button></Link>
            <Link href="/login"><button className='text-white border border-white px-7 py-3 rounded-xl hover:bg-white/30 transition font-medium cursor-pointer'>
              มีบัญชีแล้ว เข้าสู่ระบบ
            </button></Link>
          </div>

        </div>
      </section>
    </main>
  )
}

export default Home