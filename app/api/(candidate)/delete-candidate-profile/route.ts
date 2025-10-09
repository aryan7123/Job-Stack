"use server";

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const deleteCandidateProfile = await prisma.profile.delete({
      where: {
        userId: body.candidateId,
      },
      include: {
        user: true,
      },
    });

    await prisma.user.delete({
      where: {
        id: deleteCandidateProfile.userId
      },
    });

    await prisma.jobApplication.deleteMany({
      where: {
        userId: deleteCandidateProfile.userId
      }
    });

    return NextResponse.json({
      message: "Candidate Deleted Successfully",
      deleteCandidateProfile,
    });
  } catch (error) {
    console.log(error);
  }
}
