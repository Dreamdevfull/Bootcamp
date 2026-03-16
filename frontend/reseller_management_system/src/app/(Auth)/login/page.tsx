"use client"
import React, { useState } from 'react'
import Header from '@/app/components/layout/header'
import { useRouter } from "next/navigation"

const LoginPage = () => {
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const router = useRouter();
  const [loading,setLoading] = useState(false);

  const URL = process.env.NEXT_PUBLIC_API_URL;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
     console.log("URL:", `${URL}/login`)
    try {
      const res = await fetch(`${URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      const result = await res.json()
      console.log(result)

      if (res.ok) {
        localStorage.setItem("token", result.token)
        router.push("/dashboard") // ✅ redirect เฉพาะตอนสำเร็จ
      } else {
        alert(result.message || "Login failed") // ✅ แสดง error แล้วหยุด
      }

    } catch (err) {
      alert("เกิดข้อผิดพลาด กรุณาลองใหม่") // ✅ จัดการ network error
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F3EE]">
      <Header/>
      <main className="flex-1 flex justify-center items-center p-4">
      <div className="w-[503px] h-[472px] bg-white rounded-2xl shadow-md border border-gray-200 p-8">
        <h1 className='text-[#0d3d30] text-[24px] text-center'>ผู้ดูแลระบบ(Admin)</h1>
        <p className='text-[#000000] text-[16px] text-center mt-2'>เข้าสู่ระบบเพื่อจัดการระบบทั้งหมด</p>
        <div className="w-full">
          <label htmlFor="email" className="block text-[16px] text-[#000000] mb-1 mt-16">
              อีเมล (Email)
          </label>
          <input
            id="email"
            type="email"
            placeholder="admin@example.com"
            value={email || ""}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0d3d30] transition"
          />
        </div>
        <div className="w-full">
          <label htmlFor="password" className="block text-[16px] text-[#000000] mb-1 mt-4">
            รหัสผ่าน (Password)
          </label>
          <input
            id="password"
            type="password"
            placeholder="*******"
            value={password || ""}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0d3d30] transition"
          />
        </div>
        <button
          type="submit"
          onClick={handleSubmit}
          className="w-full bg-[#1a6b5a] hover:bg-[#1a5a4a] text-white text-[20px] font-bold py-3 rounded-lg transition-all duration-300 shadow-md mt-14 cursor-pointer"
        >
          เข้าสู่ระบบ
        </button>
      </div>
      </main>
    </div>
    )
}

export default LoginPage