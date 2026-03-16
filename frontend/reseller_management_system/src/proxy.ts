import { NextRequest, NextResponse } from "next/server";

const adminRoutes = ["/admin"];
const resellerRoutes = ["/resellers"];

export default async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isAdmin = adminRoutes.some((r) => pathname.startsWith(r));
  const isReseller = resellerRoutes.some((r) => pathname.startsWith(r));

  if (!isAdmin && !isReseller) return NextResponse.next();

  const token = req.cookies.get("token")?.value;

  if (!token) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  const res = await fetch("http://localhost:8080/api/auth/me", {
    headers: { Cookie: `token=${token}` },
  });

  if (!res.ok) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  const data = await res.json();

  // ป้องกันข้ามสิทธิ์
  if (isAdmin && data.role !== "admin") {
    return NextResponse.redirect(new URL("/resellers/dashboard", req.url));
  }

  if (isReseller && data.role !== "reseller") {
    return NextResponse.redirect(new URL("/admin/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/resellers/:path*"],
};