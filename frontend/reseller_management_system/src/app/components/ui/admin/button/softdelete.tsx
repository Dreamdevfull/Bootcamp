// "use client"

// import Swal from "sweetalert2";

// type Props = {
//   id: number;
//   onSuccess?: () => void; // optional: บอก parent ให้ refetch
// }

// const SoftDeleteButton = ({ id, onSuccess }: Props) => {
//   const API_URL = process.env.NEXT_PUBLIC_API_URL;
//   const handleClick = async () => {
//     const res = await fetch(`${API_URL}/admin/products/delete/${id}`, {
//       method: "DELETE",
//       headers: { "Content-Type": "application/json" },
//       credentials: "include",
//       body: JSON.stringify({ deleted: true }),
//     });

//     if (res.ok) {
//       await Swal.fire({
//             title: 'ลบสินค้าสำเร็จ',
//             icon: 'success',
//             iconColor: '#1a6b5a',
//             showConfirmButton: false,
//             timer: 1500,
//           });
//           onSuccess?.();
//     }
//   };

//   return (
//     <button
//       onClick={handleClick}
//       className="bg-[#FCEBEB] text-[#791F1F border border-[#F7C1C1] rounded-lg hover:bg-[#F7C1C1] transition cursor-pointer px-4 py-2"
//     >
//       ลบ
//     </button>
//   );
// };

// export default SoftDeleteButton;



"use client"
import Swal from 'sweetalert2';

type Props = {
  id: number;
  onSuccess?: () => void;
}

const SoftDeleteButton = ({ id, onSuccess }: Props) => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const handleClick = async () => {
    
    const confirmResult = await Swal.fire({
      title: 'คุณแน่ใจหรือไม่?',
      text: "สินค้านี้จะถูกย้ายไปที่ถังขยะ",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#1a6b5a',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ยืนยันการลบ',
      cancelButtonText: 'ยกเลิก'
    });

    if (confirmResult.isConfirmed) {
      try {
        const res = await fetch(`${API_URL}/admin/products/delete/${id}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ deleted: true }),
        });

        const result = await res.json();

        if (res.ok) {
        
          await Swal.fire({
            title: 'ลบสินค้าสำเร็จ',
            icon: 'success',
            iconColor: '#1a6b5a',
            showConfirmButton: false,
            timer: 1500,
          });
          onSuccess?.();
        } else {
        
          Swal.fire({
            icon: 'error',
            title: 'ไม่สามารถลบได้',
            text: result.message || 'สินค้านี้มีออเดอร์ที่ยังไม่เสร็จสมบูรณ์',
            confirmButtonColor: '#1a6b5a',
          });
        }
      } catch (err) {
        Swal.fire({
          icon: 'error',
          title: 'เกิดข้อผิดพลาด',
          text: 'ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้',
          confirmButtonColor: '#1a6b5a',
        });
      }
    }
  };

  return (
    <button
      onClick={handleClick}
      className="bg-[#FCEBEB] text-[#791F1F] border border-[#F7C1C1] rounded-lg hover:bg-[#F7C1C1] transition cursor-pointer px-4 py-2"
    >
      ลบ
    </button>
  );
};

export default SoftDeleteButton;