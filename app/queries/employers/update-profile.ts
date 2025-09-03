"use client";

import { useMutation } from "@tanstack/react-query";
import { updateEmployerProfile } from "@/app/services/employers/update-profile";

export function useUpdateEmployerProfile(employerId: string) {
  return useMutation({
    mutationFn: (data: Parameters<typeof updateEmployerProfile>[0]) =>
      updateEmployerProfile(data, employerId),
    onSuccess: () => {
      console.log("Profile Updated successfully");
    },
  });
}
