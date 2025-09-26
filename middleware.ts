import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import type { NextRequestWithAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req: NextRequestWithAuth) {
    // Access token from the correct property
    const token = req.nextauth.token;
    const pathname = req.nextUrl.pathname;

    // Define role-based route patterns
    const candidateRoutes = [
      "/candidate/dashboard",
      "/candidate/profile",
      "/applied-jobs",
      "/candidate/settings",
    ];

    const employerRoutes = [
      "/employer/dashboard",
      "/employer/profile",
      "/job-post",
      "/employer/settings",
    ];

    const publicRoutes = [
      "/",
      "/about",
      "/contact",
      "/privacy-policy",
      "/terms",
    ];

    const authRoutes = [
      "/candidate-login",
      "/candidate-signup",
      "/employer-login",
      "/employer-signup",
    ];

    // Check if the current path starts with any of the protected routes
    const isCandidateRoute = candidateRoutes.some(route => 
      pathname.startsWith(route)
    );
    
    const isEmployerRoute = employerRoutes.some(route => 
      pathname.startsWith(route)
    );

    const isAuthRoute = authRoutes.some(route => 
      pathname.startsWith(route)
    );

    // If user is authenticated and tries to access login/signup pages, redirect to their dashboard
    if (token && isAuthRoute) {
      if (token.role === "candidate") {
        return NextResponse.redirect(new URL("/candidate/dashboard", req.url));
      } else if (token.role === "employer") {
        return NextResponse.redirect(new URL("/employer/dashboard", req.url));
      }
    }

    // Protect candidate routes
    if (isCandidateRoute) {
      if (!token) {
        // No token, redirect to candidate login
        const url = new URL("/candidate-login", req.url);
        url.searchParams.set("callbackUrl", pathname);
        return NextResponse.redirect(url);
      }
      
      if (token.role !== "candidate") {
        // User is logged in but not as a candidate
        if (token.role === "employer") {
          // Redirect employer to their dashboard
          return NextResponse.redirect(new URL("/employer/dashboard", req.url));
        }
        // For any other role, redirect to home
        return NextResponse.redirect(new URL("/", req.url));
      }
    }

    // Protect employer routes
    if (isEmployerRoute) {
      if (!token) {
        // No token, redirect to employer login
        const url = new URL("/employer-login", req.url);
        url.searchParams.set("callbackUrl", pathname);
        return NextResponse.redirect(url);
      }
      
      if (token.role !== "employer") {
        // User is logged in but not as an employer
        if (token.role === "candidate") {
          // Redirect candidate to their dashboard
          return NextResponse.redirect(new URL("/candidate/dashboard", req.url));
        }
        // For any other role, redirect to home
        return NextResponse.redirect(new URL("/", req.url));
      }
    }

    // Allow the request to continue
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const pathname = req.nextUrl.pathname;
        
        // Public routes are always accessible
        const publicRoutes = [
          "/",
          "/about",
          "/contact",
          "/privacy-policy",
          "/terms",
        ];
        
        const authRoutes = [
          "/candidate-login",
          "/candidate-signup",
          "/employer-login",
          "/employer-signup",
        ];

        // Allow access to public and auth routes without a token
        if (
          publicRoutes.some(route => pathname === route || pathname.startsWith(route + "/")) ||
          authRoutes.some(route => pathname === route)
        ) {
          return true;
        }

        // For all other routes, require authentication
        return !!token;
      },
    },
    secret: process.env.NEXTAUTH_SECRET, // Explicitly pass the secret here as well
  }
);

// Configuration for which routes the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (all API routes including auth)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!api|_next/static|_next/image|favicon.ico|public|images|.*\\.png$|.*\\.jpg$|.*\\.jpeg$|.*\\.gif$|.*\\.svg$|.*\\.ico$).*)",
  ],
};