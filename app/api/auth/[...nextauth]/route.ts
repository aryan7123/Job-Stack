import NextAuth from "next-auth";
import { candidateAuthOptions } from "@/app/lib/auth/candidateAuth";
import { employerAuthOptions } from "@/app/lib/auth/employerAuth";

const handler = NextAuth({
  ...candidateAuthOptions,
  providers: [
    ...candidateAuthOptions.providers,
    ...employerAuthOptions.providers
  ],
});

export { handler as GET, handler as POST };
