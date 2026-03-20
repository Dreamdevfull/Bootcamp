"use client"
import React from 'react'
import Image from "next/image";
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const HeaderCustomers = () => {
  const pathname = usePathname();
  const shop_slug = pathname.split("/")[2] ?? ""
  const sidebarLinkClass = (path: string) =>
    `flex mb-0.5 items-center p-2 rounded-lg font-medium w-30 justify-center border border-white/30 hover:bg-[#1a6b5a] hover:text-white transition cursor-pointer ${
    pathname === path ? "bg-[#1a6b5a] text-white" : ""}`;
  return (
    <nav className="w-full h-20 bg-gradient-to-r from-[#1d9e75] via-[#1a6b5a] to-[#0d3d30] text-white flex items-center justify-between px-8 shadow-md">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-white/20 rounded-lg">
          <Image
            src="/bear.webp"
            alt="TinyStore Logo"
            width={40}
            height={40}
          />
        </div>
        <div>
          <h1 className="text-xl font-bold">TinyStore</h1>
          <p className="text-xs text-gray-300">Reseller Management System</p>
        </div>
      </div>
      <div className="flex gap-4">
        <Link href={`/shop/${shop_slug}`}>
          <button className={sidebarLinkClass(`/shop/${shop_slug}`)}>หน้าร้าน</button>
        </Link>
        <Link href={`/shop/${shop_slug}/tracking`}>
          <button className={sidebarLinkClass(`/shop/${shop_slug}/tracking`)}>ติดตามสินค้า</button>
        </Link>
        <button type="button" className="flex items-center gap-2 bg-[#ef9f27] text-black border border-black px-6 py-2 rounded-lg hover:bg-[#BA7517] transition cursor-pointer">
          <svg
            className="w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          <span className="text-[18px]">ตะกร้า (8) </span>
        </button>
      </div>
    </nav>
  )
}

export default HeaderCustomers