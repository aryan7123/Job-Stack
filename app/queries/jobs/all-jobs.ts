'use client';

import { useQuery } from "@tanstack/react-query";
import { fetchAllJobs } from "@/app/services/jobs/all-jobs";

export function useFetchAllJobs() {
    return useQuery({
        queryKey: ['jobs'],
        queryFn: fetchAllJobs,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        retry: false
    });
}