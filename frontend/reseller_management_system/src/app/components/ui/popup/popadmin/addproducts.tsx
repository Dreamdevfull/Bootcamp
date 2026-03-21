"use client";

import { useEffect, useState } from "react";
import Swal from "sweetalert2";

type PopAddProductsProps = {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
};

export default function PopAddProducts({
  open,
  onClose,
  onSuccess,
}: PopAddProductsProps) {

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
    setName("");
    setDescription("");
    setCostPrice("");
    setMinPrice("");
    setStock("");
    setImageFile(null);
    setPreview(null);
    onClose();
  };

  const handleSubmit = async () => {
    if (!name || !costPrice || !minPrice) {
      Swal.fire({
        icon: 'warning',
        title: 'ข้อมูลไม่ครบ',
        text: 'กรุณากรอกชื่อสินค้า ราคาทุน และราคาขายให้ครบถ้วน',
        confirmButtonColor: '#EF9F27'
      });
      return;
      
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("cost_price", costPrice);
    formData.append("min_price", minPrice);
    formData.append("stock", stock);

    if (imageFile) {
      formData.append("image", imageFile); 
    }

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL;
      const res = await fetch(`${API_URL}/admin/products/add`, {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      if (res.ok) {
        await Swal.fire({
          icon: 'success',
          title: 'บันทึกสำเร็จ!',
          text: 'เพิ่มข้อมูลสินค้าใหม่เรียบร้อยแล้ว',
          showConfirmButton: false,
          timer: 1500
        });
        onSuccess();
        handleClose();
      } else {
        const err = await res.json();
        Swal.fire({
          icon: 'error',
          title: 'บันทึกไม่สำเร็จ',
          text: err.message || "ไม่สามารถบันทึกข้อมูลได้",
          confirmButtonColor: '#d33'
        });
      }
    } catch (error) {
      if (loading) {
        console.error("Fetch error:", error);
        Swal.fire({
        icon: 'error',
        title: 'การเชื่อมต่อผิดพลาด',
        text: 'ไม่สามารถติดต่อ Server ได้ กรุณาลองใหม่อีกครั้ง',
        confirmButtonColor: '#d33'
      });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/20 z-50 ">
      <div
        className="bg-white rounded-2xl p-6 w-[500px] shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between border-b pb-2">
          <h2 className="text-[22px] font-bold text-gray-800">เพิ่มสินค้าใหม่</h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 text-xl font-bold cursor-pointer"
          >
            ✕
          </button>
        </div>

        <div className="mt-4 space-y-3">
          {/* ชื่อสินค้า */}
          <div>
            <label className="block text-sm font-medium text-gray-700 ml-1">ชื่อสินค้า</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="เช่น เสื้อเเขนยาวเด็ก"
              className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-black rounded-sm transition"
            />
          </div>

          {/* ช่องเลือกรูปภาพ + Preview */}
          <div className="w-full">
            <label
              htmlFor="image"
              className="block border-2 border-dashed border-gray-300 h-40 flex items-center justify-center cursor-pointer rounded overflow-hidden hover:bg-gray-50 transition"
            >
              {preview ? (
                <img src={preview} alt="preview" className="h-full w-full object-contain" />
              ) : (
                <p className="text-[#888780]">📸 คลิกเพื่อเลือกรูปภาพ (JPG, PNG)</p>
              )}
            </label>
            <input
              id="image"
              type="file"
              accept="image/png, image/jpeg"
              className="hidden"
              onChange={handleImageChange}
            />
          </div>

          {/* รายละเอียด */}
          <div>
            <label className="block text-sm font-medium text-gray-700 ml-1">รายละเอียด</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="เช่น สีดำ Size S"
              className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-black rounded-sm transition"
            />
          </div>

          {/* ราคาและสต็อก */}
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 ml-1">ราคาทุน</label>
              <input
                type="number"
                value={costPrice}
                onChange={(e) => setCostPrice(e.target.value)}
                placeholder="0.00"
                className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:ring-1 focus:ring-black outline-none"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 ml-1">ราคาขาย</label>
              <input
                type="number"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                placeholder="0.00"
                className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:ring-1 focus:ring-black outline-none"
              />
            </div>
            <div className="w-20">
              <label className="block text-sm font-medium text-gray-700 ml-1">สต็อก</label>
              <input
                type="number"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                placeholder="0"
                className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:ring-1 focus:ring-black outline-none"
              />
            </div>
          </div>

          {/* ปุ่มกดยกเลิก/บันทึก */}
          <div className="flex gap-2 mt-6 pt-2">
            <button
              onClick={handleClose}
              className="bg-white text-gray-600 px-4 py-2 rounded-sm w-full border border-[#D3D1C7] hover:bg-gray-100 transition cursor-pointer"
            >
              ยกเลิก
            </button>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className={`bg-[#EF9F27] text-white px-4 py-2 rounded-sm w-full transition cursor-pointer font-bold ${
                loading ? "bg-gray-400 cursor-not-allowed" : "hover:bg-[#BA7517]"
              }`}
            >
              {loading ? "กำลังบันทึก..." : "บันทึกสินค้า"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}