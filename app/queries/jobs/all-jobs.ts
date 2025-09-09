'use client';

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchAllJobs } from "@/app/services/jobs/all-jobs";

export function useFetchAllJobs(page: number) {
    return useQuery({
        queryKey: ['jobs', page],
        queryFn: () => fetchAllJobs(page),
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        retry: false,
        placeholderData: keepPreviousData,
        staleTime: 5000
    });
}