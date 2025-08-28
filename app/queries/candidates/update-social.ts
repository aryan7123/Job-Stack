"use client";

import { useMutation } from "@tanstack/react-query";
import { updateSocialLinks } from "@/app/services/candidates/update-social";

export function useUpdateSocial(userId: string) {
  return useMutation({
    mutationFn: (data: Parameters<typeof updateSocialLinks>[0]) => updateSocialLinks(data, userId),
    onSuccess: () => {
      console.log("Profile updated successfully!");
    },
    onError: (error) => {
      console.error("Profile update failed:", error);
    },
  });
}