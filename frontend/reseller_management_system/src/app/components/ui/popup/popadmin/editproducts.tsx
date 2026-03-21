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

  // ทำให้ข้อมูลอัพตาก่อนกด
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

    // await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/products/edit/${id}`, {
    //   method: "PATCH",
    //   credentials: "include",
    //   body: formData,
    // });
    // onClose();
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/products/edit/${id}`, {
        method: "PATCH",
        credentials: "include",
        body: formData,
      });

      if (response.ok) {
        // 3. ถ้าแก้ไขสำเร็จ ให้เรียก onSuccess เพื่อรีเฟรชตาราง แล้วค่อยปิด Popup
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

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/20 z-50">
      <div
        className="bg-white rounded-2xl p-6 w-[500px] shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-[#2C2C2A]">แก้ไขสินค้า</h2>
          <button onClick={onClose} className="text-[#888780] hover:text-[#2C2C2A] text-xl cursor-pointer transition">
            ✕
          </button>
        </div>

        <div className="flex flex-col gap-3">
          <div>
            <label className="block text-sm text-[#2C2C2A] mb-1">ชื่อสินค้า</label>
            <input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              type="text"
              className="w-full px-4 py-2 border border-[#D3D1C7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0D3D30] transition"
            />
          </div>

          <div>
            <label className="block text-sm text-[#2C2C2A] mb-1">รูปภาพ</label>
            <label
              htmlFor="image"
              className="block border-2 border-dashed border-[#D3D1C7] p-6 text-center cursor-pointer rounded-lg hover:border-[#1D9E75] transition"
            >
              <p className="text-sm text-[#888780]">
                {newImage ? newImage.name : "คลิกเพื่อเลือกรูปภาพ (JPG, PNG)"}
              </p>
            </label>
            <input
              id="image"
              onChange={(e) => setNewImage(e.target.files?.[0] ?? null)}
              type="file"
              accept="image/png, image/jpeg"
              className="hidden"
            />
          </div>

          <div>
            <label className="block text-sm text-[#2C2C2A] mb-1">รายละเอียด</label>
            <input
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              type="text"
              className="w-full px-4 py-2 border border-[#D3D1C7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0D3D30] transition"
            />
          </div>

          <div className="flex gap-3">
            <div className="flex-1">
              <label className="block text-sm text-[#2C2C2A] mb-1">ราคาทุน</label>
              <input
                value={newCostPrice}
                onChange={(e) => setNewCostPrice(Number(e.target.value))}
                type="number"
                className="w-full px-4 py-2 border border-[#D3D1C7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0D3D30] transition"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm text-[#2C2C2A] mb-1">ราคาขั้นต่ำ</label>
              <input
                value={newMinPrice}
                onChange={(e) => setNewMinPrice(Number(e.target.value))}
                type="number"
                className="w-full px-4 py-2 border border-[#D3D1C7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0D3D30] transition"
                min={0}
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm text-[#2C2C2A] mb-1">สต็อก</label>
              <input
                value={newStock}
                onChange={(e) => setNewStock(Number(e.target.value))}
                type="number"
                className="w-full px-4 py-2 border border-[#D3D1C7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0D3D30] transition"
                min={0}
              />
            </div>
          </div>
        </div>

        <div className="flex gap-2 mt-4">
          <button
            type="button"
            onClick={onClose}
            className="w-full px-4 py-2 rounded-lg border border-[#D3D1C7] text-[#2C2C2A] hover:bg-[#E1F5EE] transition cursor-pointer"
          >
            ยกเลิก
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="w-full px-4 py-2 rounded-lg bg-[#EF9F27] text-white hover:bg-[#BA7517] transition cursor-pointer"
          >
            ยืนยัน
          </button>
        </div>
      </div>
    </div>
  );
}