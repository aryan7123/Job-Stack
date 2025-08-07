"use server";

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

import fs from "fs";
import path from "path";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const resume = formData.get("resume") as File | null;
    const userId = formData.get("userId") as string;
    const your_name = formData.get("your_name") as string;
    const email = formData.get("email") as string;
    const occupation = formData.get("occupation") as string;
    const location = formData.get("location") as string;
    const education = formData.get("education") as string;
    const experience = formData.get("experience") as string;
    const skills = formData.getAll("skills") as string[];
    const description = formData.get("description") as string;

    const timestamp = Date.now();
    const extension = path.extname(resume.name);
    const fileName = `resume_${timestamp}${extension}`;

    // Define paths
    const assetsDir = path.join(process.cwd(), "public", "assets", "resumes");
    const filePath = path.join(assetsDir, fileName);

    // Create directory if it doesn't exist
    if (!fs.existsSync(assetsDir)) {
      fs.mkdirSync(assetsDir, { recursive: true });
    }

    // Convert file to buffer and save
    const arrayBuffer = await resume.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    fs.writeFileSync(filePath, buffer);

    // Generate URL for database
    const fileUrl = `/assets/resumes/${fileName}`;

    await prisma.user.update({
      where: { id: userId },
      data: {
        name: your_name,
        email,
      },
    });

    const exisitingProfile = await prisma.profile.findUnique({
      where: {
        userId: userId,
      },
    });

    if (exisitingProfile) {
      const updateCandidate = await prisma.profile.update({
        where: {
          userId: userId,
        },
        data: {
          user: {
            connect: { id: userId },
          },
          occupation,
          location,
          education,
          experience,
          skills,
          resumeUrl: fileUrl,
          description,
        }
      });

      return NextResponse.json({
        candidate: updateCandidate,
        message: "Personal Details Updated Successfully",
      });
      
    } else {
      const CreateCandidate = await prisma.profile.create({
        data: {
          user: {
            connect: { id: userId },
          },
          occupation,
          location,
          education,
          experience,
          skills,
          resumeUrl: fileUrl,
          description,
        },
      });

      return NextResponse.json({
        candidate: CreateCandidate,
        message: "Personal Details Updated Successfully",
      });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Something went wrong",
      },
      { status: 400 }
    );
  }
}
