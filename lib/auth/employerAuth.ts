import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthOptions } from "next-auth";
import { prisma } from "../prisma";
import { compare } from "bcryptjs";

export const employerAuthOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "employer-credentials",
      name: "Employer Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

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
};
