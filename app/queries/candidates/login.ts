"use client";

import { useMutation } from "@tanstack/react-query";
import { loginCandidate } from "@/app/services/candidates/login";
import { signIn } from "next-auth/react";

export function useLoginCandidate(email: string, password: string) {
  return useMutation({
    mutationFn: loginCandidate,
    onSuccess: async() => {
      const signInResult = await signIn("candidate-credentials", {
        email,
        password,
        redirect: true,
        callbackUrl: "/candidate/dashboard",
        role: "candidate"
      });
    },
  });
}
