import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "./lib/auth";

const adminRoutes = ["/admin"];
const buyerRoutes = ["/buyer"];
const kitchenRoutes = ["/kitchen"];

export async function middleware(req: NextRequest) {
  const session = await auth();

  const path = req.nextUrl.pathname;

  // Unauthorized
  if (!session?.user?.role) {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  const role = session.user.role;

  if (role === "admin" && adminRoutes.some((r) => path.startsWith(r))) {
    return NextResponse.next();
  }

  if (role === "buyer" && buyerRoutes.some((r) => path.startsWith(r))) {
    return NextResponse.next();
  }

  if (role === "kitchen" && kitchenRoutes.some((r) => path.startsWith(r))) {
    return NextResponse.next();
  }

  // Role not allowed to access route
  return NextResponse.redirect(new URL("/unauthorized", req.url));
}

export const config = {
  matcher: ["/admin/:path*", "/buyer/:path*", "/kitchen/:path*"],
};
