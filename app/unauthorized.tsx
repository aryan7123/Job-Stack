"use client";

import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-emerald-600/5 px-6 text-center">
      <h1 className="text-4xl font-bold text-red-600 mb-4">Access Denied</h1>
      <p className="text-lg text-gray-700 mb-6">
        You don’t have permission to view this page.
      </p>

      <div className="flex gap-4">
        <Link
          href="/"
          className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition"
        >
          Go Home
        </Link>
        <Link
          href="/login"
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition"
        >
          Login
        </Link>
      </div>
    </div>
  );
}
