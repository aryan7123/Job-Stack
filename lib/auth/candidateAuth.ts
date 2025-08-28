import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthOptions } from "next-auth";
import { prisma } from "../prisma";
import { compare } from "bcryptjs";

export const candidateAuthOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "candidate-credentials",
      name: "Candidate Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) return null;

        const isPasswordValid = await compare(credentials.password, user.password);
        if (!isPasswordValid) return null;

        return {
          id: user.id.toString(),
          email: user.email,
          name: user.name,
          avatar: user.avatar ?? null,
          role: "candidate",
        };
      },
    }),
  ],
};