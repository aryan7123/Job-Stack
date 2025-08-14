import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;

    // Debug log to confirm which path is being used
    console.log("MIDDLEWARE PATHNAME:", pathname);

    // Redirect logged-in candidates away from auth pages
    if (pathname.startsWith("/candidate-login") && req.nextauth.token?.role === "candidate") {
      return NextResponse.redirect(new URL("/candidate/profile", req.url));
    }

    // Redirect logged-in employers away from auth pages
    if (pathname.startsWith("/employer-login") && req.nextauth.token?.role === "employer") {
      return NextResponse.redirect(new URL("/employer/profile", req.url));
    }
  },
  {
    callbacks: {
      async authorized({ token, req }) {
        const { pathname } = req.nextUrl;

        // Public routes (accessible without login)
        if (
          pathname.startsWith("/candidate-login") ||
          pathname.startsWith("/employer-login") ||
          pathname.startsWith("/signup") ||
          pathname.startsWith("/public")
        ) {
          return true;
        }

        // Candidate protected pages
        if (pathname.startsWith("/candidate")) {
          return token?.role === "candidate";
        }

        // Employer protected pages
        if (pathname.startsWith("/employer")) {
          return token?.role === "employer";
        }

        return false; // Block anything else without auth
      },
    },

    // 👇 This makes sure NextAuth points to the right API route for each role
    pages: {
      signIn: "/candidate-login", // default if no match
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
