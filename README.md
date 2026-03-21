# 📦 Reseller Management System
**ระบบบริหารจัดการตัวแทนจำหน่ายสินค้าออนไลน์ (Bootcamp Project 2026)**

ระบบแพลตฟอร์มที่เชื่อมโยงระหว่างเจ้าของธุรกิจ (Admin) และตัวแทนจำหน่าย (Reseller) เพื่อขยายช่องทางการขายสินค้า โดยตัวแทนสามารถสร้างหน้าร้านส่วนตัวและกำหนดราคาขายเองเพื่อรับกำไรเข้าสู่ระบบ Wallet จำลอง

---

## 🏗️ System Architecture & Infrastructure
โปรเจกต์นี้ใช้สถาปัตยกรรมแบบ **Client-Server** ที่แยกส่วนการทำงานชัดเจน (Separation of Concerns):

* **Frontend:** พัฒนาด้วย **Next.js (React)**, **TypeScript** และ **Tailwind CSS**
* **Backend:** พัฒนาด้วย **Golang** โดยใช้ **Fiber Framework** เพื่อประสิทธิภาพสูงสุด
* **Database:** **PostgreSQL/MySQL** จัดการผ่าน **GORM** (ORM for Go)
* **Deployment:** รันบน **Ubuntu Server** จัดการโปรเซสด้วย **PM2** และใช้ **Nginx** เป็น Reverse Proxy

---

## 📊 Database Schema (ER Diagram)
โครงสร้างฐานข้อมูลออกแบบมาเพื่อรองรับความสัมพันธ์ดังนี้:

1.  **Users:** เก็บข้อมูลผู้ใช้ (Admin/Reseller), Password (Hashed), Role และ Status
2.  **Shops:** เชื่อมโยงกับ User (One-to-One) เพื่อกำหนด URL หน้าร้าน (`shop_slug`)
3.  **Products:** คลังสินค้ากลางที่ Admin จัดการ (ราคาทุน, ราคาขั้นต่ำ, สต็อก)
4.  **Shop_products:** รายการสินค้าที่ตัวแทนเลือกไปขายพร้อมราคาที่ตั้งเอง
5.  **Orders & Order_items:** บันทึกการสั่งซื้อและรายการสินค้า ณ เวลาที่เกิดออเดอร์ (Snapshot)
6.  **Wallets & Wallet_logs:** ระบบกระเป๋าเงินจำลองสะสมกำไรส่วนต่าง

---

## 🚀 Key Features

### 1. ส่วนของผู้ดูแลระบบ (Admin)
* **Dashboard:** สรุปยอดขายรวม, กำไรรวม และจำนวนออเดอร์
* **Product Management:** จัดการสินค้ากลางและสต็อกสินค้า
* **Reseller Approval:** ตรวจสอบและอนุมัติผู้สมัครตัวแทนจำหน่าย
* **Order Management:** ติดตามออเดอร์และเปลี่ยนสถานะเป็น "จัดส่งแล้ว"

### 2. ส่วนของตัวแทนจำหน่าย (Reseller)
* **Registration:** สมัครสมาชิกและตั้งชื่อร้าน (รอการอนุมัติ)
* **Catalog:** เลือกสินค้าไปขายและกำหนดราคาเอง (ไม่ต่ำกว่าราคาขั้นต่ำ)
* **Personal Shop:** หน้าร้านเฉพาะตัวผ่าน URL `/shop/:slug`
* **Wallet:** ดูยอดกำไรสะสมจากส่วนต่างราคาทุนและราคาขาย

### 3. ส่วนของลูกค้า (Customer)
* **Shopping:** เลือกซื้อสินค้าจากหน้าร้านตัวแทน
* **Mock Payment:** ระบบจำลองการชำระเงิน กดจ่ายเงินแล้วสำเร็จทันที
* **Tracking:** ตรวจสอบสถานะการจัดส่งด้วยเลขออเดอร์

---

## 💻 การติดตั้งและใช้งาน (Installation)

### 🔹 ส่วนของ Backend (Go)
1. เข้าไปที่โฟลเดอร์: `cd backend`
2. ตั้งค่าไฟล์ `.env` สำหรับฐานข้อมูล
3. ติดตั้ง Dependency: `go mod tidy`
4. เริ่มทำงาน: `go run main.go`

### 🔹 ส่วนของ Frontend (Next.js)
1. เข้าไปที่โฟลเดอร์: `cd frontend/reseller_management_system`
2. ติดตั้ง Package: `npm install`
3. ตั้งค่า `NEXT_PUBLIC_API_URL` ในไฟล์ `.env.local`
4. เริ่มทำงาน: `npm run dev` หรือ `npm run build && pm2 start`

---

## 📝 Business Rules & Validations
* **Name Validation:** ฟิลด์ชื่อ-นามสกุล, ชื่อร้าน และที่อยู่ จำกัดการเว้นวรรคไม่เกิน 1 ครั้ง
* **Price Logic:** ตัวแทนห้ามตั้งราคาขายต่ำกว่าราคาขั้นต่ำที่ Admin กำหนด
* **Profit Calculation:** กำไรจะถูกคำนวณและเข้า Wallet เมื่อ Admin เปลี่ยนสถานะเป็น "จัดส่งแล้ว" (Completed/Shipped) เท่านั้น

---
**พัฒนาโดย:** Group A
**โปรเจกต์:** Reseller Management System (Bootcamp 2026)