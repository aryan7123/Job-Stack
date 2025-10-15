import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.employerId) {
      return NextResponse.json(
        { error: "employerId is required" },
        { status: 400 }
      );
    }

    const employer = await prisma.company.findUnique({
      where: { id: body.employerId },
      include: {
        jobs: {
          select: {
            id: true,
            title: true,
            postedAt: true,
            type: true,
            salary: true,
            location: true,
            applications: {
              select: { id: true, status: true}
            }
          },
          orderBy: {
            postedAt: "desc",
          },
          take: 3,
        },
      },
    });

    if (!employer) {
      return NextResponse.json(
        { error: "Employer not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(employer);
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid JSON or request body" },
      { status: 400 }
    );
  }
}
