import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
    cookieName:
      process.env.NODE_ENV === "production"
        ? "__Secure-next-auth.session-token"
        : "next-auth.session-token",
  });

  const { pathname } = req.nextUrl;

  // Public routes
  const publicRoutes = [
    "/candidate-login",
    "/candidate-signup",
    "/employer-login",
    "/employer-signup",
  ];

  // Candidate dashboard (and inner pages)
  if (pathname.startsWith("/candidate/dashboard")) {
    if (!token || token.role !== "candidate") {
      return NextResponse.redirect(new URL("/candidate-login", req.url));
    }
  }

  // Employer dashboard (and inner pages)
  if (pathname.startsWith("/employer/dashboard")) {
    if (!token || token.role !== "employer") {
      return NextResponse.redirect(new URL("/employer-login", req.url));
    }
  }

  // Prevent logged-in users from visiting login/signup again
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

// Matchers
export const config = {
  matcher: [
    "/candidate/dashboard/:path*",
    "/employer/dashboard/:path*",
    "/candidate-login",
    "/candidate-signup",
    "/employer-login",
    "/employer-signup",
  ],
};
