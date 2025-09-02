'use client';

import { useQuery } from "@tanstack/react-query";
import { employerProfile } from "@/app/services/employers/employer";

export function useEmployerProfile(employerId: string) {
    return useQuery({
        queryKey: ['employer', employerId],
        queryFn: () => employerProfile(employerId),
        enabled: !!employerId,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        retry: false
    });
}
