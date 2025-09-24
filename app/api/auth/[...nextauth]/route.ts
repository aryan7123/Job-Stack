import NextAuth from "next-auth";
import { candidateAuthOptions } from "@/lib/auth/candidateAuth";
import { employerAuthOptions } from "@/lib/auth/employerAuth";

const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    ...candidateAuthOptions.providers,
    ...employerAuthOptions.providers,
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },
  jwt: {
    maxAge: 30 * 24 * 60 * 60,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.avatar = user.avatar ?? null;
        token.logo = user.logo ?? null;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user || token) {
        session.user.id = token.id;
        session.user.role = token.role as string;
        session.user.avatar = token.avatar ?? null;
        session.user.logo = token.logo ?? null;
      }
      return session;
    },
  },
  pages: {
    signIn: "/candidate-login",
  },
});

export { handler as GET, handler as POST };
