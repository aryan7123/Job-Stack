"use server";

import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import path from "path";
import fs from "fs";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const cover_letter = formData.get("cover_letter") as File | null;
    const resume = formData.get("resume") as File | null;
    const userId = formData.get("userId") as string;
    const jobId = formData.get("jobId") as string;

    if (!cover_letter || !resume) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (cover_letter) {
      const timestamp = Date.now();
      const extension = path.extname(cover_letter.name);
      const fileName = `cover_letter_${timestamp}${extension}`;

      const assetsDir = path.join(
        process.cwd(),
        "public",
        "assets",
        "applications"
      );
      const filePath = path.join(assetsDir, fileName);

      if (!fs.existsSync(assetsDir)) {
        fs.mkdirSync(assetsDir, { recursive: true });
      }

      const arrayBuffer = await cover_letter.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      fs.writeFileSync(filePath, buffer);
    }

    if (resume) {
      const timestamp = Date.now();
      const extension = path.extname(resume.name);
      const fileName = `resume_${timestamp}${extension}`;

      const assetsDir = path.join(
        process.cwd(),
        "public",
        "assets",
        "applications"
      );
      const filePath = path.join(assetsDir, fileName);

      if (!fs.existsSync(assetsDir)) {
        fs.mkdirSync(assetsDir, { recursive: true });
      }

      const arrayBuffer = await resume.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      fs.writeFileSync(filePath, buffer);
    }

    const application = await prisma.jobApplication.create({
      data: {
        userId,
        jobId,
        resumeUrl: `/assets/applications/resume_${Date.now()}${path.extname(
          resume.name
        )}`,
        coverLetter: `/assets/applications/cover_letter_${Date.now()}${path.extname(
          cover_letter.name
        )}`,
        status: "Submitted",
      },
    });
    return NextResponse.json(
      { message: "Application Sent Successfully", application },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
