import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Get the JWT token, which now includes "role"
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const isLoggedIn = !!token;

  // 1️⃣ Protected routes for all logged-in users
  if (pathname.startsWith("/profile") || pathname.startsWith("/settings")) {
    if (!isLoggedIn) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Role-based protection for profile routes
  if (pathname.startsWith("/profile/admin")) {
    if (!isLoggedIn || token?.role !== "admin") {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }
  }

  if (pathname.startsWith("/profile/employer")) {
    if (!isLoggedIn || token?.role !== "employer") {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }
  }

  if (pathname.startsWith("/profile/user")) {
    if (!isLoggedIn || token?.role !== "user") {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }
  }

  // Inside middleware, after login page check
  if (pathname === "/login" || pathname === "/signup") {
    if (isLoggedIn) {
      const role = token?.role;
      if (role === "admin") {
        return NextResponse.redirect(new URL("/profile/admin", request.url));
      } else if (role === "employer") {
        return NextResponse.redirect(new URL("/profile/employer", request.url));
      } else {
        return NextResponse.redirect(new URL("/profile/user", request.url));
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/profile/:path*",
    "/login",
    "/signup",
    "/settings/:path*",
    "/admin/:path*", // Admin routes
    "/employer/:path*", // Employer routes
    "/user/:path*", // User-only routes (optional)
  ],
};
