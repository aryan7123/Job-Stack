'use client';

import { useQuery } from "@tanstack/react-query";
import { fetchRecentlyAppliedJobs } from "@/app/services/applications/recently-applied";

export function useRecentlyAppliedJobs(userId: string) {
    return useQuery({
        queryKey: ['recently-applied-jobs', userId],
        queryFn: () => fetchRecentlyAppliedJobs(userId),
        enabled: !!userId,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        retry: false
    });
}