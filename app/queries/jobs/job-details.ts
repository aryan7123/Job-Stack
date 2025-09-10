'use client';

import { useQuery } from "@tanstack/react-query";
import { fetchJobDetails } from "@/app/services/jobs/job-details";

export function useFetchJobDetails(jobId: string) {
    return useQuery({
        queryKey: ['job-details', jobId],
        queryFn: () => fetchJobDetails(jobId),
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        retry: false,
    });
}