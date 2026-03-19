"use client"
import React from 'react'
import HeaderReseller from '@/app/components/layout/headerReseller'
import CardWallet from '@/app/components/cradcatalogreseller/cardwallet'
// import { Wallet as WalletType } from '@/app/types/model';

const d = () => {
  return (
    <div className="min-h-screen bg-[#F5F3EE]">
      <HeaderReseller/>
      <h1 className='mx-7.5 mt-5 text-4xl font-bold text-[#0d3d30]'>กระเป๋าเงินร้านค้าของคุณ</h1>
      <CardWallet/>
    </div>
  )
}

export default d