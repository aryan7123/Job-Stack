"use client";

import { useMutation } from "@tanstack/react-query";
import { updatePassword } from "@/app/services/candidates/update-password";

export function useUpdatePassword(userId: string) {
  return useMutation({
    mutationFn: (data: Parameters<typeof updatePassword>[0]) => updatePassword(data, userId),
    onSuccess: () => {
      console.log("Password updated successfully!");
    },
    onError: (error) => {
      console.error("Password update failed:", error);
    },
  });
}