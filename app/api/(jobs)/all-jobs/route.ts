'use server';

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const allJobs = await prisma.job.findMany();

        if(allJobs) {
            return NextResponse.json(allJobs);
        }
    } catch (error) {
        console.log(error);
    }
}