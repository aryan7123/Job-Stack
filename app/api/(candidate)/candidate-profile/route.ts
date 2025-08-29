'use server';

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        if(!body.userId) {
            return NextResponse.json({ error: "Candidate Not Found" }, { status: 400 });
        }
        else {
            const candidate = await prisma.profile.findUnique({
                where: {
                    userId: body.userId
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

            return NextResponse.json({ message: "Candidate Found", candidate, success: true });
        }

    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Something went wrong" }, { status: 400 });
    }
}