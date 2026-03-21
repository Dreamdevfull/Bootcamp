"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

const validateSingleSpace = (value: string) => {
  let val = value;
  if (val.startsWith(" ")) val = val.trimStart(); // ห้ามขึ้นต้นด้วยช่องว่าง
  val = val.replace(/\s\s+/g, " "); // เปลี่ยนช่องว่างที่ติดกันหลายตัวให้เหลือ 1 ตัว
  const spaceCount = (val.match(/\s/g) || []).length;
  return spaceCount <= 1 ? val : null; // ถ้าเว้นวรรคไม่เกิน 1 คืนค่ากลับไป ถ้าเกินคืน null
};

const FromRegister = () => {
  const classNamelabel = "text-sm font-medium text-[#2C2C2A]";
  const classNameinput =
    "flex h-9 w-full rounded-md border text-[#888780] bg-[#FFFFFF] px-3 py-2 text-sm placeholder:text-[#888780] focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50 border-[#D3D1C7] focus:ring-[#9FE1CB]";

  const [loading, setLoading] = useState(false);
  const [name, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [shop_name, setShopName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [address, setAddress] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmError, setConfirmError] = useState("");

  const router = useRouter();
  const URL = process.env.NEXT_PUBLIC_API_URL;
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [nameError, setNameError] = useState("");
  const [shopNameError, setShopNameError] = useState("");
  const [addressError, setAddressError] = useState("");

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\s/g, "");
    setEmail(val);
    if (val && !val.endsWith("@gmail.com")) {
      setEmailError("อีเมลต้องลงท้ายด้วย @gmail.com เท่านั้น");
    } else {
      setEmailError("");
    }
  };

  const handlePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\s/g, "");
    setPhone(val);

    if (val.length > 0 && !val.startsWith("0")) {
      setPhoneError("เบอร์โทรต้องขึ้นต้นด้วย 0");
    } else if (val.length > 0 && val.length !== 10) {
      setPhoneError("เบอร์โทรต้องมี 10 หลัก");
    } else {
      setPhoneError("");
    }
  };

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\s/g, "");
    setPassword(val);
    setPasswordError(
      val.length > 0 && val.length < 8
        ? "รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร"
        : "",
    );
    if (confirmPassword) {
      setConfirmError(confirmPassword !== val ? "รหัสผ่านไม่ตรงกัน" : "");
    }
  };

  const handleConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\s/g, "");
    setConfirmPassword(val);
    setConfirmError(val !== password ? "รหัสผ่านไม่ตรงกัน" : "");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (emailError || phoneError || passwordError || confirmError) return;

    // ✅ เช็คค่าซ้ำกัน กรณีกด submit โดยไม่ได้แตะ field
    if (!email.endsWith(".com")) {
      setEmailError("อีเมลต้องลงท้ายด้วย .com เท่านั้น");
      return;
    }
    if (!phone.startsWith("0") || phone.length !== 10) {
      setPhoneError(
        !phone.startsWith("0")
          ? "เบอร์โทรต้องขึ้นต้นด้วย 0"
          : "เบอร์โทรต้องมี 10 หลัก",
      );
      return;
    }
    if (password.length < 8) {
      setPasswordError("รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร");
      return;
    }
    if (password !== confirmPassword) {
      setConfirmError("รหัสผ่านไม่ตรงกัน");
      return;
    }

    setLoading(true);
    try {
      const body = {
        name: name.trim(),
        email: email.trim(),
        status: "pending",
        role: "reseller",
        phone: phone.trim(),
        shop_name: shop_name.trim(),
        password,
        address: address.trim(),
      };
      console.log("📤 ส่งไป:", body);

      const res = await fetch(`${URL}/register`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const result = await res.json();
      console.log("📥 ได้กลับมา:", result);

      if (res.ok) {
        await Swal.fire({
          title: "ลงทะเบียนสำเร็จ",
          text: "กรุณารอการอนุมัติจากผู้ดูแลระบบ",
          icon: "success",
          iconColor: "#1a6b5a",
          showConfirmButton: false,
          timer: 2500,
          padding: "4rem",
          backdrop: `rgba(0,0,0,0.4)`,
          customClass: {
            popup: "rounded-[2rem]",
            title: "text-2xl font-bold text-[#0d3d30] py-4",
            htmlContainer: "text-lg text-[#888780]",
          },
        });
        router.push("/login");
      } else {
        const msg: string = result.error || result.message || "";
        Swal.fire({
          icon: "error",
          title: (() => {
            if (msg.includes("email") || msg.includes("อีเมล"))
              return "อีเมลนี้ถูกใช้งานแล้ว";
            if (msg.includes("phone") || msg.includes("เบอร์"))
              return "เบอร์โทรนี้ถูกใช้งานแล้ว";
            if (msg.includes("shop") || msg.includes("ร้าน"))
              return "ชื่อร้านนี้ถูกใช้งานแล้ว";
            return "ข้อมูลไม่ถูกต้อง";
          })(),
          text: result.message || "กรุณาตรวจสอบข้อมูลอีกครั้ง",
          confirmButtonColor: "#EF9F27",
        });
      }
    } catch (err) {
      console.error(err);
      const isOffline = !navigator.onLine;
      Swal.fire({
        icon: "error",
        title: isOffline
          ? "ไม่มีการเชื่อมต่ออินเทอร์เน็ต"
          : "เซิร์ฟเวอร์ไม่ตอบสนอง",
        text: isOffline
          ? "กรุณาตรวจสอบ Wi-Fi หรือเน็ตมือถือ"
          : "ระบบขัดข้องชั่วคราว กรุณารอสักครู่แล้วลองใหม่",
        confirmButtonText: "รับทราบ",
        confirmButtonColor: "#EF9F27",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    if (val.startsWith(" ")) val = val.trimStart(); // ห้ามขึ้นต้นด้วยช่องว่าง
    val = val.replace(/\s\s+/g, " "); // ห้ามเคาะซ้ำ 2 ที

    const spaceCount = (val.match(/\s/g) || []).length;
    if (spaceCount > 1) {
      setNameError("ชื่อ-นามสกุล ห้ามเว้นวรรคเกิน 1 ครั้ง");
    } else {
      setNameError("");
      setFullName(val);
    }
  };

  // สำหรับ ชื่อร้าน
  const handleShopNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    if (val.startsWith(" ")) val = val.trimStart();
    val = val.replace(/\s\s+/g, " ");

    const spaceCount = (val.match(/\s/g) || []).length;
    if (spaceCount > 1) {
      setShopNameError("ชื่อร้าน ห้ามเว้นวรรคเกิน 1 ครั้ง");
    } else {
      setShopNameError("");
      setShopName(val);
    }
  };

  // สำหรับ ที่อยู่
  const handleAddressChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    let val = e.target.value;
    if (val.startsWith(" ")) val = val.trimStart();
    val = val.replace(/\s\s+/g, " ");

    const spaceCount = (val.match(/\s/g) || []).length;
    if (spaceCount > 1) {
      setAddressError("ที่อยู่ ห้ามเว้นวรรคเกิน 1 ครั้ง");
    } else {
      setAddressError("");
      setAddress(val);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md space-y-2 border bg-[#FFFFFF] rounded-lg p-6"
    >
      <div className="space-y-2 text-center">
        <div className="text-xl font-bold tracking-tight text-[#BA7517]">
          สมัครตัวแทนจำหน่าย
        </div>
        <p className="text-sm text-[#888780]">
          กรอกข้อมูลเพื่อลงทะเบียนเปิดร้านค้าของคุณ
        </p>
      </div>

      <div className="space-y-1">
        <div>
          <label htmlFor="fullName" className={classNamelabel}>
            ชื่อ-นามสกุล <span className="text-red-500">*</span>
          </label>
          <input
            value={name}
            onChange={handleNameChange}
            className={classNameinput}
            id="fullName"
            placeholder="นาย ตัวอย่าง นามสมมติ"
            required
          />
        </div>
        <div>
          <label htmlFor="email" className={classNamelabel}>
            อีเมล์ <span className="text-red-500">*</span>
          </label>
          <input
            value={email}
            onChange={handleEmail}
            className={`${classNameinput} ${emailError ? "border-red-400 focus:ring-red-200" : ""}`}
            id="email"
            type="email"
            placeholder="example@email.com"
            required
          />
          {emailError && (
            <p className="text-red-500 text-xs mt-1">{emailError}</p>
          )}
        </div>

        <div>
          <label htmlFor="phone" className={classNamelabel}>
            เบอร์โทรศัพท์ <span className="text-red-500">*</span>
          </label>
          <input
            value={phone}
            onChange={handlePhone}
            className={`${classNameinput} ${phoneError ? "border-red-400 focus:ring-red-200" : ""}`}
            id="phone"
            type="tel"
            placeholder="080-000-0000"
            required
          />
          {phoneError && (
            <p className="text-red-500 text-xs mt-1">{phoneError}</p>
          )}
        </div>

        <div className="p-3 bg-[#e1f5ee] rounded-lg space-y-2">
          <div>
            <label htmlFor="shopName" className={classNamelabel}>
              ชื่อร้าน <span className="text-red-500">*</span>
            </label>
            <input
              value={shop_name}
              onChange={handleShopNameChange}
              className={classNameinput}
              id="shopName"
              placeholder="เช่น มินนี่ช็อป"
              required
            />
          </div>
          <div>
            <label htmlFor="address" className={classNamelabel}>
              ที่อยู่ร้าน
            </label>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className={classNameinput}
              id="address"
              placeholder="เช่น 123 หมู่ 1 ต.แม่กา อ.เมือง จ.พะเยา"
              required
            />
          </div>
          <p className="text-xs text-[#0d3d30] font-mono bg-white p-2 rounded">
            URL หน้าร้านของคุณจะเป็น: <strong>/shop/ชื่อร้าน</strong>
          </p>
        </div>

        <div className="flex gap-3">
          <div className="flex-1">
            <label htmlFor="password" className={classNamelabel}>
              รหัสผ่าน <span className="text-red-500">*</span>
            </label>
            <input
              value={password}
              onChange={handlePassword}
              id="password"
              type="password"
              placeholder="••••••••"
              required
              minLength={8}
              className={`${classNameinput} ${passwordError ? "border-red-400 focus:ring-red-200" : ""}`}
            />
            {passwordError && (
              <p className="text-red-500 text-xs mt-1">{passwordError}</p>
            )}
          </div>
          <div className="flex-1">
            <label htmlFor="confirmPassword" className={classNamelabel}>
              ยืนยันรหัสผ่าน <span className="text-red-500">*</span>
            </label>
            <input
              value={confirmPassword}
              onChange={handleConfirmPassword}
              id="confirmPassword"
              type="password"
              placeholder="••••••••"
              required
              className={`${classNameinput} ${confirmError ? "border-red-400 focus:ring-red-200" : ""}`}
            />
            {confirmError && (
              <p className="text-red-500 text-xs mt-1">{confirmError}</p>
            )}
          </div>
        </div>
      </div>

      <button
        disabled={
          loading ||
          !!emailError ||
          !!phoneError ||
          !!passwordError ||
          !!confirmError
        }
        type="submit"
        className="w-full bg-[#EF9F27] text-white hover:bg-[#BA7517] cursor-pointer rounded-md px-4 py-2 text-base disabled:opacity-50"
      >
        {loading ? "กำลังสมัคร..." : "สมัครสมาชิก"}
      </button>

      <p className="text-center text-sm text-[#888780]">
        มีบัญชีอยู่แล้ว?{" "}
        <Link href="/reseller/login" className="text-[#BA7517] hover:underline">
          เข้าสู่ระบบ
        </Link>
      </p>
    </form>
  );
};

export default FromRegister;
