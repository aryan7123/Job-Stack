import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;
    const token = req.nextauth.token;

    console.log("MIDDLEWARE PATHNAME:", pathname);

    // 🚫 Prevent cross-role login
    if (pathname.startsWith("/employer-login") && token?.role === "candidate") {
      return NextResponse.redirect(new URL("/candidate/profile", req.url));
    }
    if (pathname.startsWith("/candidate-login") && token?.role === "employer") {
      return NextResponse.redirect(new URL("/employer/profile", req.url));
    }

    // 🚫 Redirect logged-in users away from their login page
    if (pathname.startsWith("/candidate-login") && token?.role === "candidate") {
      return NextResponse.redirect(new URL("/candidate/profile", req.url));
    }
    if (pathname.startsWith("/employer-login") && token?.role === "employer") {
      return NextResponse.redirect(new URL("/employer/profile", req.url));
    }
  },
  {
    callbacks: {
      async authorized({ token, req }) {
        const { pathname } = req.nextUrl;

        // ✅ Public routes (no login needed)
        if (
          pathname.startsWith("/candidate-login") ||
          pathname.startsWith("/employer-login") ||
          pathname.startsWith("/signup") ||
          pathname.startsWith("/public")
        ) {
          return true;
        }

        // 🔒 Candidate protected pages
        if (pathname.startsWith("/candidate")) {
          return token?.role === "candidate";
        }

        // 🔒 Employer protected pages
        if (pathname.startsWith("/employer")) {
          return token?.role === "employer";
        }

        return false;
      },
    },
  }
);

export const config = {
  matcher: [
    "/candidate/:path*",
    "/employer/:path*",
    "/candidate-login",
    "/employer-login",
  ],
};
