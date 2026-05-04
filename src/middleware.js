
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(request) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const path = request.nextUrl.pathname;

  const isPublicPath = ["/login", "/register", "/"].includes(path);

  const isAdminRoute = path.startsWith("/admin");

  //  Not logged in
  if (!token && !isPublicPath) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  //  Logged user can't access login/register
  if (token && (path === "/login" || path === "/register")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  //  ADMIN ONLY ROUTE PROTECTION
  if (isAdminRoute && token?.role !== "admin") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/register", "/admin/:path*"],
};