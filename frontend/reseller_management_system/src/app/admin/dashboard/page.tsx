"use client"
import HeaderAdmin from '@/app/components/layout/headeradmin'
import Main from '@/app/components/layout/main'
import React from 'react'

const page = () => {
  return (
    <div className='min-h-screen bg-[#F5F3EE]'>
      <HeaderAdmin />
      <Main />
      <h1>Admin Page</h1>
    </div>
  )
}

export default page