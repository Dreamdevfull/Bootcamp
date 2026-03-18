"use client"
import React from 'react'
import HeaderReseller from '@/app/components/layout/headerReseller'
import Main from '@/app/components/layout/main'

const mockmain = {
  text1: "ออเดอร์ของฉัน",
  text2: "รายการสั่งซื้อของลูกค้าที่ซื้อผ่านหน้าร้านของคุณเท่านั้น"
}

const p = () => {
  return (
    <div className="min-h-screen bg-[#F5F3EE]">
      <HeaderReseller/>
      <Main main={mockmain}/>
    </div>
  )
}

export default p