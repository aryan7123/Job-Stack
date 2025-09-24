import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  // Public routes (accessible without login)
  const publicRoutes = [
    "/candidate-login",
    "/candidate-signup",
    "/employer-login",
    "/employer-signup",
  ];

  // Candidate protected route
  if (pathname.startsWith("/candidate/dashboard")) {
    if (!token || token.role !== "candidate") {
      return NextResponse.redirect(new URL("/candidate-login", req.url));
    }
  }

  // Employer protected route
  if (pathname.startsWith("/employer/dashboard")) {
    if (!token || token.role !== "employer") {
      return NextResponse.redirect(new URL("/employer-login", req.url));
    }
  }

  // Prevent logged-in users from visiting login/signup pages
  if (publicRoutes.includes(pathname)) {
    if (token) {
      if (token.role === "candidate") {
        return NextResponse.redirect(new URL("/candidate/dashboard", req.url));
      }
      if (token.role === "employer") {
        return NextResponse.redirect(new URL("/employer/dashboard", req.url));
      }
    }
  }

  return NextResponse.next();
}

// Config: define which paths the middleware runs on
export const config = {
  matcher: [
    "/candidate/:path*",
    "/employer/:path*",
  ],
};
