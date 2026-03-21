import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Reseller Management System",
  description: "",
  icons: {
    icon: "/file.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
// import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
// import "./globals.css";
// import { Providers } from "./components/providers"; // เช็ค Path ไฟล์ Providers ของคุณด้วยนะครับ

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// export const metadata: Metadata = {
//   title: "Reseller Management System",
//   description: "ระบบจัดการตัวแทนจำหน่ายครบวงจร",
//   icons: {
//     icon: "/file.svg",
//   },
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     // 1. เพิ่ม suppressHydrationWarning เพื่อป้องกัน Error ตอนสลับโหมด
//     <html lang="en" suppressHydrationWarning>
//       <body
//         className={`${geistSans.variable} ${geistMono.variable} antialiased`}
//       >
//         {/* 2. หุ้มด้วย Providers เพื่อให้ทุกหน้าใช้ Dark Mode ได้ */}
//         <Providers>
//           {children}
//         </Providers>
//       </body>
//     </html>
//   );
// }