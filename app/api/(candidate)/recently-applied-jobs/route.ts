"use server";

import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const recentApplications = await prisma.jobApplication.findMany({
      where: {
        userId: body.userId,
      },
      select: {
        id: true,
        status: true,
        appliedAt: true,
        job: {
          select: {
            id: true,
            title: true,
            location: true,
            type: true,
            postedAt: true,
            categories: true,
            salary: true,
            company: {
              select: {
                name: true,
                industry: true,
                companyLogo: true,
              },
            },
          },
        },
      },
      orderBy: {
        appliedAt: "desc",
      },
      take: 4,
    });
    return NextResponse.json(recentApplications, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
