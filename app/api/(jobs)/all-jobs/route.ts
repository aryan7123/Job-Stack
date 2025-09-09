"use server";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const allJobs = await prisma.job.findMany({
      select: {
        id: true,
        title: true,
        location: true,
        postedAt: true,
        type: true,
        salary: true,
        company: {
          select: {
            companyLogo: true,
          },
        },
      },
      orderBy: {
        postedAt: "desc"
      }
    });

    if (allJobs) {
      return NextResponse.json(allJobs);
    }
  } catch (error) {
    console.log(error);
  }
}
