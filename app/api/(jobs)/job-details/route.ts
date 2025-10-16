'use server';

import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        const fetchJobDetails = await prisma.job.findUnique({
            where: {
                id: body.jobId
            },
            include: {
                company: {
                    select: {
                        id: true,
                        name: true,
                        companyLogo: true
                    }
                }
            }
        });

        return NextResponse.json({ details: fetchJobDetails });
    } catch (error) {
        console.log(error);
    }
}