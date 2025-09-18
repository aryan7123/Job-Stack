"use server";

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "5", 10);

    const skip = (page - 1) * limit;

    const [employers, totalEmployers] = await Promise.all([
      prisma.company.findMany({
        skip,
        take: limit,
        select: {
          id: true,
          name: true,
          companyLogo: true,
          industry: true,
          headquarters: true,
        },
        orderBy: {
          name: "asc",
        },
      }),
      prisma.company.count(),
    ]);

    return NextResponse.json({
      employers,
      totalEmployers,
      totalPages: Math.ceil(totalEmployers / limit),
      currentPage: page,
    }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Failed to fetch employers" }, { status: 400 });
  }
}
