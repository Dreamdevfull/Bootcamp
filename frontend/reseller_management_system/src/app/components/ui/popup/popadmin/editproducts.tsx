// "use client";

// import React from "react";

// export default function PopEditProducts({ open, onClose, onSuccess, id, name, image_url, description, cost_price, min_price, stock }: {
//   open: boolean;
//   onClose: () => void;
//   onSuccess: () => void;
//   id: number;
//   name: string;
//   image_url: string;
//   description: string;
//   cost_price: number;
//   min_price: number;
//   stock: number;
// }) {
//   const [newName, setNewName] = React.useState(name);
//   const [newImage, setNewImage] = React.useState<File | null>(null);
//   const [newDescription, setNewDescription] = React.useState(description);
//   const [newCostPrice, setNewCostPrice] = React.useState(cost_price);
//   const [newMinPrice, setNewMinPrice] = React.useState(min_price);
//   const [newStock, setNewStock] = React.useState(stock);

//   // ทำให้ข้อมูลอัพตาก่อนกด
//   React.useEffect(() => {
//     if (open) {
//       setNewName(name);
//       setNewDescription(description);
//       setNewCostPrice(cost_price);
//       setNewMinPrice(min_price);
//       setNewStock(stock);
//       setNewImage(null);
//     }
//   }, [open]);

//   const handleSubmit = async () => {
//     const formData = new FormData();
//     formData.append("id", id.toString());
//     formData.append("name", newName);
//     formData.append("description", newDescription);
//     formData.append("cost_price", newCostPrice.toString());
//     formData.append("min_price", newMinPrice.toString());
//     formData.append("stock", newStock.toString());
//     if (newImage) formData.append("image", newImage);

//     // await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/products/edit/${id}`, {
//     //   method: "PATCH",
//     //   credentials: "include",
//     //   body: formData,
//     // });
//     // onClose();
//     try {
//       const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/products/edit/${id}`, {
//         method: "PATCH",
//         credentials: "include",
//         body: formData,
//       });

//       if (response.ok) {
//         // 3. ถ้าแก้ไขสำเร็จ ให้เรียก onSuccess เพื่อรีเฟรชตาราง แล้วค่อยปิด Popup
//         onSuccess(); 
//         onClose();
//       } else {
//         console.error("Failed to update product");
//       }
//     } catch (error) {
//       console.error("Error updating product:", error);
//     }
 
//   };

//   if (!open) return null;

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black/20 z-50">
//       <div
//         className="bg-white rounded-2xl p-6 w-[500px] shadow-xl"
//         onClick={(e) => e.stopPropagation()}
//       >
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-xl font-bold text-[#2C2C2A]">แก้ไขสินค้า</h2>
//           <button onClick={onClose} className="text-[#888780] hover:text-[#2C2C2A] text-xl cursor-pointer transition">
//             ✕
//           </button>
//         </div>

//         <div className="flex flex-col gap-3">
//           <div>
//             <label className="block text-sm text-[#2C2C2A] mb-1">ชื่อสินค้า</label>
//             <input
//               value={newName}
//               onChange={(e) => setNewName(e.target.value)}
//               type="text"
//               className="w-full px-4 py-2 border border-[#D3D1C7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0D3D30] transition"
//             />
//           </div>

//           <div>
//             <label className="block text-sm text-[#2C2C2A] mb-1">รูปภาพ</label>
//             <label
//               htmlFor="image"
//               className="block border-2 border-dashed border-[#D3D1C7] p-6 text-center cursor-pointer rounded-lg hover:border-[#1D9E75] transition"
//             >
//               <p className="text-sm text-[#888780]">
//                 {newImage ? newImage.name : "คลิกเพื่อเลือกรูปภาพ (JPG, PNG)"}
//               </p>
//             </label>
//             <input
//               id="image"
//               onChange={(e) => setNewImage(e.target.files?.[0] ?? null)}
//               type="file"
//               accept="image/png, image/jpeg"
//               className="hidden"
//             />
//           </div>

//           <div>
//             <label className="block text-sm text-[#2C2C2A] mb-1">รายละเอียด</label>
//             <input
//               value={newDescription}
//               onChange={(e) => setNewDescription(e.target.value)}
//               type="text"
//               className="w-full px-4 py-2 border border-[#D3D1C7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0D3D30] transition"
//             />
//           </div>

//           <div className="flex gap-3">
//             <div className="flex-1">
//               <label className="block text-sm text-[#2C2C2A] mb-1">ราคาทุน</label>
//               <input
//                 value={newCostPrice}
//                 onChange={(e) => setNewCostPrice(Number(e.target.value))}
//                 type="number"
//                 className="w-full px-4 py-2 border border-[#D3D1C7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0D3D30] transition"
//               />
//             </div>
//             <div className="flex-1">
//               <label className="block text-sm text-[#2C2C2A] mb-1">ราคาขั้นต่ำ</label>
//               <input
//                 value={newMinPrice}
//                 onChange={(e) => setNewMinPrice(Number(e.target.value))}
//                 type="number"
//                 className="w-full px-4 py-2 border border-[#D3D1C7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0D3D30] transition"
//                 min={0}
//               />
//             </div>
//             <div className="flex-1">
//               <label className="block text-sm text-[#2C2C2A] mb-1">สต็อก</label>
//               <input
//                 value={newStock}
//                 onChange={(e) => setNewStock(Number(e.target.value))}
//                 type="number"
//                 className="w-full px-4 py-2 border border-[#D3D1C7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0D3D30] transition"
//                 min={0}
//               />
//             </div>
//           </div>
//         </div>

//         <div className="flex gap-2 mt-4">
//           <button
//             type="button"
//             onClick={onClose}
//             className="w-full px-4 py-2 rounded-lg border border-[#D3D1C7] text-[#2C2C2A] hover:bg-[#E1F5EE] transition cursor-pointer"
//           >
//             ยกเลิก
//           </button>
//           <button
//             type="button"
//             onClick={handleSubmit}
//             className="w-full px-4 py-2 rounded-lg bg-[#EF9F27] text-white hover:bg-[#BA7517] transition cursor-pointer"
//           >
//             ยืนยัน
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
"use client";

import React from "react";

export default function PopEditProducts({ open, onClose, onSuccess, id, name, image_url, description, cost_price, min_price, stock }: {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  id: number;
  name: string;
  image_url: string;
  description: string;
  cost_price: number;
  min_price: number;
  stock: number;
}) {
  const [newName, setNewName] = React.useState(name);
  const [newImage, setNewImage] = React.useState<File | null>(null);
  const [newDescription, setNewDescription] = React.useState(description);
  const [newCostPrice, setNewCostPrice] = React.useState(cost_price);
  const [newMinPrice, setNewMinPrice] = React.useState(min_price);
  const [newStock, setNewStock] = React.useState(stock);

  React.useEffect(() => {
    if (open) {
      setNewName(name);
      setNewDescription(description);
      setNewCostPrice(cost_price);
      setNewMinPrice(min_price);
      setNewStock(stock);
      setNewImage(null);
    }
  }, [open]);

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("id", id.toString());
    formData.append("name", newName);
    formData.append("description", newDescription);
    formData.append("cost_price", newCostPrice.toString());
    formData.append("min_price", newMinPrice.toString());
    formData.append("stock", newStock.toString());
    if (newImage) formData.append("image", newImage);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/products/edit/${id}`, {
        method: "PATCH",
        credentials: "include",
        body: formData,
      });
      if (response.ok) {
        onSuccess();
        onClose();
      } else {
        console.error("Failed to update product");
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  if (!open) return null;

  const inputClass = `
    w-full px-4 py-2 rounded-lg text-sm
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
      aria-label="แก้ไขสินค้า"
    >
      <div
        className="bg-white dark:bg-gray-900
                   rounded-2xl p-6 w-[500px] shadow-xl
                   border-2 border-gray-100 dark:border-gray-700
                   transition-colors duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">แก้ไขสินค้า</h2>
          <button
            onClick={onClose}
            aria-label="ปิด"
            className="text-gray-400 dark:text-gray-500
                       hover:text-gray-800 dark:hover:text-gray-100
                       text-xl cursor-pointer transition
                       focus:outline-none focus:ring-2 focus:ring-gray-400 rounded"
          >
            ✕
          </button>
        </div>

        <div className="flex flex-col gap-3">
          {/* ชื่อสินค้า */}
          <div>
            <label className={labelClass}>ชื่อสินค้า</label>
            <input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              type="text"
              aria-label="ชื่อสินค้า"
              className={inputClass}
            />
          </div>

          {/* รูปภาพ */}
          <div>
            <label className={labelClass}>รูปภาพ</label>
            <label
              htmlFor="image"
              className="block border-2 border-dashed
                         border-gray-300 dark:border-gray-600
                         hover:border-emerald-500 dark:hover:border-emerald-400
                         p-6 text-center cursor-pointer rounded-lg transition"
            >
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {newImage ? newImage.name : "คลิกเพื่อเลือกรูปภาพ (JPG, PNG)"}
              </p>
            </label>
            <input
              id="image"
              onChange={(e) => setNewImage(e.target.files?.[0] ?? null)}
              type="file"
              accept="image/png, image/jpeg"
              className="hidden"
              aria-label="เลือกรูปภาพสินค้า"
            />
          </div>

          {/* รายละเอียด */}
          <div>
            <label className={labelClass}>รายละเอียด</label>
            <input
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              type="text"
              aria-label="รายละเอียดสินค้า"
              className={inputClass}
            />
          </div>

          {/* ราคา + สต็อก */}
          <div className="flex gap-3">
            <div className="flex-1">
              <label className={labelClass}>ราคาทุน</label>
              <input
                value={newCostPrice}
                onChange={(e) => setNewCostPrice(Number(e.target.value))}
                type="number"
                aria-label="ราคาทุน"
                className={inputClass}
              />
            </div>
            <div className="flex-1">
              <label className={labelClass}>ราคาขั้นต่ำ</label>
              <input
                value={newMinPrice}
                onChange={(e) => setNewMinPrice(Number(e.target.value))}
                type="number"
                aria-label="ราคาขั้นต่ำ"
                className={inputClass}
                min={0}
              />
            </div>
            <div className="flex-1">
              <label className={labelClass}>สต็อก</label>
              <input
                value={newStock}
                onChange={(e) => setNewStock(Number(e.target.value))}
                type="number"
                aria-label="จำนวนสต็อก"
                className={inputClass}
                min={0}
              />
            </div>
          </div>
        </div>

        {/* ปุ่ม */}
        <div className="flex gap-2 mt-4">
          <button
            type="button"
            onClick={onClose}
            className="w-full px-4 py-2 rounded-lg
                       border-2 border-gray-300 dark:border-gray-600
                       text-gray-700 dark:text-gray-300
                       hover:bg-emerald-50 dark:hover:bg-emerald-950
                       transition cursor-pointer
                       focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
          >
            ยกเลิก
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="w-full px-4 py-2 rounded-lg
                       bg-amber-500 dark:bg-amber-600
                       text-white font-semibold
                       hover:bg-amber-600 dark:hover:bg-amber-700
                       transition cursor-pointer
                       focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2"
          >
            ยืนยัน
          </button>
        </div>
      </div>
    </div>
  );
}