'use client';

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchAllEmployers } from "@/app/services/employers/all-employers";

export function useFetchAllEmployers(page: number) {
    return useQuery({
        queryKey: ['employers', page],
        queryFn: () => fetchAllEmployers(page),
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        retry: false,
        placeholderData: keepPreviousData,
        staleTime: 5000
    });
}