'use server';

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        const deleteCandidateProfile = await prisma.profile.delete({
            where: {
                userId: body.candidateId
            },
            include: {
                user: true
            }
        });

        return NextResponse.json({ message: "Candidate Deleted Successfully", deleteCandidateProfile });

    } catch (error) {
        console.log(error);
    }
}