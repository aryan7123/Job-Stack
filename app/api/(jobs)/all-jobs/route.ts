"use server";

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "5", 10);

    const skip = (page - 1) * limit;

    const [jobs, totalJobs] = await Promise.all([
      prisma.job.findMany({
        skip,
        take: limit,
        select: {
          id: true,
          title: true,
          location: true,
          postedAt: true,
          type: true,
          salary: true,
          company: {
            select: {
              name: true,
              companyLogo: true,
            },
          },
        },
        orderBy: {
          postedAt: "desc",
        },
      }),
      prisma.job.count(),
    ]);

    return NextResponse.json({
      jobs,
      totalJobs,
      totalPages: Math.ceil(totalJobs / limit),
      currentPage: page,
    });
  } catch (error) {
    console.log(error);
  }
}
