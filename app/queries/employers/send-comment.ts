"use client";

import { useMutation } from "@tanstack/react-query";
import { sendUserComment } from "@/app/services/employers/send-comment";

export function useSendUserComment(employerId: string) {
  return useMutation({
    mutationFn: (data: Parameters<typeof sendUserComment>[0]) =>
      sendUserComment(data, employerId),
  });
}
