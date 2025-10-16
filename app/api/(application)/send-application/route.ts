import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { put } from "@vercel/blob";

export async function POST(req: NextRequest) {
  const formData = await req.formData();

  const userId = formData.get("userId") as string;
  const jobId = formData.get("jobId") as string;
  const employerId = formData.get("employerId") as string | undefined;
  const cover_letter = formData.get("cover_letter") as File | null;
  const resume = formData.get("resume") as File | null;

  if(!userId) {
    return NextResponse.json(
      { error: "You must be logged in to apply" },
      { status: 400 }
    );
  }

  if(!employerId) {
    return NextResponse.json(
      { error: "Invalid Employer ID" },
      { status: 400 }
    );
  }

  if (!cover_letter || !resume) {
    return NextResponse.json(
      { error: "Missing required files" },
      { status: 400 }
    );
  }

  const coverBuffer = Buffer.from(await cover_letter.arrayBuffer());
  const resumeBuffer = Buffer.from(await resume.arrayBuffer());

  const { url: coverUrl } = await put(
    `cover_${Date.now()}${cover_letter.name}`,
    coverBuffer,
    {
      access: "public",
      token: process.env.BLOB_READ_WRITE_TOKEN,
    }
  );

  const { url: resumeUrl } = await put(
    `resume_${Date.now()}${resume.name}`,
    resumeBuffer,
    {
      access: "public",
      token: process.env.BLOB_READ_WRITE_TOKEN,
    }
  );

  const application = await prisma.jobApplication.create({
    data: {
      userId,
      jobId,
      companyId: employerId,
      resumeUrl,
      coverLetter: coverUrl,
      status: "Pending",
    },
  });

  return NextResponse.json(
    { message: "Application sent successfully", application },
    { status: 200 }
  );
}
