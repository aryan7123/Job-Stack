"use client";

import { useMutation } from "@tanstack/react-query";
import { postJob } from "@/app/services/jobs/add-jobs";

export function usePostJob(employerId: string) {
    return useMutation({
       mutationFn: (data: Parameters<typeof postJob>[0]) => postJob(data, employerId),
    });
}