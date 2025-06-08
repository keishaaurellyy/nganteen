import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const adminRoutes = ["/admin"];
const buyerRoutes = ["/buyer"];
const kitchenRoutes = ["/kitchen"];

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET }); // ✅ tambahkan secret

  const path = req.nextUrl.pathname;

  if (!token?.role) {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  const role = token.role;

  if (role === "admin" && adminRoutes.some((r) => path.startsWith(r))) {
    return NextResponse.next();
  }

  if (role === "buyer" && buyerRoutes.some((r) => path.startsWith(r))) {
    return NextResponse.next();
  }

  if (role === "kitchen" && kitchenRoutes.some((r) => path.startsWith(r))) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL("/unauthorized", req.url));
}

export const config = {
  matcher: ["/admin/:path*", "/buyer/:path*", "/kitchen/:path*"],
};
