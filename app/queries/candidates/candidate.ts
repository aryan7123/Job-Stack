'use client';

import { useQuery } from "@tanstack/react-query";
import { candidateProfile } from "@/app/services/candidates/candidate";

export function useCandidateProfile(userId: string) {
    return useQuery({
        queryKey: ['candidate', userId],
        queryFn: () => candidateProfile(userId),
        enabled: !!userId,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        retry: false
    });
}