"use client";

import { useState } from "react";

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

  if (!open) return null;

  const handleClose = () => {
      setName("");
      setDescription("");
      setCostPrice("");
      setMinPrice("");
      setStock("");
      setImageFile(null);
      onClose();
    };

  const handleSubmit = async () => {
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
        alert("บันทึกสินค้าสำเร็จ");
        onSuccess();
        onClose();
        setName("");
        setDescription("");
        setCostPrice("");
        setMinPrice("");
        setStock("");
        setImageFile(null);
      } else {
        const err = await res.json();
        alert("ผิดพลาด: " + err.message);
      }
    } catch (error) {
      alert("ไม่สามารถติดต่อ Sever ได้");
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
        {/* ปุ่มปิด */}
        <div className="flex justify-between">
          <h2 className="text-[22px] font-bold text-gray-800 mt-2">
            เพิ่มสินค้าใหม่
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-xl font-bold cursor-pointer"
          >
            ✕
          </button>
        </div>
        {/* ข้อมูล */}

        <div>
          <label
            htmlFor="name"
            className="block text-[16px] text-[#000000] ml-1 mt-2"
          >
            ชื่อสินค้า
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="เช่น เสื้อเเขนยาวเด็ก"
            className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-black transition rounded-sm"
          />
          {/* สำหรับไฟล์รูป */}
          <div className="w-full my-1">
            <label
              htmlFor="image"
              className="block border-2 border-dashed border-gray-300 p-8 text-center cursor-pointer rounded"
            >
              <p className="text-[#888780]">คลิกเพื่อเลือกรูปภาพ (JPG, PNG)</p>
            </label>
            <input
              id="image"
              type="file"
              accept="image/png, image/jpeg"
              className="hidden"
              onChange={(e)=> setImageFile(e.target.files?.[0]|| null)}
            />
          </div>
          <label
            htmlFor="description"
            className="block text-[16px] text-[#000000] ml-1"
          >
            รายละเอียด
          </label>
          <input
            id="description"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="เช่น สีดำ Size S"
            className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-black transition rounded-sm"
          />
          {/* ตั้งราคาต่างๆ */}
          <div className="flex gap-4">
            <div className="mt-2">
              <label
                htmlFor="cost-price"
                className="block text-[16px] text-[#000000] ml-1"
              >
                ราคาทุน
              </label>
              <input
                id="cost-price"
                type="number"
                value={costPrice}
                onChange={(e) => setCostPrice(e.target.value)}
                placeholder="0.00"
                className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-black transition rounded-sm"
              />
            </div>
            <div className="mt-2">
              <label
                htmlFor="min-price"
                className="block text-[16px] text-[#000000] ml-1"
              >
                ราคาขั้นต่ำ
              </label>
              <input
                id="min-price"
                type="number"
                value={minPrice}
                onChange={(e)=> setMinPrice(e.target.value)}
                placeholder="0.00"
                className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-black transition rounded-sm"
              />
            </div>
            <div className="mt-2">
              <label
                htmlFor="stock"
                className="block text-[16px] text-[#000000] ml-1"
              >
                สต็อก
              </label>
              <input
                id="stock"
                type="number"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                placeholder="0"
                className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-black transition rounded-sm"
              />
            </div>
          </div>
          <div className="flex gap-2 mt-2">
            <button
              onClick={handleClose}
              className="bg-white text-neutral-text px-4 py-2 rounded-sm w-full border border-[#D3D1C7] hover:bg-[#E1F5EE] transition cursor-pointer">
              ยกเลิก
            </button>
            <button
            onClick={handleSubmit}
            disabled = {loading}
             className="bg-[#EF9F27] text-white px-4 py-2 rounded-sm w-full hover:bg-[#BA7517] transition cursor-pointer">
              {loading ? "กำลังบันทึก..." : "บันทึกสินค้า"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
