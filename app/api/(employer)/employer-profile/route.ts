import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.employerId) {
      return NextResponse.json({ error: "employerId is required" }, { status: 400 });
    }

    const employer = await prisma.company.findUnique({
      where: { id: body.employerId },
    });

    return NextResponse.json({
      message: "Employer Details Fetched Successfully",
      employer,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid JSON or request body" },
      { status: 400 }
    );
  }
}