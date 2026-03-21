// "use client";

// import { useEffect, useState } from "react";
// import Swal from "sweetalert2";

// type PopAddProductsProps = {
//   open: boolean;
//   onClose: () => void;
//   onSuccess: () => void;
// };

// export default function PopAddProducts({
//   open,
//   onClose,
//   onSuccess,
// }: PopAddProductsProps) {

//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");
//   const [costPrice, setCostPrice] = useState("");
//   const [minPrice, setMinPrice] = useState("");
//   const [stock, setStock] = useState("");
//   const [imageFile, setImageFile] = useState<File | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [preview, setPreview] = useState<string | null>(null);


//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       setImageFile(file);
//       const objectUrl = URL.createObjectURL(file);
//       setPreview(objectUrl);
//     }
//   };

 
//   useEffect(() => {
//     return () => {
//       if (preview) URL.revokeObjectURL(preview);
//     };
//   }, [preview]);


//   if (!open) return null;

  
//   const handleClose = () => {
//     setName("");
//     setDescription("");
//     setCostPrice("");
//     setMinPrice("");
//     setStock("");
//     setImageFile(null);
//     setPreview(null);
//     onClose();
//   };

//   const handleSubmit = async () => {
//     if (!name || !costPrice || !minPrice) {
//       Swal.fire({
//         icon: 'warning',
//         title: 'ข้อมูลไม่ครบ',
//         text: 'กรุณากรอกชื่อสินค้า ราคาทุน และราคาขายให้ครบถ้วน',
//         confirmButtonColor: '#EF9F27'
//       });
//       return;
      
//     }

//     setLoading(true);
//     const formData = new FormData();
//     formData.append("name", name);
//     formData.append("description", description);
//     formData.append("cost_price", costPrice);
//     formData.append("min_price", minPrice);
//     formData.append("stock", stock);

//     if (imageFile) {
//       formData.append("image", imageFile); 
//     }

//     try {
//       const API_URL = process.env.NEXT_PUBLIC_API_URL;
//       const res = await fetch(`${API_URL}/admin/products/add`, {
//         method: "POST",
//         body: formData,
//         credentials: "include",
//       });

//       if (res.ok) {
//         await Swal.fire({
//           icon: 'success',
//           title: 'บันทึกสำเร็จ!',
//           text: 'เพิ่มข้อมูลสินค้าใหม่เรียบร้อยแล้ว',
//           showConfirmButton: false,
//           timer: 1500
//         });
//         onSuccess();
//         handleClose();
//       } else {
//         const err = await res.json();
//         Swal.fire({
//           icon: 'error',
//           title: 'บันทึกไม่สำเร็จ',
//           text: err.message || "ไม่สามารถบันทึกข้อมูลได้",
//           confirmButtonColor: '#d33'
//         });
//       }
//     } catch (error) {
//       if (loading) {
//         console.error("Fetch error:", error);
//         Swal.fire({
//         icon: 'error',
//         title: 'การเชื่อมต่อผิดพลาด',
//         text: 'ไม่สามารถติดต่อ Server ได้ กรุณาลองใหม่อีกครั้ง',
//         confirmButtonColor: '#d33'
//       });
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black/20 z-50 ">
//       <div
//         className="bg-white rounded-2xl p-6 w-[500px] shadow-xl"
//         onClick={(e) => e.stopPropagation()}
//       >
//         <div className="flex justify-between border-b pb-2">
//           <h2 className="text-[22px] font-bold text-gray-800">เพิ่มสินค้าใหม่</h2>
//           <button
//             onClick={handleClose}
//             className="text-gray-400 hover:text-gray-600 text-xl font-bold cursor-pointer"
//           >
//             ✕
//           </button>
//         </div>

//         <div className="mt-4 space-y-3">
//           {/* ชื่อสินค้า */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 ml-1">ชื่อสินค้า</label>
//             <input
//               type="text"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               placeholder="เช่น เสื้อเเขนยาวเด็ก"
//               className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-black rounded-sm transition"
//             />
//           </div>

//           {/* ช่องเลือกรูปภาพ + Preview */}
//           <div className="w-full">
//             <label
//               htmlFor="image"
//               className="block border-2 border-dashed border-gray-300 h-40 flex items-center justify-center cursor-pointer rounded overflow-hidden hover:bg-gray-50 transition"
//             >
//               {preview ? (
//                 <img src={preview} alt="preview" className="h-full w-full object-contain" />
//               ) : (
//                 <p className="text-[#888780]">📸 คลิกเพื่อเลือกรูปภาพ (JPG, PNG)</p>
//               )}
//             </label>
//             <input
//               id="image"
//               type="file"
//               accept="image/png, image/jpeg"
//               className="hidden"
//               onChange={handleImageChange}
//             />
//           </div>

//           {/* รายละเอียด */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 ml-1">รายละเอียด</label>
//             <input
//               type="text"
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               placeholder="เช่น สีดำ Size S"
//               className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-black rounded-sm transition"
//             />
//           </div>

//           {/* ราคาและสต็อก */}
//           <div className="flex gap-4">
//             <div className="flex-1">
//               <label className="block text-sm font-medium text-gray-700 ml-1">ราคาทุน</label>
//               <input
//                 type="number"
//                 value={costPrice}
//                 onChange={(e) => setCostPrice(e.target.value)}
//                 placeholder="0.00"
//                 className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:ring-1 focus:ring-black outline-none"
//               />
//             </div>
//             <div className="flex-1">
//               <label className="block text-sm font-medium text-gray-700 ml-1">ราคาขาย</label>
//               <input
//                 type="number"
//                 value={minPrice}
//                 onChange={(e) => setMinPrice(e.target.value)}
//                 placeholder="0.00"
//                 className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:ring-1 focus:ring-black outline-none"
//               />
//             </div>
//             <div className="w-20">
//               <label className="block text-sm font-medium text-gray-700 ml-1">สต็อก</label>
//               <input
//                 type="number"
//                 value={stock}
//                 onChange={(e) => setStock(e.target.value)}
//                 placeholder="0"
//                 className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:ring-1 focus:ring-black outline-none"
//               />
//             </div>
//           </div>

//           {/* ปุ่มกดยกเลิก/บันทึก */}
//           <div className="flex gap-2 mt-6 pt-2">
//             <button
//               onClick={handleClose}
//               className="bg-white text-gray-600 px-4 py-2 rounded-sm w-full border border-[#D3D1C7] hover:bg-gray-100 transition cursor-pointer"
//             >
//               ยกเลิก
//             </button>
//             <button
//               onClick={handleSubmit}
//               disabled={loading}
//               className={`bg-[#EF9F27] text-white px-4 py-2 rounded-sm w-full transition cursor-pointer font-bold ${
//                 loading ? "bg-gray-400 cursor-not-allowed" : "hover:bg-[#BA7517]"
//               }`}
//             >
//               {loading ? "กำลังบันทึก..." : "บันทึกสินค้า"}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
"use client";

import { useEffect, useState } from "react";
import Swal from "sweetalert2";

type PopAddProductsProps = {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
};

export default function PopAddProducts({ open, onClose, onSuccess }: PopAddProductsProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [costPrice, setCostPrice] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [stock, setStock] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
    }
  };

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  if (!open) return null;

  const handleClose = () => {
    setName(""); setDescription(""); setCostPrice("");
    setMinPrice(""); setStock(""); setImageFile(null); setPreview(null);
    onClose();
  };

  const handleSubmit = async () => {
    if (!name || !costPrice || !minPrice) {
      Swal.fire({ icon: 'warning', title: 'ข้อมูลไม่ครบ', text: 'กรุณากรอกชื่อสินค้า ราคาทุน และราคาขายให้ครบถ้วน', confirmButtonColor: '#EF9F27' });
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("cost_price", costPrice);
    formData.append("min_price", minPrice);
    formData.append("stock", stock);
    if (imageFile) formData.append("image", imageFile);

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL;
      const res = await fetch(`${API_URL}/admin/products/add`, {
        method: "POST", body: formData, credentials: "include",
      });
      if (res.ok) {
        await Swal.fire({ icon: 'success', title: 'บันทึกสำเร็จ!', text: 'เพิ่มข้อมูลสินค้าใหม่เรียบร้อยแล้ว', showConfirmButton: false, timer: 1500 });
        onSuccess(); handleClose();
      } else {
        const err = await res.json();
        Swal.fire({ icon: 'error', title: 'บันทึกไม่สำเร็จ', text: err.message || "ไม่สามารถบันทึกข้อมูลได้", confirmButtonColor: '#d33' });
      }
    } catch (error) {
      console.error("Fetch error:", error);
      Swal.fire({ icon: 'error', title: 'การเชื่อมต่อผิดพลาด', text: 'ไม่สามารถติดต่อ Server ได้ กรุณาลองใหม่อีกครั้ง', confirmButtonColor: '#d33' });
    } finally {
      setLoading(false);
    }
  };

  const inputClass = `
    w-full px-4 py-2 text-sm rounded-lg
    border-2 border-gray-300 dark:border-gray-600
    bg-white dark:bg-gray-800
    text-gray-800 dark:text-gray-100
    placeholder:text-gray-400 dark:placeholder:text-gray-500
    focus:outline-none focus:ring-2
    focus:ring-emerald-500 dark:focus:ring-emerald-400
    focus:border-transparent transition
  `;

  const labelClass = "block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1";

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/40 dark:bg-black/60 z-50"
      role="dialog"
      aria-modal="true"
      aria-label="เพิ่มสินค้าใหม่"
    >
      <div
        className="bg-white dark:bg-gray-900
                   rounded-2xl p-6 w-[500px] shadow-xl
                   border-2 border-gray-100 dark:border-gray-700
                   transition-colors duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between border-b-2 border-gray-100 dark:border-gray-700 pb-3 mb-4">
          <h2 className="text-[22px] font-bold text-gray-800 dark:text-gray-100">เพิ่มสินค้าใหม่</h2>
          <button
            onClick={handleClose}
            aria-label="ปิด"
            className="text-gray-400 dark:text-gray-500
                       hover:text-gray-800 dark:hover:text-gray-100
                       text-xl font-bold cursor-pointer transition
                       focus:outline-none focus:ring-2 focus:ring-gray-400 rounded"
          >
            ✕
          </button>
        </div>

        <div className="space-y-3">
          {/* ชื่อสินค้า */}
          <div>
            <label className={labelClass}>
              ชื่อสินค้า <span className="text-red-500 dark:text-red-400" aria-label="จำเป็น">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="เช่น เสื้อแขนยาวเด็ก"
              aria-required="true"
              className={inputClass}
            />
          </div>

          {/* รูปภาพ */}
          <div className="w-full">
            <label className={labelClass}>รูปภาพ</label>
            <label
              htmlFor="image"
              className="block border-2 border-dashed h-40 flex items-center justify-center
                         cursor-pointer rounded-lg overflow-hidden transition
                         border-gray-300 dark:border-gray-600
                         hover:border-emerald-500 dark:hover:border-emerald-400
                         hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              {preview ? (
                <img src={preview} alt="ตัวอย่างรูปภาพ" className="h-full w-full object-contain" />
              ) : (
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  📸 คลิกเพื่อเลือกรูปภาพ (JPG, PNG)
                </p>
              )}
            </label>
            <input
              id="image"
              type="file"
              accept="image/png, image/jpeg"
              className="hidden"
              onChange={handleImageChange}
              aria-label="เลือกรูปภาพสินค้า"
            />
          </div>

          {/* รายละเอียด */}
          <div>
            <label className={labelClass}>รายละเอียด</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="เช่น สีดำ Size S"
              className={inputClass}
            />
          </div>

          {/* ราคาและสต็อก */}
          <div className="flex gap-3">
            <div className="flex-1">
              <label className={labelClass}>
                ราคาทุน <span className="text-red-500 dark:text-red-400" aria-label="จำเป็น">*</span>
              </label>
              <input
                type="number"
                value={costPrice}
                onChange={(e) => setCostPrice(e.target.value)}
                placeholder="0.00"
                aria-required="true"
                className={inputClass}
              />
            </div>
            <div className="flex-1">
              <label className={labelClass}>
                ราคาขาย <span className="text-red-500 dark:text-red-400" aria-label="จำเป็น">*</span>
              </label>
              <input
                type="number"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                placeholder="0.00"
                aria-required="true"
                className={inputClass}
              />
            </div>
            <div className="w-24">
              <label className={labelClass}>สต็อก</label>
              <input
                type="number"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                placeholder="0"
                className={inputClass}
              />
            </div>
          </div>

          {/* ปุ่ม */}
          <div className="flex gap-2 mt-4 pt-2">
            <button
              onClick={handleClose}
              className="w-full px-4 py-2 rounded-lg
                         border-2 border-gray-300 dark:border-gray-600
                         text-gray-700 dark:text-gray-300
                         bg-white dark:bg-transparent
                         hover:bg-gray-100 dark:hover:bg-gray-700
                         transition cursor-pointer
                         focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
            >
              ยกเลิก
            </button>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className={`w-full px-4 py-2 rounded-lg font-bold text-white transition cursor-pointer
                focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2
                ${loading
                  ? "bg-gray-400 dark:bg-gray-600 cursor-not-allowed"
                  : "bg-amber-500 dark:bg-amber-600 hover:bg-amber-600 dark:hover:bg-amber-700"
                }`}
              aria-busy={loading}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  กำลังบันทึก...
                </span>
              ) : "บันทึกสินค้า"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}