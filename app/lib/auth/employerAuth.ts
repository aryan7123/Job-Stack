import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthOptions } from "next-auth";
import { prisma } from "@/app/lib/prisma";
import { compare } from "bcryptjs";

export const employerAuthOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Employer Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const employer = await prisma.company.findUnique({
          where: { email: credentials.email },
        });

        if (!employer) return null;

        const isPasswordValid = await compare(credentials.password, employer.password);
        if (!isPasswordValid) return null;

        return {
          id: employer.id.toString(),
          email: employer.email,
          name: employer.name,
          logo: employer.companyLogo ?? null,
          role: "employer",
        };
      },
    }),
  ],
  cookies: {
    sessionToken: {
      name: `next-auth.session-token.employer`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
  },
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, employer }) {
      if (employer) {
        token.id = employer.id;
        token.logo = employer.companyLogo ?? null;
        token.role = "employer";
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.employer.id = token.id;
        session.employer.logo = token.logo ?? null;
        session.employer.role = token.role;
      }
      return session;
    },
  },
  pages: {
    signIn: "/employer-login",
  },
};
