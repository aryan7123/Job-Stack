'use client';

import { useMutation } from "@tanstack/react-query";
import { deleteCandidateProfile } from "@/app/services/candidates/delete-profile";
import { signOut } from "next-auth/react";

export function useCandidateDeleteProfile() {
    return useMutation({
        mutationFn: deleteCandidateProfile,
        onSuccess: async () => {
            await signOut();
        }
    });
}