import NextAuth from "next-auth";
import { candidateAuthOptions } from "@/lib/auth/candidateAuth";
import { employerAuthOptions } from "@/lib/auth/employerAuth";

// Merge both configs but avoid collisions
const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    ...candidateAuthOptions.providers, // candidate credentials
    ...employerAuthOptions.providers,  // employer credentials
  ],
  session: { strategy: "jwt" },

  callbacks: {
    async jwt({ token, user }) {
      // Merge logic from both auth configs
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.avatar = user.avatar ?? null;
        token.logo = user.logo ?? null;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.avatar = token.avatar ?? null;
        session.user.logo = token.logo ?? null;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
});

export { handler as GET, handler as POST };
