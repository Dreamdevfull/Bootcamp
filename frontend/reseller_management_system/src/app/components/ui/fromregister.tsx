"use client"
import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const FromRegister = () => {
  const classNamelabel = "text-sm font-medium text-[#2C2C2A]"
  const classNameinput = "flex h-9 w-full rounded-md border text-[#888780] bg-[#FFFFFF] px-3 py-2 text-sm placeholder:text-[#888780] focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50 border-[#D3D1C7] focus:ring-[#9FE1CB]"

  const [loading, setLoading] = React.useState(false);
  const [name, setFullName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [shop_name, setShopName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  // const [address, setAddress] = React.useState("");

  const router = useRouter();
  const URL = process.env.NEXT_PUBLIC_API_URL;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("รหัสผ่านไม่ตรงกัน");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${URL}/register`, {  // ← แก้เป็น /register
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, status: "pending", role: "reseller", phone, shop_name, password }),
      });
      const result = await res.json();
      if (res.ok) {
        router.push("/resellers/dashboard");
      } else {
        alert(result.message || "สมัครสมาชิกไม่สำเร็จ");
      }
    } catch (err) {
      console.error(err);
      alert("เกิดข้อผิดพลาด กรุณาลองใหม่");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md space-y-2 border bg-[#FFFFFF] rounded-lg p-6">
      <div className="space-y-2 text-center">
        <div className="text-xl font-bold tracking-tight text-[#BA7517]">สมัครตัวแทนจำหน่าย</div>
        <p className="text-sm text-[#888780]">กรอกข้อมูลเพื่อลงทะเบียนเปิดร้านค้าของคุณ</p>
      </div>

      <div className="space-y-1">
        <div>
          <label htmlFor="fullName" className={classNamelabel}>ชื่อ-นามสกุล</label>
          <input value={name} onChange={(e) => setFullName(e.target.value)} className={classNameinput} id="fullName" placeholder="นาย ตัวอย่าง นามสมมติ" required />
        </div>
        <div>
          <label htmlFor="email" className={classNamelabel}>อีเมล์</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} className={classNameinput} id="email" type="email" placeholder="example@email.com" required />
        </div>
        <div>
          <label htmlFor="phone" className={classNamelabel}>เบอร์โทรศัพท์</label>
          <input value={phone} onChange={(e) => setPhone(e.target.value)} className={classNameinput} id="phone" type="tel" placeholder="080-000-0000" required />
        </div>

        <div className="p-3 bg-[#e1f5ee] rounded-lg space-y-2">
          <div>
            <label htmlFor="shopName" className={classNamelabel}>ชื่อร้าน</label>
            <input value={shop_name} onChange={(e) => setShopName(e.target.value)} className={classNameinput} id="shopName" placeholder="เช่น มินนี่ช็อป" required />
          </div>
          {/* <div>
            <label htmlFor="address" className={classNamelabel}>ที่อยู่ร้าน</label>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="flex h-9 w-full rounded-md border text-[#888780] bg-[#FFFFFF] px-3 py-2 text-sm placeholder:text-[#888780] focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50 border-[#D3D1C7] focus:ring-[#9FE1CB]"
              id="address"
              placeholder="เช่น 123 หมู่ 1 ต.แม่กา อ.เมือง จ.พะเยา"
              required
            />
          </div> */}
          <p className="text-xs text-[#0d3d30] font-mono bg-white p-2 rounded">
            URL หน้าร้านของคุณจะเป็น: <strong>/shop/ชื่อร้าน</strong>
          </p>
        </div>

        <div className="flex gap-3">
          <div className="flex-1">
            <label htmlFor="password" className={classNamelabel}>รหัสผ่าน</label>
            <input value={password} onChange={(e) => setPassword(e.target.value)} id="password" type="password" placeholder="••••••••" required className={classNameinput} />
          </div>
          <div className="flex-1">
            <label htmlFor="confirmPassword" className={classNamelabel}>ยืนยันรหัสผ่าน</label>
            <input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} id="confirmPassword" type="password" placeholder="••••••••" required className={classNameinput} />
          </div>
        </div>
      </div>

      <button disabled={loading} type="submit" className="w-full bg-[#EF9F27] text-white hover:bg-[#BA7517] cursor-pointer rounded-md px-4 py-2 text-base disabled:opacity-50">
        {loading ? "กำลังสมัคร..." : "สมัครสมาชิก"}
      </button>

      <p className="text-center text-sm text-[#888780]">
        มีบัญชีอยู่แล้ว?{" "}
        <Link href="/reseller/login" className="text-[#BA7517] hover:underline">เข้าสู่ระบบ</Link>
      </p>
    </form>
  )
}

export default FromRegister