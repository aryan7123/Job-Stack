import { getServerSession } from "next-auth";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "../prisma";
import { compare } from "bcryptjs";

export const employerAuthOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Employer Login",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null;

        const company = await prisma.company.findUnique({
          where: { email: credentials.email }
        });

        if (!company) return null;

        const isValid = await compare(credentials.password, company.password);
        if (!isValid) return null;

        return { id: company.id, email: company.email, role: "employer" };
      }
    })
  ],
  callbacks: {
    async jwt({ token, company }) {
      if (company) token.role = "employer";
      return token;
    },
    async session({ session, token }) {
      if (token) session.user.role = "employer";
      return session;
    }
  },
  cookies: {
    sessionToken: {
      name: `next-auth.session-token.employer`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production"
      }
    }
  },
  session: { strategy: "jwt" },
  pages: { signIn: "/employer-login" }
};

export function getServerSessionEmployer() {
  return getServerSession(employerAuthOptions);
}
