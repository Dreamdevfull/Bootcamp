import React from 'react'
import { useRouter } from 'next/navigation'
import Swal from 'sweetalert2';


const ButtonLogout = () => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();
  
  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "ออกจากระบบ?",
      text: "คุณต้องการออกจากระบบใช่ไหม",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "ใช่",
      cancelButtonText: "ยกเลิก",
      confirmButtonColor: "#0F6E56",
      cancelButtonColor: "#888780",
    });

    if (result.isConfirmed) {
      await fetch(`${API_URL}/logout`, {
        method: "POST",
        credentials: "include",
      });

      await Swal.fire({
        title: "ออกจากระบบสำเร็จ",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
        iconColor: "#0F6E56"
      });

      router.push("/login");
    }
  };
  
  return (
    <button onClick={handleLogout} className="border border-white/30 px-2 rounded-lg hover:bg-[#fcebeb] transition cursor-pointer">
      <svg className="hover:text-[#791f1f] w-10 h-10 cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"> <path stroke="none" d="M0 0h24v24H0z"/> <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" /> <path d="M7 12h14l-3 -3m0 6l3 -3" /></svg>
    </button>
  )
}

export default ButtonLogout