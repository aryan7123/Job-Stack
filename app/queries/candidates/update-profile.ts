"use client";

import { useMutation } from "@tanstack/react-query";
import { updateProfile } from "@/app/services/candidates/update-profile";

export function useUpdateProfile(userId: string) {
  return useMutation({
    mutationFn: (data: Parameters<typeof updateProfile>[0]) => updateProfile(data, userId),
    onSuccess: () => {
      console.log("Profile updated successfully!");
    },
    onError: (error) => {
      console.error("Profile update failed:", error);
    },
  });
}