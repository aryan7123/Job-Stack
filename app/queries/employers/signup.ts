"use client";

import { useMutation } from "@tanstack/react-query";
import { registerEmployer } from "@/app/services/employers/signup";
import { useRouter } from "next/navigation";

export function useRegisterEmployer() {
  const router = useRouter();
  return useMutation({
    mutationFn: registerEmployer,
    onSuccess: () => {
      setTimeout(() => {
        router.push("/employer-login");
      }, 2000);
    },
  });
}
