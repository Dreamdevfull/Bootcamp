// "use client";
// import React, { useState } from "react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import Swal from "sweetalert2";

// const validateSingleSpace = (value: string) => {
//   let val = value;
//   if (val.startsWith(" ")) val = val.trimStart(); // ห้ามขึ้นต้นด้วยช่องว่าง
//   val = val.replace(/\s\s+/g, " "); // เปลี่ยนช่องว่างที่ติดกันหลายตัวให้เหลือ 1 ตัว
//   const spaceCount = (val.match(/\s/g) || []).length;
//   return spaceCount <= 1 ? val : null; // ถ้าเว้นวรรคไม่เกิน 1 คืนค่ากลับไป ถ้าเกินคืน null
// };

// const FromRegister = () => {
//   const classNamelabel = "text-sm font-medium text-[#2C2C2A]";
//   const classNameinput =
//     "flex h-9 w-full rounded-md border text-[#888780] bg-[#FFFFFF] px-3 py-2 text-sm placeholder:text-[#888780] focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50 border-[#D3D1C7] focus:ring-[#9FE1CB]";

//   const [loading, setLoading] = useState(false);
//   const [name, setFullName] = useState("");
//   const [email, setEmail] = useState("");
//   const [phone, setPhone] = useState("");
//   const [shop_name, setShopName] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [address, setAddress] = useState("");
//   const [passwordError, setPasswordError] = useState("");
//   const [confirmError, setConfirmError] = useState("");

//   const router = useRouter();
//   const URL = process.env.NEXT_PUBLIC_API_URL;
//   const [emailError, setEmailError] = useState("");
//   const [phoneError, setPhoneError] = useState("");
//   const [nameError, setNameError] = useState("");
//   const [shopNameError, setShopNameError] = useState("");
//   const [addressError, setAddressError] = useState("");

//   const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const val = e.target.value.replace(/\s/g, "");
//     setEmail(val);
//     if (val && !val.endsWith("@gmail.com")) {
//       setEmailError("อีเมลต้องลงท้ายด้วย @gmail.com เท่านั้น");
//     } else {
//       setEmailError("");
//     }
//   };

//   const handlePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const val = e.target.value.replace(/\s/g, "");
//     setPhone(val);

//     if (val.length > 0 && !val.startsWith("0")) {
//       setPhoneError("เบอร์โทรต้องขึ้นต้นด้วย 0");
//     } else if (val.length > 0 && val.length !== 10) {
//       setPhoneError("เบอร์โทรต้องมี 10 หลัก");
//     } else {
//       setPhoneError("");
//     }
//   };

//   const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const val = e.target.value.replace(/\s/g, "");
//     setPassword(val);
//     setPasswordError(
//       val.length > 0 && val.length < 8
//         ? "รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร"
//         : "",
//     );
//     if (confirmPassword) {
//       setConfirmError(confirmPassword !== val ? "รหัสผ่านไม่ตรงกัน" : "");
//     }
//   };

//   const handleConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const val = e.target.value.replace(/\s/g, "");
//     setConfirmPassword(val);
//     setConfirmError(val !== password ? "รหัสผ่านไม่ตรงกัน" : "");
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (emailError || phoneError || passwordError || confirmError) return;

//     // ✅ เช็คค่าซ้ำกัน กรณีกด submit โดยไม่ได้แตะ field
//     if (!email.endsWith(".com")) {
//       setEmailError("อีเมลต้องลงท้ายด้วย .com เท่านั้น");
//       return;
//     }
//     if (!phone.startsWith("0") || phone.length !== 10) {
//       setPhoneError(
//         !phone.startsWith("0")
//           ? "เบอร์โทรต้องขึ้นต้นด้วย 0"
//           : "เบอร์โทรต้องมี 10 หลัก",
//       );
//       return;
//     }
//     if (password.length < 8) {
//       setPasswordError("รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร");
//       return;
//     }
//     if (password !== confirmPassword) {
//       setConfirmError("รหัสผ่านไม่ตรงกัน");
//       return;
//     }

//     setLoading(true);
//     try {
//       const body = {
//         name: name.trim(),
//         email: email.trim(),
//         status: "pending",
//         role: "reseller",
//         phone: phone.trim(),
//         shop_name: shop_name.trim(),
//         password,
//         address: address.trim(),
//       };
//       console.log("📤 ส่งไป:", body);

//       const res = await fetch(`${URL}/register`, {
//         method: "POST",
//         credentials: "include",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(body),
//       });
//       const result = await res.json();
//       console.log("📥 ได้กลับมา:", result);

//       if (res.ok) {
//         await Swal.fire({
//           title: "ลงทะเบียนสำเร็จ",
//           text: "กรุณารอการอนุมัติจากผู้ดูแลระบบ",
//           icon: "success",
//           iconColor: "#1a6b5a",
//           showConfirmButton: false,
//           timer: 2500,
//           padding: "4rem",
//           backdrop: `rgba(0,0,0,0.4)`,
//           customClass: {
//             popup: "rounded-[2rem]",
//             title: "text-2xl font-bold text-[#0d3d30] py-4",
//             htmlContainer: "text-lg text-[#888780]",
//           },
//         });
//         router.push("/login");
//       } else {
//         const msg: string = result.error || result.message || "";
//         Swal.fire({
//           icon: "error",
//           title: (() => {
//             if (msg.includes("email") || msg.includes("อีเมล"))
//               return "อีเมลนี้ถูกใช้งานแล้ว";
//             if (msg.includes("phone") || msg.includes("เบอร์"))
//               return "เบอร์โทรนี้ถูกใช้งานแล้ว";
//             if (msg.includes("shop") || msg.includes("ร้าน"))
//               return "ชื่อร้านนี้ถูกใช้งานแล้ว";
//             return "ข้อมูลไม่ถูกต้อง";
//           })(),
//           text: result.message || "กรุณาตรวจสอบข้อมูลอีกครั้ง",
//           confirmButtonColor: "#EF9F27",
//         });
//       }
//     } catch (err) {
//       console.error(err);
//       const isOffline = !navigator.onLine;
//       Swal.fire({
//         icon: "error",
//         title: isOffline
//           ? "ไม่มีการเชื่อมต่ออินเทอร์เน็ต"
//           : "เซิร์ฟเวอร์ไม่ตอบสนอง",
//         text: isOffline
//           ? "กรุณาตรวจสอบ Wi-Fi หรือเน็ตมือถือ"
//           : "ระบบขัดข้องชั่วคราว กรุณารอสักครู่แล้วลองใหม่",
//         confirmButtonText: "รับทราบ",
//         confirmButtonColor: "#EF9F27",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     let val = e.target.value;
//     if (val.startsWith(" ")) val = val.trimStart(); // ห้ามขึ้นต้นด้วยช่องว่าง
//     val = val.replace(/\s\s+/g, " "); // ห้ามเคาะซ้ำ 2 ที

//     const spaceCount = (val.match(/\s/g) || []).length;
//     if (spaceCount > 1) {
//       setNameError("ชื่อ-นามสกุล ห้ามเว้นวรรคเกิน 1 ครั้ง");
//     } else {
//       setNameError("");
//       setFullName(val);
//     }
//   };

//   // สำหรับ ชื่อร้าน
//   const handleShopNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     let val = e.target.value;
//     if (val.startsWith(" ")) val = val.trimStart();
//     val = val.replace(/\s\s+/g, " ");

//     const spaceCount = (val.match(/\s/g) || []).length;
//     if (spaceCount > 1) {
//       setShopNameError("ชื่อร้าน ห้ามเว้นวรรคเกิน 1 ครั้ง");
//     } else {
//       setShopNameError("");
//       setShopName(val);
//     }
//   };

//   // สำหรับ ที่อยู่
//   const handleAddressChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
//     let val = e.target.value;
//     if (val.startsWith(" ")) val = val.trimStart();
//     val = val.replace(/\s\s+/g, " ");

//     const spaceCount = (val.match(/\s/g) || []).length;
//     if (spaceCount > 1) {
//       setAddressError("ที่อยู่ ห้ามเว้นวรรคเกิน 1 ครั้ง");
//     } else {
//       setAddressError("");
//       setAddress(val);
//     }
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="w-full max-w-md space-y-2 border bg-[#FFFFFF] rounded-lg p-6"
//     >
//       <div className="space-y-2 text-center">
//         <div className="text-xl font-bold tracking-tight text-[#BA7517]">
//           สมัครตัวแทนจำหน่าย
//         </div>
//         <p className="text-sm text-[#888780]">
//           กรอกข้อมูลเพื่อลงทะเบียนเปิดร้านค้าของคุณ
//         </p>
//       </div>

//       <div className="space-y-2">
//         {/* ชื่อ-นามสกุล */}
//         <div>
//           <label htmlFor="fullName" className={classNamelabel}>
//             ชื่อ-นามสกุล <span className="text-red-500">*</span>
//           </label>
//           <input
//             value={name}
//             onChange={handleNameChange}
//             className={classNameinput}
//             id="fullName"
//             placeholder="นาย ตัวอย่าง นามสมมติ"
//             required
//           />
//         </div>

//         {/* อีเมล */}
//         <div>
//           <label htmlFor="email" className={classNamelabel}>
//             อีเมล์ <span className="text-red-500">*</span>
//           </label>
//           <input
//             value={email}
//             onChange={handleEmail}
//             className={`${classNameinput} ${emailError ? "border-red-500 focus:ring-red-400" : ""}`}
//             id="email"
//             type="email"
//             placeholder="example@gmail.com"
//             aria-required="true"
//             aria-describedby={emailError ? "email-error" : undefined}
//             required
//           />
//           {emailError && (
//             <p className="text-red-500 text-xs mt-1">{emailError}</p>
//           )}
//         </div>

//         {/* เบอร์โทร */}
//         <div>
//           <label htmlFor="phone" className={classNamelabel}>
//             เบอร์โทรศัพท์ <span className="text-red-500">*</span>
//           </label>
//           <input
//             value={phone}
//             onChange={handlePhone}
//             className={`${classNameinput} ${phoneError ? "border-red-500 focus:ring-red-400" : ""}`}
//             id="phone"
//             type="tel"
//             placeholder="080-000-0000"
//             aria-required="true"
//             aria-describedby={phoneError ? "phone-error" : undefined}
//             required
//           />
//           {phoneError && (
//             <p className="text-red-500 text-xs mt-1">{phoneError}</p>
//           )}
//         </div>

//         {/* ข้อมูลร้านค้า */}
//         <div className="p-3 bg-emerald-50 dark:bg-emerald-950 
//                         border-2 border-emerald-200 dark:border-emerald-800
//                         rounded-lg space-y-2">
//           <div>
//             <label htmlFor="shopName" className={classNamelabel}>
//               ชื่อร้าน <span className="text-red-500">*</span>
//             </label>
//             <input
//               value={shop_name}
//               onChange={handleShopNameChange}
//               className={classNameinput}
//               id="shopName"
//               placeholder="เช่น มินนี่ช็อป"
//               required
//             />
//           </div>
//           <div>
//             <label htmlFor="address" className={classNamelabel}>
//               ที่อยู่ร้าน
//             </label>
//             <textarea
//               value={address}
//               onChange={(e) => setAddress(e.target.value)}
//               className={classNameinput}
//               id="address"
//               placeholder="เช่น 123 หมู่ 1 ต.แม่กา อ.เมือง จ.พะเยา"
//               required
//             />
//           </div>
//           <p className="text-xs text-emerald-800 dark:text-emerald-300 
//                         font-mono bg-white dark:bg-gray-800 
//                         border border-emerald-200 dark:border-emerald-700
//                         p-2 rounded">
//             URL หน้าร้านของคุณจะเป็น: <strong>/shop/ชื่อร้าน</strong>
//           </p>
//         </div>

//         {/* รหัสผ่าน */}
//         <div className="flex gap-3">
//           <div className="flex-1">
//             <label htmlFor="password" className={classNamelabel}>
//               รหัสผ่าน <span className="text-red-500">*</span>
//             </label>
//             <input
//               value={password}
//               onChange={handlePassword}
//               id="password"
//               type="password"
//               placeholder="••••••••"
//               required
//               minLength={8}
//               className={`${classNameinput} ${passwordError ? "border-red-400 focus:ring-red-200" : ""}`}
//             />
//             {passwordError && (
//               <p className="text-red-500 text-xs mt-1">{passwordError}</p>
//             )}
//           </div>
//           <div className="flex-1">
//             <label htmlFor="confirmPassword" className={classNamelabel}>
//               ยืนยันรหัสผ่าน <span className="text-red-500">*</span>
//             </label>
//             <input
//               value={confirmPassword}
//               onChange={handleConfirmPassword}
//               id="confirmPassword"
//               type="password"
//               placeholder="••••••••"
//               required
//               className={`${classNameinput} ${confirmError ? "border-red-400 focus:ring-red-200" : ""}`}
//             />
//             {confirmError && (
//               <p className="text-red-500 text-xs mt-1">{confirmError}</p>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* ปุ่มสมัคร */}
//       <button
//         disabled={
//           loading ||
//           !!emailError ||
//           !!phoneError ||
//           !!passwordError ||
//           !!confirmError
//         }
//         type="submit"
//         aria-busy={loading}
//         aria-label={loading ? "กำลังสมัครสมาชิก" : "สมัครสมาชิก"}
//         className="w-full bg-amber-500 hover:bg-amber-600
//                    dark:bg-amber-500 dark:hover:bg-amber-600
//                    disabled:opacity-50 disabled:cursor-not-allowed
//                    text-white font-bold text-base
//                    cursor-pointer rounded-lg px-4 py-3
//                    focus:outline-none focus:ring-4
//                    focus:ring-amber-400 focus:ring-offset-2
//                    transition-all duration-200"
//       >
//         {loading ? (
//           <span className="flex items-center justify-center gap-2">
//             <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none" aria-hidden="true">
//               <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
//               <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
//             </svg>
//             กำลังสมัคร...
//           </span>
//         ) : "สมัครสมาชิก"}
//       </button>

//       {/* ลิงก์เข้าสู่ระบบ */}
//       <p className="text-center text-sm text-gray-500 dark:text-gray-400">
//         มีบัญชีอยู่แล้ว?{" "}
//         <Link href="/reseller/login" className="text-[#BA7517] hover:underline">
//           เข้าสู่ระบบ
//         </Link>
//       </p>
//     </form>
//   );
// };

// export default FromRegister;
"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

const validateSingleSpace = (value: string) => {
  let val = value;
  if (val.startsWith(" ")) val = val.trimStart();
  val = val.replace(/\s\s+/g, " ");
  const spaceCount = (val.match(/\s/g) || []).length;
  return spaceCount <= 1 ? val : null;
};

const FromRegister = () => {
  const classNamelabel = "text-sm font-semibold text-gray-700 dark:text-gray-200";
  const classNameinput = `
    flex h-10 w-full rounded-md border-2
    text-gray-800 dark:text-gray-100
    bg-white dark:bg-gray-800
    px-3 py-2 text-sm
    placeholder:text-gray-400 dark:placeholder:text-gray-500
    focus:outline-none focus:ring-2
    disabled:cursor-not-allowed disabled:opacity-50
    border-gray-300 dark:border-gray-600
    focus:ring-emerald-500 dark:focus:ring-emerald-400
    focus:border-transparent transition
  `;

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
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [nameError, setNameError] = useState("");
  const [shopNameError, setShopNameError] = useState("");
  const [addressError, setAddressError] = useState("");

  const router = useRouter();
  const URL = process.env.NEXT_PUBLIC_API_URL;

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
    setPasswordError(val.length > 0 && val.length < 8 ? "รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร" : "");
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
    if (!email.endsWith(".com")) { setEmailError("อีเมลต้องลงท้ายด้วย .com เท่านั้น"); return; }
    if (!phone.startsWith("0") || phone.length !== 10) {
      setPhoneError(!phone.startsWith("0") ? "เบอร์โทรต้องขึ้นต้นด้วย 0" : "เบอร์โทรต้องมี 10 หลัก");
      return;
    }
    if (password.length < 8) { setPasswordError("รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร"); return; }
    if (password !== confirmPassword) { setConfirmError("รหัสผ่านไม่ตรงกัน"); return; }

    setLoading(true);
    try {
      const body = {
        name: name.trim(), email: email.trim(), status: "pending",
        role: "reseller", phone: phone.trim(), shop_name: shop_name.trim(),
        password, address: address.trim(),
      };
      const res = await fetch(`${URL}/register`, {
        method: "POST", credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const result = await res.json();

      if (res.ok) {
        await Swal.fire({
          title: "ลงทะเบียนสำเร็จ",
          text: "กรุณารอการอนุมัติจากผู้ดูแลระบบ",
          icon: "success", iconColor: "#1a6b5a",
          showConfirmButton: false, timer: 2500, padding: "4rem",
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
            if (msg.includes("email") || msg.includes("อีเมล")) return "อีเมลนี้ถูกใช้งานแล้ว";
            if (msg.includes("phone") || msg.includes("เบอร์")) return "เบอร์โทรนี้ถูกใช้งานแล้ว";
            if (msg.includes("shop") || msg.includes("ร้าน")) return "ชื่อร้านนี้ถูกใช้งานแล้ว";
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
        title: isOffline ? "ไม่มีการเชื่อมต่ออินเทอร์เน็ต" : "เซิร์ฟเวอร์ไม่ตอบสนอง",
        text: isOffline ? "กรุณาตรวจสอบ Wi-Fi หรือเน็ตมือถือ" : "ระบบขัดข้องชั่วคราว กรุณารอสักครู่แล้วลองใหม่",
        confirmButtonText: "รับทราบ", confirmButtonColor: "#EF9F27",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    if (val.startsWith(" ")) val = val.trimStart();
    val = val.replace(/\s\s+/g, " ");
    const spaceCount = (val.match(/\s/g) || []).length;
    if (spaceCount > 1) { setNameError("ชื่อ-นามสกุล ห้ามเว้นวรรคเกิน 1 ครั้ง"); }
    else { setNameError(""); setFullName(val); }
  };

  const handleShopNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    if (val.startsWith(" ")) val = val.trimStart();
    val = val.replace(/\s\s+/g, " ");
    const spaceCount = (val.match(/\s/g) || []).length;
    if (spaceCount > 1) { setShopNameError("ชื่อร้าน ห้ามเว้นวรรคเกิน 1 ครั้ง"); }
    else { setShopNameError(""); setShopName(val); }
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    let val = e.target.value;
    if (val.startsWith(" ")) val = val.trimStart();
    val = val.replace(/\s\s+/g, " ");
    const spaceCount = (val.match(/\s/g) || []).length;
    if (spaceCount > 1) { setAddressError("ที่อยู่ ห้ามเว้นวรรคเกิน 1 ครั้ง"); }
    else { setAddressError(""); setAddress(val); }
  };

  const ErrorMsg = ({ msg }: { msg: string }) => (
    <p role="alert" className="text-red-500 dark:text-red-400 text-xs mt-1 font-medium">
      ⚠ {msg}
    </p>
  );

  return (
    <form
      onSubmit={handleSubmit}
      aria-label="แบบฟอร์มสมัครตัวแทนจำหน่าย"
      className="w-full max-w-md space-y-3
                 border-2 border-gray-200 dark:border-gray-700
                 bg-white dark:bg-gray-900
                 rounded-xl p-6 shadow-md transition-colors duration-200"
    >
      {/* หัวข้อ */}
      <div className="space-y-1 text-center">
        <h1 className="text-xl font-bold tracking-tight text-amber-600 dark:text-amber-400">
          สมัครตัวแทนจำหน่าย
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          กรอกข้อมูลเพื่อลงทะเบียนเปิดร้านค้าของคุณ
        </p>
      </div>

      <div className="space-y-2">
        {/* ชื่อ-นามสกุล */}
        <div>
          <label htmlFor="fullName" className={classNamelabel}>
            ชื่อ-นามสกุล <span className="text-red-500 dark:text-red-400" aria-label="จำเป็น">*</span>
          </label>
          <input
            value={name} onChange={handleNameChange}
            className={`${classNameinput} ${nameError ? "border-red-500 focus:ring-red-400" : ""}`}
            id="fullName" placeholder="นาย ตัวอย่าง นามสมมติ"
            aria-required="true" required
          />
          {nameError && <ErrorMsg msg={nameError} />}
        </div>

        {/* อีเมล */}
        <div>
          <label htmlFor="email" className={classNamelabel}>
            อีเมล <span className="text-red-500 dark:text-red-400" aria-label="จำเป็น">*</span>
          </label>
          <input
            value={email} onChange={handleEmail}
            className={`${classNameinput} ${emailError ? "border-red-500 focus:ring-red-400" : ""}`}
            id="email" type="email" placeholder="example@gmail.com"
            aria-required="true" aria-describedby={emailError ? "email-error" : undefined} required
          />
          {emailError && <ErrorMsg msg={emailError} />}
        </div>

        {/* เบอร์โทร */}
        <div>
          <label htmlFor="phone" className={classNamelabel}>
            เบอร์โทรศัพท์ <span className="text-red-500 dark:text-red-400" aria-label="จำเป็น">*</span>
          </label>
          <input
            value={phone} onChange={handlePhone}
            className={`${classNameinput} ${phoneError ? "border-red-500 focus:ring-red-400" : ""}`}
            id="phone" type="tel" placeholder="080-000-0000"
            aria-required="true" aria-describedby={phoneError ? "phone-error" : undefined} required
          />
          {phoneError && <ErrorMsg msg={phoneError} />}
        </div>

        {/* ข้อมูลร้านค้า */}
        <div className="p-3 bg-emerald-50 dark:bg-emerald-950
                        border-2 border-emerald-200 dark:border-emerald-800
                        rounded-lg space-y-2">
          <div>
            <label htmlFor="shopName" className={classNamelabel}>
              ชื่อร้าน <span className="text-red-500 dark:text-red-400" aria-label="จำเป็น">*<span className="text-xs font-normal text-gray-400 ml-1">(ภาษาอังกฤษเท่านั้น)</span></span>
            </label>
            <input
              value={shop_name} onChange={handleShopNameChange}
              className={`${classNameinput} ${shopNameError ? "border-red-500 focus:ring-red-400" : ""}`}
              id="shopName" placeholder="เช่น มินนี่ช็อป"
              aria-required="true" required
            />
            {shopNameError && <ErrorMsg msg={shopNameError} />}
          </div>
          <div>
            <label htmlFor="address" className={classNamelabel}>
              ที่อยู่ร้าน <span className="text-red-500 dark:text-red-400" aria-label="จำเป็น">*</span>
            </label>
            <textarea
              value={address} onChange={handleAddressChange}
              className={`${classNameinput} ${addressError ? "border-red-500 focus:ring-red-400" : ""}`}
              id="address" placeholder="เช่น 123 หมู่ 1 ต.แม่กา อ.เมือง จ.พะเยา"
              aria-required="true" required
            />
            {addressError && <ErrorMsg msg={addressError} />}
          </div>
          <p className="text-xs text-emerald-800 dark:text-emerald-300
                        font-mono bg-white dark:bg-gray-800
                        border border-emerald-200 dark:border-emerald-700
                        p-2 rounded">
            URL หน้าร้านของคุณจะเป็น: <strong>/shop/ชื่อร้าน</strong>
          </p>
        </div>

        {/* รหัสผ่าน */}
        <div className="flex gap-3">
          <div className="flex-1">
            <label htmlFor="password" className={classNamelabel}>
              รหัสผ่าน <span className="text-red-500 dark:text-red-400" aria-label="จำเป็น">*</span>
            </label>
            <input
              value={password} onChange={handlePassword}
              id="password" type="password" placeholder="••••••••"
              required minLength={8}
              aria-describedby={passwordError ? "password-error" : undefined}
              className={`${classNameinput} ${passwordError ? "border-red-500 focus:ring-red-400" : ""}`}
            />
            {passwordError && <ErrorMsg msg={passwordError} />}
          </div>
          <div className="flex-1">
            <label htmlFor="confirmPassword" className={classNamelabel}>
              ยืนยันรหัสผ่าน <span className="text-red-500 dark:text-red-400" aria-label="จำเป็น">*</span>
            </label>
            <input
              value={confirmPassword} onChange={handleConfirmPassword}
              id="confirmPassword" type="password" placeholder="••••••••"
              required
              aria-describedby={confirmError ? "confirm-error" : undefined}
              className={`${classNameinput} ${confirmError ? "border-red-500 focus:ring-red-400" : ""}`}
            />
            {confirmError && <ErrorMsg msg={confirmError} />}
          </div>
        </div>
      </div>

      {/* ปุ่มสมัคร */}
      <button
        disabled={loading || !!emailError || !!phoneError || !!passwordError || !!confirmError || !!nameError || !!shopNameError}
        type="submit" aria-busy={loading}
        aria-label={loading ? "กำลังสมัครสมาชิก" : "สมัครสมาชิก"}
        className="w-full bg-amber-500 hover:bg-amber-600
                   dark:bg-amber-500 dark:hover:bg-amber-600
                   disabled:opacity-50 disabled:cursor-not-allowed
                   text-white font-bold text-base
                   cursor-pointer rounded-lg px-4 py-3
                   focus:outline-none focus:ring-4
                   focus:ring-amber-400 focus:ring-offset-2
                   transition-all duration-200"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
            กำลังสมัคร...
          </span>
        ) : "สมัครสมาชิก"}
      </button>

      {/* ลิงก์เข้าสู่ระบบ */}
      <p className="text-center text-sm text-gray-500 dark:text-gray-400">
        มีบัญชีอยู่แล้ว?{" "}
        <Link
          href="/reseller/login"
          className="text-amber-600 dark:text-amber-400
                     font-semibold underline underline-offset-2
                     hover:text-amber-700 dark:hover:text-amber-300
                     focus:outline-none focus:ring-2 focus:ring-amber-400 rounded"
        >
          เข้าสู่ระบบ
        </Link>
      </p>
    </form>
  );
};

export default FromRegister;