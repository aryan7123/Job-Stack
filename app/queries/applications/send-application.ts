"use client";

import { useMutation } from "@tanstack/react-query";
import { sendJobApplication } from "@/app/services/applications/send-application";

export function useSendJobApplication() {
  return useMutation({
    mutationFn: (data: Parameters<typeof sendJobApplication>[0]) => sendJobApplication(data),
  });
}
