'use client';

import { useQuery } from "@tanstack/react-query";
import { fetchEmployerApplication } from "@/app/services/applications/employer-applications";

export function useFetchEmployerApplications(employerId: string) {
    return useQuery({
        queryKey: ['employer-applications', employerId],
        queryFn: () => fetchEmployerApplication(employerId),
        enabled: !!employerId,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        retry: false
    });
}