'use server';

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function POST(request:NextRequest) {
    try {
        const body = await request.json();

        const { userId } = body;

        const profile = await prisma.profile.findUnique({
            where: {
                userId: userId
            },
            include: {
                user: {
                    select: {
                        name: true,
                        email: true
                    }
                }
            }
        });

        return NextResponse.json({ profile }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Something Went Wrong" }, { status: 400 });
    }
}