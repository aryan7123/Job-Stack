'use client';

import { useMutation } from "@tanstack/react-query";
import { sendUserComment } from "@/app/services/employers/send-comment";

export function useSendUserComment() {
    return useMutation({
        mutationFn: sendUserComment
    });
}