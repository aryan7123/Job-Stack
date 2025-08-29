"use client";

import { useMutation } from "@tanstack/react-query";
import { updateCandidatePhotos } from "@/app/services/candidates/upload-photos";

export function useUpdateCandidatePhotos(userId: string) {
  return useMutation({
    mutationFn: (data: Parameters<typeof updateCandidatePhotos>[0]) => updateCandidatePhotos(data, userId),
    onSuccess: () => {
      console.log("Profile updated successfully!");
    },
    onError: (error) => {
      console.error("Profile update failed:", error);
    },
  });
}