"use client";

import { useMutation } from "@tanstack/react-query";
import { loginEmployer } from "@/app/services/employers/login";
import { signIn } from "next-auth/react";

export function useLoginEmployer(email: string, password: string) {
  return useMutation({
    mutationFn: loginEmployer,
    onSuccess: async() => {
      const signInResult = await signIn("employer-credentials", {
        email,
        password,
        redirect: true,
        callbackUrl: "/employer/settings",
        role: "employer"
      });
    },
  });
}
