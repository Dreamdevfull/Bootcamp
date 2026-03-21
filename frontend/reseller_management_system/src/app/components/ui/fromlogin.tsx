// "use client"
// import React, { useState } from 'react'
// import { useRouter, useSearchParams } from "next/navigation"
// import Swal from 'sweetalert2'

//  const FromLogin = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const router = useRouter();
//   const [loading, setLoading] = useState(false);
//   const searchParams = useSearchParams();
//   const callbackUrl = searchParams.get("callbackUrl") || "";

//   const URL = process.env.NEXT_PUBLIC_API_URL;

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setLoading(true)

//     try {
//       const res = await fetch(`${URL}/login`, {
//         method: "POST",
//         credentials: "include",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       })

//       const result = await res.json()

//       if (res.ok) {

//         await Swal.fire({
//           title: 'เข้าสู่ระบบสำเร็จ',
//           icon: 'success',
//           iconColor: '#1a6b5a',
//           showConfirmButton: false,
//           timer: 1500,
//           padding: '3rem',
//           color: '#0d3d30',
//           background: '#ffffff',
//           backdrop: `rgba(13, 61, 48, 0.4)`,
//         });

//         if (callbackUrl && callbackUrl.startsWith("/") && callbackUrl !== "/login") {
//           router.push(callbackUrl);
//           return;
//         }

//         const user = result.user;
//         if (user.role === "admin") {
//           router.push("/admin/dashboard");
//         } else if (user.role === "reseller") {
//           router.push("/resellers/dashboard");
//         } else {
//           Swal.fire({
//             icon: 'error',
//             title: 'บทบาทไม่ถูกต้อง',
//             text: 'คุณไม่มีสิทธิ์เข้าถึงระบบนี้',
//             confirmButtonColor: '#1a6b5a'
//           });
//           router.push("/");
//         }

//       } else {

//         Swal.fire({
//           icon: 'error',
//           title: 'เข้าสู่ระบบไม่สำเร็จ',
//           text: result.message || 'อีเมลหรือรหัสผ่านไม่ถูกต้อง',
//           confirmButtonColor: '#1a6b5a'
//         });
//       }

//     } catch (err) {
//       console.error("catch error:", err)
//       Swal.fire({
//         icon: 'error',
//         title: 'เกิดข้อผิดพลาด',
//         text: 'ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้ กรุณาลองใหม่อีกครั้ง',
//         confirmButtonColor: '#1a6b5a'
//       });
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <main className="flex-1 flex justify-center items-center p-4">

//       <form onSubmit={handleSubmit} className="w-[503px] h-[472px] bg-white rounded-2xl shadow-md border border-gray-200 p-8">
//         <h1 className='text-[#0d3d30] text-[28px] text-center font-bold'>เข้าสู่ระบบ</h1>
//         <p className='text-[#000000] text-[16px] text-center mt-2'>เข้าสู่ระบบเพื่อจัดการระบบทั้งหมด</p>

//         <div className="w-full">
//           <label htmlFor="email" className="block text-[16px] text-[#000000] mb-1 mt-16">
//             อีเมล <span className='text-red-500'>*</span>
//           </label>
//           <input
//             id="email"
//             type="text"
//             placeholder="test@example.com"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0d3d30] transition"
//             required
//           />
//         </div>

//         <div className="w-full">
//           <label htmlFor="password" className="block text-[16px] text-[#000000] mb-1 mt-4">
//             รหัสผ่าน <span className='text-red-500'>*</span>
//           </label>
//           <input
//             id="password"
//             type="password"
//             placeholder="*******"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0d3d30] transition"
//             required
//           />
//         </div>

//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full bg-[#1a6b5a] hover:bg-[#1a5a4a] text-white text-[20px] font-bold py-3 rounded-lg transition-all duration-300 shadow-md mt-14 cursor-pointer disabled:bg-gray-400"
//         >
//           {loading ? "กำลังตรวจสอบ..." : "เข้าสู่ระบบ"}
//         </button>
//       </form>
//     </main>
//   )
// }

// export default FromLogin;



"use client";
import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Swal from "sweetalert2";

const FromLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "";

  const URL = process.env.NEXT_PUBLIC_API_URL;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${URL}/login`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const result = await res.json();

      if (res.ok) {
        const user = result.user;

        if (user.role === "reseller") {
          if (user.status === "pending") {
           setLoading(false);
        return Swal.fire({
            icon: 'info', 
            title: 'อยู่ระหว่างรออนุมัติ',
            text: 'บัญชีรออนุมัติ กรุณารอการติดต่อ',
            confirmButtonColor: '#1a6b5a',
        });
          } else if (user.status === "rejected") {
            setLoading(false);
            return Swal.fire({
              icon: "error",
              title: "ไม่ได้รับการอนุมัติ",
              text: "บัญชีนี้ไม่ได้รับการอนุมัติ",
              confirmButtonColor: "#1a6b5a",
              background: "#ffffff",
            });
          }
        }

        await Swal.fire({
          title: "เข้าสู่ระบบสำเร็จ",
          icon: "success",
          iconColor: "#1a6b5a",
          showConfirmButton: false,
          timer: 1500,
          padding: "3rem",
          color: "#0d3d30",
          background: "#ffffff",
          backdrop: `rgba(13, 61, 48, 0.4)`,
        });

        if (
          callbackUrl &&
          callbackUrl.startsWith("/") &&
          callbackUrl !== "/login"
        ) {
          router.push(callbackUrl);
          return;
        }

        if (user.role === "admin") {
          router.push("/admin/dashboard");
        } else if (user.role === "reseller") {
          router.push("/resellers/dashboard");
        } else {
          Swal.fire({
            icon: "error",
            title: "บทบาทไม่ถูกต้อง",
            text: "คุณไม่มีสิทธิ์เข้าถึงระบบนี้",
            confirmButtonColor: "#1a6b5a",
          });
          router.push("/");
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "เข้าสู่ระบบไม่สำเร็จ",
          text: result.message || result.error || "อีเมลหรือรหัสผ่านไม่ถูกต้อง",
          confirmButtonColor: "#1a6b5a",
        });
      }
    } catch (err) {
      console.error("catch error:", err);
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        text: "ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้ กรุณาลองใหม่อีกครั้ง",
        confirmButtonColor: "#1a6b5a",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex-1 flex justify-center items-center p-4">
      <form
        onSubmit={handleSubmit}
        className="w-[503px] h-[472px] bg-white rounded-2xl shadow-md border border-gray-200 p-8"
      >
        <h1 className="text-[#0d3d30] text-[28px] text-center font-bold">
          เข้าสู่ระบบ
        </h1>
        <p className="text-[#000000] text-[16px] text-center mt-2">
          เข้าสู่ระบบเพื่อจัดการระบบทั้งหมด
        </p>

        <div className="w-full">
          <label
            htmlFor="email"
            className="block text-[16px] text-[#000000] mb-1 mt-16"
          >
            อีเมล <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            type="text"
            placeholder="test@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0d3d30] transition"
            required
          />
        </div>

        <div className="w-full">
          <label
            htmlFor="password"
            className="block text-[16px] text-[#000000] mb-1 mt-4"
          >
            รหัสผ่าน <span className="text-red-500">*</span>
          </label>
          <input
            id="password"
            type="password"
            placeholder="*******"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0d3d30] transition"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#1a6b5a] hover:bg-[#1a5a4a] text-white text-[20px] font-bold py-3 rounded-lg transition-all duration-300 shadow-md mt-14 cursor-pointer disabled:bg-gray-400"
        >
          {loading ? "กำลังตรวจสอบ..." : "เข้าสู่ระบบ"}
        </button>
      </form>
    </main>
  );
};

export default FromLogin;
