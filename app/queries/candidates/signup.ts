"use client";

import { useMutation } from "@tanstack/react-query";
import { registerCandidate } from "@/app/services/candidates/signup";
import { useRouter } from "next/navigation";

export function useRegisterCandidate() {
  const router = useRouter();
  return useMutation({
    mutationFn: registerCandidate,
    onSuccess: () => {
        setTimeout(() => {
            router.push("/candidate-login");
        }, 2000);
    }
  });
}
